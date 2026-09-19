import { IOrchestratorAdapter } from './adapterInterface';
import { 
  Finding, 
  Remediation, 
  Validation, 
  PullRequest, 
  AuditEvent, 
  Repository, 
  DashboardMetrics 
} from '../types';
import { demoStore } from '../demo/state';

export class DemoAdapter implements IOrchestratorAdapter {
  public subscribe(listener: () => void): () => void {
    return demoStore.subscribe(listener);
  }

  public async getMetrics(): Promise<DashboardMetrics> {
    return demoStore.getMetrics();
  }

  public async getRepositories(): Promise<Repository[]> {
    return demoStore.getRepositories();
  }

  public async getRepositoryByName(name: string): Promise<Repository | undefined> {
    return demoStore.getRepositoryByName(name);
  }

  public async getFindings(): Promise<Finding[]> {
    return demoStore.getFindings();
  }

  public async getFindingById(id: string): Promise<Finding | undefined> {
    return demoStore.getFindingById(id);
  }

  public async getRemediationByFindingId(findingId: string): Promise<Remediation | undefined> {
    return demoStore.getRemediationByFindingId(findingId);
  }

  public async getRemediationById(id: string): Promise<Remediation | undefined> {
    return demoStore.getRemediationById(id);
  }

  public async getValidationByRemediationId(remediationId: string): Promise<Validation | undefined> {
    return demoStore.getValidationByRemediationId(remediationId);
  }

  public async getValidationById(id: string): Promise<Validation | undefined> {
    return demoStore.getValidationById(id);
  }

  public async getPullRequests(): Promise<PullRequest[]> {
    return demoStore.getPullRequests();
  }

  public async getPullRequestById(id: string): Promise<PullRequest | undefined> {
    return demoStore.getPullRequestById(id);
  }

  public async getAuditEvents(): Promise<AuditEvent[]> {
    return demoStore.getAuditEvents();
  }

  public async startRemediation(findingId: string): Promise<Remediation> {
    return demoStore.startRemediation(findingId);
  }

  public async runValidation(
    validationId: string, 
    onStepUpdate?: (stepId: string, status: string) => void
  ): Promise<Validation> {
    return demoStore.runValidationSimulation(validationId, onStepUpdate);
  }

  public async resetState(): Promise<void> {
    demoStore.resetState();
  }
}

export const demoAdapter = new DemoAdapter();
