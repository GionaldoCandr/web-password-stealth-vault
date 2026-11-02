'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Key, ShieldCheck, Sparkles } from 'lucide-react';

export const StickmanDocsLauncher: React.FC = () => {
  const [typedCommand, setTypedCommand] = useState('m');

  useEffect(() => {
    const text = 'mypass';
    let idx = 1;
    const timer = setInterval(() => {
      setTypedCommand(text.slice(0, idx));
      idx = (idx % text.length) + 1;
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-4 p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Peluncuran Senyap Tanpa Jejak Desktop (Windows Run)
        </span>
        <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800">
          HKCU Registry App Paths
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Left: Stickman User Pressing Win + R */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-around">
          <svg width="85" height="95" viewBox="0 0 100 120" className="stroke-cyan-400 fill-none stroke-[3.5] stroke-linecap-round stroke-linejoin-round">
            {/* Head */}
            <circle cx="45" cy="24" r="14" className="fill-cyan-950/40" />
            {/* Smile / Visor */}
            <line x1="38" y1="24" x2="52" y2="24" className="stroke-cyan-300 stroke-[2.5]" />

            {/* Body leaning forward to keyboard */}
            <line x1="45" y1="38" x2="45" y2="76" />

            {/* Arms pressing keyboard */}
            <line x1="45" y1="50" x2="72" y2="68" />
            <line x1="45" y1="50" x2="64" y2="72" />

            {/* Glowing Keys Win + R */}
            <rect x="68" y="66" width="14" height="10" rx="2" className="stroke-cyan-300 fill-cyan-500/20 stroke-[2]" />
            <rect x="58" y="70" width="10" height="10" rx="2" className="stroke-blue-400 fill-blue-500/20 stroke-[2]" />

            {/* Legs seated on chair */}
            <line x1="45" y1="76" x2="25" y2="95" />
            <line x1="25" y1="95" x2="25" y2="112" />
            <line x1="45" y1="76" x2="55" y2="95" />
            <line x1="55" y1="95" x2="55" y2="112" />
          </svg>

          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] text-slate-500 font-mono block">Shortcut Rahasia:</span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-200">
              <kbd className="px-2 py-1 bg-slate-900 border border-slate-700 rounded shadow-sm text-cyan-300">Win</kbd>
              <span>+</span>
              <kbd className="px-2 py-1 bg-slate-900 border border-slate-700 rounded shadow-sm text-cyan-300">R</kbd>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Membuka dialog Run Windows tanpa shortcut di desktop.
            </p>
          </div>
        </div>

        {/* Right: Simulated Run Dialog */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between text-slate-400 text-[10px] border-b border-slate-800 pb-1.5">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold text-slate-200">Windows Run Dialog</span>
            </div>
            <span className="text-emerald-400 font-mono">Registry Alias Mapped</span>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 block font-mono">Open command:</label>
            <div className="flex items-center justify-between bg-slate-900 border border-cyan-500/40 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300">
              <span>{typedCommand}<span className="animate-ping font-bold">|</span></span>
              <Key className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[9px] text-slate-500 font-mono">Target: %LOCALAPPDATA%\SystemCache\mypass.exe</span>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Stealth Launch
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

