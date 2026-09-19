"""
CLI entry point for the Orchestrator.

Usage:
    python -m orchestrator --findings report.json --repo . [options]
"""
import argparse
import json
import logging
import sys

from orchestrator.pipeline import Pipeline, PipelineConfig

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
log = logging.getLogger(__name__)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="orchestrator",
        description="Pre-Prod Orchestrator — orchestrate remediation, branch creation, and PR."
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
        "--base",
        default="main",
        type=str,
        help="Base branch to target for PR (default: main)"
    )
    parser.add_argument(
        "--severity-threshold",
        default="INFO",
        choices=["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"],
        help="Minimum severity of findings to remediate (default: INFO)"
    )
    parser.add_argument(
        "--branch-prefix",
        default="security-remediation",
        type=str,
        help="Prefix for generated remediation branch"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Apply and verify fixes locally without creating branches, commits, or PRs"
    )
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    config = PipelineConfig(
        repo_path=args.repo,
        findings_path=args.findings,
        api_key=args.api_key or "",
        model_name=args.model_name,
        base_ref=args.base,
        severity_threshold=args.severity_threshold,
        dry_run=args.dry_run,
        branch_prefix=args.branch_prefix,
    )

    if not config.api_key:
        log.error("Gemini API key is required. Specify --api-key or set GEMINI_API_KEY env var.")
        return 1

    try:
        pipeline = Pipeline(config)
        summary = pipeline.run()
        print("\n--- Orchestrator Result ---")
        print(json.dumps(summary, indent=2))
        return 0
    except Exception as exc:
        log.error("Pipeline failed: %s", exc, exc_info=True)
        return 1


if __name__ == "__main__":
    sys.exit(main())
