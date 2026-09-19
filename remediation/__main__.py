"""CLI for one controlled remediation attempt, plus a self-contained demo."""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

from .engine import RemediationEngine
from .llm import LLMError, provider_from_env
from .models import SecurityFinding
from .sandbox import DockerSandboxValidator
from .seeded_scan import scan


def _trace(stage: str, status: str, details: dict) -> None:
    """Emit JSONL trace events to stderr so stdout stays machine-readable."""
    print(
        json.dumps(
            {"event": "remediation", "stage": stage, "status": status, "details": details},
            sort_keys=True,
        ),
        file=sys.stderr,
    )


def _current_sha(repo: Path) -> str:
    result = subprocess.run(
        ["git", "-C", str(repo), "rev-parse", "HEAD"],
        capture_output=True,
        text=True,
        check=True,
    )
    return result.stdout.strip()


def _demo_inputs(repo: Path) -> tuple[str, str]:
    fixture = Path(__file__).resolve().parent / "fixtures" / "vulnerable_sql.py"
    findings = scan(str(fixture))
    if not findings:
        raise RuntimeError("demo fixture is no longer detected by the seeded scanner")
    return _current_sha(repo), json.dumps(findings[0])


def main() -> int:
    parser = argparse.ArgumentParser(description="Pre-Prod-Orchestrator remediation engine")
    parser.add_argument("--repo", default=".")
    parser.add_argument("--sha")
    parser.add_argument("--finding")
    parser.add_argument("--no-llm", action="store_true")
    parser.add_argument("--force-llm", action="store_true", help="skip deterministic rules and require the configured LLM")
    parser.add_argument("--demo", action="store_true", help="run the seeded SQL-injection fixture end-to-end")
    parser.add_argument("--quiet", action="store_true", help="disable JSONL progress events")
    args = parser.parse_args()

    repo_arg = Path(args.repo)
    repo = repo_arg.resolve()
    if args.demo and args.repo == ".":
        repo = Path(__file__).resolve().parent.parent

    if args.demo:
        sha, finding_json = _demo_inputs(repo)
        finding_data = json.loads(finding_json)
    else:
        if not args.sha or not args.finding:
            parser.error("--sha and --finding are required unless --demo is used")
        sha = args.sha
        finding_data = json.loads(Path(args.finding).read_text(encoding="utf-8"))

    finding = SecurityFinding.from_dict(finding_data)

    llm = None
    if not args.no_llm:
        try:
            llm = provider_from_env()
            if not args.quiet:
                _trace("llm", "provider_ready", {
                    "provider": type(llm).__name__,
                    "model": getattr(llm, "model", None),
                })
        except LLMError as exc:
            if args.force_llm:
                if not args.quiet:
                    _trace("llm", "provider_error", {"reason": str(exc)})
            elif not args.quiet:
                _trace("llm", "provider_unavailable", {"reason": str(exc)})

    if args.force_llm and llm is None:
        result = {
            "finding_id": finding.id,
            "status": "REJECTED",
            "patch": "",
            "summary": "LLM was explicitly requested but no provider is configured.",
            "tests": [],
            "security_rescan": {},
            "evidence": {"source": "llm", "reason": "provider unavailable"},
        }
        print(json.dumps(result, indent=2, sort_keys=True))
        return 2

    def trace(stage: str, status: str, details: dict) -> None:
        if not args.quiet:
            _trace(stage, status, details)

    result = RemediationEngine(
        str(repo),
        DockerSandboxValidator(),
        llm,
        trace=trace,
    ).remediate(finding, sha, prefer_deterministic=not args.force_llm)

    print(json.dumps(result.as_contract(), indent=2, sort_keys=True))
    return 0 if result.status == "VALIDATED" else 2


if __name__ == "__main__":
    raise SystemExit(main())
