# Pre-Prod Security Orchestrator

Automated vulnerability detection, LLM-assisted remediation, and verification pipeline for CI/CD workflows.

---

## Overview

**Pre-Prod Security Orchestrator** intercepts code changes in pull requests, runs deterministic security rule evaluations, generates minimal AI-assisted remediation patches, and creates validated remediation PRs with human-in-the-loop review safeguards.

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
                  │  • Optional LLM triage & enrichment                     │
                  └──────────────────────────┬──────────────────────────────┘
                                             │
                                             ▼ Normalized Findings (`contracts/finding.schema.json`)
                  ┌─────────────────────────────────────────────────────────┐
                  │             Remediation (`remediation/`)                │
                  │  • Source context extraction (configurable window)      │
                  │  • Structured JSON edit generation (Gemini / Ollama)     │
                  │  • Local diff verification & patch application          │
                  └──────────────────────────┬──────────────────────────────┘
                                             │
                                             ▼ Candidate Patches
                  ┌─────────────────────────────────────────────────────────┐
                  │            Orchestrator (`orchestrator/`)               │
                  │  • Severity threshold filtering                         │
                  │  • Branch creation (`security-remediation/...`)         │
                  │  • Git commit, push, and Pull Request creation          │
                  │  • Detailed audit report & evidence attachment          │
                  └──────────────────────────┬──────────────────────────────┘
                                             │
                                             ▼
                  ┌─────────────────────────────────────────────────────────┐
                  │              Human Review & CI Verification             │
                  └─────────────────────────────────────────────────────────┘
```

---

## Core Modules

| Module | Directory | Purpose | Key Responsibilities |
|---|---|---|---|
| **Scanner** | [`scanner/`](scanner/) | Vulnerability Detection | Static pattern matching, diff parsing, multi-language rule execution, finding deduplication, and LLM verification. |
| **Remediation** | [`remediation/`](remediation/) | Automated Fixes | Contextual code extraction, prompt structuring, edit proposal parsing, and in-place patch application. |
| **Orchestrator** | [`orchestrator/`](orchestrator/) | Pipeline Lifecycle | Git branch management, severity filtering, pull request generation, and evidence logging. |
| **Contracts** | [`contracts/`](contracts/) | Schema Definitions | JSON Schema contracts (`finding.schema.json`, `remediation.schema.json`) decoupling components. |
| **Platform / CI** | [`.github/workflows/`](.github/workflows/) | Automation & CI/CD | GitHub Actions workflows for scanning, automated CI entrypoints, and test suites. |
| **Dashboard** | [`frontend/`](frontend/) | Visualization | Next.js interface for audit trails, vulnerability triage, and run histories. |

---

## Safety & Governance Principles

1. **Human-in-the-Loop Review**: AI-generated remediation patches are never auto-merged. Every patch is proposed as a distinct pull request requiring team review and approval.
2. **Deterministic-First Scanning**: Vulnerability detection relies primarily on deterministic static rules; LLMs are utilized for finding confirmation and triage assistance.
3. **Context Minimization**: Only relevant source code around vulnerable line ranges (default ±30 lines) is provided to LLMs—never entire unvetted repositories or credentials.
4. **Strict Schema Contracts**: All cross-boundary communication uses versioned JSON schemas defined in `contracts/`.

---

## Quick Start

### 1. Prerequisites

- Python 3.10+
- Node.js 18+ (for frontend dashboard)
- Git 2.30+
- Google Gemini API key (or local Ollama instance)

### 2. Environment Setup

```bash
# Clone repository
git clone <repo-url>
cd backend

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
export GEMINI_API_KEY="your-api-key-here"
# Optional overrides:
export GEMINI_MODEL="gemini-2.5-flash"
```

---

## Usage Guide

### Running the Vulnerability Scanner

Scan a local directory, git diff, or commit range:

```bash
# Scan repository against static rules and export all report formats
python -m scanner --repo . --output reports/ --format all

# Scan specific git commit range with Gemini LLM enrichment
python -m scanner --repo . --base main --head HEAD --model gemini --api-key $GEMINI_API_KEY

# Filter findings by minimum severity threshold
python -m scanner --repo . --severity-threshold HIGH --format json --output reports/
```

**Supported CLI Options (`scanner`):**
- `--repo <path>`: Repository or directory path (default: `.`).
- `--diff <path>`: Explicit patch/diff file to parse.
- `--base <ref>` / `--head <ref>`: Git references to compare.
- `--model <gemini|ollama|custom|none>`: LLM provider for confirmation and triage.
- `--format <json|markdown|html|all>`: Report format (default: `all`).
- `--severity-threshold <INFO|LOW|MEDIUM|HIGH|CRITICAL>`: Filter findings.

---

### Running the Remediation Agent

Apply fixes directly to a checked-out repository using findings generated by the scanner:

```bash
# Run standalone CI remediation bridge
python -m remediation.ci_entrypoint \
  --repo . \
  --findings reports/findings.json \
  --output reports/remediation-report.json \
  --model gemini-2.5-flash
```

---

### Running the Full Orchestrator Pipeline

Execute the end-to-end workflow (Scan → Remediate → Git Branch → PR):

```bash
# Run dry-run (validates fixes locally without pushing branches or opening PRs)
python -m orchestrator \
  --repo-path . \
  --findings reports/findings.json \
  --severity-threshold HIGH \
  --dry-run

# Run live remediation with automated git branch & PR creation
python -m orchestrator \
  --repo-path . \
  --findings reports/findings.json \
  --base-ref main \
  --severity-threshold HIGH
```

---

## Contracts & Schema

All scanner findings adhere to [`contracts/finding.schema.json`](contracts/finding.schema.json):

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
  "llm_confirmed": true
}
```

---

## Testing & Quality Assurance

```bash
# Run unit tests
python -m pytest tests/unit

# Run contract verification tests
python -m pytest tests/contract

# Run linting and formatting
ruff check .
```

---

## Repository Structure

```
.
├── contracts/               # JSON Schema contracts for findings & remediations
│   ├── finding.schema.json
│   └── remediation.schema.json
├── scanner/                 # Static analysis & LLM-assisted scanner
│   ├── diff_parser.py       # Unified diff and patch parser
│   ├── findings.py          # Finding models and serializers
│   ├── llm_providers.py     # Gemini and Ollama integration
│   ├── report_builder.py    # JSON, Markdown, and HTML report generators
│   ├── rule_engine.py       # Pattern matcher and evaluation engine
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
