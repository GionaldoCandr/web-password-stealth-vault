'use client';

import React, { useState, useEffect } from 'react';
import { HardDrive, Cpu, ShieldCheck, Search, Sparkles } from 'lucide-react';
import { useSandboxStore } from '@/stores/useSandboxStore';

export const StickmanHomeHero: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const { themeMode } = useSandboxStore();
  const isLight = themeMode === 'light';

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card-aurora w-full max-w-4xl mx-auto my-6 p-6 sm:p-7 relative overflow-hidden">
      {/* Background Cyber Grid effect */}
      <div className={`absolute inset-0 [background-size:16px_16px] pointer-events-none ${
        isLight
          ? 'bg-[radial-gradient(#0284c7_1px,transparent_1px)] opacity-10'
          : 'bg-[radial-gradient(#0e7490_1px,transparent_1px)] opacity-20'
      }`} />

      {/* Top Banner Tag */}
      <div className={`flex items-center justify-between border-b pb-3 mb-6 ${
        isLight ? 'border-slate-200' : 'border-slate-700/60'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full animate-ping ${isLight ? 'bg-cyan-600' : 'bg-cyan-400'}`} />
          <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
            isLight ? 'text-cyan-800' : 'text-cyan-400'
          }`}>
            Simulasi Visual: Volatile RAM vs Disk Storage
          </span>
        </div>
        <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${
          isLight
            ? 'bg-slate-100 text-slate-600 border-slate-300'
            : 'text-slate-400 bg-slate-800/80 border-slate-700/60'
        }`}>
          Animasi Interaktif Konseptual
        </span>
      </div>

      {/* Interactive Graphic Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left: Disk Crawler Infostealer */}
        <div className={`flex flex-col items-center text-center p-4 rounded-2xl border relative transition ${
          isLight
            ? 'bg-rose-50/70 border-rose-200/80 shadow-xs'
            : 'bg-slate-900/70 border-slate-700/60'
        }`}>
          <div className="h-28 flex items-center justify-center">
            <svg width="90" height="100" viewBox="0 0 100 120" className="stroke-rose-500 fill-none stroke-[3.5] stroke-linecap-round stroke-linejoin-round">
              {/* Head */}
              <circle cx="50" cy="24" r="14" className={isLight ? "stroke-rose-500 fill-rose-100" : "stroke-rose-400 fill-rose-950/30"} />
              {/* Eyes looking confused */}
              <circle cx="45" cy="22" r="1.5" className={isLight ? "fill-rose-700 stroke-none" : "fill-rose-300 stroke-none"} />
              <circle cx="55" cy="22" r="1.5" className={isLight ? "fill-rose-700 stroke-none" : "fill-rose-300 stroke-none"} />
              <path d="M 44 30 Q 50 26 56 30" className={isLight ? "stroke-rose-600 stroke-[2]" : "stroke-rose-300 stroke-[2]"} />

              {/* Body */}
              <line x1="50" y1="38" x2="50" y2="76" />

              {/* Left Arm holding magnifying glass down to disk */}
              <line x1="50" y1="48" x2={frame % 2 === 0 ? "24" : "28"} y2="60" />
              <circle cx={frame % 2 === 0 ? "18" : "22"} cy="66" r="8" className={isLight ? "stroke-amber-600 stroke-[2] fill-amber-100" : "stroke-amber-400 stroke-[2] fill-amber-950/20"} />
              <line x1={frame % 2 === 0 ? "24" : "28"} y1="72" x2={frame % 2 === 0 ? "30" : "34"} y2="78" className={isLight ? "stroke-amber-600 stroke-[3]" : "stroke-amber-400 stroke-[3]"} />

              {/* Right Arm scratching head */}
              <path d="M 50 48 L 74 38 L 66 22" className="stroke-rose-500" />

              {/* Legs */}
              <line x1="50" y1="76" x2="34" y2="108" />
              <line x1="50" y1="76" x2="66" y2="108" />
            </svg>
          </div>

          <div className="mt-2 space-y-1">
            <div className={`inline-flex items-center gap-1 text-[11px] font-bold ${
              isLight ? 'text-rose-700' : 'text-rose-400'
            }`}>
              <Search className="w-3.5 h-3.5" /> Infostealer Malware
            </div>
            <p className={`text-[10px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Memindai hard disk (%APPDATA%), namun <strong className={isLight ? "text-emerald-700 font-bold" : "text-emerald-400"}>gagal total</strong> karena disk kosong!
            </p>
          </div>
        </div>

        {/* Center: The Volatile RAM Cylinder Portal */}
        <div className={`flex flex-col items-center text-center p-4 rounded-2xl border relative transition ${
          isLight
            ? 'bg-gradient-to-b from-cyan-50/80 to-blue-50/80 border-cyan-300 shadow-xs'
            : 'bg-gradient-to-b from-cyan-950/30 to-blue-950/20 border-cyan-500/40'
        }`}>
          <div className="h-28 flex flex-col items-center justify-center relative">
            {/* Glowing Ring */}
            <div className={`w-20 h-20 rounded-full border-2 border-dashed animate-spin [animation-duration:12s] absolute ${
              isLight ? 'border-cyan-500' : 'border-cyan-400'
            }`} />
            <div className={`w-16 h-16 rounded-full border flex items-center justify-center shadow-lg ${
              isLight
                ? 'bg-white border-cyan-400/80 shadow-cyan-500/15'
                : 'bg-cyan-500/10 border-cyan-400/50 shadow-cyan-500/30'
            }`}>
              <Cpu className={`w-8 h-8 animate-pulse ${isLight ? 'text-cyan-700' : 'text-cyan-300'}`} />
            </div>

            {/* Micro Particles */}
            <div className={`absolute top-2 left-3 w-1.5 h-1.5 rounded-full animate-ping ${
              isLight ? 'bg-cyan-600' : 'bg-cyan-300'
            }`} />
            <div className={`absolute bottom-2 right-4 w-1 h-1 rounded-full animate-pulse ${
              isLight ? 'bg-blue-600' : 'bg-blue-400'
            }`} />
          </div>

          <div className="mt-2 space-y-1">
            <div className={`inline-flex items-center gap-1 text-[11px] font-bold ${
              isLight ? 'text-cyan-800' : 'text-cyan-300'
            }`}>
              <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`} /> Memory Heap (Volatile RAM)
            </div>
            <p className={`text-[10px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Kredensial aktif di RAM berenkripsi AES-256-GCM. Hilang seketika saat aplikasi ditutup.
            </p>
          </div>
        </div>

        {/* Right: Stealth Agent Stickman */}
        <div className={`flex flex-col items-center text-center p-4 rounded-2xl border relative transition ${
          isLight
            ? 'bg-slate-50/80 border-slate-200/80 shadow-xs'
            : 'bg-slate-900/70 border-slate-700/60'
        }`}>
          <div className="h-28 flex items-center justify-center">
            <svg width="90" height="100" viewBox="0 0 100 120" className="stroke-cyan-500 fill-none stroke-[3.5] stroke-linecap-round stroke-linejoin-round">
              {/* Head with Ninja Cyber Visor */}
              <circle cx="50" cy="24" r="14" className={isLight ? "stroke-cyan-600 fill-cyan-100" : "stroke-cyan-400 fill-cyan-950/40"} />
              {/* Glowing Visor Line */}
              <line x1="40" y1="23" x2="60" y2="23" className={isLight ? "stroke-cyan-700 stroke-[3]" : "stroke-cyan-300 stroke-[3]"} />

              {/* Body */}
              <line x1="50" y1="38" x2="50" y2="76" />

              {/* Left Arm holding Cyber Shield */}
              <line x1="50" y1="48" x2="26" y2="52" />
              <path d="M 16 42 Q 26 40 36 42 Q 36 60 26 70 Q 16 60 16 42 Z" className={isLight ? "stroke-cyan-600 fill-cyan-200/60 stroke-[2.5]" : "stroke-cyan-300 fill-cyan-500/20 stroke-[2.5]"} />

              {/* Right Arm giving thumbs up or holding golden key */}
              <path d="M 50 48 L 74 42 L 80 32" className={isLight ? "stroke-cyan-600" : "stroke-cyan-400"} />
              <circle cx="82" cy="28" r="4" className={isLight ? "stroke-amber-600 stroke-[2] fill-amber-500" : "stroke-amber-400 stroke-[2] fill-amber-400"} />

              {/* Legs in steady guard stance */}
              <line x1="50" y1="76" x2="30" y2="108" />
              <line x1="50" y1="76" x2="70" y2="108" />
            </svg>
          </div>

          <div className="mt-2 space-y-1">
            <div className={`inline-flex items-center gap-1 text-[11px] font-bold ${
              isLight ? 'text-cyan-800' : 'text-cyan-400'
            }`}>
              <ShieldCheck className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} /> Stealth Agent (User)
            </div>
            <p className={`text-[10px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Akses cepat tanpa desktop shortcut. Membuka via Win+R dan sinkronisasi P2P langsung.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
