from fastapi.testclient import TestClient
from orchestrator.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data
    assert "timestamp" in data


def test_metrics_endpoint():
    response = client.get("/api/metrics")
    assert response.status_code == 200
    data = response.json()
    assert "openFindings" in data
    assert "criticalCount" in data
    assert "highCount" in data
    assert "fixCandidates" in data
    assert "validationPassRate" in data
    assert "remediationPRs" in data


def test_repositories_endpoints():
    response = client.get("/api/repositories")
    assert response.status_code == 200
    repos = response.json()
    assert len(repos) >= 1
    assert repos[0]["name"] == "acme-corp/main-service"

    single_resp = client.get("/api/repositories/acme-corp/auth-api")
    assert single_resp.status_code == 200
    repo = single_resp.json()
    assert repo["name"] == "acme-corp/auth-api"

    notFound_resp = client.get("/api/repositories/non-existent-repo")
    assert notFound_resp.status_code == 404


def test_findings_endpoints():
    response = client.get("/api/findings")
    assert response.status_code == 200
    findings = response.json()
    assert len(findings) >= 1
    finding_id = findings[0]["id"]

    single_resp = client.get(f"/api/findings/{finding_id}")
    assert single_resp.status_code == 200
    assert single_resp.json()["id"] == finding_id

    notFound_resp = client.get("/api/findings/non-existent-id")
    assert notFound_resp.status_code == 404


def test_remediation_lifecycle():
    start_resp = client.post("/api/remediations", json={"findingId": "FIND-PROD-001"})
    assert start_resp.status_code == 201
    rem = start_resp.json()
    assert rem["findingId"] == "FIND-PROD-001"
    rem_id = rem["id"]

    get_resp = client.get(f"/api/remediations/{rem_id}")
    assert get_resp.status_code == 200

    finding_rem_resp = client.get("/api/remediations/finding/FIND-PROD-001")
    assert finding_rem_resp.status_code == 200


def test_validation_lifecycle():
    val_id = "VAL-REM-FIND-PROD-001"
    run_resp = client.post(f"/api/validations/{val_id}/run")
    assert run_resp.status_code == 200
    val_data = run_resp.json()
    assert val_data["overallStatus"] == "passed"

    get_resp = client.get(f"/api/validations/{val_id}")
    assert get_resp.status_code == 200


def test_audit_events():
    response = client.get("/api/audit")
    assert response.status_code == 200
    events = response.json()
    assert isinstance(events, list)
    assert len(events) >= 1
