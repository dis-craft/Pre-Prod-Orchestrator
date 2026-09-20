import React from 'react';
import { FindingStatus, ValidationStepStatus, PRStatus } from '../../lib/types';
import { getFindingStatusStyle, getStepStatusStyle, getPRStatusStyle } from '../../lib/utils/formatting';
import { clsx } from 'clsx';

interface StatusBadgeProps {
  status: FindingStatus | ValidationStepStatus | PRStatus | string;
  type?: 'finding' | 'step' | 'pr';
  className?: string;
}

export function StatusBadge({ status, type = 'finding', className }: StatusBadgeProps) {
  let badgeStyle = 'bg-slate-800/60 text-slate-300 border-slate-700';

  if (type === 'finding') {
    badgeStyle = getFindingStatusStyle(status as FindingStatus);
  } else if (type === 'step') {
    badgeStyle = getStepStatusStyle(status as ValidationStepStatus).badge;
  } else if (type === 'pr') {
    badgeStyle = getPRStatusStyle(status as PRStatus);
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium uppercase tracking-wider border select-none',
        badgeStyle,
        className
      )}
    >
      <span>{status.replace(/_/g, ' ')}</span>
    </span>
  );
}
