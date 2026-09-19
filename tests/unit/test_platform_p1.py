import json
from pathlib import Path
from fastapi.testclient import TestClient
import jsonschema

from platform.main import app

client = TestClient(app)

CONTRACTS_DIR = Path(__file__).resolve().parent.parent.parent / "contracts"
FINDING_SCHEMA_PATH = CONTRACTS_DIR / "finding.schema.json"


def test_platform_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["module"] == "platform"
    assert "timestamp" in data


def test_list_findings():
    response = client.get("/api/findings")
    assert response.status_code == 200
    findings = response.json()
    assert isinstance(findings, list)
    assert len(findings) >= 1

    finding = findings[0]
    assert "id" in finding
    assert "tool" in finding
    assert "rule" in finding
    assert "severity" in finding
    assert "file" in finding
    assert "line" in finding
    assert "message" in finding
    assert "confidence" in finding


def test_list_findings_filter_severity():
    response = client.get("/api/findings?severity=HIGH")
    assert response.status_code == 200
    findings = response.json()
    for f in findings:
        assert f["severity"] == "HIGH"


def test_list_findings_invalid_severity():
    response = client.get("/api/findings?severity=INVALID_SEVERITY")
    assert response.status_code == 400
    assert "Invalid severity filter" in response.json()["detail"]


def test_get_finding_detail_success():
    response = client.get("/api/findings/FIND-PROD-001")
    assert response.status_code == 200
    finding = response.json()
    assert finding["id"] == "FIND-PROD-001"
    assert finding["severity"] == "HIGH"


def test_get_finding_detail_not_found():
    response = client.get("/api/findings/NON-EXISTENT-FINDING")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"]


def test_get_finding_workflow_status():
    response = client.get("/api/findings/FIND-PROD-001/workflow")
    assert response.status_code == 200
    wf = response.json()
    assert wf["findingId"] == "FIND-PROD-001"
    assert "state" in wf
    assert "updatedAt" in wf


def test_get_finding_workflow_status_not_found():
    response = client.get("/api/findings/NON-EXISTENT-FINDING/workflow")
    assert response.status_code == 404


def test_finding_schema_contract_conformance():
    if not FINDING_SCHEMA_PATH.exists():
        return

    with open(FINDING_SCHEMA_PATH, "r", encoding="utf-8") as f:
        schema = json.load(f)

    response = client.get("/api/findings")
    assert response.status_code == 200
    findings = response.json()

    for finding in findings:
        # Validate finding payload against contracts/finding.schema.json
        contract_payload = {
            "id": finding["id"],
            "tool": finding["tool"],
            "rule": finding["rule"],
            "severity": finding["severity"],
            "file": finding["file"],
            "line": finding["line"],
            "message": finding["message"],
            "confidence": finding["confidence"],
            "fixability": finding.get("fixability", "UNKNOWN")
        }
        if "endLine" in finding and finding["endLine"] is not None:
            contract_payload["end_line"] = finding["endLine"]

        jsonschema.validate(instance=contract_payload, schema=schema)
