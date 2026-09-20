'use client';

import React, { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { DemoBanner } from '../../components/setup/DemoBanner';
import { SetupStepper } from '../../components/setup/SetupStepper';
import { StepRepository } from '../../components/setup/StepRepository';
import { StepAnalysis } from '../../components/setup/StepAnalysis';
import { StepPlan } from '../../components/setup/StepPlan';
import { StepGeneratedFiles } from '../../components/setup/StepGeneratedFiles';
import { StepGitHubActions } from '../../components/setup/StepGitHubActions';
import { StepVercel } from '../../components/setup/StepVercel';
import { StepValidation } from '../../components/setup/StepValidation';
import { StepSummary } from '../../components/setup/StepSummary';
import { 
  DEFAULT_SETUP_FORM, 
  generateSetupFiles, 
  generateAnalysis, 
  generateGitHubPlan, 
  generateVercelPlan,
  VALIDATION_CHECKS_LIST 
} from '../../lib/demo/setupTemplates';
import { SetupFormState, SetupState } from '../../lib/types/setup';
import { Wrench, Sparkles, ShieldCheck } from 'lucide-react';

export default function SetupPage() {
  const [form, setForm] = useState<SetupFormState>(DEFAULT_SETUP_FORM);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [maxReachedStep, setMaxReachedStep] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [githubSimulated, setGithubSimulated] = useState<boolean>(false);
  const [vercelSimulated, setVercelSimulated] = useState<boolean>(false);
  const [validationChecks, setValidationChecks] = useState(VALIDATION_CHECKS_LIST);

  // Derived state generated from current form
  const files = generateSetupFiles(form);
  const analysis = generateAnalysis(form);
  const githubPlan = generateGitHubPlan(form);
  const vercelPlan = generateVercelPlan(form);

  const handleFormChange = (updated: Partial<SetupFormState>) => {
    setForm((prev) => ({ ...prev, ...updated }));
  };

  const goToStep = (stepIdx: number) => {
    setCurrentStep(stepIdx);
    if (stepIdx > maxReachedStep) {
      setMaxReachedStep(stepIdx);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      goToStep(1); // Move to Step 2: Configuration
    }, 1200);
  };

  const handleReset = () => {
    setForm(DEFAULT_SETUP_FORM);
    setCurrentStep(0);
    setMaxReachedStep(0);
    setSelectedFileIndex(0);
    setGithubSimulated(false);
    setVercelSimulated(false);
    setValidationChecks(VALIDATION_CHECKS_LIST);
  };

  const fullState: SetupState = {
    step: currentStep,
    form,
    isAnalyzing,
    analysis,
    files,
    selectedFileIndex,
    viewMode: 'code',
    githubSimulated,
    vercelSimulated,
    validationChecks,
    validationComplete: currentStep >= 5,
  };

  return (
    <AppShell>
      <div className="space-y-4 max-w-5xl font-sans">
        {/* Page Header */}
        <div className="border-b border-[#30363d] pb-3 flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400">
                <Wrench className="w-3.5 h-3.5" />
              </div>
              <h1 className="text-lg font-bold tracking-tight text-gray-100">
                Repository Setup
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Configure Pre-Prod-Orchestrator for a repository.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/60 text-blue-300 font-mono">
              STEP 0{currentStep + 1} OF 07
            </span>
          </div>
        </div>

        {/* Demo Mode Persistent Indicator */}
        <DemoBanner />

        {/* Progress Stepper */}
        <SetupStepper
          currentStep={currentStep}
          maxReachedStep={maxReachedStep}
          onStepClick={(idx) => goToStep(idx)}
        />

        {/* Step Content Router */}
        <div className="pt-1">
          {currentStep === 0 && (
            <StepRepository
              form={form}
              onChange={handleFormChange}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          )}

          {currentStep === 1 && (
            <StepAnalysis
              analysis={analysis}
              onProceed={() => goToStep(2)}
              onBack={() => goToStep(0)}
              onReanalyze={handleAnalyze}
            />
          )}

          {currentStep === 2 && (
            <StepGeneratedFiles
              files={files}
              selectedFileIndex={selectedFileIndex}
              onSelectFile={(idx) => setSelectedFileIndex(idx)}
              onProceed={() => goToStep(3)}
              onBack={() => goToStep(1)}
            />
          )}

          {currentStep === 3 && (
            <StepGitHubActions
              plan={githubPlan}
              isSimulated={githubSimulated}
              onSimulate={() => setGithubSimulated(true)}
              onProceed={() => goToStep(4)}
              onBack={() => goToStep(2)}
            />
          )}

          {currentStep === 4 && (
            <StepVercel
              plan={vercelPlan}
              isSimulated={vercelSimulated}
              onSimulate={() => setVercelSimulated(true)}
              onProceed={() => goToStep(5)}
              onBack={() => goToStep(3)}
            />
          )}

          {currentStep === 5 && (
            <StepValidation
              checks={validationChecks}
              onRevalidate={() => setValidationChecks(VALIDATION_CHECKS_LIST)}
              onProceed={() => goToStep(6)}
              onBack={() => goToStep(4)}
            />
          )}

          {currentStep === 6 && (
            <StepSummary
              state={fullState}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </AppShell>
  );
}
