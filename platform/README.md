# Person 4 — Platform Module (`platform/`)

## Architecture & Responsibilities

`platform/` is the top-level module owned by **Person 4 (Platform)**. It provides workflow visibility, developer/operator UI, platform API integration, CI status visibility, audit, and reporting.

### Module Structure

- `platform/frontend/`: Next.js developer/operator frontend application.
  - UI components and dashboards.
  - **Service/API Abstraction**: The frontend communicates with backend capabilities through dedicated service/API abstraction layers (`platform/frontend/src/lib/adapters/`), supporting both **Demo Mode** and **Live API Mode**.

### Integration Points

- Platform functionality consumes normalized findings, remediation results, and workflow state via shared contract schemas under `contracts/`.
- Platform integrates reporting, CI/CD, and dashboard visibility with backend workflow triggers.

### Ownership Boundaries

- `platform/` does **not** own scanner implementations (owned by `scanner/`).
- `platform/` does **not** own patch generation or sandbox verification logic (owned by `remediation/`).
- `platform/` does **not** duplicate orchestration state machine logic (owned by `orchestrator/`).
