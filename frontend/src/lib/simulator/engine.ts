import { WorkflowState } from './stateMachine';
import { DemoScenario, SCENARIO_SQL_INJECTION, ALL_SCENARIOS } from './scenarios';
import { demoStore } from '../demo/state';

export interface SimulatorStatus {
  activeScenario: DemoScenario;
  currentState: WorkflowState;
  stateIndex: number;
  totalStates: number;
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  speedMultiplier: number;
}

export const DEMO_TIMINGS: Record<WorkflowState, number> = {
  PR_OPENED: 1000,
  SCANNING: 2500,
  FINDING_DETECTED: 1500,
  TRIAGED: 1200,
  REMEDIATION_STARTED: 2500,
  PATCH_GENERATED: 1500,
  VALIDATING: 3500,
  VALIDATION_PASSED: 1200,
  RESCAN_PASSED: 1500,
  VERIFIED: 1200,
  PR_CREATED: 1500,
  HUMAN_REVIEW: 1500,
  MERGED: 1000,
  VALIDATION_FAILED: 0,
  RESCAN_FAILED: 0,
  REMEDIATION_FAILED: 0,
  ROTATION_REQUIRED: 0,
};

type Listener = () => void;

class SimulatorEngine {
  private activeScenario: DemoScenario = SCENARIO_SQL_INJECTION;
  private currentStateIndex: number = 0;
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private speedMultiplier: number = 1.0;
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private generationId: number = 0;
  private listeners: Set<Listener> = new Set();

