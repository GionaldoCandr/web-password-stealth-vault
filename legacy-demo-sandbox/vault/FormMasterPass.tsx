'use client';

import React, { useState } from 'react';
import { Lock, KeyRound } from 'lucide-react';
import { skemaMasterPass } from '@/lib/skema';
import { useSandboxStore } from '@/stores/useSandboxStore';
import { ALL_LABS } from '@/data/labs';

export const FormMasterPass: React.FC = () => {
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { unlockVault, completeTask, currentLabId } = useSandboxStore();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Validasi Zod
    const result = skemaMasterPass.safeParse({ masterPassword: passwordInput });
    if (!result.success) {
      setErrorMsg(result.error.issues[0].message);
      return;
    }

    // 2. Semantik Check
    if (passwordInput !== 'Stealth@2026') {
      setErrorMsg('Master Password salah! Gunakan Stealth@2026.');
      return;
    }

    unlockVault(passwordInput);

    // Complete task jika berada di Lab 1
    const activeLab = ALL_LABS.find((l) => l.id === currentLabId);
    activeLab?.tasks.forEach((t) => {
      if (t.id === 't1-enter-masterpass') {
        completeTask(t.id);
      }
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
      <div className="flex items-center gap-2 text-cyan-400 font-medium text-sm">
        <Lock className="w-4 h-4" />
        <span>Unlock RAM Vault</span>
      </div>

      <form onSubmit={handleUnlock} className="space-y-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Master Password Simulasi</label>
          <div className="relative">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Stealth@2026"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
            <KeyRound className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
          </div>
          {errorMsg && <p className="text-rose-400 text-[11px] mt-1">{errorMsg}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold py-2 rounded-lg text-xs hover:from-cyan-400 hover:to-blue-500 transition-all"
        >
          Dekripsi Volatile RAM
        </button>
      </form>
    </div>
  );
};