import { Finding, Remediation, Validation, PullRequest, AuditEvent, Repository, DashboardMetrics } from '../types';

export const INITIAL_REPOSITORIES: Repository[] = [
  {
    id: 'repo-1',
    name: 'payments-api',
    owner: 'acme-corp',
    defaultBranch: 'main',
    securityStatus: 'NEEDS_ATTENTION',
    openFindingsCount: 3,
    criticalCount: 0,
    highCount: 2,
    mediumCount: 1,
    lowCount: 0,
    lastScanAt: '4 minutes ago',
    policy: 'Production Strict',
  },
  {
    id: 'repo-2',
    name: 'auth-service',
    owner: 'acme-corp',
    defaultBranch: 'main',
    securityStatus: 'COMPLIANT',
    openFindingsCount: 0,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    lowCount: 0,
    lastScanAt: '18 minutes ago',
    policy: 'Production Strict',
  },
  {
    id: 'repo-3',
    name: 'user-portal',
    owner: 'acme-corp',
    defaultBranch: 'main',
    securityStatus: 'NEEDS_ATTENTION',
    openFindingsCount: 2,
    criticalCount: 1,
    highCount: 0,
    mediumCount: 1,
    lowCount: 0,
    lastScanAt: '1 hour ago',
    policy: 'Standard CI',
  },
];

export const INITIAL_FINDINGS: Finding[] = [
  {
    id: 'SEC-001',
    repository: 'payments-api',
    pullRequest: '#142',
    commitSha: 'a8f3b91c7e92',
    tool: 'Semgrep',
    ruleId: 'javascript.express.security.audit.sqli.express-sqli',
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
      contextBefore: [
        'async function authenticateUser(userId, password) {',
        '  // DANGEROUS: Concatenating untrusted user ID into SQL string',
      ],
      contextAfter: [
        '  const result = await db.query(query);',
        '  return result.rows[0];',
        '}',
      ],
      explanation: 'Constructing dynamic SQL queries via string concatenation allows malicious input to alter query logic, potentially bypassing authentication or leaking database tables.',
    },
  },
  {
    id: 'SEC-002',
    repository: 'user-portal',
    pullRequest: '#89',
    commitSha: '7c4d1e2f9b00',
    tool: 'Trivy',
    ruleId: 'CVE-2024-21626',
    title: 'Container Escape Vulnerability in Base Runtime',
    message: 'runc process leak via working directory file descriptor propagation.',
    severity: 'CRITICAL',
    confidence: 99,
    file: 'Dockerfile',
    startLine: 12,
    endLine: 12,
    cwe: 'CWE-403',
    owasp: 'A06:2021 - Vulnerable and Outdated Components',
    introducedByPR: '#89 (Upgrade container base image)',
    fixability: 'REQUIRES_HUMAN_TRIAGE',
    status: 'TRIAGED',
    evidence: {
      snippet: `10: FROM node:20-alpine
11: WORKDIR /app
12: COPY . .`,
      vulnerableLine: 'FROM node:20-alpine',
      contextBefore: ['# Base container setup'],
      contextAfter: ['WORKDIR /app', 'RUN npm ci'],
      explanation: 'Base container runtime contains unpatched CVE vulnerability affecting container isolation boundary.',
    },
  },
  {
    id: 'SEC-003',
    repository: 'payments-api',
    pullRequest: '#142',
    commitSha: 'a8f3b91c7e92',
    tool: 'Gitleaks',
    ruleId: 'generic-api-key',
    title: 'Hardcoded Internal API Token',
    message: 'Potential secret string matching high-entropy API key token format found in code.',
    severity: 'MEDIUM',
    confidence: 88,
    file: 'src/config/gateway.js',
    startLine: 18,
    endLine: 18,
    cwe: 'CWE-798',
    owasp: 'A07:2021 - Identification and Authentication Failures',
    introducedByPR: '#142 (Add legacy authentication fallback)',
    fixability: 'AUTO_REMEDIABLE',
    status: 'OPEN',
    evidence: {
      snippet: `17: export const GATEWAY_CONFIG = {
18:   API_SECRET: process.env.GATEWAY_KEY || "sk_test_51MzX90128391283",
19: };`,
      vulnerableLine: '  API_SECRET: process.env.GATEWAY_KEY || "sk_test_51MzX90128391283",',
      contextBefore: ['export const GATEWAY_CONFIG = {'],
      contextAfter: ['  TIMEOUT_MS: 5000', '};'],
      explanation: 'Hardcoded secrets in repository commits are vulnerable to exposure across environments.',
    },
  },
];

