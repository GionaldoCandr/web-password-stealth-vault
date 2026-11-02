'use client';

import React from 'react';
import { Cpu, ShieldAlert } from 'lucide-react';
import { useSandboxStore } from '@/stores/useSandboxStore';

export const MemoryViewer: React.FC = () => {
  const { memoryBlocks } = useSandboxStore();

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-cyan-400 font-semibold">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4" />
          <span>Volatile RAM Block Allocator</span>
        </div>
        <span className="text-[10px] text-slate-500">Live Memory Mapping</span>
      </div>

      <div className="space-y-2">
        {memoryBlocks.map((block) => (
          <div
            key={block.id}
            className={`p-3 rounded-lg border flex items-center justify-between transition-colors ${
              block.status === 'zeroized'
                ? 'bg-rose-950/20 border-rose-900/50 text-rose-400'
                : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">{block.address}</span>
                <span className="text-slate-400">[{block.label}]</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Buffer: {block.encryptedData}</p>
            </div>
            <div className="text-right">
              <span
                className={`text-[10px] px-2 py-0.5 rounded border uppercase ${
                  block.status === 'zeroized'
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                }`}
              >
                {block.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};