import { 
  Finding, 
  Remediation, 
  Validation, 
  PullRequest, 
  AuditEvent, 
  Repository, 
  DashboardMetrics 
} from '../types';

export interface IOrchestratorAdapter {
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
  resetState(): Promise<void>;
  subscribe?(listener: () => void): () => void;
}