  constructor() {
    this.syncScenarioToStore();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getStatus(): SimulatorStatus {
    const states = this.activeScenario.statesSequence;
    const currentState = states[this.currentStateIndex] || states[0];
    const isFailed = currentState.includes('FAILED') || currentState === 'ROTATION_REQUIRED';
    const isCompleted = currentState === 'MERGED' || this.currentStateIndex >= states.length - 1;

    return {
      activeScenario: this.activeScenario,
      currentState,
      stateIndex: this.currentStateIndex,
      totalStates: states.length,
      isRunning: this.isRunning,
      isPaused: this.isPaused,
      isCompleted,
      isFailed,
      speedMultiplier: this.speedMultiplier,
    };
  }

  public setScenario(scenarioId: string) {
    const found = ALL_SCENARIOS.find((s) => s.id === scenarioId);
    if (!found) return;

    this.reset();
    this.activeScenario = found;
    this.syncScenarioToStore();
    this.notify();
  }

  public setSpeed(multiplier: number) {
    this.speedMultiplier = multiplier;
    this.notify();
  }

  public start() {
    if (this.isRunning && !this.isPaused) return;

    if (this.isPaused) {
      this.isPaused = false;
      this.isRunning = true;
      this.scheduleNextStep();
      this.notify();
      return;
    }

    this.reset();
    this.isRunning = true;
    this.isPaused = false;
    this.scheduleNextStep();
    this.notify();
  }

  public pause() {
    if (!this.isRunning || this.isPaused) return;
    this.clearTimer();
    this.isPaused = true;
    this.notify();
  }

  public resume() {
    if (!this.isRunning || !this.isPaused) return;
    this.isPaused = false;
    this.scheduleNextStep();
    this.notify();
  }

  public reset() {
    this.clearTimer();
    this.generationId++;
    this.currentStateIndex = 0;
    this.isRunning = false;
    this.isPaused = false;

    demoStore.resetState();
    this.syncScenarioToStore();
    this.notify();
  }

  public stop() {
    this.clearTimer();
    this.generationId++;
    this.currentStateIndex = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.notify();
  }

  public nextStep() {
    const states = this.activeScenario.statesSequence;
    if (this.currentStateIndex >= states.length - 1) return;

    const nextIndex = this.currentStateIndex + 1;
    this.transitionToState(nextIndex);
  }

  public retry() {
    const status = this.getStatus();
    if (!status.isFailed) return;

    // Restart validation step sequence from VALIDATING state
    const validatingIndex = this.activeScenario.statesSequence.indexOf('VALIDATING');
    if (validatingIndex !== -1) {
      this.transitionToState(validatingIndex);
      this.start();
    } else {
      this.reset();
      this.start();
    }
  }

  public fastForward() {
    this.clearTimer();
    const states = this.activeScenario.statesSequence;
    this.transitionToState(states.length - 1);
    this.isRunning = false;
    this.isPaused = false;
  }

  private scheduleNextStep() {
    this.clearTimer();
    const currentGen = this.generationId;
    const states = this.activeScenario.statesSequence;

    if (this.currentStateIndex >= states.length - 1) {
      this.isRunning = false;
      this.notify();
      return;
    }

    const currentState = states[this.currentStateIndex];
    const delay = (DEMO_TIMINGS[currentState] ?? 1500) / this.speedMultiplier;

    if (delay === 0) {
      this.isRunning = false;
      this.notify();
      return;
    }

    this.timerId = setTimeout(() => {
      if (currentGen !== this.generationId || !this.isRunning || this.isPaused) return;
      this.currentStateIndex++;
      this.transitionToState(this.currentStateIndex);
      this.scheduleNextStep();
    }, delay);
  }

  private transitionToState(index: number) {
    const states = this.activeScenario.statesSequence;
    if (index < 0 || index >= states.length) return;

    const targetState = states[index];
    this.currentStateIndex = index;

    // Apply Domain State mutation to demoStore
    this.applyStateToDemoStore(targetState);
    this.notify();
  }

  private applyStateToDemoStore(state: WorkflowState) {
    const scenario = this.activeScenario;
    const finding = demoStore.getFindingById(scenario.findingId);

    // Update Finding Status
    if (finding) {
      if (state === 'SCANNING') finding.status = 'OPEN';
      if (state === 'TRIAGED') finding.status = 'TRIAGED';
      if (state === 'REMEDIATION_STARTED') finding.status = 'REMEDIATING';
      if (state === 'VALIDATING') finding.status = 'VALIDATING';
      if (state === 'VERIFIED' || state === 'MERGED') finding.status = 'VERIFIED';
      if (state === 'VALIDATION_FAILED' || state === 'RESCAN_FAILED') finding.status = 'FAILED';
    }

    // Update Validation Pipeline Steps
    const val = demoStore.getValidationByRemediationId(scenario.remediation?.id || '');
    if (val) {
      if (state === 'VALIDATING') {
        val.overallStatus = 'running';
        val.steps.forEach((step, idx) => {
          step.status = idx < 3 ? 'passed' : 'running';
        });
      }
      if (state === 'VALIDATION_PASSED' || state === 'RESCAN_PASSED' || state === 'VERIFIED') {
        val.overallStatus = 'passed';
        val.steps.forEach((step) => {
          if (step.status !== 'failed') step.status = 'passed';
        });
      }
      if (state === 'VALIDATION_FAILED') {
        val.overallStatus = 'failed';
        val.steps.forEach((step) => {
          if (step.id === 'step-5') step.status = 'failed';
        });
      }
    }

    // Update Remediation PR Status
    const pr = demoStore.getPullRequests().find((p) => p.findingId === scenario.findingId);
    if (pr) {
      if (state === 'PR_CREATED') pr.status = 'OPEN';
      if (state === 'HUMAN_REVIEW') pr.status = 'READY_FOR_REVIEW';
      if (state === 'MERGED') pr.status = 'MERGED';
    }

    // Append Audit Event
    demoStore.addAuditEvent({
      id: `AUD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      actor: 'Demo Simulator Engine',
      component: 'SIMULATOR',
      action: `WORKFLOW_STATE_${state}`,
      status: state.includes('FAILED') ? 'WARNING' : 'SUCCESS',
      evidence: { scenarioId: scenario.id, state, target: scenario.findingId },
    });
  }

  private syncScenarioToStore() {
    if (this.activeScenario.finding) {
      const existing = demoStore.getFindingById(this.activeScenario.findingId);
      if (!existing) {
        demoStore.getFindings().unshift(this.activeScenario.finding);
      }
    }
  }

  private clearTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}

export const simulatorEngine = new SimulatorEngine();
