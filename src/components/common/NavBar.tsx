'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, BookOpen, Terminal, Cpu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useSandboxStore } from '@/stores/useSandboxStore';

export const NavBar: React.FC = () => {
  const { ramVault, isLocked } = useSandboxStore();

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Kustom Cyber Shield */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-full bg-slate-900 border border-cyan-500/40 p-1.5 flex items-center justify-center group-hover:border-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
            <Shield className="w-5 h-5 text-cyan-400" />
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-sm -z-10" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 text-sm tracking-wide group-hover:text-cyan-400 transition-colors">
              STEALTH<span className="text-cyan-400">VAULT</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Docs & Interactive Hub</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/docs" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
            <BookOpen className="w-4 h-4" />
            <span>Guidebook</span>
          </Link>
          <Link href="/lab" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
            <Terminal className="w-4 h-4" />
            <span>Interactive Lab</span>
          </Link>
        </nav>

        {/* Right Section: RAM Indicator & Theme Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-mono">
            <Cpu className={`w-3.5 h-3.5 ${isLocked ? 'text-rose-400' : 'text-cyan-400 animate-pulse'}`} />
            <span className="text-slate-400">RAM:</span>
            <span className={isLocked ? 'text-slate-500' : 'text-cyan-400 font-semibold'}>
              {isLocked ? 'Locked' : `${ramVault.length} Items`}
            </span>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};