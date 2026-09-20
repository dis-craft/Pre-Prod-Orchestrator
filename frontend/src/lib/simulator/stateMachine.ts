export type WorkflowState = 
  | 'PR_OPENED'
  | 'SCANNING'
  | 'FINDING_DETECTED'
  | 'TRIAGED'
  | 'REMEDIATION_STARTED'
  | 'PATCH_GENERATED'
  | 'VALIDATING'
  | 'VALIDATION_PASSED'
  | 'RESCAN_PASSED'
  | 'VERIFIED'
  | 'PR_CREATED'
  | 'HUMAN_REVIEW'
  | 'MERGED'
  | 'VALIDATION_FAILED'
  | 'RESCAN_FAILED'
  | 'REMEDIATION_FAILED'
  | 'ROTATION_REQUIRED';

export type WorkflowEvent = 
  | 'START_SCAN'
  | 'DETECT_FINDING'
  | 'EVALUATE_POLICY'
  | 'START_REMEDIATION'
  | 'GENERATE_PATCH'
  | 'START_VALIDATION'
  | 'PASS_VALIDATION'
  | 'FAIL_VALIDATION'
  | 'PASS_RESCAN'
  | 'FAIL_RESCAN'
  | 'MARK_VERIFIED'
  | 'CREATE_PR'
  | 'SUBMIT_HUMAN_REVIEW'
  | 'APPROVE_MERGE'
  | 'TRIGGER_SECRET_ROTATION'
  | 'RETRY_VALIDATION'
  | 'RESET';

export interface StateMetadata {
  state: WorkflowState;
  label: string;
  description: string;
  badgeStyle: string;
  isTerminal?: boolean;
  isFailure?: boolean;
}

const STATE_METADATA_MAP: Record<WorkflowState, StateMetadata> = {
  PR_OPENED: {
    state: 'PR_OPENED',
    label: 'PR Opened',
    description: 'Pull request received and queued for automated SAST security scan.',
    badgeStyle: 'bg-slate-800/80 text-slate-300 border-slate-700',
  },
  SCANNING: {
    state: 'SCANNING',
    label: 'SAST Scanning',
    description: 'Semgrep and security scanners executing rule checks on changed files.',
    badgeStyle: 'bg-cyan-500/10 text-cyan-400 border-cyan-800/60 animate-pulse',
  },
  FINDING_DETECTED: {
    state: 'FINDING_DETECTED',
    label: 'Vulnerability Detected',
    description: 'Security finding identified in code diff evidence.',
    badgeStyle: 'bg-rose-500/10 text-rose-400 border-rose-800/60',
  },
  TRIAGED: {
    state: 'TRIAGED',
    label: 'Triaged & Evaluated',
    description: 'Security policy evaluated auto-remediation eligibility.',
    badgeStyle: 'bg-blue-500/10 text-blue-400 border-blue-800/60',
  },
  REMEDIATION_STARTED: {
    state: 'REMEDIATION_STARTED',
    label: 'Remediation In Progress',
    description: 'Security remediation engine generating candidate patch.',
    badgeStyle: 'bg-indigo-500/10 text-indigo-400 border-indigo-800/60 animate-pulse',
  },
  PATCH_GENERATED: {
    state: 'PATCH_GENERATED',
    label: 'Candidate Patch Generated',
    description: 'Deterministic security patch diff created for verification.',
    badgeStyle: 'bg-indigo-500/10 text-indigo-300 border-indigo-800/60',
  },
  VALIDATING: {
    state: 'VALIDATING',
    label: 'Validation Pipeline Running',
    description: 'Multi-stage suite executing scope, linter, tests, and build checks.',
    badgeStyle: 'bg-cyan-500/10 text-cyan-400 border-cyan-800/60 animate-pulse',
  },
  VALIDATION_PASSED: {
    state: 'VALIDATION_PASSED',
    label: 'Pipeline Checks Passed',
    description: 'Formatter, linter, typecheck, and test suites passed 100%.',
    badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-800/60',
  },
  RESCAN_PASSED: {
    state: 'RESCAN_PASSED',
    label: 'Security Re-scan Passed',
    description: 'Post-patch SAST re-scan verified original finding no longer detected.',
    badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-800/60',
  },
  VERIFIED: {
    state: 'VERIFIED',
    label: 'Remediation Verified',
    description: 'Finding resolved without introducing regression risks.',
    badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-800/60 font-bold',
  },
  PR_CREATED: {
    state: 'PR_CREATED',
    label: 'Remediation PR Created',
    description: 'Automated remediation pull request submitted to GitHub.',
    badgeStyle: 'bg-cyan-500/10 text-cyan-400 border-cyan-800/60',
  },
  HUMAN_REVIEW: {
    state: 'HUMAN_REVIEW',
    label: 'Awaiting Human Review',
    description: 'Security review team inspecting attached evidence and patch diff.',
    badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-800/60',
  },
  MERGED: {
    state: 'MERGED',
    label: 'Remediation Merged',
    description: 'Remediation pull request approved and merged into target branch.',
    badgeStyle: 'bg-purple-500/10 text-purple-400 border-purple-800/60 font-bold',
    isTerminal: true,
  },
  VALIDATION_FAILED: {
    state: 'VALIDATION_FAILED',
    label: 'Validation Failed',
    description: 'Patch verification failed unit tests or linter checks.',
    badgeStyle: 'bg-rose-500/10 text-rose-400 border-rose-800/60',
    isFailure: true,
  },
  RESCAN_FAILED: {
    state: 'RESCAN_FAILED',
    label: 'Re-scan Failed',
    description: 'Vulnerability finding still detected during post-patch scan.',
    badgeStyle: 'bg-rose-500/10 text-rose-400 border-rose-800/60',
    isFailure: true,
  },
  REMEDIATION_FAILED: {
    state: 'REMEDIATION_FAILED',
    label: 'Remediation Failed',
    description: 'Unable to auto-generate safe patch candidate for finding.',
    badgeStyle: 'bg-rose-500/10 text-rose-400 border-rose-800/60',
    isFailure: true,
  },
  ROTATION_REQUIRED: {
    state: 'ROTATION_REQUIRED',
    label: 'Credential Rotation Required',
    description: 'Exposed secret requires manual token revocation and rotation.',
    badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-800/60 font-bold',
    isFailure: true,
  },
};

