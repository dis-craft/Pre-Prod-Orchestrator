'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '../../components/layout/AppShell';
import { orchestratorService } from '../../lib/services/orchestrator';
import { useAppMode } from '../../lib/mode/modeContext';
import { RotateCcw, Monitor, PlayCircle } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { mode, setMode, isDemoMode } = useAppMode();
  const [autoRemediate, setAutoRemediate] = useState(true);
  const [requireHumanReview, setRequireHumanReview] = useState(true);
  const [minConfidence, setMinConfidence] = useState(90);

  const handleResetDemo = async () => {
    await orchestratorService.resetDemoData();
    alert('Reset simulated demo state back to default.');
    router.push('/dashboard');
  };

  return (
    <AppShell>
      <div className="space-y-4 max-w-3xl font-sans">
        {/* Header */}
        <div className="border-b border-[#30363d] pb-3">
          <h1 className="text-lg font-bold tracking-tight text-gray-100">Settings & Environment</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Configure application runtime mode, automated SAST scan rules, and remediation thresholds.
          </p>
        </div>

        {/* Environment Selector Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5 space-y-4">
          <div className="border-b border-[#30363d] pb-3">
            <h2 className="text-xs font-semibold text-gray-200 uppercase tracking-wider font-mono">
              Application Runtime Environment
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Choose between the clean product interface (Normal) and the controlled simulation environment (Demo).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            {/* Normal Mode Selection */}
            <div
              onClick={() => setMode('normal')}
              className={`p-3.5 rounded border cursor-pointer transition-colors ${
                mode === 'normal'
                  ? 'bg-[#0d1117] border-emerald-500/50 text-emerald-300'
                  : 'bg-[#0d1117]/50 border-[#30363d] text-gray-400 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-between font-bold mb-1">
                <div className="flex items-center gap-2 font-sans">
                  <Monitor className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Normal Mode</span>
                </div>
                {mode === 'normal' && <span className="text-[10px] text-emerald-400 font-mono">ACTIVE</span>}
              </div>
              <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                Standard product environment. Consumes production data sources with zero demo controls or simulated banners.
              </p>
            </div>

            {/* Demo Mode Selection */}
            <div
              onClick={() => setMode('demo')}
              className={`p-3.5 rounded border cursor-pointer transition-colors ${
                mode === 'demo'
                  ? 'bg-[#0d1117] border-amber-500/50 text-amber-300'
                  : 'bg-[#0d1117]/50 border-[#30363d] text-gray-400 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-between font-bold mb-1">
                <div className="flex items-center gap-2 font-sans">
                  <PlayCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Demo Mode</span>
                </div>
                {mode === 'demo' && <span className="text-[10px] text-amber-400 font-mono">ACTIVE</span>}
              </div>
              <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                Interactive simulator environment. Enables Phase 2 workflow controls, state machine stepper, and demo scenarios.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Form */}
        <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5 space-y-5 font-mono text-xs">
          <div className="border-b border-[#30363d] pb-2 font-sans">
            <h2 className="text-xs font-semibold text-gray-200 uppercase tracking-wider font-mono">
              Security Policy Parameters
            </h2>
          </div>

          <div className="flex items-center justify-between gap-3 border-b border-[#30363d] pb-3.5">
            <div>
              <span className="text-xs font-semibold text-gray-200 block font-sans">Auto-Generate Candidate Patches</span>
              <span className="text-gray-400 text-[11px] block mt-0.5">Trigger remediation engine for HIGH/CRITICAL findings.</span>
            </div>
            <input
              type="checkbox"
              checked={autoRemediate}
              onChange={(e) => setAutoRemediate(e.target.checked)}
              className="w-4 h-4 accent-gray-500 rounded cursor-pointer shrink-0"
            />
          </div>

          <div className="flex items-center justify-between gap-3 border-b border-[#30363d] pb-3.5">
            <div>
              <span className="text-xs font-semibold text-gray-200 block font-sans">Enforce Human Approval before PR Merge</span>
              <span className="text-gray-400 text-[11px] block mt-0.5">Require human security reviewer sign-off even after 100% validation pass.</span>
            </div>
            <input
              type="checkbox"
              checked={requireHumanReview}
              onChange={(e) => setRequireHumanReview(e.target.checked)}
              className="w-4 h-4 accent-gray-500 rounded cursor-pointer shrink-0"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-xs font-semibold text-gray-200 font-sans">Minimum Confidence Score Threshold</span>
              <span className="text-gray-300 font-bold">{minConfidence}%</span>
            </div>
            <input
              type="range"
              min={70}
              max={99}
              value={minConfidence}
              onChange={(e) => setMinConfidence(parseInt(e.target.value, 10))}
              className="w-full accent-gray-500"
            />
          </div>

          {isDemoMode && (
            <div className="pt-3 border-t border-[#30363d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-red-400 block font-sans">Reset Simulated Demo State</span>
                <span className="text-gray-500 text-[11px] block font-sans">Restore all findings, remediations, and validation steps to initial state.</span>
              </div>
              <button
                onClick={handleResetDemo}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#0d1117] hover:bg-[#21262d] text-red-400 border border-red-900/40 transition-colors shrink-0 self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset State</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
