from enum import Enum
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, ConfigDict

from platform.models.finding import PlatformSecurityFinding
from platform.models.validation import PlatformValidation
from platform.models.ci import PlatformCICheck
from platform.models.evidence import PlatformEvidence


class WorkflowState(str, Enum):
    FINDING_DETECTED = "FINDING_DETECTED"
    TRIAGED = "TRIAGED"
    REMEDIATION_AVAILABLE = "REMEDIATION_AVAILABLE"
    VALIDATION_RUNNING = "VALIDATION_RUNNING"
    VALIDATION_PASSED = "VALIDATION_PASSED"
    VALIDATION_FAILED = "VALIDATION_FAILED"
    CI_RUNNING = "CI_RUNNING"
    CI_PASSED = "CI_PASSED"
    CI_FAILED = "CI_FAILED"
    PR_OPEN = "PR_OPEN"
    HUMAN_REVIEW = "HUMAN_REVIEW"
    MERGED = "MERGED"
    UNKNOWN = "UNKNOWN"


class PlatformWorkflow(BaseModel):
    """
    Unified Platform Read Model for Remediation & Security Workflows.
    Composes finding, remediation, validation, CI, evidence, and PR state into a single, correlated read model.
    """
    model_config = ConfigDict(populate_by_name=True)

    workflow_id: str = Field(alias="workflowId")
    repository: str
    commit_sha: Optional[str] = Field(default=None, alias="commitSha")

    finding: Optional[PlatformSecurityFinding] = None
    remediation: Optional[Dict[str, Any]] = None
    validation: Optional[PlatformValidation] = None
    ci: List[PlatformCICheck] = Field(default_factory=list)
    evidence: List[PlatformEvidence] = Field(default_factory=list)
    pull_request: Optional[Dict[str, Any]] = Field(default=None, alias="pullRequest")

    overall_status: WorkflowState = Field(default=WorkflowState.FINDING_DETECTED, alias="overallStatus")

    created_at: str = Field(alias="createdAt")
    updated_at: str = Field(alias="updatedAt")
