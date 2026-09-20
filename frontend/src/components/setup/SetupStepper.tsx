import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

export const STEPS = [
  { number: '01', title: 'Repository', short: 'Repo' },
  { number: '02', title: 'Configuration', short: 'Config' },
  { number: '03', title: 'Generated Files', short: 'Files' },
  { number: '04', title: 'GitHub Actions', short: 'Actions' },
  { number: '05', title: 'Vercel', short: 'Vercel' },
  { number: '06', title: 'Validation', short: 'Valid' },
  { number: '07', title: 'Complete', short: 'Done' },
];

interface SetupStepperProps {
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  maxReachedStep?: number;
}

export function SetupStepper({ currentStep, onStepClick, maxReachedStep = currentStep }: SetupStepperProps) {
  return (
    <div className="w-full bg-[#161b22] border border-[#30363d] rounded p-2.5 sm:p-3 overflow-x-auto">
      <div className="flex items-center justify-between min-w-max gap-1">
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          const isClickable = Boolean(onStepClick && idx <= maxReachedStep);

          return (
            <React.Fragment key={step.number}>
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick && onStepClick(idx)}
                className={clsx(
                  'flex items-center gap-2 px-2.5 py-1.5 rounded transition-all text-xs font-mono',
                  isCurrent && 'bg-[#21262d] text-gray-100 border border-[#58a6ff]/40 shadow-xs font-semibold',
                  isCompleted && 'text-gray-300 hover:bg-[#21262d]/50 cursor-pointer',
                  !isCurrent && !isCompleted && 'text-gray-500 cursor-not-allowed opacity-75'
                )}
              >
                <div
                  className={clsx(
                    'w-5 h-5 rounded flex items-center justify-center text-[10px] shrink-0 font-bold',
                    isCompleted && 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60',
                    isCurrent && 'bg-blue-600 text-white shadow-xs',
                    !isCurrent && !isCompleted && 'bg-[#0d1117] text-gray-500 border border-[#30363d]'
                  )}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[2.5]" /> : step.number}
                </div>
                <span className="hidden sm:inline font-sans text-xs tracking-tight">{step.title}</span>
                <span className="sm:hidden font-sans text-xs">{step.short}</span>
              </button>

              {idx < STEPS.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-gray-600 shrink-0 mx-0.5" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
