'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, Sparkles } from 'lucide-react';

export const StickmanLabOperator: React.FC = () => {
  const [typingStep, setTypingStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTypingStep((prev) => (prev + 1) % 4);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const commands = [
    'vault --init-ram',
    'pass store --sec',
    'win-r --alias mypass',
    'vault --zeroize',
  ];

  return (
    <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {/* Stickman Operator SVG */}
        <div className="relative">
          <svg
            width="50"
            height="50"
            viewBox="0 0 80 80"
            className="stroke-cyan-400 fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round"
          >
            {/* Terminal Desk */}
            <line x1="10" y1="62" x2="70" y2="62" className="stroke-slate-700 stroke-[2]" />
            <rect
              x="42"
              y="34"
              width="26"
              height="20"
              rx="2"
              className="fill-slate-900 stroke-cyan-500/80 stroke-[1.5]"
            />
            <line x1="55" y1="54" x2="55" y2="62" className="stroke-slate-600 stroke-[2]" />
            <line x1="48" y1="62" x2="62" y2="62" className="stroke-slate-600 stroke-[2]" />

            {/* Terminal Screen text lines */}
            <line x1="46" y1="40" x2="58" y2="40" className="stroke-emerald-400 stroke-[1]" />
            <line x1="46" y1="45" x2="62" y2="45" className="stroke-emerald-400 stroke-[1]" />
            <circle cx="64" cy="49" r="1" className="fill-emerald-400 stroke-none animate-ping" />

            {/* Stickman Body (Seated) */}
            <circle cx="26" cy="22" r="9" className="fill-cyan-950/40" />
            <line x1="26" y1="31" x2="26" y2="52" />
            {/* Arms reaching to keyboard */}
            <path
              d={
                typingStep % 2 === 0
                  ? 'M 26 38 L 38 46 L 46 52'
                  : 'M 26 38 L 36 44 L 46 50'
              }
              className="transition-all duration-300 stroke-cyan-300"
            />
            {/* Legs seated on stool */}
            <line x1="26" y1="52" x2="20" y2="64" />
            <line x1="26" y1="52" x2="36" y2="64" />
            {/* Stool */}
            <line x1="22" y1="55" x2="30" y2="55" className="stroke-slate-600" />
            <line x1="26" y1="55" x2="26" y2="68" className="stroke-slate-600" />
          </svg>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-200">Ethical Operator Sandbox</span>
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
          </div>
          <div className="font-mono text-[10px] text-cyan-400 flex items-center gap-1">
            <Terminal className="w-3 h-3 text-emerald-400" />
            <span>&gt; {commands[typingStep]}</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2">
        <div className="text-right">
          <div className="text-[9px] font-mono text-slate-400">RAM Shield Protection</div>
          <div className="text-[10px] font-bold text-emerald-400">AES-256 GCM Live</div>
        </div>
        <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <Shield className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

