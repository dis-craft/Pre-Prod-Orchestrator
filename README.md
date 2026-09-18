# SecurityOrchestrator

AI-assisted security remediation orchestrator for CI/CD.

## Mission

Detect security findings in pull requests, understand the relevant code context, generate a minimal remediation patch, validate the patch in isolation, create a remediation branch/PR, re-run CI/security checks, and require human approval before merge.

## Four-person split

| Owner | Area | Directory |
|---|---|---|
| Person 1 | Detection & scanning | `scanner/` |
| Person 2 | Orchestration & GitHub integration | `orchestrator/` |
| Person 3 | AI remediation & validation | `remediation/` |
| Person 4 | CI/CD, reporting & platform | `.github/`, `reports/`, `dashboard/` |

Each person owns their directory. Avoid editing another owner's files unless agreed in an issue.

## Core lifecycle

```
PR → detect changes → scan → normalize finding → classify
   → generate patch → sandbox validation → re-scan
   → create remediation branch → remediation PR
   → CI/security checks → human review → merge → report
```

## Phase plan

1. **Phase 0 — Contracts & skeleton**
   - Agree finding schema, result schema, branch naming, exit codes.
   - Run a hello-world CI workflow.
2. **Phase 1 — Deterministic detection**
   - Integrate Semgrep first.
   - Add Gitleaks and OSV-Scanner adapters.
   - Normalize all findings.
3. **Phase 2 — Orchestration**
   - Handle PR event input.
   - Select changed files.
   - Call scanner service and persist run state.
4. **Phase 3 — Remediation**
   - Add rule-based fixes for 2–3 deterministic cases.
   - Add local LLM adapter through Ollama.
   - Generate unified diffs only.
5. **Phase 4 — Verification**
   - Apply patches in an isolated Docker workspace.
   - Run tests/build/lint and re-scan.
6. **Phase 5 — GitHub remediation PR**
   - Create branch and commit.
   - Open remediation PR.
   - Attach evidence.
7. **Phase 6 — Production hardening**
   - Authentication, least-privilege GitHub App, queueing, audit logs, rate limits, retention, observability.
8. **Phase 7 — Hackathon polish**
   - Live demo repo, seeded vulnerabilities, dashboard, before/after metrics.

## Non-negotiable safety rules

- Never auto-merge an AI-generated security fix.
- Never execute untrusted repository code on the persistent control-plane host.
- Treat scanner findings as detection signals; treat tests and re-scan as verification.
- Minimize LLM context to relevant code.
- Never commit secrets or model/API credentials.
