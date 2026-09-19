"""
CLI entry point for the Remediation Agent.

Usage:
    python -m remediation --findings report.json --repo . [options]
"""
import argparse
import json
import logging
import os
import sys
from pathlib import Path

from remediation.remediation_agent import RemediationAgent

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
log = logging.getLogger(__name__)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="remediation",
        description="Pre-Prod AI Remediation — generate and apply security fixes from scanner findings."
    )
    parser.add_argument(
        "--findings",
        required=True,
        type=str,
        help="Path to scanner findings JSON or report.json"
    )
    parser.add_argument(
        "--repo",
        default=".",
        type=str,
        help="Target repository root (default: current directory)"
    )
    parser.add_argument(
        "--api-key",
        default=None,
        type=str,
        help="Gemini API Key (or set GEMINI_API_KEY environment variable)"
    )
    parser.add_argument(
        "--model-name",
        default="gemini-2.5-flash",
        type=str,
        help="Gemini model name to use (default: gemini-2.5-flash)"
    )
    parser.add_argument(
        "--output",
        default=".preprod/remediation-result.json",
        type=str,
        help="Output path for remediation summary JSON"
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Directly write the verified fixes to files on disk"
    )
    return parser


def load_findings(findings_path: str) -> list[dict]:
    p = Path(findings_path)
    if not p.exists():
        raise FileNotFoundError(f"Findings file does not exist: {findings_path}")
    data = json.loads(p.read_text(encoding="utf-8"))
    if isinstance(data, list):
        return data
    if isinstance(data, dict):
        if "findings" in data and isinstance(data["findings"], list):
            return data["findings"]
        if "result" in data and isinstance(data["result"], dict):
            return data["result"].get("findings", [])
    return []


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    api_key = args.api_key or os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        log.error("Gemini API key is required. Specify --api-key or set GEMINI_API_KEY env var.")
        return 1

    try:
        findings = load_findings(args.findings)
    except Exception as exc:
        log.error("Error reading findings: %s", exc)
        return 1

    log.info("Loaded %d findings from %s", len(findings), args.findings)
    if not findings:
        log.info("No findings to remediate.")
        return 0

    agent = RemediationAgent(
        api_key=api_key,
        model_name=args.model_name,
        repo_path=args.repo
    )

    results = agent.remediate_findings(findings)

    applied_count = sum(1 for r in results if r.status == "APPLIED")
    log.info("Remediation completed: %d/%d applied", applied_count, len(findings))

    written_files = []
    if args.apply and applied_count > 0:
        written_files = agent.write_changes()
        log.info("Saved changes to %d files on disk: %s", len(written_files), written_files)

    summary = {
        "findings_count": len(findings),
        "applied_count": applied_count,
        "written_files": written_files,
        "results": [r.to_dict() for r in results]
    }

    out_path = Path(args.output)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    log.info("Summary written to %s", out_path)

    return 0


if __name__ == "__main__":
    sys.exit(main())