const VALID_TRANSITIONS: Record<WorkflowState, WorkflowState[]> = {
  PR_OPENED: ['SCANNING'],
  SCANNING: ['FINDING_DETECTED'],
  FINDING_DETECTED: ['TRIAGED'],
  TRIAGED: ['REMEDIATION_STARTED', 'ROTATION_REQUIRED'],
  REMEDIATION_STARTED: ['PATCH_GENERATED', 'REMEDIATION_FAILED'],
  PATCH_GENERATED: ['VALIDATING'],
  VALIDATING: ['VALIDATION_PASSED', 'VALIDATION_FAILED'],
  VALIDATION_PASSED: ['RESCAN_PASSED', 'RESCAN_FAILED'],
  RESCAN_PASSED: ['VERIFIED'],
  VERIFIED: ['PR_CREATED'],
  PR_CREATED: ['HUMAN_REVIEW'],
  HUMAN_REVIEW: ['MERGED'],
  MERGED: [],
  VALIDATION_FAILED: ['VALIDATING', 'REMEDIATION_STARTED', 'TRIAGED'],
  RESCAN_FAILED: ['REMEDIATION_STARTED', 'TRIAGED'],
  REMEDIATION_FAILED: ['TRIAGED'],
  ROTATION_REQUIRED: ['HUMAN_REVIEW', 'MERGED'],
};

export function canTransition(from: WorkflowState, to: WorkflowState): boolean {
  if (from === to) return true;
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

export function getStateMetadata(state: WorkflowState): StateMetadata {
  return STATE_METADATA_MAP[state] || {
    state,
    label: state,
    description: 'Simulated state',
    badgeStyle: 'bg-slate-800 text-slate-300',
  };
}
