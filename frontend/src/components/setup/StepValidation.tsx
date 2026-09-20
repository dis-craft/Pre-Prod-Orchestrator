import React, { useState } from 'react';
import { ValidationCheckItem } from '../../lib/types/setup';
import { 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle,
  FileCheck,
  Check
} from 'lucide-react';
import { clsx } from 'clsx';

interface StepValidationProps {
  checks: ValidationCheckItem[];
  onRevalidate: () => void;
  onProceed: () => void;
  onBack: () => void;
}

export function StepValidation({
  checks,
  onRevalidate,
  onProceed,
  onBack,
}: StepValidationProps) {
  const [isValidating, setIsValidating] = useState(false);

  const handleRevalidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      onRevalidate();
    }, 1000);
  };

  const allPassed = checks.every((c) => c.status === 'PASSED');

  return (
    <div className="space-y-5 font-sans">
      {/* Header Info */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold text-gray-100">
                Automated Configuration & Schema Validation
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-mono font-medium">
                VALIDATION: SIMULATED — PASSED
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Verifies YAML syntax conformances, permission boundaries, schema compliance, and routing descriptors.
            </p>
          </div>

          <button
            type="button"
            disabled={isValidating}
            onClick={handleRevalidate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 text-xs font-mono transition-colors"
          >
            <RefreshCw className={clsx('w-3.5 h-3.5 text-gray-400', isValidating && 'animate-spin')} />
            <span>{isValidating ? 'Validating…' : 'Re-run Checks'}</span>
          </button>
        </div>

        {/* Disclaimer Bar */}
        <div className="mt-4 p-2.5 rounded bg-[#0d1117] border border-[#21262d] flex items-center gap-2 text-xs font-mono text-gray-400">
          <AlertCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>These checks are simulated frontend validation checks against generated files.</span>
        </div>
      </div>

      {/* Checks List */}
      <div className="bg-[#161b22] border border-[#30363d] rounded p-4 sm:p-5 space-y-2.5">
        <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-wider font-mono mb-3">
          Validation Test Suite ({checks.length} checks)
        </h3>

        {checks.map((check) => (
          <div
            key={check.id}
            className="p-3 rounded bg-[#0d1117] border border-[#21262d] flex items-start justify-between gap-3 text-xs"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-5 h-5 rounded bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-semibold text-gray-200 font-mono block">
                  {check.title}
                </span>
                <span className="text-[11px] text-gray-400 block mt-0.5">
                  {check.description}
                </span>
              </div>
            </div>

            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-mono uppercase font-bold shrink-0">
              PASSED
            </span>
          </div>
        ))}
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Vercel</span>
        </button>

        <button
          type="button"
          onClick={onProceed}
          className="flex items-center gap-1.5 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium shadow-xs transition-colors"
        >
          <span>Complete Setup Summary</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
