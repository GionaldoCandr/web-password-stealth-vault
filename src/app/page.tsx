'use client';

import React, { useEffect } from 'react';
import { HeaderNav } from '@/components/common/HeaderNav';
import { TabTransitionWrapper } from '@/components/common/TabTransitionWrapper';
import { HomeView } from '@/components/home/HomeView';
import { IntroView } from '@/components/intro/IntroView';
import { DocsView } from '@/components/docs/DocsView';
import { LabView } from '@/components/lab/LabView';
import { ArchitectureView } from '@/components/architecture/ArchitectureView';
import { CurriculumView } from '@/components/curriculum/CurriculumView';
import { useSandboxStore } from '@/stores/useSandboxStore';

export default function GuideHubPage() {
  const { activeTab, themeMode } = useSandboxStore();
  const isLight = themeMode === 'light';

  useEffect(() => {
    const isSystemDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeLight = themeMode === 'light' || (themeMode === 'system' && !isSystemDark);

    if (shouldBeLight) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [themeMode]);

  return (
    <div
      className={`h-screen font-sans flex flex-col antialiased transition-colors duration-300 overflow-hidden ${
        isLight
          ? 'bg-slate-100/90 text-slate-800 selection:bg-cyan-500 selection:text-white theme-light'
          : 'bg-[#0c1427]/90 text-slate-100 selection:bg-cyan-400 selection:text-slate-950'
      }`}
    >
      {/* Top Header Navbar */}
      <HeaderNav />

      {/* Main Workspace Tabs with Smooth Aurora Loading Transition */}
      <main className="flex-1 min-h-0 flex overflow-hidden relative">
        <TabTransitionWrapper activeTab={activeTab}>
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'intro' && <IntroView />}
          {activeTab === 'docs' && <DocsView />}
          {activeTab === 'lab' && <LabView />}
          {activeTab === 'architecture' && <ArchitectureView />}
          {activeTab === 'curriculum' && <CurriculumView />}
        </TabTransitionWrapper>
      </main>
    </div>
  );
}
