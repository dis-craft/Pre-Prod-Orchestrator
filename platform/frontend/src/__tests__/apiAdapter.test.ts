import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiAdapter } from '../lib/adapters/apiAdapter';
import { apiClient } from '../lib/api/client';
import { 
  mapFinding, 
  mapRemediation, 
  mapValidation, 
  mapPullRequest, 
  mapRepository, 
  mapDashboardMetrics 
} from '../lib/api/mappers';

describe('ApiAdapter & Mappers', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('correctly maps backend finding DTO to frontend domain model', () => {
    const apiFinding = {
      id: 'FIND-101',
      repository: 'acme/service',
      pullRequest: 'PR-10',
      commitSha: 'abc123',
      tool: 'semgrep',
      ruleId: 'python.sql-injection',
      title: 'SQL Injection',
      message: 'Unsanitized string interpolation',
      severity: 'HIGH',
      confidence: 0.98,
      file: 'src/db.py',
      startLine: 42,
      endLine: 45,
      cwe: 'CWE-89',
      owasp: 'A03:2021',
      introducedByPR: 'PR-10',
      fixability: 'AUTO_REMEDIABLE',
      status: 'OPEN',
      evidence: {
        snippet: 'query = f"SELECT..."',
        vulnerableLine: 'query = f"SELECT..."',
        explanation: 'User input in query string'
      }
    };

    const domainFinding = mapFinding(apiFinding);
    expect(domainFinding.id).toBe('FIND-101');
    expect(domainFinding.severity).toBe('HIGH');
    expect(domainFinding.confidence).toBe(98);
    expect(domainFinding.file).toBe('src/db.py');
    expect(domainFinding.startLine).toBe(42);
  });

  it('fetches repositories via apiClient and maps them', async () => {
    const mockRepos = [
      {
        id: 'repo-1',
        name: 'acme/api',
        owner: 'acme',
        defaultBranch: 'main',
        securityStatus: 'COMPLIANT',
        openFindingsCount: 0,
        criticalCount: 0,
        highCount: 0,
        mediumCount: 0,
        lowCount: 0,
        lastScanAt: '2026-09-19T00:00:00Z',
        policy: 'Strict'
      }
    ];

    vi.spyOn(apiClient, 'get').mockResolvedValue(mockRepos);

    const repos = await apiAdapter.getRepositories();
    expect(repos.length).toBe(1);
    expect(repos[0].name).toBe('acme/api');
    expect(repos[0].securityStatus).toBe('COMPLIANT');
  });

  it('fetches dashboard metrics via apiClient and maps them', async () => {
    const mockMetrics = {
      openFindings: 2,
      criticalCount: 1,
      highCount: 1,
      fixCandidates: 2,
      validationPassRate: 100,
      remediationPRs: 1
    };

    vi.spyOn(apiClient, 'get').mockResolvedValue(mockMetrics);

    const metrics = await apiAdapter.getMetrics();
    expect(metrics.openFindings).toBe(2);
    expect(metrics.criticalCount).toBe(1);
    expect(metrics.validationPassRate).toBe(100);
  });

  it('handles startRemediation and maps response', async () => {
    const mockRemediation = {
      id: 'REM-FIND-101',
      findingId: 'FIND-101',
      strategy: 'Parameterization',
      model: 'LLM',
      confidence: 0.95,
      rootCause: 'String formatting',
      patch: '--- a/db.py\n+++ b/db.py',
      filesChanged: ['db.py'],
      testsAdded: ['test_db.py'],
      assumptions: [],
      risk: 'LOW',
      status: 'CANDIDATE'
    };

    vi.spyOn(apiClient, 'post').mockResolvedValue(mockRemediation);

    const rem = await apiAdapter.startRemediation('FIND-101');
    expect(rem.id).toBe('REM-FIND-101');
    expect(rem.status).toBe('CANDIDATE');
    expect(rem.confidence).toBe(95);
  });
});
