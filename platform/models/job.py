from enum import Enum
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class JobStatus(str, Enum):
    QUEUED = "QUEUED"
    RUNNING = "RUNNING"
    SUCCEEDED = "SUCCEEDED"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"


class PlatformJob(BaseModel):
    """
    Platform read model for long-running workflow work (Phase 1 / Phase P2 domain contract).
    Does NOT require Redis or background queue infrastructure.
    """
    model_config = ConfigDict(populate_by_name=True)

    id: str
    type: str = Field(description="SCAN, REMEDIATION, VALIDATION, RESCAN, PR_CREATION, CI")
    status: JobStatus = Field(default=JobStatus.SUCCEEDED)
    repository: str
    commit_sha: Optional[str] = Field(default=None, alias="commitSha")
    started_at: str = Field(alias="startedAt")
    completed_at: Optional[str] = Field(default=None, alias="completedAt")
    error: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)
