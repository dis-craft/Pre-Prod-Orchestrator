from typing import List
from fastapi import APIRouter
from platform.models.workflow import PlatformWorkflow
from platform.services.workflow_service import workflow_service
from platform.errors import NotFoundError

router = APIRouter(prefix="/api/workflows", tags=["Unified Workflow"])


@router.get("", response_model=List[PlatformWorkflow])
def list_workflows():
    """
    List unified remediation workflow read models for active security findings.
    """
    return workflow_service.get_workflows()


@router.get("/{workflow_id}", response_model=PlatformWorkflow)
def get_workflow_detail(workflow_id: str):
    """
    Get detailed unified workflow state by Workflow ID (e.g. WF-FIND-PROD-001).
    """
    wf = workflow_service.get_workflow_by_id(workflow_id)
    if not wf:
        raise NotFoundError(message=f"Workflow '{workflow_id}' not found.")
    return wf


@router.get("/finding/{finding_id}", response_model=PlatformWorkflow)
def get_workflow_by_finding(finding_id: str):
    """
    Get unified workflow state associated with a specific Finding ID.
    """
    wf = workflow_service.get_workflow_by_finding(finding_id)
    if not wf:
        raise NotFoundError(message=f"Workflow for finding '{finding_id}' not found.")
    return wf
