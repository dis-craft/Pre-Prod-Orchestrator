export interface ApiFindingEvidence {
  snippet: string;
  vulnerableLine: string;
  contextBefore?: string[];
  contextAfter?: string[];
  explanation: string;
}

export interface ApiSecurityFinding {
  id: string;
  repository: string;
  pullRequest: string;
  commitSha: string;
  tool: string;
  ruleId: string;
  title: string;
  message: string;
  severity: string;
  confidence: number;
  file: string;
  startLine: number;
  endLine: number;
  cwe: string;
  owasp: string;
  introducedByPR: string;
  fixability: string;
  status: string;
  evidence: ApiFindingEvidence;
}

export interface ApiRemediationResult {
  id: string;
  findingId: string;
  strategy: string;
  model: string;
  confidence: number;
  rootCause: string;
  patch: string;
  filesChanged?: string[];
  testsAdded?: string[];
  assumptions?: string[];
  risk: string;
  status: string;
}

export interface ApiValidationStep {
  id: string;
  name: string;
  status: string;
  command?: string;
  durationMs?: number;
  logs?: string[];
  errorCount?: number;
}

export interface ApiValidation {
  id: string;
  remediationId: string;
  findingId: string;
  steps: ApiValidationStep[];
  overallStatus: string;
  startedAt: string;
  completedAt?: string;
}

export interface ApiPullRequest {
  id: string;
  number: number;
  title: string;
  repository: string;
  branch: string;
  targetBranch: string;
  originalPR: string;
  remediationId: string;
  findingId: string;
  status: string;
  validationStatus: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiAuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  component: string;
  action: string;
  status: string;
  evidence: Record<string, unknown>;
}

export interface ApiRepository {
  id: string;
  name: string;
  owner: string;
  defaultBranch: string;
  securityStatus: string;
  openFindingsCount: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  lastScanAt: string;
  policy: string;
}

export interface ApiDashboardMetrics {
  openFindings: number;
  criticalCount: number;
  highCount: number;
  fixCandidates: number;
  validationPassRate: number;
  remediationPRs: number;
}
