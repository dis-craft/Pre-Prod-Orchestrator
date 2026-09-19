import { describe, it, expect } from 'vitest';
import { 
  ALL_SCENARIOS, 
  SCENARIO_SQL_INJECTION, 
  SCENARIO_VALIDATION_FAILURE, 
  SCENARIO_SECRET_LEAK, 
  SCENARIO_DEPENDENCY_VULN 
} from '../lib/simulator/scenarios';

describe('Demo Scenario Suite', () => {
  it('should include all 4 required scenarios', () => {
    expect(ALL_SCENARIOS.length).toBe(4);
    const ids = ALL_SCENARIOS.map((s) => s.id);
    expect(ids).toContain('sql-injection');
    expect(ids).toContain('validation-failure');
    expect(ids).toContain('secret-leak');
    expect(ids).toContain('dependency-vuln');
  });

  it('should define valid state sequences for SQL Injection golden path', () => {
    expect(SCENARIO_SQL_INJECTION.statesSequence[0]).toBe('PR_OPENED');
    expect(SCENARIO_SQL_INJECTION.statesSequence[SCENARIO_SQL_INJECTION.statesSequence.length - 1]).toBe('MERGED');
    expect(SCENARIO_SQL_INJECTION.securityDelta.resolvedFindingId).toBe('SEC-001');
  });

  it('should define validation failure terminal state correctly', () => {
    const lastState = SCENARIO_VALIDATION_FAILURE.statesSequence[SCENARIO_VALIDATION_FAILURE.statesSequence.length - 1];
    expect(lastState).toBe('VALIDATION_FAILED');
  });

  it('should define secret leak rotation required state correctly', () => {
    expect(SCENARIO_SECRET_LEAK.statesSequence).toContain('ROTATION_REQUIRED');
    expect(SCENARIO_SECRET_LEAK.finding.cwe).toBe('CWE-798');
  });

  it('should define dependency vulnerability package upgrade scenario', () => {
    expect(SCENARIO_DEPENDENCY_VULN.remediation?.patch).toContain('node:20.11.1-alpine');
  });
});
