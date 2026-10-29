'use client';

import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import { useSandboxStore } from '@/stores/useSandboxStore';
import { ALL_LABS } from '@/data/labs';

export const InteractiveTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const { terminalLogs, addTerminalLog, clearTerminalLogs, clearRAM, ramVault, completeTask, currentLabId } =
    useSandboxStore();

  const activeLab = ALL_LABS.find((l) => l.id === currentLabId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    addTerminalLog(`PS C:\\StealthSystem> ${cmd}`);

    switch (cmd.toLowerCase()) {
      case 'help':
        addTerminalLog('Perintah Tersedia:');
        addTerminalLog('  mypass           - Eksekusi Vault via Registry Alias');
        addTerminalLog('  mypass --purge   - Bersihkan seluruh RAM (Zeroize)');
        addTerminalLog('  vault --status   - Cek alokasi memori volatile RAM');
        addTerminalLog('  clear            - Bersihkan konsol terminal');
        break;

      case 'clear':
        clearTerminalLogs();
        setInput('');
        return;

      case 'mypass':
        addTerminalLog('[SUCCESS] Windows Registry Alias Matched: "C:\\Program Files\\StealthVault\\app.exe"');
        addTerminalLog('[STATUS] Process spawned into RAM. Volatile memory execution active.');
        break;

      case 'vault --status':
        addTerminalLog(`[PROCESS] PID: ${Math.floor(1000 + Math.random() * 9000)} | Active Execution`);
        addTerminalLog(`[RAM] Active Credentials in Volatile Store: ${ramVault.length} items`);
        addTerminalLog('[DISK] Trace: 0 bytes (Pure Memory Execution)');
        break;

      case 'mypass --purge':
        clearRAM();
        addTerminalLog('[CRITICAL] Volatile Memory Purged! All credentials zeroized.');
        break;

      default:
        addTerminalLog(`Command '${cmd}' not recognized. Ketik 'help' untuk petunjuk.`);
        break;
    }

    // Evaluasi Tugas Lab TryHackMe
    activeLab?.tasks.forEach((task) => {
      if (task.commandTrigger && task.commandTrigger.toLowerCase() === cmd.toLowerCase()) {
        completeTask(task.id);
        addTerminalLog(`\n[MISSION COMPLETE] Task "${task.title}" Selesai! 🎉\n`);
      }
    });

    setInput('');
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs shadow-2xl">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold">
          <Terminal className="w-4 h-4" />
          <span>Stealth Interactive Shell</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
      </div>

      <div className="p-4 h-64 overflow-y-auto space-y-1 text-slate-300">
        {terminalLogs.map((log, i) => (
          <div
            key={i}
            className={
              log.includes('[MISSION COMPLETE]')
                ? 'text-cyan-400 font-bold'
                : log.includes('[CRITICAL]')
                ? 'text-rose-400'
                : log.includes('[SUCCESS]')
                ? 'text-emerald-400'
                : ''
            }
          >
            {log}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/50 px-4 py-2 border-t border-slate-800 flex items-center gap-2">
        <span className="text-cyan-400 font-bold">PS C:\StealthSystem&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik perintah di sini..."
          className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-600 focus:ring-0"
        />
      </form>
    </div>
  );
};