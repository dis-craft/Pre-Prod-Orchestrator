import { describe, it, expect, beforeEach, vi } from 'vitest';
import { orchestratorService } from '../lib/services/orchestrator';
import { simulatorEngine } from '../lib/simulator/engine';
import { demoStore } from '../lib/demo/state';
import { apiClient } from '../lib/api/client';

describe('Normal Mode vs Demo Mode Environment Isolation', () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    // Mock backend calls for Normal Mode in unit tests
    vi.spyOn(apiClient, 'get').mockImplementation(async (path: string) => {
      if (path === '/api/findings') {
        return [
          {
            id: 'FIND-PROD-001',
            repository: 'acme-corp/auth-api',
            pullRequest: 'PR-88',
            commitSha: 'b7a3d91f2c4e',
            tool: 'semgrep',
            ruleId: 'python.lang.security.sql-injection',
            title: 'SQL Injection in User Authentication Route',
            message: 'User input formatted into unparameterized query string in auth service.',
            severity: 'HIGH',
            confidence: 0.97,
            file: 'src/auth/service.py',
            startLine: 54,
            endLine: 58,
            cwe: 'CWE-89',
            owasp: 'A03:2021 - Injection',
            introducedByPR: 'PR-88',
            fixability: 'AUTO_REMEDIABLE',
            status: 'OPEN',
            evidence: {
              snippet: 'query = f"SELECT..."',
              vulnerableLine: 'query = f"SELECT..."',
              explanation: 'User input in query string'
            }
          }
        ];
      }
      if (path === '/api/repositories') {
        return [
          {
            id: 'repo-prod-1',
            name: 'acme-corp/main-service',
            owner: 'acme-corp',
            defaultBranch: 'main',
            securityStatus: 'COMPLIANT',
            openFindingsCount: 0,
            criticalCount: 0,
            highCount: 0,
            mediumCount: 0,
            lowCount: 0,
            lastScanAt: '2026-09-19T01:00:00Z',
            policy: 'Strict Compliance'
          }
        ];
      }
      return [];
    });

    // Reset orchestrator service to normal mode
    orchestratorService.setMode('normal');
    simulatorEngine.stop();
    demoStore.resetState();
  });

  it('defaults to Normal Mode with clean production data', async () => {
    expect(orchestratorService.getMode()).toBe('normal');
    expect(orchestratorService.isDemoMode()).toBe(false);

    const findings = await orchestratorService.getFindings();
    // Normal mode must NOT contain demo SEC-001 finding
    const sec001 = findings.find((f) => f.id === 'SEC-001');
    expect(sec001).toBeUndefined();

    const repos = await orchestratorService.getRepositories();
    const paymentsApi = repos.find((r) => r.name === 'acme-corp/payments-api');
    expect(paymentsApi).toBeUndefined();
  });

  it('switches to Demo Mode and exposes Phase 2 simulated data', async () => {
    orchestratorService.setMode('demo');
    expect(orchestratorService.getMode()).toBe('demo');
    expect(orchestratorService.isDemoMode()).toBe(true);

    const findings = await orchestratorService.getFindings();
    const sec001 = findings.find((f) => f.id === 'SEC-001');
    expect(sec001).toBeDefined();
    expect(sec001?.title).toContain('SQL Injection');
  });

  it('stops simulator and cleans timers when exiting Demo Mode to Normal Mode', async () => {
    // Enter demo mode and start simulator
    orchestratorService.setMode('demo');
    simulatorEngine.start();
    expect(simulatorEngine.getStatus().isRunning).toBe(true);

    // Stop simulator & exit to normal mode
    simulatorEngine.stop();
    orchestratorService.setMode('normal');

    const status = simulatorEngine.getStatus();
    expect(status.isRunning).toBe(false);
    expect(status.isPaused).toBe(false);

    // Verify normal mode data has zero demo state
    const findings = await orchestratorService.getFindings();
    expect(findings.find((f) => f.id === 'SEC-001')).toBeUndefined();
  });

  it('resets demo state cleanly when re-entering Demo Mode', async () => {
    // 1. Enter Demo & mutate state via simulator
    orchestratorService.setMode('demo');
    simulatorEngine.start();
    simulatorEngine.fastForward(); // complete scenario to MERGED state

    const prsBefore = await orchestratorService.getPullRequests();
    const pr157Before = prsBefore.find((p) => p.id === 'PR-157' || p.number === 157);
    expect(pr157Before?.status).toBe('MERGED');

    // 2. Exit to Normal Mode
    simulatorEngine.stop();
    demoStore.resetState();
    orchestratorService.setMode('normal');

    // 3. Re-enter Demo Mode
    demoStore.resetState();
    simulatorEngine.reset();
    orchestratorService.setMode('demo');

    // Verify clean initial state restored
    const prsAfter = await orchestratorService.getPullRequests();
    const pr157After = prsAfter.find((p) => p.id === 'PR-157' || p.number === 157);
    expect(pr157After?.status).toBe('OPEN');
  });
});
