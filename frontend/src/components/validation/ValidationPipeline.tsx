'use client';

import React, { useState } from 'react';
import { Validation } from '../../lib/types';
import { getStepStatusStyle } from '../../lib/utils/formatting';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Play, 
  Terminal, 
  ChevronRight, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { clsx } from 'clsx';
import { orchestratorService } from '../../lib/services/orchestrator';

interface ValidationPipelineProps {
  validation: Validation;
  onValidationComplete?: () => void;
}

export function ValidationPipeline({ validation, onValidationComplete }: ValidationPipelineProps) {
  const [selectedStepId, setSelectedStepId] = useState<string>(validation.steps[0]?.id || 'step-1');
  const [isRunning, setIsRunning] = useState<boolean>(validation.overallStatus === 'running');
  const [currentVal, setCurrentVal] = useState<Validation>(validation);

  const selectedStep = currentVal.steps.find((s) => s.id === selectedStepId) || currentVal.steps[0];

  const handleRunValidation = async () => {
    setIsRunning(true);
    const updated = await orchestratorService.runValidation(currentVal.id, (stepId) => {
      setSelectedStepId(stepId);
    });
    setCurrentVal({ ...updated });
    setIsRunning(false);
    if (onValidationComplete) onValidationComplete();
  };

  return (
    <div className="space-y-4">
      {/* Pipeline Header & Trigger Bar */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-200">Validation Pipeline</h3>
            <span
              className={clsx(
                'px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border',
                getStepStatusStyle(currentVal.overallStatus).badge
              )}
            >
              {currentVal.overallStatus}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Automated multi-stage verification suite: patch scope, compilation, tests, and security re-scan.
          </p>
        </div>

        <button
          onClick={handleRunValidation}
          disabled={isRunning}
          className={clsx(
            'flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border transition-colors',
            currentVal.overallStatus === 'passed'
              ? 'bg-[#21262d] hover:bg-[#30363d] text-emerald-400 border-[#30363d]'
              : 'bg-[#21262d] hover:bg-[#30363d] text-gray-200 border-[#30363d]',
            isRunning && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isRunning ? (
            <>
              <RotateCcw className="w-3.5 h-3.5 animate-spin text-blue-400" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{currentVal.overallStatus === 'passed' ? 'Re-Run Pipeline' : 'Execute Validation'}</span>
            </>
          )}
        </button>
      </div>

      {/* Step Progress Bar Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-1.5 font-mono text-xs">
        {currentVal.steps.map((step, idx) => {
          const isSelected = step.id === selectedStepId;
          const statusStyle = getStepStatusStyle(step.status);

          return (
            <button
              key={step.id}
              onClick={() => setSelectedStepId(step.id)}
              className={clsx(
                'p-2.5 rounded border text-left transition-colors flex flex-col justify-between h-20 select-none',
                isSelected
                  ? 'bg-[#21262d] border-gray-400'
                  : 'bg-[#161b22] border-[#30363d] hover:bg-[#21262d]/60'
              )}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-gray-500 font-semibold">0{idx + 1}</span>
                {step.status === 'passed' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                {step.status === 'failed' && <XCircle className="w-3 h-3 text-red-400" />}
                {step.status === 'running' && <RotateCcw className="w-3 h-3 text-blue-400 animate-spin" />}
                {step.status === 'pending' && <Clock className="w-3 h-3 text-gray-600" />}
              </div>

              <div>
                <span className="text-[11px] font-semibold text-gray-200 block truncate leading-tight font-sans">
                  {step.name}
                </span>
                <span className={clsx('text-[9px] font-mono font-semibold block uppercase mt-0.5', statusStyle.text)}>
                  {step.status}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Execution Console Drawer */}
      {selectedStep && (
        <div className="bg-[#0d1117] border border-[#30363d] rounded font-mono text-xs">
          <div className="px-3.5 py-2 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-200 font-semibold">
              <Terminal className="w-3.5 h-3.5 text-gray-400" />
              <span>Step Logs: {selectedStep.name}</span>
              <span className={clsx('px-1.5 py-0.2 rounded text-[10px] uppercase font-bold border', getStepStatusStyle(selectedStep.status).badge)}>
                {selectedStep.status}
              </span>
            </div>
            {selectedStep.durationMs && (
              <span className="text-[10px] text-gray-500">Duration: {selectedStep.durationMs}ms</span>
            )}
          </div>

          <div className="p-3 space-y-2">
            {selectedStep.command && (
              <div className="bg-[#161b22] px-2.5 py-1.5 rounded border border-[#30363d] flex items-center gap-2 text-gray-300">
                <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                <span className="text-gray-500 select-none">$</span>
                <span className="text-gray-200 font-semibold">{selectedStep.command}</span>
              </div>
            )}

            <div className="bg-[#0d1117] p-3 rounded border border-[#21262d] space-y-1 text-gray-300 overflow-x-auto min-h-[120px]">
              {selectedStep.logs && selectedStep.logs.length > 0 ? (
                selectedStep.logs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-gray-600 select-none text-[10px] w-5 text-right">{i + 1}</span>
                    <span className="text-gray-300">{log}</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic py-3 text-center">
                  Pending pipeline step execution...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
