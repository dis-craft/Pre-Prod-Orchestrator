from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class FindingEvidence(BaseModel):
    snippet: str
    vulnerableLine: str
    contextBefore: List[str] = Field(default_factory=list)
    contextAfter: List[str] = Field(default_factory=list)
    explanation: str


class SecurityFinding(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    repository: str
    pull_request: str = Field(alias="pullRequest")
    commit_sha: str = Field(alias="commitSha")
    tool: str
    rule_id: str = Field(alias="ruleId")
    title: str
    message: str
    severity: str
    confidence: float
    file: str
    start_line: int = Field(alias="startLine")
    end_line: int = Field(alias="endLine")
    cwe: str
    owasp: str
    introduced_by_pr: str = Field(alias="introducedByPR")
    fixability: str
    status: str
    evidence: FindingEvidence


class RemediationResult(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    finding_id: str = Field(alias="findingId")
    strategy: str
    model: str
    confidence: float
    root_cause: str = Field(alias="rootCause")
    patch: str
    files_changed: List[str] = Field(alias="filesChanged", default_factory=list)
    tests_added: List[str] = Field(alias="testsAdded", default_factory=list)
    assumptions: List[str] = Field(default_factory=list)
    risk: str
    status: str


class ValidationStep(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    name: str
    status: str
    command: Optional[str] = None
    duration_ms: Optional[int] = Field(default=None, alias="durationMs")
    logs: Optional[List[str]] = None
    error_count: Optional[int] = Field(default=0, alias="errorCount")


class Validation(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    remediation_id: str = Field(alias="remediationId")
    finding_id: str = Field(alias="findingId")
    steps: List[ValidationStep] = Field(default_factory=list)
    overall_status: str = Field(alias="overallStatus")
    started_at: str = Field(alias="startedAt")
    completed_at: Optional[str] = Field(default=None, alias="completedAt")


class PullRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    number: int
    title: str
    repository: str
    branch: str
    target_branch: str = Field(alias="targetBranch")
    original_pr: str = Field(alias="originalPR")
    remediation_id: str = Field(alias="remediationId")
    finding_id: str = Field(alias="findingId")
    status: str
    validation_status: str = Field(alias="validationStatus")
    url: str
    created_at: str = Field(alias="createdAt")
    updated_at: str = Field(alias="updatedAt")


class AuditEvent(BaseModel):
    id: str
    timestamp: str
    actor: str
    component: str
    action: str
    status: str
    evidence: Dict[str, Any] = Field(default_factory=dict)


class Repository(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    name: str
    owner: str
    default_branch: str = Field(alias="defaultBranch")
    security_status: str = Field(alias="securityStatus")
    open_findings_count: int = Field(alias="openFindingsCount")
    critical_count: int = Field(alias="criticalCount")
    high_count: int = Field(alias="highCount")
    medium_count: int = Field(alias="mediumCount")
    low_count: int = Field(alias="lowCount")
    last_scan_at: str = Field(alias="lastScanAt")
    policy: str


class DashboardMetrics(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    open_findings: int = Field(alias="openFindings")
    critical_count: int = Field(alias="criticalCount")
    high_count: int = Field(alias="highCount")
    fix_candidates: int = Field(alias="fixCandidates")
    validation_pass_rate: float = Field(alias="validationPassRate")
    remediation_prs: int = Field(alias="remediationPRs")


class StartRemediationRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    finding_id: str = Field(alias="findingId")


class HealthResponse(BaseModel):
    status: str
    version: str
    timestamp: str
