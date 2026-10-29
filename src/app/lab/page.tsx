'use client';

import React from 'react';
import { InteractiveTerminal } from '@/components/demo-sandbox/terminal/InteractiveTerminal';
import { FormMasterPass } from '@/components/demo-sandbox/vault/FormMasterPass';
import { MemoryViewer } from '@/components/demo-sandbox/memory/MemoryViewer';
import { TaskCard } from '@/components/demo-sandbox/tasks/TaskCard';
import { ALL_LABS } from '@/data/labs';
import { useSandboxStore } from '@/stores/useSandboxStore';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function LabPage() {
  const { currentLabId, setLabId, completedTasks } = useSandboxStore();
  const activeLab = ALL_LABS.find((l) => l.id === currentLabId) || ALL_LABS[0];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Lab Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            Interactive Lab Sandbox
            <Badge variant="cyan">TryHackMe Style</Badge>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Uji alur keamanan Vault, dekripsi memori RAM, dan eksekusi command line secara langsung di browser.
          </p>
        </div>

        {/* Tab Pilihan Lab */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {ALL_LABS.map((lab) => (
            <button
              key={lab.id}
              onClick={() => setLabId(lab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap ${
                currentLabId === lab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {lab.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Layout: Split-Screen Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kolom Kiri: Panel Misi & Instruksi */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-mono">Lab Module</span>
              <Badge variant="emerald">{activeLab.difficulty}</Badge>
            </div>
            <h2 className="text-base font-semibold text-cyan-300">{activeLab.title}</h2>
            <p className="text-xs text-slate-400 leading-relaxed">{activeLab.description}</p>
          </Card>

          {/* Checklist Tugas Lab */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Misi Checklist ({completedTasks.length}/{activeLab.tasks.length})</span>
            </div>
            {activeLab.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>

          <FormMasterPass />
        </div>

        {/* Kolom Kanan: Arena Interactive Terminal & Memory Visualizer */}
        <div className="lg:col-span-7 space-y-6">
          <InteractiveTerminal />
          <MemoryViewer />
        </div>
      </div>
    </main>
  );
}