from __future__ import annotations
from dataclasses import dataclass, field
import re
from typing import Optional
import json
import hashlib
import uuid

@dataclass
class VulnRule:
    """A vulnerability detection rule with regex patterns."""
    id: str                    # e.g. 'CWE-89.SQL_CONCAT'
    cwe: str                   # e.g. '89'
    category: str              # e.g. 'injection'
    name: str                  # human readable name
    severity: str              # CRITICAL/HIGH/MEDIUM/LOW/INFO
    patterns: list[re.Pattern] # compiled regex patterns
    languages: list[str]       # file extensions like ['.py', '.js']
    description: str           # what this vulnerability is
    impact: str                # what an attacker can do
    remediation: str           # how to fix
    confidence: float = 0.8    # default confidence

@dataclass
class RuleHit:
    """A raw match from the rule engine before LLM analysis."""
    rule: VulnRule
    file: str
    line: int
    end_line: Optional[int]
    matched_text: str          # the actual matched line
    context: str               # surrounding function/block (~20 lines)
    fingerprint: str = ''      # for deduplication
    
    def __post_init__(self):
        if not self.fingerprint:
            raw = f"{self.rule.id}:{self.file}:{self.matched_text.strip()}"
            self.fingerprint = hashlib.sha256(raw.encode()).hexdigest()[:16]

@dataclass
class SecurityFinding:
    """Normalized finding conforming to contracts/finding.schema.json."""
    id: str
    tool: str
    rule: str
    severity: str
    file: str
    line: int
    message: str
    confidence: float
    end_line: Optional[int] = None
    fixability: str = 'UNKNOWN'
    metadata: dict = field(default_factory=dict)

    def to_dict(self) -> dict:
        d = {
            'id': self.id,
            'tool': self.tool,
            'rule': self.rule,
            'severity': self.severity,
            'file': self.file,
            'line': self.line,
            'message': self.message,
            'confidence': self.confidence,
            'fixability': self.fixability,
            'metadata': self.metadata,
        }
        if self.end_line is not None:
            d['end_line'] = self.end_line
        return d

@dataclass
class EnrichedFinding(SecurityFinding):
    """Finding enriched with LLM analysis and report-ready fields."""
    cwe: str = ''
    category: str = ''
    what_and_why: str = ''     # What vulnerability + why dangerous + attacker impact
    location_detail: str = ''  # Exact location with context snippet
    how_to_fix: str = ''       # Step-by-step remediation
    why_fix_helps: str = ''    # Why the fix mitigates the risk
    llm_confirmed: Optional[bool] = None  # None if no LLM used
    occurrences: list[dict] = field(default_factory=list)  # [{file, line}]

    def to_dict(self) -> dict:
        d = super().to_dict()
        d.update({
            'cwe': self.cwe,
            'category': self.category,
            'what_and_why': self.what_and_why,
            'location_detail': self.location_detail,
            'how_to_fix': self.how_to_fix,
            'why_fix_helps': self.why_fix_helps,
            'llm_confirmed': self.llm_confirmed,
            'occurrences': self.occurrences,
        })
        return d

def finding_from_rule_hit(hit: RuleHit) -> EnrichedFinding:
    return EnrichedFinding(
        id=str(uuid.uuid4()),
        tool='rule_engine',
        rule=hit.rule.id,
        severity=hit.rule.severity,
        file=hit.file,
        line=hit.line,
        message=hit.rule.description,
        confidence=hit.rule.confidence,
        end_line=hit.end_line,
        cwe=hit.rule.cwe,
        category=hit.rule.category,
        what_and_why=hit.rule.impact,
        location_detail=f"Line {hit.line}:\n{hit.matched_text}",
        how_to_fix=hit.rule.remediation,
        occurrences=[{'file': hit.file, 'line': hit.line}]
    )