export const INITIAL_REMEDIATIONS: Record<string, Remediation> = {
  'REM-SEC-001': {
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
    assumptions: [
      'Database driver `db.query` supports array parameter bindings as standard second argument.',
      '`userId` format validation remains handled upstream or via database type checking.',
    ],
    risk: 'LOW',
    status: 'CANDIDATE',
  },
};

export const INITIAL_VALIDATIONS: Record<string, Validation> = {
  'VAL-SEC-001': {
    id: 'VAL-SEC-001',
    remediationId: 'REM-SEC-001',
    findingId: 'SEC-001',
    overallStatus: 'pending',
    startedAt: new Date(Date.now() - 300000).toISOString(),
    steps: [
      { id: 'step-1', name: 'Patch Scope', status: 'pending', command: 'git diff --stat', logs: ['Verifying patch boundary...', 'Patch affects 2 files (+7, -3 lines)'] },
      { id: 'step-2', name: 'Formatter', status: 'pending', command: 'npx prettier --check .', logs: ['Checking code formatting compliance...'] },
      { id: 'step-3', name: 'Linter', status: 'pending', command: 'npx eslint src/auth/login.js', logs: ['Running ESLint rules...'] },
      { id: 'step-4', name: 'Type Check', status: 'pending', command: 'npx tsc --noEmit', logs: ['Executing TypeScript type diagnostics...'] },
      { id: 'step-5', name: 'Unit Tests', status: 'pending', command: 'npx vitest run tests/auth/login.test.js', logs: ['Running unit test suite...'] },
      { id: 'step-6', name: 'Integration Tests', status: 'pending', command: 'npm run test:integration', logs: ['Spinning up test DB container...'] },
      { id: 'step-7', name: 'Build Verification', status: 'pending', command: 'npm run build', logs: ['Compiling production bundle...'] },
      { id: 'step-8', name: 'Security Re-scan', status: 'pending', command: 'semgrep --config p/security-audit src/auth/login.js', logs: ['Re-executing Semgrep rule SEC-001...'] },
      { id: 'step-9', name: 'Finding Comparison', status: 'pending', command: 'orchestrator-cli diff-findings', logs: ['Comparing pre-patch vs post-patch security findings...'] },
    ],
  },
};

export const INITIAL_PULL_REQUESTS: PullRequest[] = [
  {
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
];

export const INITIAL_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: 'AUD-001',
    timestamp: '2026-09-18 20:14:02 UTC',
    actor: 'GitHub App Webhook',
    component: 'SCANNER',
    action: 'PR_SCAN_TRIGGERED',
    status: 'INFO',
    evidence: { repository: 'payments-api', prNumber: 142, sha: 'a8f3b91c7e92', trigger: 'synchronize' },
  },
  {
    id: 'AUD-002',
    timestamp: '2026-09-18 20:14:15 UTC',
    actor: 'Semgrep SAST Engine v1.62',
    component: 'SCANNER',
    action: 'FINDING_DETECTED',
    status: 'WARNING',
    evidence: { findingId: 'SEC-001', rule: 'javascript.express.security.audit.sqli', file: 'src/auth/login.js', line: 42, severity: 'HIGH' },
  },
  {
    id: 'AUD-003',
    timestamp: '2026-09-18 20:14:18 UTC',
    actor: 'Security Policy Evaluator',
    component: 'POLICY_ENGINE',
    action: 'TRIAGE_EVALUATED',
    status: 'SUCCESS',
    evidence: { findingId: 'SEC-001', policy: 'Production Strict', decision: 'AUTO_REMEDIATION_ELIGIBLE' },
  },
];

export const INITIAL_METRICS: DashboardMetrics = {
  openFindings: 3,
  criticalCount: 1,
  highCount: 2,
  fixCandidates: 1,
  validationPassRate: 98.5,
  remediationPRs: 1,
};
