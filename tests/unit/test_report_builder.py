"""Unit tests for the report builder."""

import json
import os
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from scanner.findings import EnrichedFinding
from scanner.report_builder import ReportBuilder


def make_finding(
    severity="HIGH",
    rule="CWE-89.SQL_CONCAT",
    file="app.py",
    line=42,
    what="SQL injection via string concatenation. Attacker can dump entire database.",
    fix="Use parameterized queries: cursor.execute('SELECT * FROM t WHERE id=?', (id,))",
    why_fix="Parameterized queries separate data from code, preventing injection.",
    cwe="89",
    category="Injection",
) -> EnrichedFinding:
    return EnrichedFinding(
        id="test-finding-001",
        tool="rule_engine",
        rule=rule,
        severity=severity,
        file=file,
        line=line,
        message="Potential SQL injection",
        confidence=0.9,
        cwe=cwe,
        category=category,
        what_and_why=what,
        location_detail=f"Line {line}: cursor.execute(f'...')",
        how_to_fix=fix,
        why_fix_helps=why_fix,
        llm_confirmed=True,
        occurrences=[{"file": file, "line": line}, {"file": "db.py", "line": 15}],
    )


class TestReportBuilder:
    """Tests for the ReportBuilder class."""

    def test_build_json_valid(self):
        findings = [make_finding()]
        builder = ReportBuilder(findings, model_used="gemini")
        result = json.loads(builder.build_json())

        assert "scan_metadata" in result
        assert "findings" in result
        assert result["scan_metadata"]["total_findings"] == 1
        assert result["scan_metadata"]["model_used"] == "gemini"
        assert result["scan_metadata"]["by_severity"]["HIGH"] == 1

    def test_build_json_findings_schema(self):
        findings = [make_finding()]
        builder = ReportBuilder(findings)
        result = json.loads(builder.build_json())

        f = result["findings"][0]
        assert f["id"] == "test-finding-001"
        assert f["severity"] == "HIGH"
        assert f["cwe"] == "89"
        assert f["what_and_why"] != ""
        assert f["how_to_fix"] != ""
        assert f["why_fix_helps"] != ""
        assert len(f["occurrences"]) == 2

    def test_build_markdown_has_headers(self):
        findings = [make_finding()]
        builder = ReportBuilder(findings)
        md = builder.build_markdown()

        assert "# Security Scan Report" in md
        assert "Severity" in md
        assert "Location" in md
        assert "What & Why" in md
        assert "How to Fix" in md
        assert "Why Fix Helps" in md

    def test_build_markdown_has_severity_emoji(self):
        findings = [make_finding(severity="CRITICAL")]
        builder = ReportBuilder(findings)
        md = builder.build_markdown()
        assert "🔴" in md
        assert "CRITICAL" in md

    def test_build_markdown_has_location(self):
        findings = [make_finding(file="src/db.py", line=42)]
        builder = ReportBuilder(findings)
        md = builder.build_markdown()
        assert "src/db.py:42" in md

    def test_build_html_valid(self):
        findings = [make_finding()]
        builder = ReportBuilder(findings)
        html = builder.build_html()

        assert "<!DOCTYPE html>" in html
        assert "Security Scan Report" in html
        assert "<table" in html
        assert "badge" in html

    def test_build_html_severity_badges(self):
        findings = [
            make_finding(severity="CRITICAL"),
            make_finding(severity="LOW"),
        ]
        # Give second finding a different id to avoid dedup issues
        findings[1].id = "test-finding-002"
        builder = ReportBuilder(findings)
        html = builder.build_html()

        assert "badge-critical" in html
        assert "badge-low" in html

    def test_build_html_stats(self):
        findings = [make_finding(), make_finding(severity="MEDIUM")]
        findings[1].id = "test-finding-002"
        builder = ReportBuilder(findings)
        html = builder.build_html()

        assert "Total Findings: 2" in html

    def test_build_html_occurrences_collapsible(self):
        findings = [make_finding()]
        builder = ReportBuilder(findings)
        html = builder.build_html()

        assert "<details>" in html
        assert "View occurrences" in html

    def test_severity_ordering(self):
        findings = [
            make_finding(severity="LOW"),
            make_finding(severity="CRITICAL"),
            make_finding(severity="HIGH"),
        ]
        findings[0].id = "f-low"
        findings[1].id = "f-critical"
        findings[2].id = "f-high"
        builder = ReportBuilder(findings)

        assert builder.findings[0].severity == "CRITICAL"
        assert builder.findings[1].severity == "HIGH"
        assert builder.findings[2].severity == "LOW"

    def test_save_all_creates_files(self):
        findings = [make_finding()]
        builder = ReportBuilder(findings)

        with tempfile.TemporaryDirectory() as tmpdir:
            output_dir = os.path.join(tmpdir, "test-report")
            created = builder.save_all(output_dir)

            assert len(created) == 3
            for path in created:
                assert os.path.exists(path)

            # Verify file contents are non-empty
            for path in created:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                    assert len(content) > 0

    def test_empty_findings(self):
        builder = ReportBuilder([])
        
        json_str = builder.build_json()
        result = json.loads(json_str)
        assert result["scan_metadata"]["total_findings"] == 0
        assert len(result["findings"]) == 0

        md = builder.build_markdown()
        assert "Security Scan Report" in md

        html = builder.build_html()
        assert "Total Findings: 0" in html

