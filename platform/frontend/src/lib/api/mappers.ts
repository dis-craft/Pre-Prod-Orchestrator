import { 
  Finding, 
  Remediation, 
  Validation, 
  ValidationStep, 
  PullRequest, 
  AuditEvent, 
  Repository, 
  DashboardMetrics,
  Severity,
  FindingStatus,
  RemediationStatus,
  ValidationStepStatus,
  PRStatus
} from '../types';
import {
  ApiSecurityFinding,
  ApiRemediationResult,
  ApiValidation,
  ApiValidationStep,
  ApiPullRequest,
  ApiAuditEvent,
  ApiRepository,
  ApiDashboardMetrics
} from './types';

export function mapSeverity(severity: string): Severity {
  const upper = (severity || '').toUpperCase();
  if (upper === 'CRITICAL') return 'CRITICAL';
  if (upper === 'HIGH') return 'HIGH';
  if (upper === 'MEDIUM') return 'MEDIUM';
  if (upper === 'LOW') return 'LOW';
  return 'INFO';
}

export function mapFindingStatus(status: string): FindingStatus {
  const upper = (status || '').toUpperCase();
  const validStatuses: FindingStatus[] = [
    'OPEN', 'TRIAGED', 'REMEDIATING', 'VALIDATING', 
    'VERIFIED', 'FAILED', 'HUMAN_REVIEW', 'MERGED'
  ];
  if (validStatuses.includes(upper as FindingStatus)) {
    return upper as FindingStatus;
  }
  return 'OPEN';
}

export function mapFixability(fixability: string): 'AUTO_REMEDIABLE' | 'REQUIRES_HUMAN_TRIAGE' | 'MANUAL_ONLY' {
  const upper = (fixability || '').toUpperCase();
  if (upper === 'AUTO_REMEDIABLE' || upper === 'AUTO' || upper === 'AI_ASSISTED') {
    return 'AUTO_REMEDIABLE';
  }
  if (upper === 'REQUIRES_HUMAN_TRIAGE' || upper === 'HUMAN_ONLY') {
    return 'REQUIRES_HUMAN_TRIAGE';
  }
  return 'MANUAL_ONLY';
}

export function mapFinding(dto: ApiSecurityFinding): Finding {
  return {
    id: dto.id,
    repository: dto.repository,
    pullRequest: dto.pullRequest || '',
    commitSha: dto.commitSha || '',
    tool: dto.tool || 'Scanner',
    ruleId: dto.ruleId || '',
    title: dto.title || dto.message || 'Security Finding',
    message: dto.message || '',
    severity: mapSeverity(dto.severity),
    confidence: typeof dto.confidence === 'number' 
      ? (dto.confidence <= 1 ? Math.round(dto.confidence * 100) : dto.confidence) 
      : 90,
    file: dto.file || '',
    startLine: Number(dto.startLine) || 1,
    endLine: Number(dto.endLine) || Number(dto.startLine) || 1,
    cwe: dto.cwe || 'CWE-Other',
    owasp: dto.owasp || 'A03:2021 - Injection',
    introducedByPR: dto.introducedByPR || dto.pullRequest || '',
    fixability: mapFixability(dto.fixability),
    status: mapFindingStatus(dto.status),
    evidence: {
      snippet: dto.evidence?.snippet || '',
      vulnerableLine: dto.evidence?.vulnerableLine || dto.evidence?.snippet || '',
      contextBefore: dto.evidence?.contextBefore || [],
      contextAfter: dto.evidence?.contextAfter || [],
      explanation: dto.evidence?.explanation || dto.message || '',
    }
  };
}

export function mapRemediationStatus(status: string): RemediationStatus {
  const upper = (status || '').toUpperCase();
  if (upper === 'PROPOSED' || upper === 'CANDIDATE') return 'CANDIDATE';
  if (upper === 'VALIDATING') return 'VALIDATING';
  if (upper === 'VALIDATED' || upper === 'VERIFIED') return 'VERIFIED';
  if (upper === 'REJECTED') return 'REJECTED';
  if (upper === 'PR_CREATED') return 'PR_CREATED';
  return 'CANDIDATE';
}

