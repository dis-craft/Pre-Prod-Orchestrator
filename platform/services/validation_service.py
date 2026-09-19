from typing import Optional
from platform.models.validation import PlatformValidation
from platform.adapters.orchestrator_adapter import orchestrator_adapter, OrchestratorAdapter


class ValidationService:
    """
    Platform Validation Service for Phase P3.
    Encapsulates platform validation querying, evidence extraction, and resource correlation.
    """

    def __init__(self, adapter: Optional[OrchestratorAdapter] = None):
        self.adapter = adapter or orchestrator_adapter

    def get_validation(self, validation_id: str) -> Optional[PlatformValidation]:
        """
        Retrieves platform validation status by validation ID.
        """
        return self.adapter.get_validation(validation_id)

    def get_validation_by_remediation(self, remediation_id: str) -> Optional[PlatformValidation]:
        """
        Retrieves platform validation status for a candidate remediation patch.
        """
        return self.adapter.get_validation_by_remediation(remediation_id)

    def get_validation_by_finding(self, finding_id: str) -> Optional[PlatformValidation]:
        """
        Retrieves platform validation status correlated with a security finding ID.
        """
        return self.adapter.get_validation_by_finding(finding_id)


validation_service = ValidationService()
