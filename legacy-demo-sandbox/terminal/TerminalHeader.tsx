'use client';

import React from 'react';
import { Terminal, Circle } from 'lucide-react';

interface TerminalHeaderProps {
  title?: string;
  statusText?: string;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  title = 'Stealth Interactive Shell',
  statusText = 'Online (RAM Mode)',
}) => {
  return (
    <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
      <div className="flex items-center gap-2">
        <Terminal className="w-4 h-4 text-cyan-400" />
        <span className="font-mono text-slate-200 font-semibold">{title}</span>
        <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full ml-2">
          <Circle className="w-2 h-2 fill-emerald-400 animate-pulse" />
          {statusText}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer" />
      </div>
    </div>
  );
};