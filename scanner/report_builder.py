import json
import os
from datetime import datetime
from html import escape
from typing import Any, Dict, List

from scanner.findings import EnrichedFinding

class ReportBuilder:
    def __init__(self, findings: list[EnrichedFinding], model_used: str = "none"):
        self.findings = sorted(findings, key=lambda f: self._severity_order(f.severity))
        self.model_used = model_used
    
    @staticmethod
    def _severity_order(severity: str) -> int:
        mapping = {
            "CRITICAL": 0,
            "HIGH": 1,
            "MEDIUM": 2,
            "LOW": 3,
            "INFO": 4
        }
        return mapping.get(severity.upper(), 5)
    
    @staticmethod
    def _severity_emoji(severity: str) -> str:
        mapping = {
            "CRITICAL": "🔴",
            "HIGH": "🟠",
            "MEDIUM": "🟡",
            "LOW": "🔵",
            "INFO": "⚪"
        }
        return mapping.get(severity.upper(), "⚪")

    def build_json(self) -> str:
        counts = {"CRITICAL": 0, "HIGH": 0, "MEDIUM": 0, "LOW": 0, "INFO": 0}
        for f in self.findings:
            sev = f.severity.upper()
            if sev in counts:
                counts[sev] += 1
                
        metadata = {
            "timestamp": datetime.now().isoformat(),
            "total_findings": len(self.findings),
            "by_severity": counts,
            "model_used": self.model_used
        }
        
        # EnrichedFinding must implement to_dict() per spec
        output = {
            "scan_metadata": metadata,
            "findings": [f.to_dict() if hasattr(f, "to_dict") else vars(f) for f in self.findings]
        }
        return json.dumps(output, indent=2)

    def build_markdown(self) -> str:
        lines = [
            "# Security Scan Report",
            "",
            "| Severity | Location | What & Why (Impact) | All Occurrences | How to Fix | Why Fix Helps |",
            "|----------|----------|---------------------|-----------------|------------|---------------|"
        ]
        
        for f in self.findings:
            sev_str = f"{self._severity_emoji(f.severity)} {f.severity.upper()}"
            location = f"{f.file}:{f.line}"
            what = str(f.what_and_why).replace("\n", " ").replace("|", "\\|")
            raw_occ = getattr(f, "occurrences", []) or [{"file": f.file, "line": f.line}]
            occ_strs = []
            for occ in raw_occ:
                if isinstance(occ, dict):
                    occ_strs.append(f"{occ.get('file', '')}:{occ.get('line', '')}")
                else:
                    occ_strs.append(str(occ))
            occurrences = "<br>".join(occ_strs)
            fix = str(f.how_to_fix).replace("\n", " ").replace("|", "\\|")
            why_fix = str(f.why_fix_helps).replace("\n", " ").replace("|", "\\|")
            
            row = f"| {sev_str} | {location} | {what} | {occurrences} | {fix} | {why_fix} |"
            lines.append(row)
            
        return "\n".join(lines)

    def build_html(self) -> str:
        counts = {"CRITICAL": 0, "HIGH": 0, "MEDIUM": 0, "LOW": 0, "INFO": 0}
        for f in self.findings:
            sev = f.severity.upper()
            if sev in counts:
                counts[sev] += 1
                
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        total = len(self.findings)
        
        html_parts = []
        html_parts.append("<!DOCTYPE html>")
        html_parts.append("<html lang='en'><head>")
        html_parts.append("<meta charset='UTF-8'>")
        html_parts.append("<meta name='viewport' content='width=device-width, initial-scale=1.0'>")
        html_parts.append("<title>Security Scan Report</title>")
        html_parts.append("<style>")
        html_parts.append("*, *::before, *::after { box-sizing: border-box; }")
        html_parts.append("body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 30px; color: #1f2328; background: #f6f8fa; line-height: 1.5; }")
        html_parts.append(".container { max-width: 1400px; margin: 0 auto; background: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); overflow: hidden; border: 1px solid #d0d7de; }")
        html_parts.append(".header { background: linear-gradient(135deg, #1f2937, #111827); color: #ffffff; padding: 28px 32px; border-bottom: 1px solid #374151; }")
        html_parts.append(".header h1 { margin: 0 0 8px 0; font-size: 1.75rem; font-weight: 700; display: flex; align-items: center; gap: 10px; }")
        html_parts.append(".header .meta { color: #9ca3af; font-size: 0.9rem; display: flex; gap: 20px; flex-wrap: wrap; }")
        html_parts.append(".header .meta span { display: inline-flex; align-items: center; gap: 5px; }")
        html_parts.append(".content { padding: 32px; }")
        html_parts.append(".stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; margin-bottom: 28px; }")
        html_parts.append(".stat-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; text-align: center; }")
        html_parts.append(".stat-card .num { font-size: 1.8rem; font-weight: 700; margin-bottom: 4px; }")
        html_parts.append(".stat-card .label { font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600; }")
        html_parts.append(".table-wrapper { overflow-x: auto; border: 1px solid #e2e8f0; border-radius: 8px; }")
        html_parts.append("table { width: 100%; border-collapse: collapse; font-size: 0.92rem; text-align: left; }")
        html_parts.append("th { background: #f1f5f9; color: #334155; font-weight: 600; padding: 14px 16px; border-bottom: 2px solid #cbd5e1; white-space: nowrap; }")
        html_parts.append("td { padding: 14px 16px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }")
        html_parts.append("tr:nth-child(even) { background-color: #fafafa; }")
        html_parts.append("tr:hover { background-color: #f8fafc; }")
        html_parts.append(".badge { padding: 5px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.03em; color: #ffffff; display: inline-block; white-space: nowrap; }")
        html_parts.append(".badge-critical { background-color: #dc2626; }")
        html_parts.append(".badge-high { background-color: #ea580c; }")
        html_parts.append(".badge-medium { background-color: #d97706; }")
        html_parts.append(".badge-low { background-color: #2563eb; }")
        html_parts.append(".badge-info { background-color: #64748b; }")
        html_parts.append(".loc-code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.85rem; background: #f1f5f9; color: #0f172a; padding: 3px 6px; border-radius: 4px; border: 1px solid #e2e8f0; white-space: nowrap; }")
        html_parts.append("details { background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px 10px; border-radius: 6px; margin-top: 6px; font-size: 0.85rem; }")
        html_parts.append("summary { cursor: pointer; font-weight: 600; color: #475569; }")
        html_parts.append("summary:hover { color: #0f172a; }")
        html_parts.append("pre { margin: 6px 0 0 0; white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.82rem; color: #334155; }")
        html_parts.append("</style>")
        html_parts.append("</head><body>")
        html_parts.append("<div class='container'>")
        
        # Header
        html_parts.append("<div class='header'>")
        html_parts.append("<h1>🛡️ Security Vulnerability Scan Report</h1>")
        html_parts.append("<div class='meta'>")
        html_parts.append(f"<span>📅 Generated: {timestamp}</span>")
        html_parts.append(f"<span>🤖 Model: {escape(self.model_used)}</span>")
        html_parts.append(f"<span>📊 Total Findings: {total}</span>")
        html_parts.append("</div></div>")
        
        # Content
        html_parts.append("<div class='content'>")
        
        # Stats Grid
        html_parts.append("<div class='stats-grid'>")
        html_parts.append(f"<div class='stat-card'><div class='num' style='color:#0f172a;'>{total}</div><div class='label'>Total Findings</div></div>")
        html_parts.append(f"<div class='stat-card'><div class='num' style='color:#dc2626;'>{counts['CRITICAL']}</div><div class='label'>Critical</div></div>")
        html_parts.append(f"<div class='stat-card'><div class='num' style='color:#ea580c;'>{counts['HIGH']}</div><div class='label'>High</div></div>")
        html_parts.append(f"<div class='stat-card'><div class='num' style='color:#d97706;'>{counts['MEDIUM']}</div><div class='label'>Medium</div></div>")
        html_parts.append(f"<div class='stat-card'><div class='num' style='color:#2563eb;'>{counts['LOW']}</div><div class='label'>Low</div></div>")
        html_parts.append(f"<div class='stat-card'><div class='num' style='color:#64748b;'>{counts['INFO']}</div><div class='label'>Info</div></div>")
        html_parts.append("</div>")
        
        # Table
        html_parts.append("<div class='table-wrapper'>")
        html_parts.append("<table id='reportTable'>")
        html_parts.append("<thead><tr>")
        html_parts.append("<th style='width: 110px;'>Severity</th>")
        html_parts.append("<th style='width: 150px;'>Location</th>")
        html_parts.append("<th style='min-width: 280px;'>What & Why (Impact)</th>")
        html_parts.append("<th style='width: 160px;'>All Occurrences</th>")
        html_parts.append("<th style='min-width: 250px;'>How to Fix</th>")
        html_parts.append("<th style='min-width: 250px;'>Why Fix Helps</th>")
        html_parts.append("</tr></thead><tbody>")
        
        for f in self.findings:
            sev_lower = f.severity.lower()
            badge_class = f"badge badge-{sev_lower}" if sev_lower in ["critical", "high", "medium", "low", "info"] else "badge badge-info"
            sev_badge = f"<span class='{badge_class}'>{escape(f.severity.upper())}</span>"
            
            loc = escape(f"{f.file}:{f.line}")
            what = escape(str(f.what_and_why)).replace("\n", "<br>")
            
            occurrences_raw = getattr(f, "occurrences", []) or [{"file": f.file, "line": f.line}]
            occ_strs = []
            for occ in occurrences_raw:
                if isinstance(occ, dict):
                    occ_strs.append(f"{occ.get('file', '')}:{occ.get('line', '')}")
                else:
                    occ_strs.append(str(occ))
            occ_html = "<details><summary>View occurrences</summary><pre>" + escape("\n".join(occ_strs)) + "</pre></details>"
            
            fix = escape(str(f.how_to_fix)).replace("\n", "<br>")
            why = escape(str(f.why_fix_helps)).replace("\n", "<br>")
            
            html_parts.append("<tr>")
            html_parts.append(f"<td>{sev_badge}</td>")
            html_parts.append(f"<td><span class='loc-code'>{loc}</span></td>")
            html_parts.append(f"<td>{what}</td>")
            html_parts.append(f"<td>{occ_html}</td>")
            html_parts.append(f"<td>{fix}</td>")
            html_parts.append(f"<td>{why}</td>")
            html_parts.append("</tr>")
            
        html_parts.append("</tbody></table>")
        html_parts.append("</div>")  # .table-wrapper
        html_parts.append("</div>")  # .content
        html_parts.append("</div>")  # .container
        html_parts.append("</body></html>")
        
        return "".join(html_parts)

    def save_all(self, output_dir: str) -> list[str]:
        os.makedirs(output_dir, exist_ok=True)
        created_files = []
        
        json_path = os.path.join(output_dir, "report.json")
        with open(json_path, "w", encoding="utf-8") as f:
            f.write(self.build_json())
        created_files.append(json_path)
        
        md_path = os.path.join(output_dir, "report.md")
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(self.build_markdown())
        created_files.append(md_path)
        
        html_path = os.path.join(output_dir, "report.html")
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(self.build_html())
        created_files.append(html_path)
        
        return created_files
