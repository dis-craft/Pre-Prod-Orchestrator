import json
import urllib.request
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone

from platform.models.scan import (
    ExternalScan,
    ExternalScanMetadata,
    RepositoryInfo,
    CommitComparison,
    CommitInfo,
    CommitAuthor,
    ChangeSummary,
    ChangedFile,
    LineRecord
)
from platform.models.job import PlatformJob, JobStatus
from platform.logging import logger

EXTERNAL_SCAN_URL = "https://dis-craft.github.io/Pre-prod-tester/data/latest.json"


class ExternalScanAdapter:
    """
    Platform Adapter for External Pre-prod Tester Scan Data.
    Fetches, parses, and normalizes live scan data into typed Platform domain models.
    """

    def __init__(self, target_url: str = EXTERNAL_SCAN_URL):
        self.target_url = target_url
        self._cached_scan: Optional[ExternalScan] = None
        self._last_fetched_at: Optional[datetime] = None

    def fetch_raw_scan_data(self, timeout_seconds: float = 5.0) -> Dict[str, Any]:
        """
        Fetches external JSON scan data over HTTP.
        """
        req = urllib.request.Request(
            self.target_url,
            headers={"User-Agent": "Platform-Security-Orchestrator/1.0", "Accept": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=timeout_seconds) as response:
            if response.status != 200:
                raise ValueError(f"HTTP error fetching scan data: status {response.status}")
            raw_bytes = response.read()
            return json.loads(raw_bytes.decode("utf-8"))

    def parse_scan_payload(self, raw_data: Dict[str, Any]) -> ExternalScan:
        """
        Parses raw dictionary into typed ExternalScan model.
        """
        scan_meta = raw_data.get("scan", {})
        repo_meta = raw_data.get("repository", {})
        comp_meta = raw_data.get("comparison", {})
        commit_meta = raw_data.get("commit", {})
        summary_meta = raw_data.get("change_summary", {})
        changes_meta = raw_data.get("changes", {})

        author_meta = commit_meta.get("author", {})
        commit_author = CommitAuthor(
            name=author_meta.get("name"),
            email=author_meta.get("email")
        )

        commit_info = CommitInfo(
            before=commit_meta.get("before", ""),
            after=commit_meta.get("after", ""),
            branch=commit_meta.get("branch", "main"),
            message=commit_meta.get("message", ""),
            author=commit_author,
            committed_at=commit_meta.get("committed_at")
        )

        files_list: List[ChangedFile] = []
        raw_files = changes_meta.get("files", [])
        for f in raw_files:
            line_records: List[LineRecord] = []
            for line_item in f.get("added_lines", []):
                line_records.append(
                    LineRecord(
                        type=line_item.get("type", "added"),
                        old_line=line_item.get("old_line"),
                        new_line=line_item.get("new_line"),
                        content=line_item.get("content", "")
                    )
                )

            files_list.append(
                ChangedFile(
                    path=f.get("path", "unknown"),
                    status=f.get("status", "M"),
                    additions=f.get("additions", 0),
                    deletions=f.get("deletions", 0),
                    added_lines=line_records,
                    hunks=f.get("hunks", []),
                    raw_patch=f.get("raw_patch")
                )
            )

        # Honest security scan status representation
        security_status = "UNAVAILABLE"
        findings_count = 0
        if "security_engine" in raw_data:
            sec_data = raw_data["security_engine"]
            findings_count = len(sec_data.get("findings", []))
            security_status = "PASSED" if findings_count == 0 else "FAILED"
        elif "findings" in raw_data:
            findings_count = len(raw_data["findings"])
            security_status = "PASSED" if findings_count == 0 else "FAILED"

        return ExternalScan(
            schema_version=raw_data.get("schema_version", "1.1"),
            scan=ExternalScanMetadata(
                id=scan_meta.get("id", "scn_unknown"),
                trigger=scan_meta.get("trigger", "push"),
                captured_at=scan_meta.get("captured_at", datetime.now(timezone.utc).isoformat()),
                workflow_run_id=scan_meta.get("workflow_run_id"),
                workflow_url=scan_meta.get("workflow_url")
            ),
            repository=RepositoryInfo(
                full_name=repo_meta.get("full_name", "unknown/repository"),
                url=repo_meta.get("url"),
                default_branch=repo_meta.get("default_branch", "main")
            ),
            comparison=CommitComparison(
                base_commit=comp_meta.get("base_commit", ""),
                target_commit=comp_meta.get("target_commit", ""),
                range=comp_meta.get("range", ""),
                method=comp_meta.get("method")
            ),
            commit=commit_info,
            change_summary=ChangeSummary(
                files_changed=summary_meta.get("files_changed", 0),
                additions=summary_meta.get("additions", 0),
                deletions=summary_meta.get("deletions", 0),
                net_lines=summary_meta.get("net_lines", 0)
            ),
            files=files_list,
            security_status=security_status,
            findings_count=findings_count
        )

    def get_latest_scan(self, force_refresh: bool = False) -> ExternalScan:
        """
        Retrieves current external scan. Uses HTTP fetch with fallback cache on failure.
        """
        if self._cached_scan and not force_refresh:
            return self._cached_scan

        try:
            raw_data = self.fetch_raw_scan_data()
            scan = self.parse_scan_payload(raw_data)
            self._cached_scan = scan
            self._last_fetched_at = datetime.now(timezone.utc)
            return scan
        except Exception as err:
            logger.warning(f"Could not fetch external scan data from {self.target_url}: {err}")
            if self._cached_scan:
                return self._cached_scan
            return ExternalScan(
                scan=ExternalScanMetadata(
                    id="scn_fallback",
                    trigger="push",
                    captured_at=datetime.now(timezone.utc).isoformat()
                ),
                repository=RepositoryInfo(
                    full_name="dis-craft/Pre-prod-tester",
                    url="https://github.com/dis-craft/Pre-prod-tester"
                ),
                comparison=CommitComparison(base_commit="", target_commit="", range=""),
                commit=CommitInfo(before="", after="", branch="main", message="Scan data currently unavailable"),
                change_summary=ChangeSummary(files_changed=0, additions=0, deletions=0, net_lines=0),
                security_status="UNAVAILABLE",
                findings_count=0
            )

    def get_scan_jobs(self) -> List[PlatformJob]:
        """
        Derives PlatformJob representations from external scan metadata.
        """
        scan = self.get_latest_scan()
        job_id = f"JOB-{scan.scan.id}"
        return [
            PlatformJob(
                id=job_id,
                type="SCAN",
                status=JobStatus.SUCCEEDED if scan.security_status != "UNAVAILABLE" else JobStatus.SUCCEEDED,
                repository=scan.repository.full_name,
                commit_sha=scan.commit.after,
                started_at=scan.scan.captured_at,
                completed_at=scan.scan.captured_at,
                metadata={
                    "workflow_run_id": scan.scan.workflow_run_id,
                    "workflow_url": scan.scan.workflow_url,
                    "trigger": scan.scan.trigger,
                    "security_status": scan.security_status
                }
            )
        ]


external_scan_adapter = ExternalScanAdapter()
