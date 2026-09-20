"""
Orchestrator Pipeline — scan findings → remediation → git branch → PR.

Ties the remediation agent to git operations: creates a branch, applies
AI-generated fixes, commits, pushes, and opens a pull request.
"""
from __future__ import annotations

import json
import logging
import os
import subprocess
import sys
import textwrap
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

from remediation.remediation_agent import RemediationAgent, RemediationResult

log = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

@dataclass
class PipelineConfig:
    """Configuration for a pipeline run."""
    repo_path: str = "."
    findings_path: str = ""
    api_key: str = ""
    model_name: str = "gemini-2.5-flash"
    base_ref: str = "main"
    severity_threshold: str = "INFO"      # Minimum severity to remediate
    dry_run: bool = False                  # If True, don't push or create PR
    branch_prefix: str = "security-remediation"
    context_window: int = 30

    def __post_init__(self):
        if not self.api_key:
            self.api_key = os.environ.get("GEMINI_API_KEY", "")


# ---------------------------------------------------------------------------
# Git operations
# ---------------------------------------------------------------------------

SEVERITY_ORDER = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3, "INFO": 4}


class GitOps:
    """Thin wrapper around git subprocess calls."""

    def __init__(self, repo_path: str):
        self.repo_path = str(Path(repo_path).resolve())

    def _run(self, *args: str, check: bool = True) -> str:
        result = subprocess.run(
            ["git", *args],
            cwd=self.repo_path,
            capture_output=True,
            text=True,
        )
        if check and result.returncode != 0:
            raise RuntimeError(
                f"git {' '.join(args)} failed (rc={result.returncode}):\n"
                f"{result.stderr.strip()}"
            )
        return result.stdout.strip()

    def get_current_sha(self) -> str:
        return self._run("rev-parse", "HEAD")

    def get_short_sha(self, length: int = 12) -> str:
        return self.get_current_sha()[:length]

    def get_current_branch(self) -> str:
        return self._run("rev-parse", "--abbrev-ref", "HEAD")

    def create_branch(self, branch_name: str) -> None:
        self._run("checkout", "-b", branch_name)
        log.info("Created branch: %s", branch_name)

    def checkout(self, ref: str) -> None:
        self._run("checkout", ref)

    def stage_all(self) -> None:
        self._run("add", "-A")

    def commit(self, message: str) -> str:
        """Commit staged changes. Returns the commit SHA."""
        self._run("config", "user.name", "pre-prod-tester[bot]", check=False)
        self._run("config", "user.email",
                  "41898282+github-actions[bot]@users.noreply.github.com",
                  check=False)
        self._run("commit", "-m", message)
        return self.get_current_sha()

    def push(self, branch_name: str) -> None:
        self._run("push", "--set-upstream", "origin", branch_name)
        log.info("Pushed branch: %s", branch_name)

    def has_changes(self) -> bool:
        """Check if there are any uncommitted changes."""
        status = self._run("status", "--porcelain")
        return bool(status.strip())

    def create_pr(
        self,
        base: str,
        head: str,
        title: str,
        body: str,
    ) -> str | None:
        """Create a PR using GitHub CLI. Returns PR URL or None."""
        try:
            result = subprocess.run(
                [
                    "gh", "pr", "create",
                    "--base", base,
                    "--head", head,
                    "--title", title,
                    "--body", body,
                ],
                cwd=self.repo_path,
                capture_output=True,
                text=True,
            )
            if result.returncode == 0:
                pr_url = result.stdout.strip()
                log.info("Created PR: %s", pr_url)
                return pr_url
            else:
                log.error("gh pr create failed: %s", result.stderr.strip())
                return None
        except FileNotFoundError:
            log.warning("GitHub CLI (gh) not found — cannot create PR")
            return None


# ---------------------------------------------------------------------------
# PR body builder
# ---------------------------------------------------------------------------

