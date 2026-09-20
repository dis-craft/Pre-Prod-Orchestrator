import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface DemoBannerProps {
  compact?: boolean;
}

export function DemoBanner({ compact = false }: DemoBannerProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-amber-950/40 border border-amber-800/50 text-amber-300 font-mono text-[11px]">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="font-semibold uppercase tracking-wider text-amber-400">BANKAI MODE:</span>
        <span className="text-amber-300/90">GitHub and Vercel operations are simulated. No external files or repos modified.</span>
      </div>
    );
  }

  return (
    <div className="p-3.5 sm:p-4 rounded bg-[#161b22] border border-amber-800/40 relative overflow-hidden text-xs font-sans">
      <div className="absolute top-0 left-0 bottom-0 w-1 bg-amber-500" />
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-[10px] font-bold uppercase tracking-wider">
              BANKAI
            </span>
            <span className="font-semibold text-gray-200">
              Interactive Repository Automation Setup
            </span>
          </div>
          <p className="text-gray-400 leading-relaxed text-[11px] sm:text-xs">
            This workflow demonstrates how Pre-Prod-Orchestrator analyzes repositories and generates CI/CD automation.
            All GitHub connection, Actions creation, and Vercel provisioning steps are <strong className="text-gray-200">simulated in-browser</strong>.
            No tokens are transmitted, and no external repositories are modified.
          </p>
        </div>
      </div>
    </div>
  );
}
