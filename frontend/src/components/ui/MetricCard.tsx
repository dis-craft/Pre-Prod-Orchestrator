import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive?: boolean;
  };
  accentColor?: 'indigo' | 'rose' | 'amber' | 'emerald' | 'cyan';
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: MetricCardProps) {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded p-3.5 flex items-center justify-between">
      <div>
        <span className="text-[11px] font-mono uppercase text-gray-500 block font-medium">{title}</span>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-xl font-bold font-mono text-gray-100 tracking-tight">{value}</span>
          {subtitle && <span className="text-[11px] text-gray-500 font-sans">{subtitle}</span>}
        </div>
      </div>
      <div className="w-7 h-7 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center text-gray-400 shrink-0">
        <Icon className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}