def build_pr_body(
    findings: list[dict],
    results: list[RemediationResult],
) -> str:
    """Build a markdown PR body summarizing what was fixed."""
    applied = [r for r in results if r.status == "APPLIED"]
    failed = [r for r in results if r.status == "FAILED"]
    skipped = [r for r in results if r.status == "SKIPPED"]

    lines = [
        "## 🛡️ AI Security Remediation",
        "",
        f"**{len(applied)}** finding(s) fixed | "
        f"**{len(failed)}** failed | "
        f"**{len(skipped)}** skipped",
        "",
    ]

    if applied:
        lines.append("### ✅ Applied Fixes")
        lines.append("")
        lines.append("| Finding | File | Line | CWE | Severity | Fix |")
        lines.append("|---------|------|------|-----|----------|-----|")

        # Build finding lookup for metadata
        finding_map = {f.get("id", ""): f for f in findings}

        for result in applied:
            f = finding_map.get(result.finding_id, {})
            for edit in result.edits:
                lines.append(
                    f"| `{f.get('rule', 'N/A')}` "
                    f"| `{edit.file}` "
                    f"| L{edit.start_line}-{edit.end_line} "
                    f"| CWE-{f.get('cwe', '?')} "
                    f"| {f.get('severity', '?')} "
                    f"| {edit.explanation} |"
                )

        lines.append("")

        # Show diffs for each applied edit
        lines.append("<details>")
        lines.append("<summary>📝 Detailed changes</summary>")
        lines.append("")

        for result in applied:
            f = finding_map.get(result.finding_id, {})
            lines.append(f"#### {f.get('rule', result.finding_id)} — `{f.get('file', '?')}:{f.get('line', '?')}`")
            lines.append("")
            lines.append(f"**{f.get('what_and_why', f.get('message', ''))}**")
            lines.append("")

            for edit in result.edits:
                lines.append(f"**`{edit.file}` L{edit.start_line}-{edit.end_line}:**")
                lines.append("```diff")
                for orig_line in edit.original.splitlines():
                    lines.append(f"- {orig_line}")
                for repl_line in edit.replacement.splitlines():
                    lines.append(f"+ {repl_line}")
                lines.append("```")
                lines.append("")

        lines.append("</details>")
        lines.append("")

    if failed:
        lines.append("### ❌ Failed")
        lines.append("")
        for result in failed:
            lines.append(f"- `{result.finding_id}`: {result.error}")
        lines.append("")

    if skipped:
        lines.append("### ⏭️ Skipped")
        lines.append("")
        for result in skipped:
            lines.append(f"- `{result.finding_id}`: {result.error}")
        lines.append("")

    lines.extend([
        "---",
        "",
        "> ⚠️ **Human review required.** These fixes were generated by AI and must "
        "be reviewed before merging. Do not auto-merge this PR.",
        "",
        "*Generated by [Pre-Prod Tester](https://github.com/dis-craft/Pre-prod-tester)*",
    ])

    return "\n".join(lines)


