"""CLI for one controlled remediation attempt."""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from .engine import RemediationEngine
from .llm import LLMError, provider_from_env
from .models import SecurityFinding
from .sandbox import DockerSandboxValidator


def main() -> int:
    parser = argparse.ArgumentParser(description="Pre-Prod-Orchestrator remediation engine")
    parser.add_argument("--repo", required=True)
    parser.add_argument("--sha", required=True)
    parser.add_argument("--finding", required=True)
    parser.add_argument("--no-llm", action="store_true")
    args = parser.parse_args()

    finding_data = json.loads(Path(args.finding).read_text(encoding="utf-8"))
    finding = SecurityFinding.from_dict(finding_data)

    llm = None
    if not args.no_llm:
        try:
            llm = provider_from_env()
        except LLMError as exc:
            print(json.dumps({"warning": str(exc)}))

    result = RemediationEngine(
        args.repo,
        DockerSandboxValidator(),
        llm,
    ).remediate(finding, args.sha)

    print(json.dumps(result.as_contract(), indent=2, sort_keys=True))
    return 0 if result.status == "VALIDATED" else 2


if __name__ == "__main__":
    raise SystemExit(main())
