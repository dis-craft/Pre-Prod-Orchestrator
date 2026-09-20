# Pre-Prod Security Orchestrator

[![GitHub Repository](https://img.shields.io/badge/GitHub-dis--craft%2FPre--Prod--Orchestrator-181717?logo=github)](https://github.com/dis-craft/Pre-Prod-Orchestrator)
[![Python Version](https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python)](https://python.org)
[![Next.js](https://img.shields.io/badge/Dashboard-Next.js%2014-000000?logo=nextdotjs)](frontend/)
[![CI Workflow](https://github.com/dis-craft/Pre-Prod-Orchestrator/actions/workflows/preprod-security.yml/badge.svg)](https://github.com/dis-craft/Pre-Prod-Orchestrator/actions)

Automated vulnerability detection, LLM-assisted remediation, and verification pipeline for CI/CD workflows.

---

## System Architecture & Lifecycle

```
                  ┌─────────────────────────────────────────────────────────┐
                  │                      GitHub PR                          │
                  └──────────────────────────┬──────────────────────────────┘
                                             │
                                             ▼
                  ┌─────────────────────────────────────────────────────────┐
                  │              Scanner (`scanner/`)                       │
                  │  • Git diff & AST parsing                               │
                  │  • Deterministic rule engine (CWE / OWASP)              │
                  │  • LLM confirmation & triage enrichment                 │
                  └──────────────────────────┬──────────────────────────────┘
                                             │
                                             ▼ Normalized Findings (`contracts/finding.schema.json`)
                  ┌─────────────────────────────────────────────────────────┐
                  │             Remediation (`remediation/`)                │
                  │  • Context extraction (configurable line window)        │
                  │  • Structured JSON edit generation (Gemini / Ollama)    │
                  │  • In-place patch application & verification            │
                  └──────────────────────────┬──────────────────────────────┘
                                             │
                                             ▼ Candidate Patches
                  ┌─────────────────────────────────────────────────────────┐
                  │            Orchestrator (`orchestrator/`)               │
                  │  • Severity threshold filtering                         │
                  │  • Branch creation (`security-remediation/...`)         │
                  │  • Commit, push, and Pull Request dispatching           │
                  │  • Audit report generation & evidence logging           │
                  └──────────────────────────┬──────────────────────────────┘
                                             │
                                             ▼
                  ┌─────────────────────────────────────────────────────────┐
                  │              Human Review & CI Verification             │
                  └─────────────────────────────────────────────────────────┘
```

---

## Core Components

| Module | Directory | Role | Description |
|---|---|---|---|
| **Scanner** | [`scanner/`](scanner/) | Detection | Multi-language static vulnerability detection, diff parsing, finding deduplication, and optional LLM confirmation. |
| **Remediation** | [`remediation/`](remediation/) | Fix Generation | Context extraction around vulnerable lines, structured JSON patch synthesis, and safe code updates. |
| **Orchestrator** | [`orchestrator/`](orchestrator/) | Workflow Engine | Pipeline coordination, git branch lifecycle, severity filtering, and automated remediation PR creation. |
| **Contracts** | [`contracts/`](contracts/) | Schemas | Versioned JSON schemas (`finding.schema.json`, `remediation.schema.json`) defining component boundaries. |
| **Frontend** | [`frontend/`](frontend/) | Dashboard | Next.js web application visualizing scan reports, finding severity breakdowns, and PR audit trails. |
| **Platform / CI** | [`.github/workflows/`](.github/workflows/) | Automation | GitHub Actions workflows for continuous scanning, CI remediation bridge execution, and test suites. |

---

## Safety & Governance Policies

- **Human Review Required**: AI-generated remediation patches are never auto-merged. Every fix is proposed as a distinct pull request with structured evidence for engineer sign-off.
- **Deterministic-First Analysis**: Vulnerability detection prioritizes deterministic AST and regex rules; LLMs are strictly used for finding confirmation and remediation proposal generation.
- **Scoped Code Context**: LLM queries receive only localized context windows around vulnerable lines (default ±30 lines)—preventing repository-wide data leakage.
- **Decoupled Architecture**: All modules communicate via validated JSON contracts in [`contracts/`](contracts/).

---

## Setup & Installation

### 1. Prerequisites

- Python 3.10 or higher
- Node.js 18+ (for dashboard)
- Git 2.30+
- Google Gemini API key (or local Ollama instance)

### 2. Backend Setup

```bash
# Clone the repository
git clone https://github.com/dis-craft/Pre-Prod-Orchestrator.git
cd Pre-Prod-Orchestrator

# Create and activate virtual environment
python -m venv venv
# Linux / macOS:
source venv/bin/activate
# Windows:
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt
```

Set environment variables:
```bash
export GEMINI_API_KEY="your-gemini-api-key"
# Optional configuration
export GEMINI_MODEL="gemini-2.5-flash"
```

### 3. Frontend Dashboard Setup (Optional)

```bash
cd frontend
npm install
npm run dev
# Dashboard available at http://localhost:3000
```

---

## CLI Usage Guide

### 1. Scanner (`scanner`)

Scan a repository, git diff, or commit range for security vulnerabilities:

```bash
# Scan repository against static rules and export all report formats
python -m scanner --repo . --output reports/ --format all

# Scan git commit range with Gemini LLM enrichment
python -m scanner --repo . --base main --head HEAD --model gemini --api-key $GEMINI_API_KEY

# Filter findings by minimum severity threshold
python -m scanner --repo . --severity-threshold HIGH --format json --output reports/
```

**CLI Flags:**
- `--repo <path>`: Path to target repository (default: `.`).
- `--diff <path>`: Explicit unified diff or patch file to parse.
- `--base <ref>` / `--head <ref>`: Git references to compare.
- `--model <gemini|ollama|custom|none>`: LLM provider for confirmation (default: `none`).
- `--output <dir>`: Report directory (default: `reports`).
- `--format <json|markdown|html|all>`: Report output formats (default: `all`).
- `--severity-threshold <INFO|LOW|MEDIUM|HIGH|CRITICAL>`: Minimum finding severity to report.

---

### 2. Remediation Bridge (`remediation.ci_entrypoint`)

Run headless remediation in CI/CD environments without touching git branches:

```bash
python -m remediation.ci_entrypoint \
  --repo . \
  --findings reports/findings.json \
  --output reports/remediation-report.json \
  --model gemini-2.5-flash
```

---

### 3. Orchestrator Pipeline (`orchestrator`)

Run the complete pipeline (Scan Findings $\rightarrow$ AI Fix $\rightarrow$ Git Branch $\rightarrow$ PR):

```bash
# Dry run: validate and apply fixes locally without pushing or creating PRs
python -m orchestrator \
  --repo-path . \
  --findings reports/findings.json \
  --severity-threshold HIGH \
  --dry-run

# Production run: create remediation branch and open PR
python -m orchestrator \
  --repo-path . \
  --findings reports/findings.json \
  --base-ref main \
  --severity-threshold HIGH
```

---

## Finding Contract Specification

Findings conform to [`contracts/finding.schema.json`](contracts/finding.schema.json):

```json
{
  "id": "scanner:rule-sql-injection:src/api/users.py:42",
  "tool": "scanner",
  "rule": "python.security.sql_injection",
  "severity": "HIGH",
  "file": "src/api/users.py",
  "line": 42,
  "end_line": 45,
  "message": "Potential SQL injection via unsanitized format string.",
  "confidence": 0.95,
  "fixability": "AI_ASSISTED",
  "cwe": "CWE-89",
  "category": "Injection",
  "what_and_why": "User input is directly interpolated into SQL query.",
  "how_to_fix": "Use parameterized queries or ORM query bindings.",
  "why_fix_helps": "Prevents attacker-controlled input from altering query structure.",
  "llm_confirmed": true
}
```

---

## Testing & Validation

```bash
# Run unit tests
python -m pytest tests/unit

# Run contract tests
python -m pytest tests/contract

# Run code style and lint checks
ruff check .
```

---

## Repository Layout

```
.
├── contracts/               # JSON Schema contracts for findings & remediations
│   ├── finding.schema.json
│   └── remediation.schema.json
├── scanner/                 # Static analysis & LLM-assisted scanner
│   ├── diff_parser.py       # Unified diff and patch parser
│   ├── findings.py          # Finding data models and normalizers
│   ├── llm_providers.py     # Gemini and Ollama integration
│   ├── report_builder.py    # JSON, Markdown, and HTML report generators
│   ├── rule_engine.py       # Pattern matcher and AST rule runner
│   └── rules.py             # Security rule definitions (OWASP / CWE)
├── remediation/             # AI-powered code fix generation
│   ├── ci_entrypoint.py     # CI/CD bridge for automated runners
│   └── remediation_agent.py # Gemini patch generator & verification
├── orchestrator/            # Pipeline lifecycle & Git operations
│   └── pipeline.py          # State machine, branch creation & PR dispatcher
├── reports/                 # Output directory for scan and remediation reports
├── frontend/                # Next.js UI for audit reports & finding triage
├── tests/                   # Unit, contract, and integration tests
└── .github/workflows/       # GitHub Actions CI/CD workflows
```
