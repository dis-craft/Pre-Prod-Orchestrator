import { describe, it, expect, beforeEach } from 'vitest';
import { simulatorEngine } from '../lib/simulator/engine';

describe('Pre-Prod Orchestrator Service & Simulator Engine', () => {
  beforeEach(() => {
    simulatorEngine.reset();
  });

  it('should initialize simulator engine status correctly', () => {
    const status = simulatorEngine.getStatus();
    expect(status.activeScenario.id).toBe('sql-injection');
    expect(status.currentState).toBe('PR_OPENED');
    expect(status.isRunning).toBe(false);
    expect(status.isPaused).toBe(false);
  });

  it('should advance state on nextStep()', () => {
    simulatorEngine.nextStep();
    const status1 = simulatorEngine.getStatus();
    expect(status1.currentState).toBe('SCANNING');

    simulatorEngine.nextStep();
    const status2 = simulatorEngine.getStatus();
    expect(status2.currentState).toBe('FINDING_DETECTED');
  });

  it('should handle pause, resume, and reset correctly', () => {
    simulatorEngine.start();
    let status = simulatorEngine.getStatus();
    expect(status.isRunning).toBe(true);

    simulatorEngine.pause();
    status = simulatorEngine.getStatus();
    expect(status.isPaused).toBe(true);

    simulatorEngine.resume();
    status = simulatorEngine.getStatus();
    expect(status.isPaused).toBe(false);

    simulatorEngine.reset();
    status = simulatorEngine.getStatus();
    expect(status.currentState).toBe('PR_OPENED');
    expect(status.isRunning).toBe(false);
  });

  it('should fast forward to final merged state', () => {
    simulatorEngine.fastForward();
    const status = simulatorEngine.getStatus();
    expect(status.currentState).toBe('MERGED');
    expect(status.isCompleted).toBe(true);
  });

  it('should switch demo scenario and reset state', () => {
    simulatorEngine.setScenario('secret-leak');
    const status = simulatorEngine.getStatus();
    expect(status.activeScenario.id).toBe('secret-leak');
    expect(status.currentState).toBe('PR_OPENED');
  });
});
