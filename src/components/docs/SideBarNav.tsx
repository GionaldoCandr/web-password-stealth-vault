'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Smartphone, Globe, Terminal } from 'lucide-react';

function SideBarNavContent() {
  const pathname = usePathname();

  const links = [
    { href: '/docs', label: 'Overview & Security', icon: Shield },
    { href: '/docs/pc-install', label: 'PC Installation & Registry Alias', icon: Terminal },
    { href: '/docs/android-install', label: 'Android APK & P2P Sync', icon: Smartphone },
    { href: '/docs/extension-install', label: 'Chrome Extension & DOM Parsing', icon: Globe },
  ];

  return (
    <nav className="space-y-1">
      {links.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive
                ? 'bg-cyan-500/10 text-cyan-400 font-medium border border-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export const SideBarNav: React.FC = () => {
  return (
    <aside className="w-full md:w-64 space-y-2 shrink-0">
      <div className="p-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Documentation Topics
      </div>
      <Suspense fallback={<div className="h-40 bg-slate-900/50 rounded-lg animate-pulse" />}>
        <SideBarNavContent />
      </Suspense>
    </aside>
  );
};