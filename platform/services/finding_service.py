from typing import List, Optional
from platform.models.finding import PlatformSecurityFinding, WorkflowStatus, FindingWithWorkflow
from platform.adapters.orchestrator_adapter import orchestrator_adapter, OrchestratorAdapter


class FindingService:
    """
    Platform Finding Service.
    Encapsulates platform query logic for findings and security workflow status.
    """

    def __init__(self, adapter: Optional[OrchestratorAdapter] = None):
        self.adapter = adapter or orchestrator_adapter

    def list_findings(
        self,
        severity: Optional[str] = None,
        status: Optional[str] = None,
        repository: Optional[str] = None
    ) -> List[PlatformSecurityFinding]:
        return self.adapter.get_findings(
            severity=severity,
            status=status,
            repository=repository
        )

    def get_finding(self, finding_id: str) -> Optional[PlatformSecurityFinding]:
        return self.adapter.get_finding(finding_id)

    def get_workflow_status(self, finding_id: str) -> Optional[WorkflowStatus]:
        return self.adapter.get_workflow_status(finding_id)

    def get_finding_with_workflow(self, finding_id: str) -> Optional[FindingWithWorkflow]:
        finding = self.get_finding(finding_id)
        if not finding:
            return None
        workflow = self.get_workflow_status(finding_id)
        if not workflow:
            return None
        return FindingWithWorkflow(finding=finding, workflow=workflow)


finding_service = FindingService()
