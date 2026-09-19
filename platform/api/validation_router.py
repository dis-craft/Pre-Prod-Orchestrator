from typing import List, Optional
from fastapi import APIRouter
from platform.models.validation import PlatformValidation, ValidationTestResult, SecurityScanResult
from platform.models.evidence import PlatformEvidence
from platform.services.validation_service import validation_service
from platform.services.evidence_service import evidence_service
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


@router.get("/api/validations/{validation_id}/tests", response_model=List[ValidationTestResult])
def get_validation_tests(validation_id: str):
    """
    Get individual test step results for a specific Validation ID.
    """
    val = validation_service.get_validation(validation_id)
    if not val:
        raise NotFoundError(message=f"Validation '{validation_id}' not found.")
    return val.tests


@router.get("/api/validations/{validation_id}/security-scan", response_model=SecurityScanResult)
def get_validation_security_scan(validation_id: str):
    """
    Get security re-scan result associated with a specific Validation ID.
    """
    val = validation_service.get_validation(validation_id)
    if not val or not val.security_scan:
        raise NotFoundError(message=f"Security scan report for validation '{validation_id}' not found or unavailable.")
    return val.security_scan


@router.get("/api/validations/{validation_id}/evidence", response_model=List[PlatformEvidence])
def get_validation_evidence(validation_id: str):
    """
    Get sanitized evidence list associated with a specific Validation ID.
    """
    val = validation_service.get_validation(validation_id)
    if not val:
        raise NotFoundError(message=f"Validation '{validation_id}' not found.")
    return evidence_service.get_evidence_list(validation_id=validation_id)
