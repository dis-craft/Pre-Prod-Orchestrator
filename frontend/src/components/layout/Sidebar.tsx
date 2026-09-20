'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  GitBranch, 
  SearchCode, 
  Wrench, 
  GitPullRequest, 
  FileText,
  BarChart3, 
  Settings,
  Database,
  X
} from 'lucide-react';
import { clsx } from 'clsx';
import { useAppMode } from '../../lib/mode/modeContext';
import { orchestratorService } from '../../lib/services/orchestrator';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ isMobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { isDemoMode } = useAppMode();
  const [repositoryName, setRepositoryName] = useState('Loading…');

  useEffect(() => {
    if (isDemoMode) return;
    let active = true;
    void orchestratorService.getRepositories().then((repos) => {
      if (active && repos[0]) setRepositoryName(repos[0].name);
    }).catch(() => {
      if (active) setRepositoryName('Unavailable');
    });
    return () => { active = false; };
  }, [isDemoMode]);

  const navigationItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Repositories', href: '/repositories', icon: GitBranch },
    { name: 'Findings', href: '/findings', icon: SearchCode },
    { name: 'Remediations', href: isDemoMode ? '/remediation/REM-SEC-001' : '/findings', icon: Wrench },
    { name: 'Pull Requests', href: '/pull-requests', icon: GitPullRequest },
    { name: 'Audit Log', href: '/audit', icon: FileText },
    { name: 'Live Report', href: '/report', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Brand Header */}
        <div className="px-4 py-3 border-b border-[#30363d] flex items-center justify-between">
          <Link
            href="/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-2 group"
          >
            <div className="w-6 h-6 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center text-gray-300">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <div className="leading-tight">
              <span className="font-semibold text-xs tracking-tight text-gray-200 block">Pre-Prod</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-mono">Orchestrator</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {/* Mode Indicator Badge */}
            {isDemoMode ? (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/50 text-[10px] font-mono text-amber-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span>DEMO</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-900/50 text-[10px] font-mono text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>NORMAL</span>
              </div>
            )}

            {/* Mobile Close Button */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                aria-label="Close menu"
                className="md:hidden p-1 rounded text-gray-400 hover:text-gray-100 hover:bg-[#21262d] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="p-2 space-y-0.5">
          <div className="px-2 py-1 text-[10px] uppercase font-mono font-semibold text-gray-500 tracking-wider">
            Navigation
          </div>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={clsx(
                  'flex items-center gap-2.5 px-2.5 py-2 rounded text-xs transition-colors',
                  isActive
                    ? 'bg-[#21262d] text-gray-100 font-semibold border border-[#30363d]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#21262d]/50 border border-transparent'
                )}
              >
                <Icon className={clsx('w-3.5 h-3.5', isActive ? 'text-gray-200' : 'text-gray-500')} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Target Repository Context Footer */}
      <div className="p-3 border-t border-[#30363d] bg-[#0d1117]/60">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
          <Database className="w-3.5 h-3.5 text-gray-500 shrink-0" />
          <div className="truncate">
            <span className="text-[10px] text-gray-500 block">TARGET REPO</span>
            <span className="text-gray-300 font-medium truncate block">
              {isDemoMode ? 'payments-api' : repositoryName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Stationary Sidebar */}
      <aside className="hidden md:flex w-56 border-r border-[#30363d] bg-[#161b22] flex-col justify-between h-screen sticky top-0 shrink-0 select-none font-sans text-xs">
        {sidebarContent}
      </aside>

      {/* Mobile Off-Canvas Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Overlay */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Sliding Drawer Container */}
          <aside className="relative z-50 w-64 max-w-[80vw] bg-[#161b22] border-r border-[#30363d] h-full shadow-2xl flex flex-col justify-between font-sans text-xs">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