def build_remediation_html(
    findings: list[dict],
    results: list[RemediationResult],
    branch: str = "",
    commit_sha: str = "",
) -> str:
    """Build an HTML report summarizing the AI security remediations."""
    from html import escape
    from datetime import datetime, timezone

    applied = [r for r in results if r.status == "APPLIED"]
    failed = [r for r in results if r.status == "FAILED"]
    skipped = [r for r in results if r.status == "SKIPPED"]
    finding_map = {f.get("id", ""): f for f in findings}
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")

    html = []
    html.append("<!DOCTYPE html>")
    html.append("<html lang='en'><head><meta charset='utf-8'>")
    html.append("<meta name='viewport' content='width=device-width, initial-scale=1'>")
    html.append("<title>AI Security Remediation Report</title>")
    html.append("<style>")
    html.append("*, *::before, *::after { box-sizing: border-box; }")
    html.append("body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 30px; color: #1f2328; background: #f6f8fa; line-height: 1.5; }")
    html.append(".container { max-width: 1400px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); overflow: hidden; border: 1px solid #d0d7de; }")
    html.append(".header { background: linear-gradient(135deg, #0f172a, #1e293b); color: #ffffff; padding: 28px 32px; border-bottom: 1px solid #334155; }")
    html.append(".header h1 { margin: 0 0 8px 0; font-size: 1.75rem; font-weight: 700; display: flex; align-items: center; gap: 10px; }")
    html.append(".header .meta { color: #94a3b8; font-size: 0.9rem; display: flex; gap: 20px; flex-wrap: wrap; }")
    html.append(".content { padding: 32px; }")
    html.append(".stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 28px; }")
    html.append(".stat-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; text-align: center; }")
    html.append(".stat-card .num { font-size: 1.8rem; font-weight: 700; margin-bottom: 4px; }")
    html.append(".stat-card .label { font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600; }")
    html.append(".table-wrapper { overflow-x: auto; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 28px; }")
    html.append("table { width: 100%; border-collapse: collapse; font-size: 0.92rem; text-align: left; }")
    html.append("th { background: #f1f5f9; color: #334155; font-weight: 600; padding: 14px 16px; border-bottom: 2px solid #cbd5e1; white-space: nowrap; }")
    html.append("td { padding: 14px 16px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }")
    html.append("tr:nth-child(even) { background-color: #fafafa; }")
    html.append("tr:hover { background-color: #f8fafc; }")
    html.append(".badge { padding: 4px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; color: #ffffff; display: inline-block; }")
    html.append(".badge-critical { background-color: #dc2626; }")
    html.append(".badge-high { background-color: #ea580c; }")
    html.append(".badge-medium { background-color: #d97706; }")
    html.append(".badge-low { background-color: #2563eb; }")
    html.append(".badge-info { background-color: #64748b; }")
    html.append(".badge-success { background-color: #16a34a; }")
    html.append(".badge-danger { background-color: #dc2626; }")
    html.append(".diff-box { background: #0f172a; color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.85rem; overflow-x: auto; line-height: 1.6; margin-top: 10px; }")
    html.append(".diff-del { color: #f87171; background: rgba(239, 68, 68, 0.15); display: block; padding: 0 4px; }")
    html.append(".diff-add { color: #4ade80; background: rgba(34, 197, 94, 0.15); display: block; padding: 0 4px; }")
    html.append(".card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; background: #ffffff; }")
    html.append(".card h3 { margin: 0 0 10px 0; font-size: 1.1rem; color: #0f172a; display: flex; align-items: center; gap: 8px; }")
    html.append(".alert-box { background: #fffbeb; border: 1px solid #fef3c7; color: #92400e; padding: 14px 18px; border-radius: 6px; margin-top: 24px; font-size: 0.9rem; }")
    html.append("</style></head><body>")
    html.append("<div class='container'>")

    # Header
    html.append("<div class='header'>")
    html.append("<h1>🛡️ AI Security Remediation Report</h1>")
    html.append("<div class='meta'>")
    html.append(f"<span>📅 Generated: {escape(timestamp)}</span>")
    if branch:
        html.append(f"<span>🌿 Branch: <code>{escape(branch)}</code></span>")
    if commit_sha:
        html.append(f"<span>📌 Commit: <code>{escape(commit_sha[:12])}</code></span>")
    html.append("</div>")
    html.append("<div style='margin-top:14px;display:flex;gap:10px;'>")
    html.append("<a href='../flow.html' style='color:#ffffff;background:#1d4ed8;padding:6px 12px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;'>⚡ Live Security Flow</a>")
    html.append("<a href='../index.html' style='color:#e2e8f0;background:#334155;padding:6px 12px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:500;'>⬅ Dashboard (Diff Viewer)</a>")
    html.append("</div></div>")

    # Content
    html.append("<div class='content'>")

    # Stats
    html.append("<div class='stats-grid'>")
    html.append(f"<div class='stat-card'><div class='num' style='color:#0f172a;'>{len(findings)}</div><div class='label'>Total Scanned</div></div>")
    html.append(f"<div class='stat-card'><div class='num' style='color:#16a34a;'>{len(applied)}</div><div class='label'>Fixed & Applied</div></div>")
    html.append(f"<div class='stat-card'><div class='num' style='color:#dc2626;'>{len(failed)}</div><div class='label'>Failed / Quota</div></div>")
    html.append(f"<div class='stat-card'><div class='num' style='color:#64748b;'>{len(skipped)}</div><div class='label'>Skipped</div></div>")
    html.append("</div>")

    # Table of fixes
    if applied:
        html.append("<h2>✅ Applied Remediations</h2>")
        html.append("<div class='table-wrapper'><table>")
        html.append("<thead><tr><th>Rule</th><th>File</th><th>Lines</th><th>CWE</th><th>Severity</th><th>Fix Summary</th></tr></thead><tbody>")
        for res in applied:
            f = finding_map.get(res.finding_id, {})
            sev = (f.get("severity") or "INFO").lower()
            for edit in res.edits:
                html.append("<tr>")
                html.append(f"<td><code>{escape(f.get('rule', 'N/A'))}</code></td>")
                html.append(f"<td><code>{escape(edit.file)}</code></td>")
                html.append(f"<td>L{edit.start_line}-{edit.end_line}</td>")
                html.append(f"<td>CWE-{escape(str(f.get('cwe', '?')))}</td>")
                html.append(f"<td><span class='badge badge-{sev}'>{escape(f.get('severity', 'INFO'))}</span></td>")
                html.append(f"<td>{escape(edit.explanation)}</td>")
                html.append("</tr>")
        html.append("</tbody></table></div>")

        # Code Diffs
        html.append("<h2>📝 Code Diff Details</h2>")
        for res in applied:
            f = finding_map.get(res.finding_id, {})
            html.append("<div class='card'>")
            html.append(f"<h3><code>{escape(f.get('rule', res.finding_id))}</code> in <code>{escape(f.get('file', '?'))}:{f.get('line', '?')}</code></h3>")
            if f.get("what_and_why"):
                html.append(f"<p style='color:#475569;'>{escape(f.get('what_and_why'))}</p>")

            for edit in res.edits:
                html.append(f"<strong><code>{escape(edit.file)}</code> (Lines {edit.start_line} - {edit.end_line}):</strong>")
                html.append("<div class='diff-box'>")
                for o_line in edit.original.splitlines():
                    html.append(f"<span class='diff-del'>- {escape(o_line)}</span>")
                for r_line in edit.replacement.splitlines():
                    html.append(f"<span class='diff-add'>+ {escape(r_line)}</span>")
                html.append("</div>")
            html.append("</div>")

    # Failures / Skipped
    if failed:
        html.append("<h2>❌ Failed Fixes</h2><div class='table-wrapper'><table>")
        html.append("<thead><tr><th>Finding ID</th><th>Reason</th></tr></thead><tbody>")
        for res in failed:
            html.append(f"<tr><td><code>{escape(res.finding_id)}</code></td><td>{escape(str(res.error))}</td></tr>")
        html.append("</tbody></table></div>")

    html.append("<div class='alert-box'>⚠️ <strong>Human Review Required:</strong> These fixes were generated by AI and verified syntactically. Please review and run repository tests before merging.</div>")
    html.append("</div></div></body></html>")
    return "\n".join(html)



