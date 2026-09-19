'use client';

import React, { useEffect, useState } from 'react';
import { simulatorEngine, SimulatorStatus } from '../../lib/simulator/engine';
import { getStateMetadata } from '../../lib/simulator/stateMachine';
import { ScenarioSelector } from './ScenarioSelector';
import { Play, Pause, SkipForward, RotateCcw, FastForward, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';

export function DemoControls() {
  const [status, setStatus] = useState<SimulatorStatus>(simulatorEngine.getStatus());

  useEffect(() => {
    const update = () => setStatus(simulatorEngine.getStatus());
    return simulatorEngine.subscribe(update);
  }, []);

  const meta = getStateMetadata(status.currentState);

  return (
    <div className="bg-[#161b22] border-b border-[#30363d] px-3 sm:px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs min-w-0">
      {/* Active Workflow State Badge & Progress */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
        <ScenarioSelector />

        <div className="h-3.5 w-px bg-[#30363d] hidden sm:block"></div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-gray-500 font-medium hidden sm:inline">State:</span>
          <span className={clsx('px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold border uppercase truncate', meta.badgeStyle)}>
            {meta.label}
          </span>
          <span className="text-[11px] text-gray-500 font-mono">
            ({status.stateIndex + 1}/{status.totalStates})
          </span>
        </div>
      </div>

      {/* Control Action Buttons */}
      <div className="flex items-center flex-wrap gap-1.5 font-mono text-xs">
        {/* Run / Resume / Pause Button */}
        {status.isRunning && !status.isPaused ? (
          <button
            onClick={() => simulatorEngine.pause()}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-amber-400 border border-amber-800/40 font-semibold transition-colors"
          >
            <Pause className="w-3 h-3 fill-current" />
            <span>Pause</span>
          </button>
        ) : (
          <button
            onClick={() => simulatorEngine.start()}
            disabled={status.isCompleted}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-100 border border-[#30363d] font-semibold transition-colors disabled:opacity-40"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{status.isPaused ? 'Resume' : 'Run Demo'}</span>
          </button>
        )}

        {/* Next Step Button */}
        <button
          onClick={() => simulatorEngine.nextStep()}
          disabled={status.isCompleted || (status.isRunning && !status.isPaused)}
          title="Advance to next state"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 border border-[#30363d] font-semibold transition-colors disabled:opacity-40"
        >
          <SkipForward className="w-3 h-3" />
          <span>Next Step</span>
        </button>

        {/* Retry Button (Visible when failed) */}
        {status.isFailed && (
          <button
            onClick={() => simulatorEngine.retry()}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 font-semibold transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry</span>
          </button>
        )}

        {/* Fast Forward Button */}
        <button
          onClick={() => simulatorEngine.fastForward()}
          disabled={status.isCompleted}
          title="Instantly complete scenario"
          className="p-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-400 hover:text-gray-200 border border-[#30363d] transition-colors disabled:opacity-40"
        >
          <FastForward className="w-3 h-3" />
        </button>

        {/* Reset Button */}
        <button
          onClick={() => simulatorEngine.reset()}
          title="Reset scenario state"
          className="flex items-center gap-1 px-2 py-1 rounded bg-[#0d1117] hover:bg-[#21262d] text-gray-400 hover:text-gray-200 border border-[#30363d] transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}
