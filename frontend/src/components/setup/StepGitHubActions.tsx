import React, { useState } from 'react';
import { GitHubActionsPlan } from '../../lib/types/setup';
import { 
  GitBranch, 
  Play, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Workflow, 
  ShieldAlert, 
  SearchCode, 
  Wrench, 
  CheckCheck,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';

interface StepGitHubActionsProps {
  plan: GitHubActionsPlan;
  isSimulated: boolean;
  onSimulate: () => void;
  onProceed: () => void;
  onBack: () => void;
}

export function StepGitHubActions({
  plan,
  isSimulated,
  onSimulate,
  onProceed,
  onBack,
}: StepGitHubActionsProps) {
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(plan.yamlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      onSimulate();
    }, 1200);
  };

  const stageIcons: Record<string, React.ElementType> = {
    s1: GitBranch,
    s2: Layers,
    s3: SearchCode,
    s4: ShieldAlert,
    s5: Wrench,
    s6: CheckCheck,
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Header Info */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Workflow className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-semibold text-gray-100">
                GitHub Actions Workflow Setup
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/60 text-purple-300 font-mono font-medium">
                STATUS: {plan.status}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Configures automated security validation gates and autonomous remediation workers directly inside CI.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 text-xs font-mono transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
              <span>{copied ? 'Copied YAML' : 'Copy YAML'}</span>
            </button>
          </div>
        </div>

        {/* Workflow Info Bar */}
        <div className="mt-4 p-3 rounded bg-[#0d1117] border border-[#21262d] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div>
            <span className="text-gray-500 text-[10px] block">WOULD CREATE WORKFLOW</span>
            <span className="text-gray-200 font-semibold">{plan.workflowPath}</span>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] block">EVENT TRIGGERS</span>
            <span className="text-blue-400">{plan.triggers.join(', ')}</span>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] block">PERMISSIONS SCOPE</span>
            <span className="text-emerald-400">contents:write, pr:write</span>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Stages */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-wider font-mono flex items-center gap-2">
            <span>Automated CI Execution Pipeline</span>
          </h3>
          <span className="text-[11px] text-gray-500 font-mono">6 Stages Configured</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
          {plan.stages.map((stage, idx) => {
            const Icon = stageIcons[stage.id] || Layers;
            return (
              <div
                key={stage.id}
                className="p-3 rounded bg-[#0d1117] border border-[#21262d] relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center text-blue-400">
                      <Icon className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-semibold text-gray-200 font-mono">
                      0{idx + 1}. {stage.name}
                    </span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40 font-mono">
                    {stage.status}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-tight pl-7">
                  {stage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulation Trigger Box */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-gray-200 uppercase tracking-wider font-mono block">
              Simulate GitHub Actions Registration
            </span>
            <p className="text-xs text-gray-400 mt-0.5">
              Simulate workflow file dispatch, branch registration, and GitHub secret wiring.
            </p>
          </div>

          <button
            type="button"
            disabled={isSimulating}
            onClick={handleRunSimulation}
            className="flex items-center gap-2 px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-medium text-xs shadow-xs transition-colors shrink-0"
          >
            {isSimulating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Simulating Setup…</span>
              </>
            ) : isSimulated ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Re-simulate Setup</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Setup</span>
              </>
            )}
          </button>
        </div>

        {/* Success Confirmation State */}
        {isSimulated && (
          <div className="mt-4 p-3 rounded bg-emerald-950/40 border border-emerald-800/60 flex items-start gap-2.5 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-200 font-mono block uppercase">
                SIMULATION COMPLETE
              </span>
              <p className="text-emerald-300/90 mt-0.5 text-[11px] leading-relaxed">
                The workflow <code className="text-emerald-200 font-mono bg-emerald-900/60 px-1 py-0.2 rounded">.github/workflows/preprod-security.yml</code> would be added to the repository. No real GitHub repository or workflow runs were modified.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Files</span>
        </button>

        <button
          type="button"
          onClick={onProceed}
          className="flex items-center gap-1.5 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-xs transition-colors"
        >
          <span>Configure Vercel Integration</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
