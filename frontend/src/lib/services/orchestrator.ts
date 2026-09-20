import { 
  Finding, 
  Remediation, 
  Validation, 
  PullRequest, 
  AuditEvent, 
  Repository, 
  DashboardMetrics 
} from '../types';
import { IOrchestratorAdapter } from '../adapters/adapterInterface';
import { demoAdapter } from '../adapters/demoAdapter';
import { apiAdapter } from '../adapters/apiAdapter';
import { liveScanAdapter } from '../adapters/liveScanAdapter';

export type AppMode = 'normal' | 'demo';

export interface IOrchestratorService {
  getMode(): AppMode;
  setMode(mode: AppMode): void;
  isDemoMode(): boolean;
  getMetrics(): Promise<DashboardMetrics>;
  getRepositories(): Promise<Repository[]>;
  getRepositoryByName(name: string): Promise<Repository | undefined>;
  getFindings(): Promise<Finding[]>;
  getFindingById(id: string): Promise<Finding | undefined>;
  getRemediationByFindingId(findingId: string): Promise<Remediation | undefined>;
  getRemediationById(id: string): Promise<Remediation | undefined>;
  getValidationByRemediationId(remediationId: string): Promise<Validation | undefined>;
  getValidationById(id: string): Promise<Validation | undefined>;
  getPullRequests(): Promise<PullRequest[]>;
  getPullRequestById(id: string): Promise<PullRequest | undefined>;
  getAuditEvents(): Promise<AuditEvent[]>;
  startRemediation(findingId: string): Promise<Remediation>;
  runValidation(validationId: string, onStepUpdate?: (stepId: string, status: string) => void): Promise<Validation>;
  resetDemoData(): Promise<void>;
  subscribe(listener: () => void): () => void;
}

export class OrchestratorService implements IOrchestratorService {
  private mode: AppMode = 'normal';
  private listeners: Set<() => void> = new Set();
  private unsubscribeDemo: (() => void) | null = null;
  private unsubscribeApi: (() => void) | null = null;

  constructor() {
    this.unsubscribeDemo = demoAdapter.subscribe ? demoAdapter.subscribe(() => this.notify()) : null;
    this.unsubscribeApi = apiAdapter.subscribe ? apiAdapter.subscribe(() => this.notify()) : null;
  }

  public getMode(): AppMode {
    return this.mode;
  }

  public setMode(mode: AppMode): void {
    if (this.mode !== mode) {
      this.mode = mode;
      this.notify();
    }
  }

  public isDemoMode(): boolean {
    return this.mode === 'demo';
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  private get activeAdapter(): IOrchestratorAdapter {
    if (this.mode === 'demo') return demoAdapter;
    // When no backend URL is configured, consume the published Pre-Prod Tester
    // scan directly. If an API URL is configured, keep the full backend adapter.
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
    const isUsableApiUrl = apiUrl !== undefined && apiUrl.length > 0 && !/localhost|127\.0\.0\.1/i.test(apiUrl);
    return isUsableApiUrl ? apiAdapter : liveScanAdapter;
  }

  public async getMetrics(): Promise<DashboardMetrics> {
    return this.activeAdapter.getMetrics();
  }

  public async getRepositories(): Promise<Repository[]> {
    return this.activeAdapter.getRepositories();
  }

  public async getRepositoryByName(name: string): Promise<Repository | undefined> {
    return this.activeAdapter.getRepositoryByName(name);
  }

  public async getFindings(): Promise<Finding[]> {
    return this.activeAdapter.getFindings();
  }

  public async getFindingById(id: string): Promise<Finding | undefined> {
    return this.activeAdapter.getFindingById(id);
  }

  public async getRemediationByFindingId(findingId: string): Promise<Remediation | undefined> {
    return this.activeAdapter.getRemediationByFindingId(findingId);
  }

  public async getRemediationById(id: string): Promise<Remediation | undefined> {
    return this.activeAdapter.getRemediationById(id);
  }

  public async getValidationByRemediationId(remediationId: string): Promise<Validation | undefined> {
    return this.activeAdapter.getValidationByRemediationId(remediationId);
  }

  public async getValidationById(id: string): Promise<Validation | undefined> {
    return this.activeAdapter.getValidationById(id);
  }

  public async getPullRequests(): Promise<PullRequest[]> {
    return this.activeAdapter.getPullRequests();
  }

  public async getPullRequestById(id: string): Promise<PullRequest | undefined> {
    return this.activeAdapter.getPullRequestById(id);
  }

  public async getAuditEvents(): Promise<AuditEvent[]> {
    return this.activeAdapter.getAuditEvents();
  }

  public async startRemediation(findingId: string): Promise<Remediation> {
    return this.activeAdapter.startRemediation(findingId);
  }

  public async runValidation(validationId: string, onStepUpdate?: (stepId: string, status: string) => void): Promise<Validation> {
    return this.activeAdapter.runValidation(validationId, onStepUpdate);
  }

  public async resetDemoData(): Promise<void> {
    if (this.mode === 'demo') {
      await demoAdapter.resetState();
    } else {
      await apiAdapter.resetState();
    }
  }
}

export const orchestratorService: IOrchestratorService = new OrchestratorService();
