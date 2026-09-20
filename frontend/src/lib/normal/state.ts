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
  NORMAL_REPOSITORIES, 
  NORMAL_FINDINGS, 
  NORMAL_REMEDIATIONS, 
  NORMAL_VALIDATIONS, 
  NORMAL_PULL_REQUESTS, 
  NORMAL_AUDIT_EVENTS, 
  NORMAL_METRICS 
} from './data';

type Listener = () => void;

class NormalStore {
  private repositories: Repository[] = [...NORMAL_REPOSITORIES];
  private findings: Finding[] = [...NORMAL_FINDINGS];
  private remediations: Record<string, Remediation> = { ...NORMAL_REMEDIATIONS };
  private validations: Record<string, Validation> = { ...NORMAL_VALIDATIONS };
  private pullRequests: PullRequest[] = [...NORMAL_PULL_REQUESTS];
  private auditEvents: AuditEvent[] = [...NORMAL_AUDIT_EVENTS];
  private metrics: DashboardMetrics = { ...NORMAL_METRICS };
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

  public resetState() {
    this.repositories = JSON.parse(JSON.stringify(NORMAL_REPOSITORIES));
    this.findings = JSON.parse(JSON.stringify(NORMAL_FINDINGS));
    this.remediations = JSON.parse(JSON.stringify(NORMAL_REMEDIATIONS));
    this.validations = JSON.parse(JSON.stringify(NORMAL_VALIDATIONS));
    this.pullRequests = JSON.parse(JSON.stringify(NORMAL_PULL_REQUESTS));
    this.auditEvents = JSON.parse(JSON.stringify(NORMAL_AUDIT_EVENTS));
    this.metrics = JSON.parse(JSON.stringify(NORMAL_METRICS));
    this.notify();
  }
}

export const normalStore = new NormalStore();
