export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export type FindingStatus = 
  | 'OPEN' 
  | 'TRIAGED' 
  | 'REMEDIATING' 
  | 'VALIDATING' 
  | 'VERIFIED' 
  | 'FAILED' 
  | 'HUMAN_REVIEW' 
  | 'MERGED';

export type ValidationStepStatus = 'pending' | 'running' | 'passed' | 'failed' | 'skipped';

export type RemediationStatus = 'CANDIDATE' | 'VALIDATING' | 'VERIFIED' | 'REJECTED' | 'PR_CREATED';

export type PRStatus = 'OPEN' | 'VALIDATING' | 'READY_FOR_REVIEW' | 'APPROVED' | 'MERGED' | 'CLOSED';

export interface Finding {
  id: string;
  repository: string;
  pullRequest: string;
  commitSha: string;
  tool: string;
  ruleId: string;
  title: string;
  message: string;
  severity: Severity;
  confidence: number; // e.g. 96 for 96%
  file: string;
  startLine: number;
  endLine: number;
  cwe: string; // e.g. "CWE-89"
  owasp: string; // e.g. "A03:2021 - Injection"
  introducedByPR: string;
  fixability: 'AUTO_REMEDIABLE' | 'REQUIRES_HUMAN_TRIAGE' | 'MANUAL_ONLY';
  status: FindingStatus;
  evidence: {
    snippet: string;
    vulnerableLine: string;
    contextBefore: string[];
    contextAfter: string[];
    explanation: string;
  };
}

export interface Remediation {
  id: string;
  findingId: string;
  strategy: string;
  model: string;
  confidence: number;
  rootCause: string;
  patch: string; // Unified diff format
  filesChanged: string[];
  testsAdded: string[];
  assumptions: string[];
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  status: RemediationStatus;
}

export interface ValidationStep {
  id: string;
  name: string;
  status: ValidationStepStatus;
  command?: string;
  durationMs?: number;
  logs?: string[];
  errorCount?: number;
}

export interface Validation {
  id: string;
  remediationId: string;
  findingId: string;
  steps: ValidationStep[];
  overallStatus: ValidationStepStatus;
  startedAt: string;
  completedAt?: string;
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  repository: string;
  branch: string;
  targetBranch: string;
  originalPR: string;
  remediationId: string;
  findingId: string;
  status: PRStatus;
  validationStatus: ValidationStepStatus;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  component: 'SCANNER' | 'TRIAGE' | 'REMEDIATION_ENGINE' | 'VALIDATOR' | 'GITHUB_CONNECTOR' | 'POLICY_ENGINE' | 'SIMULATOR';
  action: string;
  status: 'SUCCESS' | 'INFO' | 'WARNING' | 'FAILURE';
  evidence: Record<string, unknown>;
}

export interface Repository {
  id: string;
  name: string;
  owner: string;
  defaultBranch: string;
  securityStatus: 'COMPLIANT' | 'NEEDS_ATTENTION' | 'CRITICAL_RISK';
  openFindingsCount: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  lastScanAt: string;
  policy: string;
}

export interface DashboardMetrics {
  openFindings: number;
  criticalCount: number;
  highCount: number;
  fixCandidates: number;
  validationPassRate: number;
  remediationPRs: number;
}
