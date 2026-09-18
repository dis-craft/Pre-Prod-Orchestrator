# SecurityOrchestrator Architecture

## Target architecture

```
GitHub PR
  │
  ├── GitHub Actions → deterministic CI/security checks
  │
  └── GitHub App/Webhook
          │
          ▼
     Orchestrator
          │
     ┌────┴────┐
     ▼         ▼
 Scanner    State Store
     │
     ▼
Normalized Findings
     │
     ▼
Risk / Fixability
     │
     ▼
Remediation Worker
     │
     ├── deterministic fixer
     └── local/enterprise LLM
     │
     ▼
Candidate Patch
     │
     ▼
Isolated Validation Sandbox
     │
     ├── tests
     ├── build
     ├── lint
     └── security re-scan
     │
     ▼
Evidence
     │
     ▼
GitHub Branch + Remediation PR
     │
     ▼
Second CI/CD run
     │
     ▼
Human approval
     │
     ▼
Merge
```

## Ownership boundaries

### Person 1 — scanner
Owns finding generation. Output only normalized findings.

### Person 2 — orchestrator
Owns workflow state, routing, GitHub API interactions and branch/PR creation.

### Person 3 — remediation
Owns patch generation and sandbox verification. It consumes normalized findings and returns verified candidate patches.

### Person 4 — platform
Owns GitHub Actions, reporting, dashboards, shared developer tooling and integration tests.

## Shared contracts

All cross-team communication must use JSON schemas under `contracts/`. Do not import implementation internals across ownership boundaries.

## Initial technology choices

- GitHub App + webhooks
- GitHub Actions
- Python + FastAPI
- PostgreSQL
- Redis
- Semgrep
- Gitleaks
- OSV-Scanner
- Docker sandbox
- Ollama for local model execution
- Next.js dashboard later

The first demo can run without PostgreSQL/Redis by using local JSON state, then add them in the production-hardening phase.
