from fastapi import APIRouter
from platform.models.validation import PlatformValidation
from platform.services.validation_service import validation_service
from platform.errors import NotFoundError

router = APIRouter(tags=["Validation Status"])


@router.get("/api/validations/{validation_id}", response_model=PlatformValidation)
def get_validation_detail(validation_id: str):
    """
    Get validation status and evidence by Validation ID.
    """
    validation = validation_service.get_validation(validation_id)
    if not validation:
        raise NotFoundError(message=f"Validation '{validation_id}' not found.")
    return validation


@router.get("/api/remediations/{remediation_id}/validation", response_model=PlatformValidation)
def get_validation_by_remediation(remediation_id: str):
    """
    Get validation status and evidence for a specific Remediation ID.
    """
    validation = validation_service.get_validation_by_remediation(remediation_id)
    if not validation:
        raise NotFoundError(message=f"Validation for remediation '{remediation_id}' not found.")
    return validation


@router.get("/api/findings/{finding_id}/validation", response_model=PlatformValidation)
def get_validation_by_finding(finding_id: str):
    """
    Get validation status and evidence associated with a Finding ID.
    """
    validation = validation_service.get_validation_by_finding(finding_id)
    if not validation:
        raise NotFoundError(message=f"Validation for finding '{finding_id}' not found.")
    return validation
