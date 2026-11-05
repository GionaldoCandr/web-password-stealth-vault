'use client';

import React from 'react';
import { HeaderNav } from '@/components/common/HeaderNav';
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

  return (
    <div
      className={`h-screen font-sans flex flex-col antialiased transition-colors duration-300 overflow-hidden ${
        isLight
          ? 'bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white'
          : 'bg-slate-950 text-slate-100 selection:bg-cyan-400 selection:text-slate-950'
      }`}
    >
      {/* Top Header Navbar */}
      <HeaderNav />

      {/* Main Workspace Tabs */}
      <main className="flex-1 min-h-0 flex overflow-hidden">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'intro' && <IntroView />}
        {activeTab === 'docs' && <DocsView />}
        {activeTab === 'lab' && <LabView />}
        {activeTab === 'architecture' && <ArchitectureView />}
        {activeTab === 'curriculum' && <CurriculumView />}
      </main>
    </div>
  );
}
