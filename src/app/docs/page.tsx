'use client';

import React, { useEffect } from 'react';
import { HeaderNav } from '@/components/common/HeaderNav';
import { DocsView } from '@/components/docs/DocsView';
import { useSandboxStore } from '@/stores/useSandboxStore';

export default function DocsPage() {
  const { setActiveTab } = useSandboxStore();

  useEffect(() => {
    setActiveTab('docs');
  }, [setActiveTab]);

  return (
    <div className="min-h-screen font-sans flex flex-col antialiased bg-slate-950 text-slate-100">
      <HeaderNav />
      <main className="flex-1 flex overflow-hidden">
        <DocsView />
      </main>
    </div>
  );
}
