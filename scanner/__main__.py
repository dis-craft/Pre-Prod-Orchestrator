"""
Security Diff Scanner — CLI entry point.
"""

import argparse
import os
import sys
import time
from pathlib import Path

from scanner.diff_parser import DiffParser
from scanner.rule_engine import RuleEngine
from scanner.rules import RuleRegistry
from scanner.findings import finding_from_rule_hit, EnrichedFinding
from scanner.llm_providers import create_provider
from scanner.report_builder import ReportBuilder


SEVERITY_ORDER = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3, "INFO": 4}

BANNER = r"""
  ____  _  __  __   ____
 |  _ \(_)/ _|/ _| / ___|  ___ __ _ _ __  _ __   ___ _ __
 | | | | | |_| |_  \___ \ / __/ _` | '_ \| '_ \ / _ \ '__|
 | |_| | |  _|  _|  ___) | (_| (_| | | | | | | |  __/ |
 |____/|_|_| |_|   |____/ \___\__,_|_| |_|_| |_|\___|_|

 Security Vulnerability Scanner v0.1.0
"""


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="scanner",
        description="Git Diff Security Scanner — detect vulnerabilities in code changes and repositories.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("--repo", type=str, default=".")
    parser.add_argument("--diff", type=str, default=None)
    parser.add_argument("--base", type=str, default=None)
    parser.add_argument("--head", type=str, default=None)
    parser.add_argument("--json-input", type=str, default=None)
    parser.add_argument(
        "--model", choices=["gemini", "ollama", "custom", "none"], default="none"
    )
    parser.add_argument("--model-name", type=str, default=None)
    parser.add_argument("--api-key", type=str, default=None)
    parser.add_argument("--api-url", type=str, default=None)
    parser.add_argument("--output", type=str, default="reports")
    parser.add_argument(
        "--format", choices=["json", "markdown", "html", "all"], default="all"
    )
    parser.add_argument(
        "--severity-threshold",
        choices=["INFO", "LOW", "MEDIUM", "HIGH", "CRITICAL"],
        default="INFO",
    )
    parser.add_argument("--quiet", action="store_true")
    parser.add_argument("--no-banner", action="store_true")
    return parser


def run_scan(args: argparse.Namespace) -> list[EnrichedFinding]:
    repo_path = os.path.abspath(args.repo)
    if not os.path.isdir(repo_path):
        print(f"Error: '{repo_path}' is not a valid directory.", file=sys.stderr)
        sys.exit(1)

    if args.json_input:
        hunks = DiffParser.parse_json_file(args.json_input, include_context=True)
        scan_mode = f"JSON payload: {args.json_input}"
    elif args.diff:
        hunks = (
            DiffParser.parse_json_file(args.diff, include_context=True)
            if args.diff.endswith(".json")
            else DiffParser.parse_diff_file(args.diff)
        )
        scan_mode = f"diff file: {args.diff}"
    elif args.base or args.head:
        base = args.base or "HEAD~1"
        head = args.head or "HEAD"
        hunks = DiffParser.parse_git_diff(repo_path, base=base, head=head)
        scan_mode = f"git diff {base}..{head}"
    else:
        hunks = DiffParser.walk_repo(repo_path)
        scan_mode = "full repository scan"

    if not hunks:
        if not args.quiet:
            print(f"  No files to scan ({scan_mode}).")
        return []

    if not args.quiet:
        total_lines = sum(len(h.added_lines) for h in hunks)
        print(f"  Found {len(hunks)} files, {total_lines} lines to scan ({scan_mode})")

    registry = RuleRegistry()
    engine = RuleEngine(registry)
    hits = engine.scan_hunks(hunks)

    if not args.quiet:
        print(f"  Found {len(hits)} raw rule hits across {len(registry.all_rules)} rules")

    if not hits:
        return []

    provider_kwargs = {}
    if args.model_name:
        provider_kwargs["model_name"] = args.model_name
    if args.api_key:
        provider_kwargs["api_key"] = args.api_key
    if args.api_url:
        provider_kwargs["api_url"] = args.api_url

    provider = create_provider(args.model, **provider_kwargs)
    verdicts = provider.analyze_hits(hits)

    findings: list[EnrichedFinding] = []
    threshold_order = SEVERITY_ORDER.get(args.severity_threshold, 4)

    for hit in hits:
        verdict = verdicts.get(hit.fingerprint)
        if verdict and not verdict.is_true_positive:
            continue

        finding = finding_from_rule_hit(hit)
        if verdict:
            finding.severity = verdict.adjusted_severity
            finding.what_and_why = verdict.what_and_why
            finding.how_to_fix = verdict.how_to_fix
            finding.why_fix_helps = verdict.why_fix_helps
            finding.confidence = verdict.confidence
            finding.llm_confirmed = True
        else:
            finding.llm_confirmed = None if args.model == "none" else False

        if SEVERITY_ORDER.get(finding.severity, 4) <= threshold_order:
            findings.append(finding)

    return findings


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    if not args.no_banner and not args.quiet:
        print(BANNER)

    start_time = time.time()

    if args.model == "custom" and not args.api_url:
        print("Error: --api-url is required when using --model=custom", file=sys.stderr)
        sys.exit(1)

    findings = run_scan(args)

    # Always emit a machine-readable report, including a clean scan.
    if not args.quiet:
        print("[5/5] Generating reports...")

    builder = ReportBuilder(findings, model_used=args.model)
    timestamp = time.strftime("%Y-%m-%dT%H-%M-%S")
    output_dir = os.path.join(args.output, f"scan-{timestamp}")
    os.makedirs(output_dir, exist_ok=True)

    created_files: list[str] = []
    if args.format in ("json", "all"):
        path = os.path.join(output_dir, "findings.json")
        Path(path).write_text(builder.build_json(), encoding="utf-8")
        created_files.append(path)
    if args.format in ("markdown", "all"):
        path = os.path.join(output_dir, "report.md")
        Path(path).write_text(builder.build_markdown(), encoding="utf-8")
        created_files.append(path)
    if args.format in ("html", "all"):
        path = os.path.join(output_dir, "report.html")
        Path(path).write_text(builder.build_html(), encoding="utf-8")
        created_files.append(path)

    os.makedirs(args.output, exist_ok=True)
    latest_json = os.path.join(args.output, "findings.json")
    latest_html = os.path.join(args.output, "report.html")
    Path(latest_json).write_text(builder.build_json(), encoding="utf-8")
    Path(latest_html).write_text(builder.build_html(), encoding="utf-8")
    created_files.extend([latest_json, latest_html])

    elapsed = time.time() - start_time
    if not args.quiet:
        print(f"\nScan complete in {elapsed:.1f}s.")
        print(f"Total findings: {len(findings)}")
        for fp in created_files:
            print(f"  -> {fp}")

    has_critical = any(f.severity in ("CRITICAL", "HIGH") for f in findings)
    sys.exit(1 if has_critical else 0)


if __name__ == "__main__":
    main()
