'use client';

import React from 'react';
import { Sparkles, BookOpen, Flame, Command, Cpu, Wifi, ArrowRight, Terminal } from 'lucide-react';
import { StealthVaultLogo } from '@/components/common/StealthVaultLogo';
import { StickmanHomeHero } from '@/components/stickman/StickmanHomeHero';
import { useSandboxStore } from '@/stores/useSandboxStore';

export const HomeView: React.FC = () => {
  const { setActiveTab, setPlatformGuide, setGuideStep, themeMode, triggerBootSequence } = useSandboxStore();
  const isLight = themeMode === 'light';

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full p-6 sm:p-8 overflow-y-auto space-y-10">
      {/* Main Hero Banner */}
      <div className="flex flex-col items-center justify-center text-center space-y-5 pt-6 max-w-3xl mx-auto w-full px-2 sm:px-4">
        {/* Centered Glowing Logo with Ambient Aura */}
        <div className="flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className={`absolute inset-0 rounded-full blur-3xl transform scale-150 animate-pulse pointer-events-none ${
              isLight ? 'bg-cyan-400/15' : 'bg-cyan-500/20'
            }`} />
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              <StealthVaultLogo
                size={110}
                className={`relative animate-float-gentle mx-auto ${
                  isLight ? 'drop-shadow-[0_0_20px_rgba(14,165,233,0.35)]' : 'drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Feature Pill Badge */}
        <div className={`inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${
          isLight
            ? 'bg-cyan-100/80 border border-cyan-300 text-cyan-800'
            : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-cyan-950/30'
        }`}>
          <Sparkles className={`w-4 h-4 animate-pulse ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`} /> Next-Gen Volatile Password Manager
        </div>

        {/* Hero Title */}
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight ${
          isLight ? 'text-slate-900' : 'text-slate-100'
        }`}>
          Keamanan Kredensial{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
            Tanpa Jejak di Disk
          </span>
        </h1>

        {/* Hero Description */}
        <p className={`text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed ${isLight ? 'text-slate-600 font-normal' : 'text-slate-400'}`}>
          Dokumentasi &amp; Platform Simulator Interaktif TryHackMe-style untuk sistem{' '}
          <strong className={isLight ? 'text-cyan-800 font-semibold' : 'text-cyan-400 font-semibold'}>Stealth Password Vault</strong>. Eksekusi langsung di memori volatile RAM,
          sinkronisasi P2P Android &lt;&gt; PC tanpa server cloud, dan peluncuran tersembunyi via Windows Run.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full">
          <button
            onClick={() => setActiveTab('docs')}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-xl shadow-cyan-950/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-4 h-4 stroke-[2.5]" /> Pelajari Guidebook
          </button>
          <button
            onClick={() => setActiveTab('lab')}
            className={`w-full sm:w-auto px-5 py-3 font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 shadow-md ${
              isLight
                ? 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-slate-200/50'
                : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700'
            }`}
          >
            <Flame className={`w-4 h-4 ${isLight ? 'text-cyan-600' : 'text-cyan-400'}`} /> Buka Interactive Lab (THM)
          </button>
          <button
            onClick={triggerBootSequence}
            className={`w-full sm:w-auto px-4 py-3 font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 shadow-md ${
              isLight
                ? 'bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-300 shadow-slate-200/50'
                : 'bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 border border-cyan-500/30'
            }`}
            title="Tampilkan ulang animasi booting matriks 01/10 perakit gambar vault"
          >
            <Terminal className={`w-4 h-4 animate-pulse ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`} /> Matriks 01/10 Loader
          </button>
        </div>
      </div>

      {/* STICKMAN VISUAL ANIMATION SCENARIO */}
      <StickmanHomeHero />

      {/* Quick Feature Interactive Cards (Aurora Gradient) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <button
          onClick={() => {
            setPlatformGuide('pc');
            setGuideStep(2);
            setActiveTab('docs');
          }}
          className="text-left card-aurora p-6 space-y-3 relative overflow-hidden group cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className={`p-3 rounded-2xl border w-fit ${
            isLight
              ? 'bg-cyan-100 text-cyan-700 border-cyan-200'
              : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
          }`}>
            <Command className="w-5 h-5" />
          </div>
          <h3 className={`text-sm sm:text-base font-bold transition ${
            isLight ? 'text-slate-800 group-hover:text-cyan-700' : 'text-slate-100 group-hover:text-cyan-400'
          }`}>
            Win + R Stealth Launch
          </h3>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Luncurkan vault secara tersembunyi menggunakan registry alias{' '}
            <code className={`font-mono px-1 py-0.5 rounded ${
              isLight ? 'bg-cyan-100 text-cyan-800' : 'text-cyan-300'
            }`}>mypass</code> tanpa perlu ikon desktop yang mencolok.
          </p>
          <div className={`text-[11px] font-bold flex items-center gap-1 group-hover:translate-x-1 transition pt-1 ${
            isLight ? 'text-cyan-700' : 'text-cyan-400'
          }`}>
            <span>Buka Panduan Windows Run</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        <button
          onClick={() => setActiveTab('intro')}
          className="text-left card-aurora p-6 space-y-3 relative overflow-hidden group cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className={`p-3 rounded-2xl border w-fit ${
            isLight
              ? 'bg-blue-100 text-blue-700 border-blue-200'
              : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
          }`}>
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className={`text-sm sm:text-base font-bold transition ${
            isLight ? 'text-slate-800 group-hover:text-blue-700' : 'text-slate-100 group-hover:text-blue-400'
          }`}>
            Volatile RAM Execution
          </h3>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Data terdekripsi hanya hidup di memori RAM dan langsung lenyap di-zeroize sempurna begitu aplikasi ditutup.
            Zero disk footprint.
          </p>
          <div className={`text-[11px] font-bold flex items-center gap-1 group-hover:translate-x-1 transition pt-1 ${
            isLight ? 'text-blue-700' : 'text-blue-400'
          }`}>
            <span>Pelajari Analisis Ancaman Memori</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className="text-left card-aurora p-6 space-y-3 relative overflow-hidden group cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className={`p-3 rounded-2xl border w-fit ${
            isLight
              ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
              : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
          }`}>
            <Wifi className="w-5 h-5" />
          </div>
          <h3 className={`text-sm sm:text-base font-bold transition ${
            isLight ? 'text-slate-800 group-hover:text-indigo-700' : 'text-slate-100 group-hover:text-indigo-400'
          }`}>
            Local P2P Mesh Sync
          </h3>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Sinkronisasi dua arah langsung antara aplikasi Android dan PC via local Wi-Fi port 14202 menggunakan
            algoritma CRDT tanpa server cloud.
          </p>
          <div className={`text-[11px] font-bold flex items-center gap-1 group-hover:translate-x-1 transition pt-1 ${
            isLight ? 'text-indigo-700' : 'text-indigo-400'
          }`}>
            <span>Lihat Diagram Alur Arsitektur</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </div>
  );
};
