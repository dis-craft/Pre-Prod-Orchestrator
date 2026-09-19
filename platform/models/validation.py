from enum import Enum
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class ValidationStatusEnum(str, Enum):
    PENDING = "PENDING"
    RUNNING = "RUNNING"
    PASSED = "PASSED"
    FAILED = "FAILED"


class ValidationTestResult(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    name: str
    status: str = Field(description="passed, failed, pending, skipped")
    duration_ms: Optional[int] = Field(default=None, alias="durationMs")
    details: Optional[str] = None


class SecurityScanResult(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    status: str = Field(description="PASSED, FAILED, PENDING")
    scanner: str
    findings_count: int = Field(default=0, alias="findingsCount")
    timestamp: Optional[str] = None
    details: Optional[str] = None


class ValidationEvidence(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    test_summary: Optional[str] = Field(default=None, alias="testSummary")
    security_scan_summary: Optional[str] = Field(default=None, alias="securityScanSummary")
    artifacts: List[str] = Field(default_factory=list)
    timestamps: Dict[str, str] = Field(default_factory=dict)
    execution_metadata: Dict[str, Any] = Field(default_factory=dict, alias="executionMetadata")

    @classmethod
    def sanitize_evidence_data(cls, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Sanitizes raw evidence dictionaries to prevent accidental leak of credentials,
        tokens, environment variables, or secret keys.
        """
        forbidden_keywords = {"secret", "token", "password", "api_key", "apikey", "credential", "auth", "private_key"}
        sanitized: Dict[str, Any] = {}
        
        for k, v in raw_data.items():
            k_lower = k.lower()
            if any(forbidden in k_lower for forbidden in forbidden_keywords):
                sanitized[k] = "[REDACTED_SECRET]"
            elif isinstance(v, dict):
                sanitized[k] = cls.sanitize_evidence_data(v)
            else:
                sanitized[k] = v
        return sanitized


class PlatformValidation(BaseModel):
    """
    Platform read model for Remediation Validation Status.
    Represents actual validation execution state and evidence received from upstream services.
    """
    model_config = ConfigDict(populate_by_name=True)

    id: str
    remediation_id: str = Field(alias="remediationId")
    finding_id: Optional[str] = Field(default=None, alias="findingId")
    status: ValidationStatusEnum = Field(default=ValidationStatusEnum.PENDING)
    tests: List[ValidationTestResult] = Field(default_factory=list)
    security_scan: Optional[SecurityScanResult] = Field(default=None, alias="securityScan")
    started_at: Optional[str] = Field(default=None, alias="startedAt")
    completed_at: Optional[str] = Field(default=None, alias="completedAt")
    evidence: Optional[ValidationEvidence] = None

    def can_transition_to(self, new_status: ValidationStatusEnum) -> bool:
        """
        Validates state machine transitions:
        PENDING -> RUNNING -> PASSED or FAILED
        """
        valid_transitions = {
            ValidationStatusEnum.PENDING: {ValidationStatusEnum.RUNNING},
            ValidationStatusEnum.RUNNING: {ValidationStatusEnum.PASSED, ValidationStatusEnum.FAILED},
            ValidationStatusEnum.PASSED: set(),
            ValidationStatusEnum.FAILED: set()
        }
        return new_status in valid_transitions.get(self.status, set())
