from fastapi.testclient import TestClient
import pytest

from platform.main import app
from platform.adapters.external_scan_adapter import ExternalScanAdapter
from platform.models.scan import ExternalScan
from platform.models.job import JobStatus, PlatformJob
from platform.services.scan_service import scan_service


client = TestClient(app)

SAMPLE_RAW_SCAN_PAYLOAD = {
    "schema_version": "1.1",
    "scan": {
        "id": "scn_test_123",
        "trigger": "push",
        "captured_at": "2026-09-19T09:12:11.549038+00:00",
        "workflow_run_id": "35434037822",
        "workflow_url": "https://github.com/dis-craft/Pre-prod-tester/actions/runs/35434037822"
    },
    "repository": {
        "full_name": "dis-craft/Pre-prod-tester",
        "url": "https://github.com/dis-craft/Pre-prod-tester",
        "default_branch": "main"
    },
    "comparison": {
        "base_commit": "f53b87fa95e7b2f9b53ade4fc38563591d653eb2",
        "target_commit": "6b1a44c3907516b20470bf6f3e24e3b87da4aca6",
        "range": "f53b87fa95e7b2f9b53ade4fc38563591d653eb2..6b1a44c3907516b20470bf6f3e24e3b87da4aca6",
        "method": "git diff two-commit comparison"
    },
    "commit": {
        "before": "f53b87fa95e7b2f9b53ade4fc38563591d653eb2",
        "after": "6b1a44c3907516b20470bf6f3e24e3b87da4aca6",
        "branch": "main",
        "message": "feat: add reusable Pre-prod Tester integration",
        "author": {
            "name": "Srikar T",
            "email": "169169726+dis-craft@users.noreply.github.com"
        },
        "committed_at": "2026-09-19T14:41:57+05:30"
    },
    "change_summary": {
        "files_changed": 1,
        "additions": 52,
        "deletions": 0,
        "net_lines": 52
    },
    "changes": {
        "format": "github-style-unified-diff",
        "legend": {"added": "+", "removed": "-", "context": " "},
        "files": [
            {
                "path": "PREPROD-INTEGRATION.md",
                "status": "A",
                "additions": 52,
                "deletions": 0,
                "added_lines": [
                    {"type": "added", "new_line": 1, "content": "# Pre-prod Tester integration"}
                ]
            }
        ]
    }
}


def test_scan_payload_parsing():
    adapter = ExternalScanAdapter()
    scan = adapter.parse_scan_payload(SAMPLE_RAW_SCAN_PAYLOAD)

    assert scan.scan.id == "scn_test_123"
    assert scan.repository.full_name == "dis-craft/Pre-prod-tester"
    assert scan.commit.after == "6b1a44c3907516b20470bf6f3e24e3b87da4aca6"
    assert scan.change_summary.files_changed == 1
    assert scan.change_summary.additions == 52
    assert len(scan.files) == 1
    assert scan.files[0].path == "PREPROD-INTEGRATION.md"
    # Security status should be UNAVAILABLE when security engine output is absent
    assert scan.security_status == "UNAVAILABLE"


def test_malformed_scan_payload_resilience():
    adapter = ExternalScanAdapter()
    malformed_payload = {"schema_version": "1.0"}
    scan = adapter.parse_scan_payload(malformed_payload)

    assert scan.scan.id == "scn_unknown"
    assert scan.repository.full_name == "unknown/repository"
    assert scan.change_summary.files_changed == 0
    assert scan.security_status == "UNAVAILABLE"


def test_scan_job_derivation():
    adapter = ExternalScanAdapter()
    scan = adapter.parse_scan_payload(SAMPLE_RAW_SCAN_PAYLOAD)
    adapter._cached_scan = scan

    jobs = adapter.get_scan_jobs()
    assert len(jobs) >= 1
    job = jobs[0]
    assert job.id == f"JOB-{scan.scan.id}"
    assert job.type == "SCAN"
    assert job.status == JobStatus.SUCCEEDED
    assert job.repository == "dis-craft/Pre-prod-tester"


def test_scan_api_endpoints():
    # 1. GET /api/scans/latest
    res = client.get("/api/scans/latest")
    assert res.status_code == 200
    data = res.json()
    assert "scan" in data
    assert "repository" in data
    assert "commit" in data
    assert "changeSummary" in data or "change_summary" in data

    # 2. GET /api/jobs
    res_jobs = client.get("/api/jobs")
    assert res_jobs.status_code == 200
    jobs_data = res_jobs.json()
    assert isinstance(jobs_data, list)
    assert len(jobs_data) >= 1

    # 3. GET /api/jobs/{job_id}
    job_id = jobs_data[0]["id"]
    res_detail = client.get(f"/api/jobs/{job_id}")
    assert res_detail.status_code == 200
    assert res_detail.json()["id"] == job_id

    # 4. GET 404 for non-existent job
    res_404 = client.get("/api/jobs/JOB-DOES-NOT-EXIST")
    assert res_404.status_code == 404
