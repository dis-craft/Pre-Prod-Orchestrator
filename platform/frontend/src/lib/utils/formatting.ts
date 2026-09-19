import { Severity, ValidationStepStatus, FindingStatus, PRStatus } from '../types';

export function getSeverityStyle(severity: Severity) {
  switch (severity) {
    case 'CRITICAL':
      return {
        bg: 'bg-red-950/30',
        border: 'border-red-800/40',
        text: 'text-red-400',
        badge: 'bg-red-500/10 text-red-400 border-red-800/40',
        dot: 'bg-red-500',
      };
    case 'HIGH':
      return {
        bg: 'bg-amber-950/30',
        border: 'border-amber-800/40',
        text: 'text-amber-400',
        badge: 'bg-amber-500/10 text-amber-400 border-amber-800/40',
        dot: 'bg-amber-500',
      };
    case 'MEDIUM':
      return {
        bg: 'bg-yellow-950/20',
        border: 'border-yellow-800/40',
        text: 'text-yellow-400',
        badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-800/40',
        dot: 'bg-yellow-500',
      };
    case 'LOW':
      return {
        bg: 'bg-blue-950/20',
        border: 'border-blue-800/40',
        text: 'text-blue-400',
        badge: 'bg-blue-500/10 text-blue-400 border-blue-800/40',
        dot: 'bg-blue-500',
      };
    case 'INFO':
    default:
      return {
        bg: 'bg-zinc-900',
        border: 'border-zinc-800',
        text: 'text-zinc-400',
        badge: 'bg-zinc-800/60 text-zinc-300 border-zinc-700',
        dot: 'bg-zinc-400',
      };
  }
}

export function getStepStatusStyle(status: ValidationStepStatus) {
  switch (status) {
    case 'passed':
      return {
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-800/40',
        text: 'text-emerald-400',
        iconColor: '#3fb950',
      };
    case 'running':
      return {
        badge: 'bg-blue-500/10 text-blue-400 border-blue-800/40 font-semibold',
        text: 'text-blue-400',
        iconColor: '#58a6ff',
      };
    case 'failed':
      return {
        badge: 'bg-red-500/10 text-red-400 border-red-800/40',
        text: 'text-red-400',
        iconColor: '#f85149',
      };
    case 'skipped':
      return {
        badge: 'bg-[#21262d] text-gray-400 border-[#30363d]',
        text: 'text-gray-400',
        iconColor: '#8b949e',
      };
    case 'pending':
    default:
      return {
        badge: 'bg-[#161b22] text-gray-500 border-[#30363d]',
        text: 'text-gray-500',
        iconColor: '#6e7681',
      };
  }
}

export function getFindingStatusStyle(status: FindingStatus) {
  switch (status) {
    case 'VERIFIED':
    case 'MERGED':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-800/40';
    case 'VALIDATING':
    case 'REMEDIATING':
      return 'bg-blue-500/10 text-blue-400 border-blue-800/40';
    case 'TRIAGED':
      return 'bg-blue-500/10 text-blue-400 border-blue-800/40';
    case 'FAILED':
      return 'bg-red-500/10 text-red-400 border-red-800/40';
    case 'HUMAN_REVIEW':
      return 'bg-amber-500/10 text-amber-400 border-amber-800/40';
    case 'OPEN':
    default:
      return 'bg-[#21262d] text-gray-300 border-[#30363d]';
  }
}

export function getPRStatusStyle(status: PRStatus) {
  switch (status) {
    case 'MERGED':
      return 'bg-purple-500/10 text-purple-400 border-purple-800/40';
    case 'APPROVED':
    case 'READY_FOR_REVIEW':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-800/40';
    case 'VALIDATING':
      return 'bg-blue-500/10 text-blue-400 border-blue-800/40';
    case 'CLOSED':
      return 'bg-red-500/10 text-red-400 border-red-800/40';
    case 'OPEN':
    default:
      return 'bg-[#21262d] text-gray-300 border-[#30363d]';
  }
}
