'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { orchestratorService } from '../../lib/services/orchestrator';
import { AuditEvent } from '../../lib/types';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function AuditPage() {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    orchestratorService.getAuditEvents().then(setEvents);
    return orchestratorService.subscribe(() => {
      orchestratorService.getAuditEvents().then(setEvents);
    });
  }, []);

  return (
    <AppShell>
      <div className="space-y-4 max-w-full">
        {/* Header */}
        <div className="border-b border-[#30363d] pb-3">
          <h1 className="text-lg font-bold tracking-tight text-gray-100">Security Audit Log & Evidence</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Immutable chronological log of scanner detections, policy decisions, patch generation, and validation execution.
          </p>
        </div>

        {/* Audit Event Timeline */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-2.5 sm:p-3 space-y-2 max-w-full">
          <div className="space-y-1.5 font-mono text-xs">
            {events.map((ev) => {
              const isExpanded = expandedId === ev.id;

              return (
                <div key={ev.id} className="rounded border border-[#30363d] bg-[#0d1117] overflow-hidden min-w-0">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : ev.id)}
                    className="w-full p-2.5 flex flex-col sm:flex-row sm:items-center justify-between text-left hover:bg-[#21262d]/60 transition-colors gap-2 min-w-0"
                  >
                    <div className="flex flex-wrap items-center gap-2 min-w-0">
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                      )}
                      <span className="font-semibold text-gray-200 truncate">{ev.action}</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#21262d] border border-[#30363d] text-gray-400 shrink-0">
                        {ev.component}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-gray-400 text-[11px] shrink-0">
                      <span className="truncate">{ev.actor}</span>
                      <span className="text-gray-500 font-mono text-[10px] sm:text-[11px]">{ev.timestamp}</span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-3 bg-[#0d1117] border-t border-[#30363d] space-y-1.5 max-w-full">
                      <span className="text-gray-500 text-[10px] block uppercase font-medium">RAW EVIDENCE PAYLOAD</span>
                      <pre className="p-2.5 bg-[#161b22] rounded border border-[#30363d] text-emerald-400 text-[11px] overflow-x-auto max-w-full font-mono">
                        {JSON.stringify(ev.evidence, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
