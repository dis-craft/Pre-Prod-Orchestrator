"""Security Diff Scanner — AI-powered vulnerability detection for git diffs and repositories."""

from scanner.findings import (
    VulnRule,
    RuleHit,
    SecurityFinding,
    EnrichedFinding,
    finding_from_rule_hit,
)
from scanner.rules import RuleRegistry
from scanner.diff_parser import DiffParser, DiffHunk
from scanner.rule_engine import RuleEngine
from scanner.llm_providers import (
    LLMProvider,
    GeminiProvider,
    OllamaProvider,
    CustomProvider,
    NoLLMProvider,
    create_provider,
)
from scanner.report_builder import ReportBuilder

__all__ = [
    "VulnRule",
    "RuleHit",
    "SecurityFinding",
    "EnrichedFinding",
    "finding_from_rule_hit",
    "RuleRegistry",
    "DiffParser",
    "DiffHunk",
    "RuleEngine",
    "LLMProvider",
    "GeminiProvider",
    "OllamaProvider",
    "CustomProvider",
    "NoLLMProvider",
    "create_provider",
    "ReportBuilder",
]

__version__ = "0.1.0"

