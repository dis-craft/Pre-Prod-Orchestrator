import { 
  Finding, 
  Remediation, 
  Validation, 
  PullRequest, 
  AuditEvent, 
  Repository, 
  DashboardMetrics 
} from '../types';
import { 
  INITIAL_REPOSITORIES, 
  INITIAL_FINDINGS, 
  INITIAL_REMEDIATIONS, 
  INITIAL_VALIDATIONS, 
  INITIAL_PULL_REQUESTS, 
  INITIAL_AUDIT_EVENTS, 
  INITIAL_METRICS 
} from './data';

type Listener = () => void;

class DemoStore {
  private repositories: Repository[] = [...INITIAL_REPOSITORIES];
  private findings: Finding[] = [...INITIAL_FINDINGS];
  private remediations: Record<string, Remediation> = { ...INITIAL_REMEDIATIONS };
  private validations: Record<string, Validation> = { ...INITIAL_VALIDATIONS };
  private pullRequests: PullRequest[] = [...INITIAL_PULL_REQUESTS];
  private auditEvents: AuditEvent[] = [...INITIAL_AUDIT_EVENTS];
  private metrics: DashboardMetrics = { ...INITIAL_METRICS };
  private listeners: Set<Listener> = new Set();

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // Getters
  public getRepositories(): Repository[] {
    return this.repositories;
  }

  public getRepositoryByName(name: string): Repository | undefined {
    return this.repositories.find((r) => r.name.toLowerCase() === name.toLowerCase());
  }

  public getFindings(): Finding[] {
    return this.findings;
  }

  public getFindingById(id: string): Finding | undefined {
    return this.findings.find((f) => f.id === id);
  }

  public getRemediationByFindingId(findingId: string): Remediation | undefined {
    return Object.values(this.remediations).find((r) => r.findingId === findingId);
  }

  public getRemediationById(id: string): Remediation | undefined {
    return this.remediations[id];
  }

  public getValidationByRemediationId(remediationId: string): Validation | undefined {
    return Object.values(this.validations).find((v) => v.remediationId === remediationId);
  }

  public getValidationById(id: string): Validation | undefined {
    return this.validations[id];
  }

  public getPullRequests(): PullRequest[] {
    return this.pullRequests;
  }

  public getPullRequestById(id: string): PullRequest | undefined {
    return this.pullRequests.find((pr) => pr.id === id || pr.number.toString() === id);
  }

  public getAuditEvents(): AuditEvent[] {
    return this.auditEvents;
  }

  public getMetrics(): DashboardMetrics {
    return this.metrics;
  }

  // Stateful Workflow Actions
  public startRemediation(findingId: string): Remediation {
    const finding = this.getFindingById(findingId);
    if (finding) {
      finding.status = 'REMEDIATING';
    }

    let remediation = this.getRemediationByFindingId(findingId);
    if (!remediation) {
      const remId = `REM-${findingId}`;
      remediation = {
        id: remId,
        findingId,
        strategy: 'Context-Aware Input Sanitization & Parameterization',
        model: 'Claude 3.5 Sonnet (Security fine-tuned)',
        confidence: 96,
        rootCause: `Vulnerable string interpolation in ${finding?.file ?? 'source code'}.`,
        patch: `--- a/${finding?.file}\n+++ b/${finding?.file}\n@@ -${finding?.startLine},3 +${finding?.startLine},3 @@\n- ${finding?.evidence.vulnerableLine}\n+ // Remediated: Parameterized query binding\n+ const safeQuery = sanitizeInput(${finding?.evidence.vulnerableLine});`,
        filesChanged: [finding?.file ?? 'src/index.js'],
        testsAdded: [`tests/${finding?.file}.test.js`],
        assumptions: ['Database interface supports parameterized bindings.'],
        risk: 'LOW',
        status: 'CANDIDATE',
      };
      this.remediations[remId] = remediation;
    }

    this.addAuditEvent({
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      actor: 'Pre-Prod Remediation Engine',
      component: 'REMEDIATION_ENGINE',
      action: 'REMEDIATION_CANDIDATE_GENERATED',
      status: 'SUCCESS',
      evidence: { findingId, remediationId: remediation.id, model: remediation.model, confidence: remediation.confidence },
    });

    this.notify();
    return remediation;
  }

  public runValidationSimulation(validationId: string, onStepUpdate?: (stepId: string, status: string) => void): Promise<Validation> {
    const val = this.getValidationById(validationId);
    if (!val) throw new Error('Validation record not found');

    val.overallStatus = 'running';
    val.startedAt = new Date().toISOString();
    this.notify();

    return new Promise((resolve) => {
      let stepIndex = 0;
      const interval = setInterval(() => {
        if (stepIndex < val.steps.length) {
          const step = val.steps[stepIndex];
          step.status = 'passed';
          step.durationMs = Math.floor(Math.random() * 400) + 150;
          if (onStepUpdate) onStepUpdate(step.id, 'passed');
          stepIndex++;
          this.notify();
        } else {
          clearInterval(interval);
          val.overallStatus = 'passed';
          val.completedAt = new Date().toISOString();

          // Update related Remediation and Finding status
          const remediation = this.getRemediationById(val.remediationId);
          if (remediation) {
            remediation.status = 'VERIFIED';
          }
          const finding = this.getFindingById(val.findingId);
          if (finding) {
            finding.status = 'VERIFIED';
          }

          // Update related PR
          const pr = this.pullRequests.find((p) => p.remediationId === val.remediationId);
          if (pr) {
            pr.status = 'READY_FOR_REVIEW';
            pr.validationStatus = 'passed';
          }

          this.addAuditEvent({
            id: `AUD-${Date.now()}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
            actor: 'Pre-Prod Validation Pipeline',
            component: 'VALIDATOR',
            action: 'VALIDATION_PIPELINE_VERIFIED',
            status: 'SUCCESS',
            evidence: { validationId, totalStepsPassed: val.steps.length, securityRescanPassed: true },
          });

          this.notify();
          resolve(val);
        }
      }, 400);
    });
  }

  public addAuditEvent(event: AuditEvent) {
    this.auditEvents.unshift(event);
    this.notify();
  }

  public resetState() {
    this.repositories = JSON.parse(JSON.stringify(INITIAL_REPOSITORIES));
    this.findings = JSON.parse(JSON.stringify(INITIAL_FINDINGS));
    this.remediations = JSON.parse(JSON.stringify(INITIAL_REMEDIATIONS));
    this.validations = JSON.parse(JSON.stringify(INITIAL_VALIDATIONS));
    this.pullRequests = JSON.parse(JSON.stringify(INITIAL_PULL_REQUESTS));
    this.auditEvents = JSON.parse(JSON.stringify(INITIAL_AUDIT_EVENTS));
    this.metrics = JSON.parse(JSON.stringify(INITIAL_METRICS));
    this.notify();
  }
}

export const demoStore = new DemoStore();
