'use client';

import React, { useState } from 'react';
import { Lock, Unlock, Key, Trash2, Plus, ShieldCheck } from 'lucide-react';
import { useSandboxStore } from '@/stores/useSandboxStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { skemaCredential } from '@/lib/skema';

export const VaultSimulator: React.FC = () => {
  const { isLocked, ramVault, addCredential, deleteCredential, lockVault } = useSandboxStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ service: '', username: '', secret: '' });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validation = skemaCredential.safeParse(formData);
    if (!validation.success) {
      setErrorMsg(validation.error.issues[0].message);
      return;
    }

    addCredential({
      id: String(Date.now()),
      ...formData,
    });

    setFormData({ service: '', username: '', secret: '' });
    setShowAddForm(false);
  };

  if (isLocked) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 text-center space-y-3">
        <div className="p-3 w-fit mx-auto bg-slate-800/80 rounded-full border border-slate-700 text-slate-400">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-200">Vault Terkunci</h3>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          Masukkan Master Password pada panel unlock untuk mendekripsi item dalam memori RAM.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Unlock className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-slate-100">Active RAM Vault Store</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="w-3.5 h-3.5 mr-1" />
            Tambah Item
          </Button>
          <Button size="sm" variant="danger" onClick={lockVault}>
            Kunci Vault
          </Button>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
          <h4 className="text-xs font-semibold text-cyan-300">Simpan Credential Baru Ke RAM</h4>
          <Input
            label="Nama Layanan"
            placeholder="Contoh: AWS Cloud"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          />
          <Input
            label="Username / Email"
            placeholder="user@stealth.com"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <Input
            label="Secret / Password"
            type="password"
            placeholder="••••••••"
            value={formData.secret}
            onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
          />
          {errorMsg && <p className="text-xs text-rose-400">{errorMsg}</p>}
          <Button type="submit" size="sm" className="w-full">
            Simpan ke Memori RAM
          </Button>
        </form>
      )}

      <div className="space-y-2">
        {ramVault.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">Memori RAM Kosong (0 Items).</p>
        ) : (
          ramVault.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 border border-slate-800/80 p-3 rounded-lg flex items-center justify-between group hover:border-cyan-500/40 transition-colors"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-semibold text-slate-200">{item.service}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">{item.username}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-400 font-mono">
                  {item.secret.replace(/./g, '•')}
                </span>
                <button
                  onClick={() => deleteCredential(item.id)}
                  className="text-slate-500 hover:text-rose-400 transition-colors"
                  title="Purge Item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};