import React from 'react';
import { Severity } from '../../lib/types';
import { getSeverityStyle } from '../../lib/utils/formatting';
import { clsx } from 'clsx';

interface SeverityBadgeProps {
  severity: Severity;
  showDot?: boolean;
  className?: string;
}

export function SeverityBadge({ severity, showDot = true, className }: SeverityBadgeProps) {
  const style = getSeverityStyle(severity);

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider border select-none',
        style.badge,
        className
      )}
    >
      {showDot && <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', style.dot)}></span>}
      <span>{severity}</span>
    </span>
  );
}
