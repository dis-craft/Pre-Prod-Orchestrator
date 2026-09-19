from typing import Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class PlatformSecurityFinding(BaseModel):
    """
    Platform representation of a security finding, conforming to contracts/finding.schema.json
    and enriched with platform/workflow metadata.
    """
    model_config = ConfigDict(populate_by_name=True)

    id: str
    tool: str
    rule: str
    severity: str = Field(description="INFO, LOW, MEDIUM, HIGH, or CRITICAL")
    file: str
    line: int = Field(ge=1)
    end_line: Optional[int] = Field(default=None, alias="endLine", ge=1)
    message: str
    confidence: float = Field(ge=0.0, le=1.0)
    fixability: Optional[str] = Field(default="UNKNOWN")
    repository: Optional[str] = None
    cwe: Optional[str] = None
    status: Optional[str] = Field(default="OPEN")
    metadata: Dict[str, Any] = Field(default_factory=dict)


class WorkflowStatus(BaseModel):
    """
    Platform read model for finding workflow lifecycle status.
    Reflects upstream orchestrator state without introducing a competing state machine.
    """
    model_config = ConfigDict(populate_by_name=True)

    finding_id: str = Field(alias="findingId")
    state: str = Field(description="Workflow state (e.g. DETECTED, REMEDIATION_STARTED, VALIDATING, VERIFIED, OPEN)")
    remediation_id: Optional[str] = Field(default=None, alias="remediationId")
    validation_id: Optional[str] = Field(default=None, alias="validationId")
    pull_request_id: Optional[str] = Field(default=None, alias="pullRequestId")
    updated_at: str = Field(alias="updatedAt")


class FindingWithWorkflow(BaseModel):
    """
    Combined finding detail view including workflow status.
    """
    finding: PlatformSecurityFinding
    workflow: WorkflowStatus
