from fastapi.testclient import TestClient
import pytest
from datetime import datetime, timezone

from platform.main import app
from platform.models.validation import (
    PlatformValidation,
    ValidationStatusEnum,
    ValidationTestResult,
    SecurityScanResult,
    ValidationEvidence
)
from platform.services.validation_service import validation_service
from orchestrator.store import store as upstream_store, Validation, ValidationStep


client = TestClient(app)


def test_validation_model_and_evidence_sanitization():
    # 1. Test model instantiation and defaults
    val = PlatformValidation(
        id="VAL-TEST-001",
        remediationId="REM-TEST-001",
        findingId="FIND-TEST-001",
        status=ValidationStatusEnum.PENDING,
        tests=[
            ValidationTestResult(name="Unit Test Suite", status="passed", durationMs=120)
        ],
        securityScan=SecurityScanResult(
            status="PASSED",
            scanner="Semgrep Security Scanner",
            findingsCount=0
        ),
        startedAt="2026-09-19T10:00:00Z"
    )
    assert val.id == "VAL-TEST-001"
    assert val.remediation_id == "REM-TEST-001"
    assert val.status == ValidationStatusEnum.PENDING
    assert len(val.tests) == 1
    assert val.security_scan.status == "PASSED"

    # 2. Test evidence sanitization for secret prevention
    raw_evidence = {
        "repository": "acme-corp/auth-api",
        "api_key": "secret_abc123",
        "auth_token": "bearer_xyz789",
        "nested": {
            "password": "supersecretpassword",
            "safe_metric": 99.5
        }
    }
    sanitized = ValidationEvidence.sanitize_evidence_data(raw_evidence)
    assert sanitized["repository"] == "acme-corp/auth-api"
    assert sanitized["api_key"] == "[REDACTED_SECRET]"
    assert sanitized["auth_token"] == "[REDACTED_SECRET]"
    assert sanitized["nested"]["password"] == "[REDACTED_SECRET]"
    assert sanitized["nested"]["safe_metric"] == 99.5


def test_validation_state_transitions():
    val = PlatformValidation(
        id="VAL-STATE-001",
        remediationId="REM-001",
        status=ValidationStatusEnum.PENDING
    )
    # Valid transition: PENDING -> RUNNING
    assert val.can_transition_to(ValidationStatusEnum.RUNNING) is True
    assert val.can_transition_to(ValidationStatusEnum.PASSED) is False

    val.status = ValidationStatusEnum.RUNNING
    # Valid transitions: RUNNING -> PASSED or FAILED
    assert val.can_transition_to(ValidationStatusEnum.PASSED) is True
    assert val.can_transition_to(ValidationStatusEnum.FAILED) is True
    assert val.can_transition_to(ValidationStatusEnum.PENDING) is False

    val.status = ValidationStatusEnum.PASSED
    # Terminal state: PASSED -> no further transitions
    assert val.can_transition_to(ValidationStatusEnum.PENDING) is False
    assert val.can_transition_to(ValidationStatusEnum.RUNNING) is False


def test_validation_service_queries():
    # Setup test data in upstream store
    rem_id = "REM-FIND-PROD-001"
    val_id = f"VAL-{rem_id}"
    upstream_store.validations[val_id] = Validation(
        id=val_id,
        remediationId=rem_id,
        findingId="FIND-PROD-001",
        steps=[
            ValidationStep(id="s1", name="Checkout SHA & Workspace Isolation", status="passed", duration_ms=100),
            ValidationStep(id="s2", name="Unit & Integration Tests", status="passed", duration_ms=200),
            ValidationStep(id="s3", name="SAST Security Re-scan", status="passed", duration_ms=150)
        ],
        overallStatus="passed",
        startedAt="2026-09-19T10:00:00Z",
        completedAt="2026-09-19T10:01:00Z"
    )

    # Test retrieval by ID
    val = validation_service.get_validation(val_id)
    assert val is not None
    assert val.id == val_id
    assert val.status == ValidationStatusEnum.PASSED
    assert val.remediation_id == rem_id

    # Test retrieval by remediation ID
    val_rem = validation_service.get_validation_by_remediation(rem_id)
    assert val_rem is not None
    assert val_rem.id == val_id

    # Test retrieval by finding ID
    upstream_store.start_remediation("FIND-PROD-001")
    val_finding = validation_service.get_validation_by_finding("FIND-PROD-001")
    assert val_finding is not None

    # Test missing validation returns None
    assert validation_service.get_validation("VAL-NON-EXISTENT") is None
    assert validation_service.get_validation_by_remediation("REM-NON-EXISTENT") is None
    assert validation_service.get_validation_by_finding("FIND-NON-EXISTENT") is None


def test_validation_api_endpoints():
    # Ensure validation exists in upstream store
    rem_id = "REM-FIND-PROD-001"
    val_id = f"VAL-{rem_id}"

    # 1. GET /api/validations/{validation_id}
    res = client.get(f"/api/validations/{val_id}")
    assert res.status_code == 200
    data = res.json()
    assert data["id"] == val_id
    assert data["status"] in ["PENDING", "RUNNING", "PASSED", "FAILED"]
    assert "remediationId" in data
    assert "tests" in data

    # 2. GET /api/remediations/{remediation_id}/validation
    res = client.get(f"/api/remediations/{rem_id}/validation")
    assert res.status_code == 200
    data = res.json()
    assert data["remediationId"] == rem_id

    # 3. GET /api/findings/{finding_id}/validation
    res = client.get("/api/findings/FIND-PROD-001/validation")
    assert res.status_code == 200

    # 4. GET 404 for unknown validation
    res_404 = client.get("/api/validations/VAL-DOES-NOT-EXIST")
    assert res_404.status_code == 404
    err_data = res_404.json()
    assert "error" in err_data
    assert err_data["error"]["code"] == "NOT_FOUND"


def test_security_no_fake_validation_success():
    # Verify that a pending validation does NOT return PASSED
    val_pending_id = "VAL-PENDING-001"
    upstream_store.validations[val_pending_id] = Validation(
        id=val_pending_id,
        remediationId="REM-PENDING-001",
        findingId="FIND-PENDING-001",
        steps=[
            ValidationStep(id="s1", name="Checkout Workspace", status="pending")
        ],
        overallStatus="pending",
        startedAt="2026-09-19T11:00:00Z"
    )

    val = validation_service.get_validation(val_pending_id)
    assert val is not None
    assert val.status == ValidationStatusEnum.PENDING
    assert val.status != ValidationStatusEnum.PASSED
