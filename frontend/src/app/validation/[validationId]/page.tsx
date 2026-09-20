'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { AppShell } from '../../../components/layout/AppShell';
import { orchestratorService } from '../../../lib/services/orchestrator';
import { Validation, Finding } from '../../../lib/types';
import { ValidationPipeline } from '../../../components/validation/ValidationPipeline';
import { FindingComparison } from '../../../components/findings/FindingComparison';
import { simulatorEngine } from '../../../lib/simulator/engine';
import { ArrowLeft, GitPullRequest, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';

export default function ValidationPage({ params }: { params: Promise<{ validationId: string }> }) {
  const resolvedParams = use(params);
  const [validation, setValidation] = useState<Validation | null>(null);
  const [finding, setFinding] = useState<Finding | null>(null);

  useEffect(() => {
    const update = async () => {
      const v = await orchestratorService.getValidationById(resolvedParams.validationId);
      if (v) {
        setValidation({ ...v });
        const f = await orchestratorService.getFindingById(v.findingId);
        if (f) setFinding(f);
      }
    };
    update();
    return orchestratorService.subscribe(update);
  }, [resolvedParams.validationId]);

  if (!validation) {
    return (
      <AppShell>
        <div className="py-12 text-center text-gray-400 font-mono text-xs">
          Loading validation record {resolvedParams.validationId}...
        </div>
      </AppShell>
    );
  }

  const isFailed = validation.overallStatus === 'failed';
  const isPassed = validation.overallStatus === 'passed';

  return (
    <AppShell>
      <div className="space-y-4 sm:space-y-5 max-w-full">
        {/* Navigation Breadcrumb */}
        <Link
          href={`/remediation/${validation.remediationId}`}
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Remediation {validation.remediationId}</span>
        </Link>

        {/* Validation Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#30363d] pb-3 min-w-0">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="font-bold text-gray-100">{validation.id}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400 truncate">Remediation: {validation.remediationId}</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-gray-100 font-sans mt-1">Validation & Re-Scan Execution</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {isFailed && (
              <button
                onClick={() => simulatorEngine.retry()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/60 text-xs font-semibold transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Failed Validation</span>
              </button>
            )}

            {isPassed && (
              <Link
                href="/pull-requests/PR-157"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-emerald-400 border border-emerald-900/60 text-xs font-semibold transition-colors"
              >
                <GitPullRequest className="w-3.5 h-3.5" />
                <span>Inspect Verified PR #157</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Validation Failure Warning Banner if Failed */}
        {isFailed && (
          <div className="p-3.5 bg-red-950/40 border border-red-800/60 rounded text-red-300 font-mono text-xs space-y-1 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Validation Suite Failed</span>
              <span className="text-red-300/90 font-sans text-xs">
                The candidate patch failed step check assertions. Auto-remediation is halted until unit tests or scope errors are corrected. Click Retry to re-test.
              </span>
            </div>
          </div>
        )}

        {/* Interactive Validation Pipeline */}
        <ValidationPipeline
          validation={validation}
          onValidationComplete={() => {
            orchestratorService.getValidationById(validation.id).then((v) => {
              if (v) setValidation({ ...v });
            });
          }}
        />

        {/* Finding Comparison Delta when passed */}
        {isPassed && finding && (
          <FindingComparison finding={finding} />
        )}
      </div>
    </AppShell>
  );
}
