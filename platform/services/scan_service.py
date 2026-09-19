from typing import List, Optional
from platform.models.scan import ExternalScan
from platform.models.job import PlatformJob
from platform.adapters.external_scan_adapter import external_scan_adapter, ExternalScanAdapter


class ScanService:
    """
    Platform Scan Service for Phase 1.
    Encapsulates queries for real scan data and associated workflow job state.
    """

    def __init__(self, adapter: Optional[ExternalScanAdapter] = None):
        self.adapter = adapter or external_scan_adapter

    def get_latest_scan(self) -> ExternalScan:
        """
        Retrieves the latest normalized scan from external data source.
        """
        return self.adapter.get_latest_scan()

    def get_scan_jobs(self) -> List[PlatformJob]:
        """
        Retrieves workflow job states derived from scan executions.
        """
        return self.adapter.get_scan_jobs()

    def get_job_by_id(self, job_id: str) -> Optional[PlatformJob]:
        jobs = self.get_scan_jobs()
        for j in jobs:
            if j.id == job_id:
                return j
        return None


scan_service = ScanService()
