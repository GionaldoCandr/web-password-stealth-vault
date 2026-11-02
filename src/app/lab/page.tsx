'use client';

import React, { useEffect } from 'react';
import { HeaderNav } from '@/components/common/HeaderNav';
import { LabView } from '@/components/lab/LabView';
import { useSandboxStore } from '@/stores/useSandboxStore';

export default function LabPage() {
  const { setActiveTab } = useSandboxStore();

  useEffect(() => {
    setActiveTab('lab');
  }, [setActiveTab]);

  return (
    <div className="min-h-screen font-sans flex flex-col antialiased bg-slate-950 text-slate-100">
      <HeaderNav />
      <main className="flex-1 flex overflow-hidden">
        <LabView />
      </main>
    </div>
  );
}
