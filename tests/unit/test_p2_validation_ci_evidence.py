from fastapi.testclient import TestClient
import pytest

from platform.main import app
from platform.models.ci import PlatformCICheck, CIStatus, CIConclusion
from platform.models.evidence import PlatformEvidence, EvidenceType
from platform.services.ci_service import ci_service
from platform.services.evidence_service import evidence_service
from orchestrator.store import store as upstream_store, Validation, ValidationStep


client = TestClient(app)


def test_ci_model_and_adapter():
    checks = ci_service.get_ci_checks()
    assert isinstance(checks, list)
    assert len(checks) >= 1

    check = checks[0]
    assert check.id.startswith("ci-")
    assert check.status in [CIStatus.QUEUED, CIStatus.IN_PROGRESS, CIStatus.COMPLETED]
    assert check.conclusion in [CIConclusion.SUCCESS, CIConclusion.FAILURE, CIConclusion.UNAVAILABLE]


def test_evidence_model_and_sanitization():
    raw_meta = {
        "user": "developer",
        "secret_token": "bearer_secret_123",
        "nested": {
            "password": "my_db_password",
            "metric": 42
        }
    }
    item = PlatformEvidence.create_sanitized(
        id="ev-test-100",
        type=EvidenceType.SECURITY_SCAN,
        source="Semgrep",
        title="Test Security Scan",
        created_at="2026-09-19T12:00:00Z",
        raw_metadata=raw_meta
    )
    assert item.id == "ev-test-100"
    assert item.type == EvidenceType.SECURITY_SCAN
    assert item.metadata["user"] == "developer"
    assert item.metadata["secret_token"] == "[REDACTED_SECRET]"
    assert item.metadata["nested"]["password"] == "[REDACTED_SECRET]"
    assert item.metadata["nested"]["metric"] == 42


def test_ci_api_endpoints():
    # 1. GET /api/ci
    res = client.get("/api/ci")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    assert len(data) >= 1

    # 2. GET /api/ci/{id}
    check_id = data[0]["id"]
    res_detail = client.get(f"/api/ci/{check_id}")
    assert res_detail.status_code == 200
    assert res_detail.json()["id"] == check_id

    # 3. 404 for unknown CI check
    res_404 = client.get("/api/ci/ci-does-not-exist")
    assert res_404.status_code == 404
    assert res_404.json()["error"]["code"] == "NOT_FOUND"


def test_evidence_api_endpoints():
    # 1. GET /api/evidence
    res = client.get("/api/evidence")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    assert len(data) >= 1

    # 2. GET /api/evidence/{id}
    ev_id = data[0]["id"]
    res_detail = client.get(f"/api/evidence/{ev_id}")
    assert res_detail.status_code == 200
    assert res_detail.json()["id"] == ev_id

    # 3. 404 for unknown evidence
    res_404 = client.get("/api/evidence/ev-does-not-exist")
    assert res_404.status_code == 404
    assert res_404.json()["error"]["code"] == "NOT_FOUND"


def test_validation_detail_subendpoints():
    rem_id = "REM-FIND-PROD-001"
    val_id = f"VAL-{rem_id}"

    # Setup validation in upstream store
    upstream_store.validations[val_id] = Validation(
        id=val_id,
        remediationId=rem_id,
        findingId="FIND-PROD-001",
        steps=[
            ValidationStep(id="s1", name="Unit Tests", status="passed", duration_ms=100),
            ValidationStep(id="s2", name="SAST Security Re-scan", status="passed", duration_ms=200)
        ],
        overallStatus="passed",
        startedAt="2026-09-19T10:00:00Z"
    )

    # 1. GET /api/validations/{id}/tests
    res_tests = client.get(f"/api/validations/{val_id}/tests")
    assert res_tests.status_code == 200
    tests_data = res_tests.json()
    assert isinstance(tests_data, list)
    assert len(tests_data) >= 1

    # 2. GET /api/validations/{id}/security-scan
    res_scan = client.get(f"/api/validations/{val_id}/security-scan")
    assert res_scan.status_code == 200
    assert res_scan.json()["status"] == "PASSED"

    # 3. GET /api/validations/{id}/evidence
    res_ev = client.get(f"/api/validations/{val_id}/evidence")
    assert res_ev.status_code == 200
    assert len(res_ev.json()) >= 1
