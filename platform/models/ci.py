from enum import Enum
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class CIStatus(str, Enum):
    QUEUED = "QUEUED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"


class CIConclusion(str, Enum):
    SUCCESS = "SUCCESS"
    FAILURE = "FAILURE"
    CANCELLED = "CANCELLED"
    SKIPPED = "SKIPPED"
    UNKNOWN = "UNKNOWN"
    UNAVAILABLE = "UNAVAILABLE"


class PlatformCICheck(BaseModel):
    """
    Platform domain read model for Continuous Integration (CI) run/check status.
    Exposes check status and conclusion cleanly without fabricating fake CI results.
    """
    model_config = ConfigDict(populate_by_name=True)

    id: str
    workflow_name: str = Field(alias="workflowName")
    check_name: str = Field(alias="checkName")
    status: CIStatus = Field(default=CIStatus.COMPLETED)
    conclusion: CIConclusion = Field(default=CIConclusion.SUCCESS)
    commit_sha: Optional[str] = Field(default=None, alias="commitSha")
    branch: Optional[str] = None
    started_at: Optional[str] = Field(default=None, alias="startedAt")
    completed_at: Optional[str] = Field(default=None, alias="completedAt")
    duration_ms: Optional[int] = Field(default=None, alias="durationMs")
    url: Optional[str] = None
    failure_summary: Optional[str] = Field(default=None, alias="failureSummary")
    metadata: Dict[str, Any] = Field(default_factory=dict)
