import { Repository, Finding, Remediation, Validation, PullRequest, AuditEvent, DashboardMetrics } from '../types';

export const NORMAL_REPOSITORIES: Repository[] = [
  {
    id: 'repo-normal-1',
    name: 'acme-corp/main-service',
    owner: 'acme-corp',
    defaultBranch: 'main',
    securityStatus: 'COMPLIANT',
    openFindingsCount: 0,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    lowCount: 0,
    lastScanAt: '2026-09-19 01:00 UTC',
    policy: 'Strict Compliance',
  },
  {
    id: 'repo-normal-2',
    name: 'acme-corp/auth-api',
    owner: 'acme-corp',
    defaultBranch: 'main',
    securityStatus: 'COMPLIANT',
    openFindingsCount: 0,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    lowCount: 0,
    lastScanAt: '2026-09-19 01:15 UTC',
    policy: 'Strict Compliance',
  },
  {
    id: 'repo-normal-3',
    name: 'acme-corp/gateway-proxy',
    owner: 'acme-corp',
    defaultBranch: 'main',
    securityStatus: 'COMPLIANT',
    openFindingsCount: 0,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    lowCount: 0,
    lastScanAt: '2026-09-19 01:30 UTC',
    policy: 'Standard Compliance',
  },
];

export const NORMAL_FINDINGS: Finding[] = [];

export const NORMAL_REMEDIATIONS: Record<string, Remediation> = {};

export const NORMAL_VALIDATIONS: Record<string, Validation> = {};

export const NORMAL_PULL_REQUESTS: PullRequest[] = [];

export const NORMAL_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: 'AUD-NORM-1001',
    timestamp: '2026-09-19 01:30 UTC',
    actor: 'Pre-Prod SAST Engine',
    component: 'SCANNER',
    action: 'SCHEDULED_SCAN_PASSED',
    status: 'SUCCESS',
    evidence: { repository: 'acme-corp/gateway-proxy', findingsDetected: 0, policyCompliant: true },
  },
  {
    id: 'AUD-NORM-1000',
    timestamp: '2026-09-19 01:15 UTC',
    actor: 'Pre-Prod SAST Engine',
    component: 'SCANNER',
    action: 'SCHEDULED_SCAN_PASSED',
    status: 'SUCCESS',
    evidence: { repository: 'acme-corp/auth-api', findingsDetected: 0, policyCompliant: true },
  },
];

export const NORMAL_METRICS: DashboardMetrics = {
  openFindings: 0,
  criticalCount: 0,
  highCount: 0,
  fixCandidates: 0,
  validationPassRate: 100,
  remediationPRs: 0,
};
