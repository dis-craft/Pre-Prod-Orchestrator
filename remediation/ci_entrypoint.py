#!/usr/bin/env python3
"""CI bridge for running the existing remediation agent against a checked-out repository.

This intentionally does not create branches or PRs. The caller workflow owns those
GitHub operations so the same agent can be reused from GitHub Actions or Jenkins.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

from remediation.remediation_agent import RemediationAgent


def load_findings(path: Path) -> list[dict]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(data, list):
        return data
    if isinstance(data, dict):
        findings = data.get("findings")
        if isinstance(findings, list):
            return findings
        result = data.get("result")
        if isinstance(result, dict) and isinstance(result.get("findings"), list):
            return result["findings"]
    raise ValueError(f"No findings list found in {path}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", required=True)
    parser.add_argument("--findings", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--model", default=os.environ.get("GEMINI_MODEL", "gemini-3.5-flash-lite"))
    parser.add_argument("--context-window", type=int, default=30)
    args = parser.parse_args()

    repo = Path(args.repo).resolve()
    findings_path = Path(args.findings).resolve()
    output_path = Path(args.output).resolve()

    findings = load_findings(findings_path)
    if not findings:
        output = {
            "status": "NO_FINDINGS",
            "findings": 0,
            "fixed": 0,
            "written_files": [],
            "results": [],
        }
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(json.dumps(output, indent=2) + "\n", encoding="utf-8")
        return 0

    agent = RemediationAgent(
        api_key=os.environ.get("GEMINI_API_KEY"),
        model_name=args.model,
        repo_path=str(repo),
        context_window=args.context_window,
    )

    results = agent.remediate_findings(findings)
    written_files = agent.write_changes()
    applied = [r for r in results if r.status == "APPLIED"]

    output = {
        "status": "APPLIED" if applied else "NO_FIXES",
        "findings": len(findings),
        "fixed": len(applied),
        "written_files": written_files,
        "results": [r.to_dict() for r in results],
        "model": args.model,
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(output, indent=2) + "\n", encoding="utf-8")

    return 0 if applied else 2


if __name__ == "__main__":
    raise SystemExit(main())
