'use client';

import React from 'react';
import { CheckCircle, Circle, HelpCircle } from 'lucide-react';
import { useSandboxStore } from '@/stores/useSandboxStore';
import { LabTask } from '@/data/labs/lab-01-master-key';

interface TaskCardProps {
  task: LabTask;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [showHint, setShowHint] = React.useState(false);
  const { completedTasks } = useSandboxStore();
  const isDone = completedTasks.includes(task.id);

  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        isDone ? 'bg-cyan-950/20 border-cyan-500/30' : 'bg-slate-900 border-slate-800'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {isDone ? (
            <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
          ) : (
            <Circle className="w-5 h-5 text-slate-600 shrink-0" />
          )}
          <h4 className={`text-sm font-semibold ${isDone ? 'text-cyan-300' : 'text-slate-200'}`}>
            {task.title}
          </h4>
        </div>
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-slate-500 hover:text-cyan-400 transition-colors"
          title="Petunjuk Lab"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-400 mt-2 pl-7">{task.instruction}</p>

      {showHint && (
        <div className="mt-3 ml-7 p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-amber-400">
          💡 <strong>Hint:</strong> {task.hint}
        </div>
      )}
    </div>
  );
};