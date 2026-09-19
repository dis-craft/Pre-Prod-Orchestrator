from fastapi.testclient import TestClient
import pytest

from platform.main import app
from platform.models.workflow import WorkflowState
from orchestrator.store import store as upstream_store, Validation, ValidationStep, SecurityFinding, FindingEvidence


client = TestClient(app)


def test_security_headers_and_correlation_middleware():
    response = client.get("/api/health")
    assert response.status_code == 200

    # Verify Security Headers
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["X-Frame-Options"] == "DENY"
    assert response.headers["X-XSS-Protection"] == "1; mode=block"
    assert "Referrer-Policy" in response.headers

    # Verify Request ID Correlation Header
    assert "X-Request-ID" in response.headers
    req_id = response.headers["X-Request-ID"]
    assert req_id.startswith("req-") or len(req_id) > 0


def test_custom_request_id_preservation():
    custom_id = "req-custom-test-12345"
    response = client.get("/api/health", headers={"X-Request-ID": custom_id})
    assert response.status_code == 200
    assert response.headers["X-Request-ID"] == custom_id


def test_e2e_platform_workflow_integration():
    # 1. External Scan endpoint
    res_scan = client.get("/api/scans/latest")
    assert res_scan.status_code == 200
    scan_data = res_scan.json()
    assert scan_data["repository"]["fullName"] == "dis-craft/Pre-prod-tester"

    # 2. Findings list endpoint
    res_findings = client.get("/api/findings")
    assert res_findings.status_code == 200
    findings = res_findings.json()
    assert isinstance(findings, list)
    assert len(findings) >= 1

    finding_id = findings[0]["id"]

    # 3. Unified Workflow endpoint for finding
    res_wf = client.get(f"/api/workflows/finding/{finding_id}")
    assert res_wf.status_code == 200
    wf_data = res_wf.json()
    assert wf_data["workflowId"] == f"WF-{finding_id}"
    assert wf_data["finding"]["id"] == finding_id
    assert "ci" in wf_data
    assert "evidence" in wf_data
    assert "overallStatus" in wf_data

    # 4. CI checks endpoint
    res_ci = client.get("/api/ci")
    assert res_ci.status_code == 200
    ci_data = res_ci.json()
    assert isinstance(ci_data, list)
    assert len(ci_data) >= 1

    # 5. Evidence list endpoint with secret redaction assertion
    res_ev = client.get("/api/evidence")
    assert res_ev.status_code == 200
    ev_data = res_ev.json()
    assert isinstance(ev_data, list)
    assert len(ev_data) >= 1

    for ev_item in ev_data:
        meta_str = str(ev_item.get("metadata", {}))
        assert "secret_token" not in meta_str
        assert "bearer_secret" not in meta_str


def test_truthful_state_and_failure_boundaries():
    # Unremediated finding must report FINDING_DETECTED, not fake PASSED or MERGED
    test_id = "FIND-UNSOLVED-002"
    upstream_store.findings.append(
        SecurityFinding(
            id=test_id,
            repository="acme-corp/auth-api",
            pullRequest="PR-101",
            commitSha="a9876543210b",
            tool="semgrep",
            ruleId="python.lang.security.injection",
            title="Command Injection",
            message="Unchecked command execution",
            severity="HIGH",
            confidence=0.95,
            file="src/utils/cmd.py",
            startLine=5,
            endLine=6,
            cwe="CWE-78",
            owasp="A03:2021 - Injection",
            introducedByPR="PR-101",
            fixability="MANUAL_ONLY",
            status="OPEN",
            evidence=FindingEvidence(
                snippet="os.system(user_cmd)",
                vulnerableLine="os.system(user_cmd)",
                contextBefore=[],
                contextAfter=[],
                explanation="Raw command string execution"
            )
        )
    )

    res_wf = client.get(f"/api/workflows/finding/{test_id}")
    assert res_wf.status_code == 200
    wf_data = res_wf.json()
    assert wf_data["overallStatus"] == WorkflowState.FINDING_DETECTED
    assert wf_data["overallStatus"] != WorkflowState.VALIDATION_PASSED
    assert wf_data["overallStatus"] != WorkflowState.MERGED


def test_sanitized_error_responses_no_stacktrace_leak():
    response = client.get("/api/workflows/WF-NON-EXISTENT-ID-999")
    assert response.status_code == 404
    data = response.json()
    assert "error" in data
    assert data["error"]["code"] == "NOT_FOUND"
    assert "traceback" not in data
    assert "stack" not in data
