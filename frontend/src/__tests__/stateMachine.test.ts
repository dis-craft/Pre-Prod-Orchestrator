import { describe, it, expect } from 'vitest';
import { canTransition, getStateMetadata } from '../lib/simulator/stateMachine';

describe('Workflow State Machine Rules', () => {
  it('should allow valid golden path transitions', () => {
    expect(canTransition('PR_OPENED', 'SCANNING')).toBe(true);
    expect(canTransition('SCANNING', 'FINDING_DETECTED')).toBe(true);
    expect(canTransition('FINDING_DETECTED', 'TRIAGED')).toBe(true);
    expect(canTransition('TRIAGED', 'REMEDIATION_STARTED')).toBe(true);
    expect(canTransition('REMEDIATION_STARTED', 'PATCH_GENERATED')).toBe(true);
    expect(canTransition('PATCH_GENERATED', 'VALIDATING')).toBe(true);
    expect(canTransition('VALIDATING', 'VALIDATION_PASSED')).toBe(true);
    expect(canTransition('VALIDATION_PASSED', 'RESCAN_PASSED')).toBe(true);
    expect(canTransition('RESCAN_PASSED', 'VERIFIED')).toBe(true);
    expect(canTransition('VERIFIED', 'PR_CREATED')).toBe(true);
    expect(canTransition('PR_CREATED', 'HUMAN_REVIEW')).toBe(true);
    expect(canTransition('HUMAN_REVIEW', 'MERGED')).toBe(true);
  });

  it('should block invalid direct transitions', () => {
    expect(canTransition('PR_OPENED', 'MERGED')).toBe(false);
    expect(canTransition('PR_OPENED', 'VERIFIED')).toBe(false);
    expect(canTransition('VALIDATING', 'VERIFIED')).toBe(false); // Rescan required first!
    expect(canTransition('TRIAGED', 'MERGED')).toBe(false);
  });

  it('should support failure states and recovery paths', () => {
    expect(canTransition('VALIDATING', 'VALIDATION_FAILED')).toBe(true);
    expect(canTransition('VALIDATION_FAILED', 'VALIDATING')).toBe(true); // Retry
    expect(canTransition('TRIAGED', 'ROTATION_REQUIRED')).toBe(true); // Secret leak branch
  });

  it('should retrieve accurate state metadata', () => {
    const meta = getStateMetadata('VALIDATING');
    expect(meta.label).toBe('Validation Pipeline Running');
    expect(meta.badgeStyle).toContain('cyan');
  });
});
