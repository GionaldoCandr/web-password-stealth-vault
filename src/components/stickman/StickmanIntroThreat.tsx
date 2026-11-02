'use client';

import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, ShieldCheck, Play, Pause, RotateCcw, AlertTriangle, ArrowRight, HardDrive, Cpu } from 'lucide-react';

export const StickmanIntroThreat: React.FC = () => {
  const [stage, setStage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-2xl backdrop-blur-xl">
      {/* Simulation Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Shield className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Simulasi Serangan Stickman: Mengapa Butuh Stealth Vault?
            </h3>
            <p className="text-xs text-slate-400">
              Lihat bagaimana infostealer mencuri file dari disk vs bagaimana Stealth Vault memblokirnya di RAM.
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[0, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStage(s);
                  setIsPlaying(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono transition cursor-pointer ${
                  stage === s
                    ? s === 1
                      ? 'bg-rose-500 text-slate-950'
                      : 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tahap {s + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-cyan-400 transition cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Graphic Canvas */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 relative overflow-hidden min-h-[220px] flex items-center justify-around">
        {/* Hacker / Infostealer Stickman */}
        <div className={`flex flex-col items-center gap-2 transition-all duration-700 ${
          stage === 1 ? 'translate-x-6' : stage === 2 ? '-translate-x-4 rotate-12' : ''
        }`}>
          <svg width="70" height="90" viewBox="0 0 100 120" className={`stroke-[3.5] stroke-linecap-round stroke-linejoin-round fill-none ${
            stage === 2 ? 'stroke-slate-500' : 'stroke-rose-400'
          }`}>
            {/* Head */}
            <circle cx="50" cy="24" r="14" className={stage === 2 ? 'fill-slate-900' : 'fill-rose-950/40'} />
            {/* Eye mask */}
            <path d="M 40 22 Q 50 18 60 22 Q 50 26 40 22 Z" className="fill-rose-400 stroke-none" />

            {/* Body */}
            <line x1="50" y1="38" x2="50" y2="76" />

            {/* Arms */}
            {stage === 0 && (
              <>
                <line x1="50" y1="48" x2="25" y2="60" />
                <line x1="50" y1="48" x2="75" y2="60" />
              </>
            )}
            {stage === 1 && (
              <>
                {/* Reaching out greedily with crowbar */}
                <line x1="50" y1="48" x2="82" y2="40" className="stroke-rose-400" />
                <line x1="82" y1="40" x2="90" y2="48" className="stroke-amber-400 stroke-[3]" />
                <line x1="50" y1="48" x2="30" y2="65" />
              </>
            )}
            {stage === 2 && (
              <>
                {/* Hacker falling backwards / repelled by shield */}
                <line x1="50" y1="48" x2="20" y2="30" />
                <line x1="50" y1="48" x2="30" y2="70" />
              </>
            )}

            {/* Legs */}
            <line x1="50" y1="76" x2={stage === 2 ? "25" : "34"} y2="108" />
            <line x1="50" y1="76" x2={stage === 2 ? "60" : "66"} y2="108" />
          </svg>
          <span className={`text-[10px] font-bold font-mono ${stage === 2 ? 'text-slate-500' : 'text-rose-400'}`}>
            {stage === 2 ? 'Hacker Terpental!' : 'Infostealer Trojan'}
          </span>
        </div>

        {/* Center Threat Action Graphic */}
        <div className="flex flex-col items-center justify-center text-center px-4">
          {stage === 0 && (
            <div className="space-y-1 text-slate-500 animate-pulse">
              <ArrowRight className="w-6 h-6 mx-auto text-cyan-400" />
              <span className="text-[10px] font-mono">Memindai Target Disk...</span>
            </div>
          )}
          {stage === 1 && (
            <div className="space-y-1 text-rose-400 animate-bounce">
              <ShieldAlert className="w-8 h-8 mx-auto text-rose-500" />
              <span className="text-[10px] font-bold font-mono bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
                CRITICAL DISK BREACH!
              </span>
            </div>
          )}
          {stage === 2 && (
            <div className="space-y-1 text-cyan-400">
              <div className="p-2 rounded-full bg-cyan-500/20 border-2 border-cyan-400 shadow-xl shadow-cyan-500/40 animate-pulse">
                <ShieldCheck className="w-8 h-8 text-cyan-300" />
              </div>
              <span className="text-[10px] font-bold font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30 block">
                RAM Shield Defends &amp; Zeroizes!
              </span>
            </div>
          )}
        </div>

        {/* Right: Storage Target (Disk vs Stealth Vault) */}
        <div className={`p-4 rounded-2xl border transition-all duration-500 flex flex-col items-center gap-2 max-w-[200px] text-center ${
          stage === 1
            ? 'bg-rose-950/40 border-rose-500 text-rose-300 scale-105 shadow-xl shadow-rose-950/50'
            : stage === 2
            ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300 scale-105 shadow-xl shadow-cyan-950/50'
            : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}>
          {stage === 2 ? (
            <Cpu className="w-9 h-9 text-cyan-400 animate-pulse" />
          ) : (
            <HardDrive className={`w-9 h-9 ${stage === 1 ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
          )}

          <div>
            <h4 className="text-xs font-bold">
              {stage === 2 ? 'Stealth Vault (RAM Only)' : 'Penyimpanan Biasa (Disk)'}
            </h4>
            <p className="text-[10px] font-mono text-slate-400 mt-0.5">
              {stage === 2 ? 'Memori Volatile [0x00 0x00]' : 'C:\\Users\\...\\passwords.txt'}
            </p>
          </div>

          <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
            stage === 1
              ? 'bg-rose-500 text-slate-950'
              : stage === 2
              ? 'bg-cyan-500 text-slate-950'
              : 'bg-slate-800 text-slate-400'
          }`}>
            {stage === 1 ? 'Data Bocor!' : stage === 2 ? '100% Aman Terlindungi' : 'Target Aktif'}
          </span>
        </div>
      </div>

      {/* 3 Step Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div
          onClick={() => { setStage(0); setIsPlaying(false); }}
          className={`p-3.5 rounded-xl border transition cursor-pointer ${
            stage === 0
              ? 'bg-cyan-950/30 border-cyan-400 text-cyan-300 shadow-md'
              : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700'
          }`}
        >
          <span className="font-bold block mb-1 text-[11px]">1. Scanning Disk Lokal</span>
          <span className="text-[10px] leading-relaxed">
            Trojan malware secara otomatis memindai file teks (.txt), Sticky Notes, dan database browser di hard disk.
          </span>
        </div>

        <div
          onClick={() => { setStage(1); setIsPlaying(false); }}
          className={`p-3.5 rounded-xl border transition cursor-pointer ${
            stage === 1
              ? 'bg-rose-950/40 border-rose-500 text-rose-300 shadow-md'
              : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700'
          }`}
        >
          <span className="font-bold block mb-1 text-[11px] text-rose-400">2. Ekstraksi Plaintext (Bahaya)</span>
          <span className="text-[10px] leading-relaxed">
            Kredensial terbaca bebas oleh infostealer karena tersimpan permanen di disk tanpa proteksi memori aktif.
          </span>
        </div>

        <div
          onClick={() => { setStage(2); setIsPlaying(false); }}
          className={`p-3.5 rounded-xl border transition cursor-pointer ${
            stage === 2
              ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300 shadow-md'
              : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700'
          }`}
        >
          <span className="font-bold block mb-1 text-[11px] text-cyan-400">3. Proteksi Stealth Vault</span>
          <span className="text-[10px] leading-relaxed">
            Kredensial hanya diproses di volatile RAM, dienkripsi AES-256-GCM, dan di-zeroize seketika saat aplikasi ditutup.
          </span>
        </div>
      </div>
    </div>
  );
};

