from typing import List
from fastapi import APIRouter
from platform.models.scan import ExternalScan
from platform.models.job import PlatformJob
from platform.services.scan_service import scan_service
from platform.errors import NotFoundError

router = APIRouter(prefix="/api", tags=["External Scans & Jobs"])


@router.get("/scans/latest", response_model=ExternalScan)
def get_latest_scan():
    """
    Get the latest external Pre-prod Tester scan data.
    """
    return scan_service.get_latest_scan()


@router.get("/jobs", response_model=List[PlatformJob])
def list_jobs():
    """
    List workflow execution jobs derived from scan executions.
    """
    return scan_service.get_scan_jobs()


@router.get("/jobs/{job_id}", response_model=PlatformJob)
def get_job_detail(job_id: str):
    """
    Get detail of a specific workflow execution job by ID.
    """
    job = scan_service.get_job_by_id(job_id)
    if not job:
        raise NotFoundError(message=f"Job '{job_id}' not found.")
    return job
