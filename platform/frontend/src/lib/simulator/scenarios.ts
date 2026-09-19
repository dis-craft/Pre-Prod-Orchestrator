import { WorkflowState } from './stateMachine';
import { Finding, Remediation, Validation, PullRequest } from '../types';

export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  repository: string;
  prNumber: string;
  findingId: string;
  initialState: WorkflowState;
  statesSequence: WorkflowState[];
  finding: Finding;
  remediation?: Remediation;
  validation: Validation;
  pullRequest?: PullRequest;
  securityDelta: {
    beforeFindingCount: number;
    afterFindingCount: number;
    resolvedFindingId: string;
    newRisksIntroduced: number;
  };
}

export const SCENARIO_SQL_INJECTION: DemoScenario = {
  id: 'sql-injection',
  name: 'SQL Injection Remediation (Golden Path)',
  description: 'Automated parameterization patch for SQL injection vulnerability in payments-api authentication handler.',
  repository: 'payments-api',
  prNumber: '#142',
  findingId: 'SEC-001',
  initialState: 'PR_OPENED',
  statesSequence: [
    'PR_OPENED',
    'SCANNING',
    'FINDING_DETECTED',
    'TRIAGED',
    'REMEDIATION_STARTED',
    'PATCH_GENERATED',
    'VALIDATING',
    'VALIDATION_PASSED',
    'RESCAN_PASSED',
    'VERIFIED',
    'PR_CREATED',
    'HUMAN_REVIEW',
    'MERGED',
  ],
  finding: {
    id: 'SEC-001',
    repository: 'payments-api',
    pullRequest: '#142',
    commitSha: 'a8f3b91c7e92',
    tool: 'Semgrep SAST',
    ruleId: 'javascript.express.security.audit.sqli',
    title: 'SQL Injection in User Authentication Route',
    message: 'User input concatenated directly into SQL query string without parameterization.',
    severity: 'HIGH',
    confidence: 96,
    file: 'src/auth/login.js',
    startLine: 40,
    endLine: 44,
    cwe: 'CWE-89',
    owasp: 'A03:2021 - Injection',
    introducedByPR: '#142 (Add legacy authentication fallback)',
    fixability: 'AUTO_REMEDIABLE',
    status: 'OPEN',
    evidence: {
      snippet: `39: async function authenticateUser(userId, password) {
40:   // DANGEROUS: Concatenating untrusted user ID into SQL string
41:   const query =
42:     "SELECT * FROM users WHERE id = " + userId;
43:   const result = await db.query(query);
44:   return result.rows[0];
45: }`,
      vulnerableLine: '    "SELECT * FROM users WHERE id = " + userId;',
      contextBefore: ['async function authenticateUser(userId, password) {', '  // DANGEROUS: Concatenating untrusted user ID into SQL string'],
      contextAfter: ['  const result = await db.query(query);', '  return result.rows[0];', '}'],
      explanation: 'Constructing dynamic SQL queries via string concatenation allows malicious input to alter query logic, potentially bypassing authentication or leaking database tables.',
    },
  },
  remediation: {
    id: 'REM-SEC-001',
    findingId: 'SEC-001',
    strategy: 'Prepared SQL Statement Parameterization',
    model: 'Claude 3.5 Sonnet (Security fine-tuned)',
    confidence: 98,
    rootCause: 'Unsanitized string concatenation of user-supplied `userId` parameter directly into SQL execution string.',
    patch: `--- a/src/auth/login.js
+++ b/src/auth/login.js
@@ -40,4 +40,4 @@ async function authenticateUser(userId, password) {
-  const query =
-    "SELECT * FROM users WHERE id = " + userId;
-  const result = await db.query(query);
+  const query = "SELECT * FROM users WHERE id = ?";
+  const result = await db.query(query, [userId]);
--- a/tests/auth/login.test.js
+++ b/tests/auth/login.test.js
@@ -15,0 +16,6 @@
+  test("should parameterize userId SQL query safely", async () => {
+    const mockDb = { query: vi.fn().mockResolvedValue({ rows: [{ id: 1 }] }) };
+    await authenticateUser("1 OR 1=1", "pass", mockDb);
+    expect(mockDb.query).toHaveBeenCalledWith("SELECT * FROM users WHERE id = ?", ["1 OR 1=1"]);
+  });`,
    filesChanged: ['src/auth/login.js', 'tests/auth/login.test.js'],
    testsAdded: ['tests/auth/login.test.js:16 (Parameterization injection test)'],
    assumptions: ['Database driver supports array parameter bindings.', 'userId format validation handled upstream.'],
    risk: 'LOW',
    status: 'CANDIDATE',
  },
  validation: {
    id: 'VAL-SEC-001',
    remediationId: 'REM-SEC-001',
    findingId: 'SEC-001',
    overallStatus: 'pending',
    startedAt: new Date().toISOString(),
    steps: [
      { id: 'step-1', name: 'Patch Scope', status: 'pending', command: 'git diff --stat', logs: ['Verifying patch boundary...', 'Patch affects 2 files (+7, -3 lines)'] },
      { id: 'step-2', name: 'Formatter', status: 'pending', command: 'npx prettier --check .', logs: ['[SIMULATED RESULT] Code formatting compliant.'] },
      { id: 'step-3', name: 'Linter', status: 'pending', command: 'npx eslint src/auth/login.js', logs: ['[SIMULATED RESULT] ESLint passed with 0 errors.'] },
      { id: 'step-4', name: 'Type Check', status: 'pending', command: 'npx tsc --noEmit', logs: ['[SIMULATED RESULT] TypeScript check passed with 0 errors.'] },
      { id: 'step-5', name: 'Unit Tests', status: 'pending', command: 'npx vitest run tests/auth/login.test.js', logs: ['[SIMULATED RESULT] 128 tests passed.'] },
      { id: 'step-6', name: 'Integration Tests', status: 'pending', command: 'npm run test:integration', logs: ['[SIMULATED RESULT] DB container integration test passed.'] },
      { id: 'step-7', name: 'Build Verification', status: 'pending', command: 'npm run build', logs: ['[SIMULATED RESULT] Next.js production build succeeded.'] },
      { id: 'step-8', name: 'Security Re-scan', status: 'pending', command: 'semgrep --config p/security-audit src/auth/login.js', logs: ['[SIMULATED RESULT] Re-scanning src/auth/login.js...', 'Finding SEC-001 NOT DETECTED.'] },
      { id: 'step-9', name: 'Finding Comparison', status: 'pending', command: 'orchestrator-cli diff-findings', logs: ['[SIMULATED RESULT] Security Delta: 1 resolved, 0 new introduced.'] },
    ],
  },
  pullRequest: {
    id: 'PR-157',
    number: 157,
    title: 'security: remediate SEC-001 SQL Injection in login auth handler',
    repository: 'payments-api',
    branch: 'security/fix-sec-001-sql-injection',
    targetBranch: 'main',
    originalPR: '#142',
    remediationId: 'REM-SEC-001',
    findingId: 'SEC-001',
    status: 'OPEN',
    validationStatus: 'pending',
    url: 'https://github.com/acme-corp/payments-api/pull/157',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  securityDelta: {
    beforeFindingCount: 3,
    afterFindingCount: 2,
    resolvedFindingId: 'SEC-001',
    newRisksIntroduced: 0,
  },
};

export const SCENARIO_VALIDATION_FAILURE: DemoScenario = {
  ...SCENARIO_SQL_INJECTION,
  id: 'validation-failure',
  name: 'Validation Failure Scenario',
  description: 'Simulates a candidate patch failing unit test assertion step, halting auto-remediation for human intervention.',
  statesSequence: [
    'PR_OPENED',
    'SCANNING',
    'FINDING_DETECTED',
    'TRIAGED',
    'REMEDIATION_STARTED',
    'PATCH_GENERATED',
    'VALIDATING',
    'VALIDATION_FAILED',
  ],
  validation: {
    ...SCENARIO_SQL_INJECTION.validation,
    id: 'VAL-FAIL-001',
    steps: SCENARIO_SQL_INJECTION.validation.steps.map((step) => {
      if (step.id === 'step-5') {
        return {
          ...step,
          status: 'failed',
          logs: [
            '[SIMULATED RESULT] Executing unit test suite...',
            'FAIL tests/auth/login.test.js > authenticateUser > parameterization binding',
            'Error: Expected mockDb.query parameter array to match [userId] but received undefined',
            '1 test failed, 127 tests passed.',
          ],
        };
      }
      return step;
    }),
  },
};

export const SCENARIO_SECRET_LEAK: DemoScenario = {
  id: 'secret-leak',
  name: 'Secret Leak Scenario (Credential Rotation Required)',
  description: 'Detects hardcoded API key exposure and routes to credential rotation & git history purge workflow.',
  repository: 'payments-api',
  prNumber: '#142',
  findingId: 'SEC-003',
  initialState: 'PR_OPENED',
  statesSequence: [
    'PR_OPENED',
    'SCANNING',
    'FINDING_DETECTED',
    'TRIAGED',
    'ROTATION_REQUIRED',
    'HUMAN_REVIEW',
    'MERGED',
  ],
  finding: {
    id: 'SEC-003',
    repository: 'payments-api',
    pullRequest: '#142',
    commitSha: 'a8f3b91c7e92',
    tool: 'Gitleaks Secret Scanner',
    ruleId: 'generic-api-key',
    title: 'Hardcoded Internal API Token Exposure',
    message: 'High-entropy API key token format found in source file commit diff.',
    severity: 'HIGH',
    confidence: 99,
    file: 'src/config/gateway.js',
    startLine: 18,
    endLine: 18,
    cwe: 'CWE-798',
    owasp: 'A07:2021 - Identification Failures',
    introducedByPR: '#142 (Add legacy fallback)',
    fixability: 'REQUIRES_HUMAN_TRIAGE',
    status: 'OPEN',
    evidence: {
      snippet: `17: export const GATEWAY_CONFIG = {
18:   API_SECRET: process.env.GATEWAY_KEY || "sk_test_51MzX90128391283",
19: };`,
      vulnerableLine: '  API_SECRET: process.env.GATEWAY_KEY || "sk_test_51MzX90128391283",',
      contextBefore: ['export const GATEWAY_CONFIG = {'],
      contextAfter: ['  TIMEOUT_MS: 5000', '};'],
      explanation: 'Hardcoded credentials exposed in repository history must be revoked and rotated immediately.',
    },
  },
  validation: {
    id: 'VAL-SECRET-001',
    remediationId: 'REM-SECRET-001',
    findingId: 'SEC-003',
    overallStatus: 'pending',
    startedAt: new Date().toISOString(),
    steps: [
      { id: 'step-1', name: 'Secret Revocation Check', status: 'pending', command: 'vault token revoke sk_test_...', logs: ['[SIMULATED RESULT] Revoking exposed credential token in Vault...'] },
      { id: 'step-2', name: 'Git History Audit', status: 'pending', command: 'gitleaks detect --log-level debug', logs: ['[SIMULATED RESULT] Verifying secret purged from commit history.'] },
    ],
  },
  securityDelta: {
    beforeFindingCount: 3,
    afterFindingCount: 2,
    resolvedFindingId: 'SEC-003',
    newRisksIntroduced: 0,
  },
};

export const SCENARIO_DEPENDENCY_VULN: DemoScenario = {
  id: 'dependency-vuln',
  name: 'Dependency CVE Upgrade Scenario',
  description: 'Upgrades vulnerable base runtime container package to patched CVE version.',
  repository: 'user-portal',
  prNumber: '#89',
  findingId: 'SEC-002',
  initialState: 'PR_OPENED',
  statesSequence: [
    'PR_OPENED',
    'SCANNING',
    'FINDING_DETECTED',
    'TRIAGED',
    'REMEDIATION_STARTED',
    'PATCH_GENERATED',
    'VALIDATING',
    'VALIDATION_PASSED',
    'RESCAN_PASSED',
    'VERIFIED',
    'PR_CREATED',
    'HUMAN_REVIEW',
    'MERGED',
  ],
  finding: {
    id: 'SEC-002',
    repository: 'user-portal',
    pullRequest: '#89',
    commitSha: '7c4d1e2f9b00',
    tool: 'Trivy Vulnerability Scanner',
    ruleId: 'CVE-2024-21626',
    title: 'Container Escape Vulnerability in Base Image',
    message: 'runc process leak via working directory file descriptor propagation.',
    severity: 'CRITICAL',
    confidence: 99,
    file: 'Dockerfile',
    startLine: 10,
    endLine: 10,
    cwe: 'CWE-403',
    owasp: 'A06:2021 - Vulnerable Components',
    introducedByPR: '#89 (Upgrade base container image)',
    fixability: 'AUTO_REMEDIABLE',
    status: 'OPEN',
    evidence: {
      snippet: `9: # Base runtime
10: FROM node:20-alpine
11: WORKDIR /app`,
      vulnerableLine: 'FROM node:20-alpine',
      contextBefore: ['# Base runtime'],
      contextAfter: ['WORKDIR /app', 'RUN npm ci'],
      explanation: 'Base Node.js Alpine image contains unpatched CVE-2024-21626 vulnerability.',
    },
  },
  remediation: {
    id: 'REM-SEC-002',
    findingId: 'SEC-002',
    strategy: 'Pin Base Image to Patched Alpine Minor Version',
    model: 'Claude 3.5 Sonnet (Security fine-tuned)',
    confidence: 99,
    rootCause: 'Unpinned base docker image `node:20-alpine` resolved to vulnerable runc layer.',
    patch: `--- a/Dockerfile
+++ b/Dockerfile
@@ -10,1 +10,1 @@
-FROM node:20-alpine
+FROM node:20.11.1-alpine`,
    filesChanged: ['Dockerfile'],
    testsAdded: ['trivy image scan check'],
    assumptions: ['Patched base image `node:20.11.1-alpine` contains updated runc binary.'],
    risk: 'LOW',
    status: 'CANDIDATE',
  },
  validation: {
    id: 'VAL-DEP-001',
    remediationId: 'REM-SEC-002',
    findingId: 'SEC-002',
    overallStatus: 'pending',
    startedAt: new Date().toISOString(),
    steps: [
      { id: 'step-1', name: 'Docker Build', status: 'pending', command: 'docker build -t app:test .', logs: ['[SIMULATED RESULT] Container image compiled cleanly.'] },
      { id: 'step-2', name: 'Container CVE Scan', status: 'pending', command: 'trivy image app:test', logs: ['[SIMULATED RESULT] Trivy re-scan passed: 0 CRITICAL vulnerabilities found.'] },
    ],
  },
  pullRequest: {
    id: 'PR-158',
    number: 158,
    title: 'security: upgrade Docker base image to node:20.11.1-alpine to fix CVE-2024-21626',
    repository: 'user-portal',
    branch: 'security/upgrade-cve-2024-21626',
    targetBranch: 'main',
    originalPR: '#89',
    remediationId: 'REM-SEC-002',
    findingId: 'SEC-002',
    status: 'OPEN',
    validationStatus: 'pending',
    url: 'https://github.com/acme-corp/user-portal/pull/158',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  securityDelta: {
    beforeFindingCount: 3,
    afterFindingCount: 2,
    resolvedFindingId: 'SEC-002',
    newRisksIntroduced: 0,
  },
};

export const ALL_SCENARIOS: DemoScenario[] = [
  SCENARIO_SQL_INJECTION,
  SCENARIO_VALIDATION_FAILURE,
  SCENARIO_SECRET_LEAK,
  SCENARIO_DEPENDENCY_VULN,
];
