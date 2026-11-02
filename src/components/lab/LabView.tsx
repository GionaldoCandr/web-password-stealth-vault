'use client';

import React from 'react';
import {
  ChevronRight,
  Award,
  CheckCircle2,
  HelpCircle,
  Terminal as TerminalIcon,
  Cpu,
  Zap,
} from 'lucide-react';
import { useSandboxStore } from '@/stores/useSandboxStore';
import { LAB_SCENARIOS } from '@/data/labScenarios';
import { StickmanLabOperator } from '@/components/stickman/StickmanLabOperator';
import { LabProtocolInspector } from '@/components/lab/LabProtocolInspector';

export const LabView: React.FC = () => {
  const {
    selectedLab,
    setSelectedLab,
    completedTasks,
    terminalLogs,
    cmdInput,
    setCmdInput,
    handleCommandSubmit,
    ramVault,
    themeMode,
  } = useSandboxStore();
  const isLight = themeMode === 'light';

  const onCommandFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommandSubmit();
  };

  const completedCount = selectedLab.tasks.filter(
    (t) => completedTasks[`${selectedLab.id}_${t.id}`]
  ).length;

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
      {/* Left Column: Lab Selector & Tasks */}
      <div
        className={`w-full md:w-5/12 border-r flex flex-col overflow-y-auto ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="p-4 border-b border-slate-800 bg-slate-900/50">
          <label className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-2">
            Pilih Modul Lab Interaktif
          </label>
          <div className="space-y-2">
            {LAB_SCENARIOS.map((lab) => (
              <button
                key={lab.id}
                onClick={() => setSelectedLab(lab)}
                className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                  selectedLab.id === lab.id
                    ? 'bg-blue-900/30 border-cyan-400 text-slate-100'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800/50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                        lab.difficulty === 'Easy'
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : lab.difficulty === 'Medium'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {lab.difficulty}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">+{lab.xpPoints} XP</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200">{lab.title}</h4>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 space-y-6 flex-1">
          <div>
            <h2 className="text-base font-bold text-slate-100 mb-2">{selectedLab.title}</h2>
            <p className="text-xs text-slate-400 leading-relaxed">{selectedLab.description}</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-7 h-7 text-cyan-400" />
              <div>
                <h4 className="text-xs font-bold text-slate-200">Progress Lab</h4>
                <p className="text-[11px] text-slate-400">Selesaikan seluruh task untuk menyelesaikan modul.</p>
              </div>
            </div>
            <span className="text-xs font-bold font-mono px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg">
              {completedCount} / {selectedLab.tasks.length} Done
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">Misi Lab:</h3>
            {selectedLab.tasks.map((task, idx) => {
              const isDone = completedTasks[`${selectedLab.id}_${task.id}`];
              return (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-xl border transition space-y-1.5 ${
                    isDone
                      ? 'bg-cyan-950/20 border-cyan-400/40 text-slate-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold flex items-center gap-2">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center font-mono shrink-0">
                          {idx + 1}
                        </span>
                      )}
                      <span>{task.title}</span>
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 pl-6">{task.instruction}</p>
                  <div className="pl-6 pt-1 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <HelpCircle className="w-3 h-3 text-cyan-400" />
                      <span>Hint: {task.hint}</span>
                    </div>
                    {task.commandTrigger && !isDone && (
                      <button
                        onClick={() => handleCommandSubmit(task.commandTrigger)}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 font-mono transition cursor-pointer"
                      >
                        Auto-Run
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Terminal & Memory Visualizer */}
      <div
        className={`w-full md:w-7/12 p-6 flex flex-col gap-6 overflow-y-auto ${
          isLight ? 'bg-slate-100' : 'bg-slate-950'
        }`}
      >
        {/* Stickman Operator Interactive Terminal Animation */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
          <StickmanLabOperator />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-semibold text-slate-300">
                Interactive Multi-Device Shell
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-cyan-500/80" />
            </div>
          </div>

          <div className="p-4 h-56 overflow-y-auto font-mono text-xs space-y-1.5 text-slate-300">
            {terminalLogs.map((log, i) => (
              <div
                key={i}
                className={
                  log.includes('[CRITICAL]')
                    ? 'text-rose-400 font-bold'
                    : log.includes('[SUCCESS]') || log.includes('[MATCH FOUND]')
                    ? 'text-cyan-400 font-bold'
                    : log.includes('[MEMORY STATUS]') || log.includes('[HANDSHAKE]')
                    ? 'text-blue-400'
                    : ''
                }
              >
                {log}
              </div>
            ))}
          </div>

          <form
            onSubmit={onCommandFormSubmit}
            className="bg-slate-950/80 px-4 py-2.5 border-t border-slate-800 flex items-center gap-2"
          >
            <span className="text-cyan-400 font-mono font-bold text-xs shrink-0">PS C:\StealthSystem&gt;</span>
            <input
              type="text"
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              placeholder="Ketik 'help' untuk petunjuk..."
              className="flex-1 bg-transparent text-xs font-mono text-slate-100 outline-none placeholder:text-slate-600"
            />
          </form>
        </div>

        {/* Memory Visualizer */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-slate-200">Volatile Memory Visualizer (RAM)</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-cyan-400 rounded">
              Active RAM: {ramVault.length} items
            </span>
          </div>

          {ramVault.length === 0 ? (
            <div className="p-6 text-center bg-slate-950/50 rounded-xl border border-slate-800/80 space-y-1">
              <Zap className="w-6 h-6 text-rose-400 mx-auto" />
              <p className="text-xs font-bold text-rose-400">RAM Zeroized & Wiped</p>
              <p className="text-[10px] text-slate-500">
                Tidak ada jejak kredensial teralokasi di heap memori.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ramVault.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs space-y-1"
                >
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>ADDR: {item.memoryAddress}</span>
                    <span className="text-cyan-400">AES-GCM-256</span>
                  </div>
                  <div className="text-slate-200 font-bold truncate">{item.service}</div>
                  <div className="text-[10px] text-slate-400 truncate">{item.username}</div>
                  <div className="text-[10px] text-cyan-400/80 pt-1 tracking-wider">{item.encryptedSecret}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Real Source Code IPC & Parsing Protocol Inspector */}
        <LabProtocolInspector />
      </div>
    </div>
  );
};

