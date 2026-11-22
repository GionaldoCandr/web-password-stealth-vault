'use client';

import React from 'react';
import Link from 'next/link';
import { Home as HomeIcon, Info, BookOpen, Flame, Layers, Moon, Sun, Laptop, GraduationCap, Database, Sparkles, Terminal } from 'lucide-react';
import { StealthVaultLogo } from './StealthVaultLogo';
import { useSandboxStore, TabType, ThemeMode } from '@/stores/useSandboxStore';

export const HeaderNav: React.FC = () => {
  const { activeTab, setActiveTab, themeMode, setThemeMode, ramVault, snowfallEnabled, toggleSnowfall, triggerBootSequence } = useSandboxStore();
  const isLight = themeMode === 'light';

  const navItems: { id: TabType; label: string; icon: React.ReactNode; isAccent?: boolean }[] = [
    { id: 'home', label: 'Beranda', icon: <HomeIcon className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'intro', label: 'Why Stealth?', icon: <Info className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'docs', label: 'Guidebook', icon: <BookOpen className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'lab', label: 'Interactive Lab', icon: <Flame className="w-3.5 h-3.5 shrink-0" />, isAccent: true },
    { id: 'architecture', label: 'Architecture', icon: <Layers className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'curriculum', label: 'Dokumentasi Kurikulum', icon: <GraduationCap className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} /> },
  ];

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl border-b px-4 sm:px-6 py-2.5 flex items-center justify-between transition-colors duration-200 ${
        isLight ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-700/60 shadow-xl'
      }`}
    >
      {/* Brand Logo & Title */}
      <button
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer shrink-0"
      >
        <div className={`p-1 rounded-2xl border transition-all duration-300 shadow-md group-hover:scale-105 ${
          isLight 
            ? 'bg-white border-cyan-400/50 shadow-slate-300/60' 
            : 'bg-slate-900 border-cyan-500/30 group-hover:border-cyan-400 shadow-cyan-950/50'
        }`}>
          <StealthVaultLogo size={34} />
        </div>
        <div className="hidden sm:block">
          <h1 className={`text-sm sm:text-base font-extrabold flex items-center gap-2 tracking-wide transition ${
            isLight ? 'text-slate-800 group-hover:text-cyan-700' : 'text-slate-100 group-hover:text-cyan-400'
          }`}>
            STEALTH VAULT{' '}
            <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-md ${
              isLight 
                ? 'bg-cyan-100 text-cyan-800 border border-cyan-300' 
                : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
            }`}>
              Hub
            </span>
          </h1>
          <p className={`text-[10px] leading-tight ${isLight ? 'text-slate-500 font-medium' : 'text-slate-400'}`}>
            Zero-Disk RAM Security &amp; Interactive Simulator
          </p>
        </div>
      </button>

      {/* Navigation Tabs (Single line, horizontally scrollable on mobile without wrapping) */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-hidden max-w-full">
        <nav
          className={`flex items-center gap-1 p-1 border rounded-xl overflow-x-auto no-scrollbar shrink ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/60 border-slate-700/60'
          }`}
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            let activeClasses = isLight
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-semibold'
              : 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold';
            if (item.isAccent && isActive) {
              activeClasses = isLight
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-md shadow-cyan-600/25'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30';
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 h-8.5 rounded-lg text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? activeClasses
                    : isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/80 font-medium'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Milestone 2: Persistent PostgreSQL Vault */}
        <Link
          href="/vault"
          className={`flex items-center gap-1.5 px-3 py-1.5 h-8.5 rounded-lg text-xs font-semibold transition shadow-sm shrink-0 ${
            isLight
              ? 'bg-cyan-100/90 hover:bg-cyan-200/90 text-cyan-800 border border-cyan-300'
              : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
          }`}
          title="Buka Brankas Persisten PostgreSQL (Milestone 2 - v0.2)"
        >
          <Database className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Brankas DB</span>
          <span className={`text-[10px] font-mono px-1 py-0.2 rounded ${
            isLight ? 'bg-cyan-200 text-cyan-900 font-bold' : 'bg-cyan-400/20 text-cyan-300'
          }`}>v0.2</span>
        </Link>

        {/* Live RAM Badge Indicator */}
        <div
          className={`hidden xl:flex items-center gap-1.5 px-3 h-8.5 rounded-xl border text-[11px] font-mono shrink-0 ${
            ramVault.length > 0
              ? isLight
                ? 'bg-cyan-50 border-cyan-300 text-cyan-800'
                : 'bg-cyan-950/40 border-cyan-500/30 text-cyan-400'
              : isLight
              ? 'bg-slate-100 border-slate-300 text-slate-600'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${
            ramVault.length > 0 
              ? (isLight ? 'bg-cyan-600 animate-pulse' : 'bg-cyan-400 animate-pulse') 
              : 'bg-slate-400'
          }`} />
          <span className="whitespace-nowrap">RAM: {ramVault.length} items</span>
        </div>

        {/* Reboot Matrix Decryptor HUD */}
        <button
          onClick={triggerBootSequence}
          className={`hidden md:flex items-center gap-1.5 px-2.5 h-8.5 rounded-xl border text-xs transition cursor-pointer shrink-0 ${
            isLight
              ? 'bg-white border-slate-300 hover:bg-slate-100 text-slate-700 hover:text-cyan-800'
              : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300'
          }`}
          title="Putar Ulang Animasi Boot Matriks 01/10 (Dekripsi Gambar Vault)"
        >
          <Terminal className={`w-3.5 h-3.5 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} />
          <span className="hidden xl:inline text-[11px] font-mono">Matrix HUD</span>
        </button>

        {/* Cyber Snowfall FX Toggle Button */}
        <button
          onClick={toggleSnowfall}
          className={`flex items-center gap-1.5 px-2.5 h-8.5 rounded-xl border text-xs transition cursor-pointer shrink-0 ${
            snowfallEnabled
              ? isLight
                ? 'bg-cyan-100 border-cyan-300 text-cyan-800 shadow-xs'
                : 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-sm shadow-cyan-500/20'
              : isLight
              ? 'bg-white border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
          }`}
          title={snowfallEnabled ? 'Cyber Snowfall: Aktif (Gembok & Cipher Jatuh). Klik untuk jeda.' : 'Cyber Snowfall: Nonaktif. Klik untuk aktifkan.'}
        >
          <Sparkles className={`w-3.5 h-3.5 ${snowfallEnabled ? (isLight ? 'text-cyan-700 animate-pulse' : 'text-cyan-400 animate-pulse') : 'text-slate-400'}`} />
          <span className="hidden lg:inline text-[11px] font-mono font-medium">FX Snowfall</span>
        </button>

        {/* Theme Switcher */}
        <div
          className={`flex items-center p-1 border rounded-xl shrink-0 ${
            isLight ? 'bg-slate-200/80 border-slate-300' : 'bg-slate-800/60 border-slate-700/60'
          }`}
        >
          <button
            onClick={() => setThemeMode('dark')}
            className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
              themeMode === 'dark' ? 'bg-slate-800 text-cyan-400 shadow-sm' : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Dark Mode"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setThemeMode('light')}
            className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
              themeMode === 'light' ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80' : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Light Mode"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setThemeMode('system')}
            className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
              themeMode === 'system' ? 'bg-slate-800 text-cyan-400 shadow-sm' : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="System Default"
          >
            <Laptop className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