export function mapRemediation(dto: ApiRemediationResult): Remediation {
  return {
    id: dto.id,
    findingId: dto.findingId,
    strategy: dto.strategy || 'Automated Patch',
    model: dto.model || 'Security LLM',
    confidence: typeof dto.confidence === 'number' 
      ? (dto.confidence <= 1 ? Math.round(dto.confidence * 100) : dto.confidence) 
      : 95,
    rootCause: dto.rootCause || '',
    patch: dto.patch || '',
    filesChanged: dto.filesChanged || [],
    testsAdded: dto.testsAdded || [],
    assumptions: dto.assumptions || [],
    risk: (dto.risk?.toUpperCase() as 'LOW' | 'MEDIUM' | 'HIGH') || 'LOW',
    status: mapRemediationStatus(dto.status),
  };
}

export function mapValidationStepStatus(status: string): ValidationStepStatus {
  const lower = (status || '').toLowerCase();
  if (lower === 'running') return 'running';
  if (lower === 'passed' || lower === 'success') return 'passed';
  if (lower === 'failed' || lower === 'error') return 'failed';
  if (lower === 'skipped') return 'skipped';
  return 'pending';
}

export function mapValidationStep(dto: ApiValidationStep): ValidationStep {
  return {
    id: dto.id,
    name: dto.name,
    status: mapValidationStepStatus(dto.status),
    command: dto.command,
    durationMs: dto.durationMs,
    logs: dto.logs,
    errorCount: dto.errorCount ?? 0,
  };
}

export function mapValidation(dto: ApiValidation): Validation {
  return {
    id: dto.id,
    remediationId: dto.remediationId,
    findingId: dto.findingId,
    steps: (dto.steps || []).map(mapValidationStep),
    overallStatus: mapValidationStepStatus(dto.overallStatus),
    startedAt: dto.startedAt || new Date().toISOString(),
    completedAt: dto.completedAt,
  };
}

export function mapPRStatus(status: string): PRStatus {
  const upper = (status || '').toUpperCase();
  if (upper === 'OPEN') return 'OPEN';
  if (upper === 'VALIDATING') return 'VALIDATING';
  if (upper === 'READY_FOR_REVIEW') return 'READY_FOR_REVIEW';
  if (upper === 'APPROVED') return 'APPROVED';
  if (upper === 'MERGED') return 'MERGED';
  if (upper === 'CLOSED') return 'CLOSED';
  return 'OPEN';
}

export function mapPullRequest(dto: ApiPullRequest): PullRequest {
  return {
    id: dto.id,
    number: dto.number,
    title: dto.title,
    repository: dto.repository,
    branch: dto.branch,
    targetBranch: dto.targetBranch || 'main',
    originalPR: dto.originalPR || '',
    remediationId: dto.remediationId,
    findingId: dto.findingId,
    status: mapPRStatus(dto.status),
    validationStatus: mapValidationStepStatus(dto.validationStatus),
    url: dto.url || '#',
    createdAt: dto.createdAt || new Date().toISOString(),
    updatedAt: dto.updatedAt || new Date().toISOString(),
  };
}

export function mapAuditEvent(dto: ApiAuditEvent): AuditEvent {
  return {
    id: dto.id,
    timestamp: dto.timestamp || new Date().toISOString(),
    actor: dto.actor || 'System',
    component: (dto.component as AuditEvent['component']) || 'SCANNER',
    action: dto.action || 'EVENT',
    status: (dto.status as AuditEvent['status']) || 'INFO',
    evidence: dto.evidence || {},
  };
}

export function mapRepository(dto: ApiRepository): Repository {
  return {
    id: dto.id,
    name: dto.name,
    owner: dto.owner,
    defaultBranch: dto.defaultBranch || 'main',
    securityStatus: (dto.securityStatus as Repository['securityStatus']) || 'COMPLIANT',
    openFindingsCount: dto.openFindingsCount ?? 0,
    criticalCount: dto.criticalCount ?? 0,
    highCount: dto.highCount ?? 0,
    mediumCount: dto.mediumCount ?? 0,
    lowCount: dto.lowCount ?? 0,
    lastScanAt: dto.lastScanAt || new Date().toISOString(),
    policy: dto.policy || 'Standard Security Policy',
  };
}

export function mapDashboardMetrics(dto: ApiDashboardMetrics): DashboardMetrics {
  return {
    openFindings: dto.openFindings ?? 0,
    criticalCount: dto.criticalCount ?? 0,
    highCount: dto.highCount ?? 0,
    fixCandidates: dto.fixCandidates ?? 0,
    validationPassRate: dto.validationPassRate ?? 100,
    remediationPRs: dto.remediationPRs ?? 0,
  };
}
