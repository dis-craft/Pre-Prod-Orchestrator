# Implementation Phases

## Phase 0 — Foundation
Deliver:
- repo skeleton;
- contracts;
- READMEs;
- pytest;
- linting;
- basic GitHub Action.

Demo: CI says GREEN.

## Phase 1 — Detect
Deliver:
- Semgrep;
- normalized findings;
- fixtures.

Demo: PR produces a finding.

## Phase 2 — Orchestrate
Deliver:
- event parser;
- state machine;
- mocked GitHub branch/PR operations.

Demo: finding flows through state machine.

## Phase 3 — Fix
Deliver:
- deterministic fixer;
- Ollama adapter;
- unified diff output.

Demo: finding produces a patch.

## Phase 4 — Prove
Deliver:
- Docker sandbox;
- tests;
- security re-scan;
- evidence bundle.

Demo: unsafe fix is rejected; safe fix is accepted.

## Phase 5 — Automate
Deliver:
- real GitHub App/API;
- remediation branch;
- remediation PR;
- CI rerun.

Demo: PR #1 creates PR #2 automatically.

## Phase 6 — Productionize
Deliver:
- PostgreSQL;
- Redis queue;
- audit log;
- least-privilege GitHub App;
- retries/idempotency;
- ephemeral runners for untrusted code.

## Phase 7 — Hackathon polish
Deliver:
- dashboard;
- benchmark;
- seeded vulnerabilities;
- one-click setup;
- 3-minute demo script.
