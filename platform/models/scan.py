from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class ExternalScanMetadata(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    trigger: str
    captured_at: str = Field(alias="capturedAt")
    workflow_run_id: Optional[str] = Field(default=None, alias="workflowRunId")
    workflow_url: Optional[str] = Field(default=None, alias="workflowUrl")


class RepositoryInfo(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    full_name: str = Field(alias="fullName")
    url: Optional[str] = None
    default_branch: str = Field(default="main", alias="defaultBranch")


class CommitComparison(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    base_commit: str = Field(alias="baseCommit")
    target_commit: str = Field(alias="targetCommit")
    range: str
    method: Optional[str] = None


class CommitAuthor(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None


class CommitInfo(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    before: str
    after: str
    branch: str
    message: str
    author: Optional[CommitAuthor] = None
    committed_at: Optional[str] = Field(default=None, alias="committedAt")


class ChangeSummary(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    files_changed: int = Field(default=0, alias="filesChanged")
    additions: int = 0
    deletions: int = 0
    net_lines: int = Field(default=0, alias="netLines")


class LineRecord(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    type: str = Field(description="added, removed, context")
    old_line: Optional[int] = Field(default=None, alias="oldLine")
    new_line: Optional[int] = Field(default=None, alias="newLine")
    content: str


class ChangedFile(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    path: str
    status: str = Field(description="A, M, D, R")
    additions: int = 0
    deletions: int = 0
    added_lines: List[LineRecord] = Field(default_factory=list, alias="addedLines")
    hunks: List[Dict[str, Any]] = Field(default_factory=list)
    raw_patch: Optional[str] = Field(default=None, alias="rawPatch")


class ExternalScan(BaseModel):
    """
    Typed domain model representing external Pre-prod Tester scan data.
    Source: https://dis-craft.github.io/Pre-prod-tester/data/latest.json
    """
    model_config = ConfigDict(populate_by_name=True)

    schema_version: str = Field(default="1.1", alias="schemaVersion")
    scan: ExternalScanMetadata
    repository: RepositoryInfo
    comparison: CommitComparison
    commit: CommitInfo
    change_summary: ChangeSummary = Field(alias="changeSummary")
    files: List[ChangedFile] = Field(default_factory=list)
    security_status: str = Field(default="UNAVAILABLE", alias="securityStatus", description="UNAVAILABLE, PASSED, FAILED, NO_FINDINGS")
    findings_count: int = Field(default=0, alias="findingsCount")
