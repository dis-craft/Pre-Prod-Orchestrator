'use client';

import React, { useState, useCallback } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DemoControls } from '../simulator/DemoControls';
import { AppModeProvider, useAppMode } from '../../lib/mode/modeContext';

interface AppShellProps {
  children: React.ReactNode;
}

function AppShellContent({ children }: AppShellProps) {
  const { isDemoMode } = useAppMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#090d16] text-gray-100 antialiased overflow-x-hidden">
      {/* Sidebar (Desktop Stationary + Mobile Off-Canvas Drawer) */}
      <Sidebar isMobileOpen={isMobileMenuOpen} onCloseMobile={closeMobileMenu} />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header onToggleMobileMenu={toggleMobileMenu} />
        {isDemoMode && <DemoControls />}
        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto min-w-0">
          <div className="max-w-7xl mx-auto w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export function AppShell({ children }: AppShellProps) {
  return (
    <AppModeProvider>
      <AppShellContent>{children}</AppShellContent>
    </AppModeProvider>
  );
}
