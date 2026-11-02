'use client';

import React from 'react';
import { Trophy, CheckCircle2 } from 'lucide-react';
import { useSandboxStore } from '@/stores/useSandboxStore';
import { ALL_LABS } from '@/data/labs';

export const ProgressTracker: React.FC = () => {
  const { completedTasks, currentLabId } = useSandboxStore();
  const activeLab = ALL_LABS.find((l) => l.id === currentLabId) || ALL_LABS[0];

  const totalTasks = activeLab.tasks.length;
  const currentCompleted = activeLab.tasks.filter((t) => completedTasks.includes(t.id)).length;
  const percentage = Math.round((currentCompleted / totalTasks) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-slate-200">Progress Lab Status</span>
        </div>
        <span className="text-xs font-mono font-bold text-cyan-400">{percentage}% Selesai</span>
      </div>

      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
        <div
          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Completed: {currentCompleted} Tasks</span>
        <span>Remaining: {totalTasks - currentCompleted} Tasks</span>
      </div>
    </div>
  );
};