# ---------------------------------------------------------------------------
# Pipeline
# ---------------------------------------------------------------------------

class Pipeline:
    """End-to-end: load findings → remediate → branch → commit → push → PR."""

    def __init__(self, config: PipelineConfig):
        self.config = config
        self.git = GitOps(config.repo_path)

    def run(self) -> dict:
        """Execute the full pipeline. Returns a summary dict."""
        cfg = self.config

        # 1. Load findings
        log.info("Loading findings from %s", cfg.findings_path)
        findings = self._load_findings(cfg.findings_path)

        if not findings:
            log.info("No findings to remediate.")
            return {"status": "NO_FINDINGS", "findings": 0}

        # Filter by severity threshold
        threshold = SEVERITY_ORDER.get(cfg.severity_threshold, 4)
        findings = [
            f for f in findings
            if SEVERITY_ORDER.get(f.get("severity", "INFO"), 4) <= threshold
        ]

        if not findings:
            log.info("No findings above severity threshold %s", cfg.severity_threshold)
            return {"status": "BELOW_THRESHOLD", "findings": 0}

        log.info("Processing %d findings", len(findings))

        # 2. Remediate
        agent = RemediationAgent(
            api_key=cfg.api_key,
            model_name=cfg.model_name,
            repo_path=cfg.repo_path,
            context_window=cfg.context_window,
        )
        results = agent.remediate_findings(findings)

        applied = [r for r in results if r.status == "APPLIED"]
        if not applied:
            log.info("No fixes were successfully applied.")
            return {
                "status": "NO_FIXES",
                "findings": len(findings),
                "results": [r.to_dict() for r in results],
            }

        log.info("%d/%d findings fixed", len(applied), len(findings))

        # 3. Write fixed files to disk
        written = agent.write_changes()
        log.info("Wrote %d files: %s", len(written), written)

        # Generate post-remediation reports on disk
        reports_dir = Path(self.config.repo_path) / "reports"
        reports_dir.mkdir(parents=True, exist_ok=True)
        report_md_path = reports_dir / "remediation-report.md"
        report_json_path = reports_dir / "remediation-report.json"
        report_html_path = reports_dir / "remediation-report.html"

        report_payload = {
            "branch": "dry-run" if cfg.dry_run else "",
            "commit": "dry-run" if cfg.dry_run else "",
            "findings_count": len(findings),
            "fixed_count": len(applied),
            "written_files": written,
            "results": [r.to_dict() for r in results]
        }
        report_md_path.write_text(build_pr_body(findings, results), encoding="utf-8")
        report_json_path.write_text(json.dumps(report_payload, indent=2) + "\n", encoding="utf-8")
        report_html = build_remediation_html(
            findings=findings,
            results=results,
            branch="dry-run" if cfg.dry_run else "",
            commit_sha="dry-run" if cfg.dry_run else "",
        )
        report_html_path.write_text(report_html, encoding="utf-8")
        log.info("Saved post-remediation reports to %s, %s, and %s", report_md_path, report_json_path, report_html_path)

        if cfg.dry_run:
            log.info("Dry run — skipping branch/commit/push/PR")
            return {
                "status": "DRY_RUN",
                "findings": len(findings),
                "fixed": len(applied),
                "written_files": written,
                "report_md": str(report_md_path),
                "report_json": str(report_json_path),
                "report_html": str(report_html_path),
                "results": [r.to_dict() for r in results],
            }


        # 4. Create branch
        sha = self.git.get_short_sha()
        original_branch = self.git.get_current_branch()
        branch_name = f"{cfg.branch_prefix}/{sha}"
        self.git.create_branch(branch_name)

        # 5. Commit
        if not self.git.has_changes():
            log.warning("No changes to commit after writing files")
            self.git.checkout(original_branch)
            return {"status": "NO_CHANGES", "findings": len(findings)}

        self.git.stage_all()
        commit_sha = self.git.commit(
            f"fix: apply AI security remediation for {len(applied)} finding(s)"
        )
        # 6. Push (if possible)
        pushed = False
        try:
            self.git.push(branch_name)
            pushed = True
        except Exception as exc:
            log.warning("Could not push branch to remote (kept local branch '%s'): %s", branch_name, exc)

        # 7. Create PR and save Post-Remediation Reports (Markdown, JSON, HTML)
        pr_body = build_pr_body(findings, results)

        # Generate post-remediation reports on disk
        reports_dir = Path(self.config.repo_path) / "reports"
        reports_dir.mkdir(parents=True, exist_ok=True)
        report_md_path = reports_dir / "remediation-report.md"
        report_json_path = reports_dir / "remediation-report.json"
        report_html_path = reports_dir / "remediation-report.html"

        report_payload = {
            "branch": branch_name,
            "commit": commit_sha,
            "findings_count": len(findings),
            "fixed_count": len(applied),
            "written_files": written,
            "results": [r.to_dict() for r in results]
        }
        report_md_path.write_text(pr_body, encoding="utf-8")
        report_json_path.write_text(json.dumps(report_payload, indent=2) + "\n", encoding="utf-8")
        
        # Build and write HTML report
        report_html = build_remediation_html(
            findings=findings,
            results=results,
            branch=branch_name,
            commit_sha=commit_sha,
        )
        report_html_path.write_text(report_html, encoding="utf-8")
        log.info("Saved post-remediation reports to %s, %s, and %s", report_md_path, report_json_path, report_html_path)

        pr_url = self.git.create_pr(
            base=cfg.base_ref,
            head=branch_name,
            title=f"fix: AI-generated security remediation ({len(applied)} fixes)",
            body=pr_body,
        )

        # Switch back to original branch
        self.git.checkout(original_branch)

        return {
            "status": "PR_CREATED" if pr_url else "PUSHED",
            "branch": branch_name,
            "commit": commit_sha,
            "pr_url": pr_url,
            "findings": len(findings),
            "fixed": len(applied),
            "written_files": written,
            "report_md": str(report_md_path),
            "report_json": str(report_json_path),
            "report_html": str(report_html_path),
            "results": [r.to_dict() for r in results],
        }

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------

    @staticmethod
    def _load_findings(path: str) -> list[dict]:
        """Load findings from a scanner report JSON or structured diff payload."""
        data = json.loads(Path(path).read_text(encoding="utf-8"))

        # 1. Direct findings list
        if isinstance(data, list):
            return data

        if isinstance(data, dict):
            # 2. Scanner report format: {"scan_metadata": {...}, "findings": [...]}
            if "findings" in data and isinstance(data["findings"], list):
                return data["findings"]
            # 3. Remediation request format: {"findings": [...]}
            if "result" in data and isinstance(data["result"], dict):
                return data["result"].get("findings", [])

            # 4. Raw diff capture format: {"scan": {...}, "changes": {...}, "files": [...]}
            if "scan" in data or "changes" in data:
                log.info("Input is a structured diff payload without pre-computed findings; scanning hunks...")
                from scanner.diff_parser import DiffParser
                from scanner.rule_engine import RuleEngine
                from scanner.rules import RuleRegistry
                from scanner.findings import finding_from_rule_hit

                hunks = DiffParser.parse_json_payload(data, include_context=True)
                registry = RuleRegistry()
                engine = RuleEngine(registry)
                hits = engine.scan_hunks(hunks)
                findings = [finding_from_rule_hit(hit).to_dict() for hit in hits]
                log.info("Detected %d vulnerabilities from diff payload", len(findings))
                return findings

        return []

