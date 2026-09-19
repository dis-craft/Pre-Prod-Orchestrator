# Person 4 — CI/CD, Reports & Platform

## Goal

Make the system easy to trigger, visible, testable and demonstrable.

## Own

- `.github/`
- `reports/`
- `platform/`
- integration/demo fixtures
- dashboard code later under `dashboard/`

## Phase 1 — GitHub Actions

Add:
- PR security workflow;
- test workflow;
- SARIF upload;
- artifact upload for JSON/HTML reports.

Trigger on:
- pull_request: opened, reopened, synchronize;
- push to protected branches for final validation.

## Phase 2 — policy gates

Require:
- tests pass;
- security scan pass;
- no unresolved HIGH/CRITICAL findings;
- remediation PR requires human approval.

## Phase 3 — reports

Generate:
- per-PR Markdown report;
- JSON machine report;
- SARIF;
- HTML summary;
- remediation evidence bundle.

## Phase 4 — dashboard

Show:
- open findings;
- fixed findings;
- remediation success rate;
- mean time to remediation;
- false-fix/rejection count;
- scan history.

## Acceptance

A seeded vulnerable demo PR triggers the full CI workflow and leaves a downloadable report artifact.
