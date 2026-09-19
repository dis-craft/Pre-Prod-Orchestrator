"""
Security Diff Scanner — CLI entry point.

Usage:
    python -m scanner --repo <path> [options]

Examples:
    # Rules-only scan (no LLM)
    python -m scanner --repo . --model none --format all

    # Scan with Gemini
    python -m scanner --repo . --model gemini --api-key YOUR_KEY

    # Scan a specific diff
    python -m scanner --repo . --diff changes.patch --model none

    # Scan diff between two refs
    python -m scanner --repo . --base main --head feature-branch --model ollama

    # Use Ollama with a specific model
    python -m scanner --repo . --model ollama --model-name codellama:7b

    # Use a custom OpenAI-compatible endpoint
    python -m scanner --repo . --model custom --api-url http://localhost:8080 --model-name my-model
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
from scanner.llm_providers import create_provider, LLMVerdict
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
    """Build the CLI argument parser."""
    parser = argparse.ArgumentParser(
        prog="scanner",
        description="Git Diff Security Scanner — detect vulnerabilities in code changes and repositories.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )

    # Target
    parser.add_argument(
        "--repo",
        type=str,
        default=".",
        help="Path to the target repository (default: current directory).",
    )
    parser.add_argument(
        "--diff",
        type=str,
        default=None,
        help="Path to a unified diff file to scan instead of the full repo.",
    )
    parser.add_argument(
        "--base",
        type=str,
        default=None,
        help="Git ref for the base of the diff (e.g. 'main', 'HEAD~1').",
    )
    parser.add_argument(
        "--head",
        type=str,
        default=None,
        help="Git ref for the head of the diff (e.g. 'feature-branch', 'HEAD').",
    )
    parser.add_argument(
        "--json-input",
        type=str,
        default=None,
        help="Path to a JSON file containing git diff/event payload to scan.",
    )

    # Model selection
    parser.add_argument(
        "--model",
        type=str,
        choices=["gemini", "ollama", "custom", "none"],
        default="none",
        help="LLM provider for vulnerability confirmation (default: none = rules only).",
    )
    parser.add_argument(
        "--model-name",
        type=str,
        default=None,
        help="Specific model name (e.g. 'gemini-2.5-flash', 'codellama:7b', 'gpt-4o').",
    )
    parser.add_argument(
        "--api-key",
        type=str,
        default=None,
        help="API key for the model provider (or set GEMINI_API_KEY env var for Gemini).",
    )
    parser.add_argument(
        "--api-url",
        type=str,
        default=None,
        help="API URL for custom model endpoint (required when --model=custom).",
    )

    # Output
    parser.add_argument(
        "--output",
        type=str,
        default="reports",
        help="Output directory for reports (default: reports/).",
    )
    parser.add_argument(
        "--format",
        type=str,
        choices=["json", "markdown", "html", "all"],
        default="all",
        help="Report format (default: all).",
    )
    parser.add_argument(
        "--severity-threshold",
        type=str,
        choices=["INFO", "LOW", "MEDIUM", "HIGH", "CRITICAL"],
        default="INFO",
        help="Minimum severity to include in the report (default: INFO = show all).",
    )

    # Misc
    parser.add_argument(
        "--quiet",
        action="store_true",
        help="Suppress progress output.",
    )
    parser.add_argument(
        "--no-banner",
        action="store_true",
        help="Suppress the ASCII banner.",
    )

    return parser


def run_scan(args: argparse.Namespace) -> list[EnrichedFinding]:
    """Execute the full scanning pipeline and return enriched findings."""
    repo_path = os.path.abspath(args.repo)

    if not os.path.isdir(repo_path):
        print(f"Error: '{repo_path}' is not a valid directory.", file=sys.stderr)
        sys.exit(1)

    # ── Step 1: Parse diff or walk repo ──────────────────────────────
    if not args.quiet:
        print("[1/5] Parsing target files...")

    if args.json_input:
        hunks = DiffParser.parse_json_file(args.json_input, include_context=True)
        scan_mode = f"JSON payload: {args.json_input}"
    elif args.diff:
        if args.diff.endswith(".json"):
            hunks = DiffParser.parse_json_file(args.diff, include_context=True)
            scan_mode = f"JSON payload: {args.diff}"
        else:
            hunks = DiffParser.parse_diff_file(args.diff)
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
            print("  No files to scan.")
        return []

    if not args.quiet:
        total_lines = sum(len(h.added_lines) for h in hunks)
        print(f"  Found {len(hunks)} files, {total_lines} lines to scan ({scan_mode})")

    # ── Step 2: Rule matching ────────────────────────────────────────
    if not args.quiet:
        print("[2/5] Running rule engine...")

    registry = RuleRegistry()
    engine = RuleEngine(registry)
    hits = engine.scan_hunks(hunks)

    if not args.quiet:
        print(f"  Found {len(hits)} raw rule hits across {len(registry.all_rules)} rules")

    if not hits:
        if not args.quiet:
            print("  No vulnerabilities detected.")
        return []

    # ── Step 3: LLM analysis (if enabled) ────────────────────────────
    if not args.quiet:
        model_label = args.model if args.model != "none" else "none (rules only)"
        print(f"[3/5] LLM analysis ({model_label})...")

    provider_kwargs = {}
    if args.model_name:
        provider_kwargs["model_name"] = args.model_name
    if args.api_key:
        provider_kwargs["api_key"] = args.api_key
    if args.api_url:
        provider_kwargs["api_url"] = args.api_url

    provider = create_provider(args.model, **provider_kwargs)
    verdicts = provider.analyze_hits(hits)

    if not args.quiet:
        confirmed = sum(1 for v in verdicts.values() if v.is_true_positive)
        print(f"  {confirmed}/{len(verdicts)} hits confirmed as true positives")

    # ── Step 4: Build enriched findings ──────────────────────────────
    if not args.quiet:
        print("[4/5] Building enriched findings...")

    findings: list[EnrichedFinding] = []
    threshold_order = SEVERITY_ORDER.get(args.severity_threshold, 4)

    for hit in hits:
        verdict = verdicts.get(hit.fingerprint)

        # Skip false positives identified by LLM
        if verdict and not verdict.is_true_positive:
            continue

        finding = finding_from_rule_hit(hit)

        # Enrich with LLM verdict if available
        if verdict:
            finding.severity = verdict.adjusted_severity
            finding.what_and_why = verdict.what_and_why
            finding.how_to_fix = verdict.how_to_fix
            finding.why_fix_helps = verdict.why_fix_helps
            finding.confidence = verdict.confidence
            finding.llm_confirmed = True
        else:
            finding.llm_confirmed = None if args.model == "none" else False

        # Apply severity threshold filter
        finding_order = SEVERITY_ORDER.get(finding.severity, 4)
        if finding_order > threshold_order:
            continue

        findings.append(finding)

    if not args.quiet:
        print(f"  {len(findings)} findings after filtering (threshold: {args.severity_threshold})")

    return findings


def main() -> None:
    """Main entry point for the scanner CLI."""
    parser = build_parser()
    args = parser.parse_args()

    if not args.no_banner and not args.quiet:
        print(BANNER)

    start_time = time.time()

    # Validate custom model args
    if args.model == "custom" and not args.api_url:
        print("Error: --api-url is required when using --model=custom", file=sys.stderr)
        sys.exit(1)

    # Run the scan
    findings = run_scan(args)

    if not findings:
        if not args.quiet:
            elapsed = time.time() - start_time
            print(f"\nScan complete in {elapsed:.1f}s. No findings to report.")
        sys.exit(0)

    # ── Step 5: Generate reports ─────────────────────────────────────
    if not args.quiet:
        print("[5/5] Generating reports...")

    builder = ReportBuilder(findings, model_used=args.model)

    # Create timestamped output directory
    timestamp = time.strftime("%Y-%m-%dT%H-%M-%S")
    output_dir = os.path.join(args.output, f"scan-{timestamp}")

    fmt = args.format
    created_files: list[str] = []

    if fmt == "all":
        created_files = builder.save_all(output_dir)
    elif fmt == "json":
        os.makedirs(output_dir, exist_ok=True)
        path = os.path.join(output_dir, "findings.json")
        with open(path, "w", encoding="utf-8") as f:
            f.write(builder.build_json())
        created_files.append(path)
    elif fmt == "markdown":
        os.makedirs(output_dir, exist_ok=True)
        path = os.path.join(output_dir, "report.md")
        with open(path, "w", encoding="utf-8") as f:
            f.write(builder.build_markdown())
        created_files.append(path)
    elif fmt == "html":
        os.makedirs(output_dir, exist_ok=True)
        path = os.path.join(output_dir, "report.html")
        with open(path, "w", encoding="utf-8") as f:
            f.write(builder.build_html())
        created_files.append(path)

    # Always write/update the latest HTML report at the root output directory
    os.makedirs(args.output, exist_ok=True)
    latest_html_path = os.path.join(args.output, "report.html")
    with open(latest_html_path, "w", encoding="utf-8") as f:
        f.write(builder.build_html())
    if latest_html_path not in created_files:
        created_files.append(latest_html_path)

    elapsed = time.time() - start_time

    if not args.quiet:
        print(f"\nScan complete in {elapsed:.1f}s.")
        print(f"\n{'='*60}")
        print(f"  RESULTS SUMMARY")
        print(f"{'='*60}")

        # Severity breakdown
        severity_counts: dict[str, int] = {}
        for f in findings:
            severity_counts[f.severity] = severity_counts.get(f.severity, 0) + 1

        for sev in ["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"]:
            count = severity_counts.get(sev, 0)
            if count > 0:
                marker = {"CRITICAL": "[!!!]", "HIGH": "[!!]", "MEDIUM": "[!]", "LOW": "[~]", "INFO": "[i]"}.get(sev, "")
                print(f"  {marker} {sev}: {count}")

        print(f"\n  Total findings: {len(findings)}")
        print(f"\n  Reports saved to:")
        for fp in created_files:
            print(f"    -> {fp}")
        print(f"{'='*60}")

    # Exit code: 1 if CRITICAL/HIGH findings exist
    has_critical = any(f.severity in ("CRITICAL", "HIGH") for f in findings)
    sys.exit(1 if has_critical else 0)


if __name__ == "__main__":
    main()
