from enum import Enum
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict
from platform.models.validation import ValidationEvidence


class EvidenceType(str, Enum):
    TEST_REPORT = "TEST_REPORT"
    SECURITY_SCAN = "SECURITY_SCAN"
    CI_RESULT = "CI_RESULT"
    DIFF = "DIFF"
    VALIDATION_OUTPUT = "VALIDATION_OUTPUT"
    ARTIFACT = "ARTIFACT"
    LOG_REFERENCE = "LOG_REFERENCE"


class PlatformEvidence(BaseModel):
    """
    Platform domain read model for structured validation and workflow evidence.
    Ensures all metadata and content references are sanitized to prevent secret leaks.
    """
    model_config = ConfigDict(populate_by_name=True)

    id: str
    type: EvidenceType
    source: str = Field(description="Originating subsystem (e.g. sandbox, scanner, CI)")
    title: str
    created_at: str = Field(alias="createdAt")
    commit_sha: Optional[str] = Field(default=None, alias="commitSha")
    reference: Optional[str] = Field(default=None, description="Safe URL, file path, or log ID reference")
    metadata: Dict[str, Any] = Field(default_factory=dict)

    @classmethod
    def create_sanitized(
        cls,
        id: str,
        type: EvidenceType,
        source: str,
        title: str,
        created_at: str,
        commit_sha: Optional[str] = None,
        reference: Optional[str] = None,
        raw_metadata: Optional[Dict[str, Any]] = None
    ) -> "PlatformEvidence":
        sanitized_meta = ValidationEvidence.sanitize_evidence_data(raw_metadata or {})
        return cls(
            id=id,
            type=type,
            source=source,
            title=title,
            createdAt=created_at,
            commitSha=commit_sha,
            reference=reference,
            metadata=sanitized_meta
        )
