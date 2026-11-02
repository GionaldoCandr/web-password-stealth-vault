'use client';

import React from 'react';
import { Sparkles, BookOpen, Flame, Command, Cpu, Wifi } from 'lucide-react';
import { StealthVaultLogo } from '@/components/common/StealthVaultLogo';
import { StickmanHomeHero } from '@/components/stickman/StickmanHomeHero';
import { useSandboxStore } from '@/stores/useSandboxStore';

export const HomeView: React.FC = () => {
  const { setActiveTab, themeMode } = useSandboxStore();
  const isLight = themeMode === 'light';

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full p-6 sm:p-8 overflow-y-auto space-y-10">
      {/* Main Hero Banner */}
      <div className="flex flex-col items-center justify-center text-center space-y-5 pt-6 max-w-3xl mx-auto w-full px-2 sm:px-4">
        {/* Centered Glowing Logo with Ambient Aura */}
        <div className="flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl transform scale-150 animate-pulse pointer-events-none" />
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              <StealthVaultLogo
                size={110}
                className="relative drop-shadow-[0_0_25px_rgba(56,189,248,0.6)] animate-float-gentle mx-auto"
              />
            </div>
          </div>
        </div>

        {/* Feature Pill Badge */}
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-bold text-cyan-400 shadow-lg shadow-cyan-950/30">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" /> Next-Gen Volatile Password Manager
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100 max-w-2xl mx-auto leading-tight">
          Keamanan Kredensial{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            Tanpa Jejak di Disk
          </span>
        </h1>

        {/* Hero Description */}
        <p className={`text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Dokumentasi &amp; Platform Simulator Interaktif TryHackMe-style untuk sistem{' '}
          <strong className="text-cyan-400 font-semibold">Stealth Password Vault</strong>. Eksekusi langsung di memori volatile RAM,
          sinkronisasi P2P Android &lt;&gt; PC tanpa server cloud, dan peluncuran tersembunyi via Windows Run.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full">
          <button
            onClick={() => setActiveTab('docs')}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-xl shadow-cyan-950/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-4 h-4 stroke-[2.5]" /> Pelajari Guidebook
          </button>
          <button
            onClick={() => setActiveTab('lab')}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Flame className="w-4 h-4 text-cyan-400" /> Buka Interactive Lab (THM)
          </button>
        </div>
      </div>

      {/* STICKMAN VISUAL ANIMATION SCENARIO */}
      <StickmanHomeHero />

      {/* Quick Feature Visual Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-3 relative overflow-hidden group hover:border-cyan-500/40 transition backdrop-blur-xl">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/20 w-fit">
            <Command className="w-5 h-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-100">Win + R Stealth Launch</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Luncurkan vault secara tersembunyi menggunakan registry alias{' '}
            <code className="text-cyan-300 font-mono">mypass</code> tanpa perlu ikon desktop yang mencolok.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-3 relative overflow-hidden group hover:border-blue-500/40 transition backdrop-blur-xl">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20 w-fit">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-100">Volatile RAM Execution</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Data terdekripsi hanya hidup di memori RAM dan langsung lenyap di-zeroize sempurna begitu aplikasi ditutup.
            Zero disk footprint.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-3 relative overflow-hidden group hover:border-indigo-500/40 transition backdrop-blur-xl">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20 w-fit">
            <Wifi className="w-5 h-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-100">Local P2P Mesh Sync</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sinkronisasi dua arah langsung antara aplikasi Android dan PC via local Wi-Fi port 14202 menggunakan
            algoritma CRDT tanpa server cloud.
          </p>
        </div>
      </div>
    </div>
  );
};
