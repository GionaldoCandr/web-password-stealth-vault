'use client';

import React, { useState } from 'react';
import { Shield, Smartphone, Globe, Terminal, Search } from 'lucide-react';
import { useSandboxStore } from '@/stores/useSandboxStore';
import { Button } from '@/components/ui/Button';

export const ExtensionMockup: React.FC = () => {
  const { ramVault, isLocked } = useSandboxStore();
  const [targetUrl, setTargetUrl] = useState('https://github.com/login');
  const [detectedForm, setDetectedForm] = useState(true);

  return (
    <div className="w-80 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-sans">
      {/* Extension Header */}
      <div className="bg-slate-900 p-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-cyan-500/10 border border-cyan-500/20 rounded">
            <Shield className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-xs font-bold text-slate-100">Stealth Autofill Ext</span>
        </div>
        <Globe className="w-4 h-4 text-slate-500" />
      </div>

      {/* Target DOM Parsing Info */}
      <div className="p-3 bg-slate-900/40 border-b border-slate-800/60 space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
          <Search className="w-3 h-3 text-cyan-400 shrink-0" />
          <span className="truncate">{targetUrl}</span>
        </div>

        {detectedForm && (
          <div className="flex items-center justify-between text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <span>DOM Form Detected: &lt;input type="password"&gt;</span>
          </div>
        )}
      </div>

      {/* Extension Content Body */}
      <div className="p-3 space-y-2">
        {isLocked ? (
          <p className="text-[11px] text-slate-400 text-center py-4">
            Buka Vault di aplikasi PC untuk mengaktifkan autofill P2P.
          </p>
        ) : (
          ramVault.map((item) => (
            <div
              key={item.id}
              className="p-2 bg-slate-900 hover:bg-slate-800/80 rounded border border-slate-800 flex items-center justify-between cursor-pointer transition-colors"
            >
              <div>
                <p className="text-xs font-semibold text-slate-200">{item.service}</p>
                <p className="text-[10px] text-slate-400">{item.username}</p>
              </div>
              <Button size="sm" variant="outline" className="text-[10px] px-2 py-0.5 h-auto">
                Autofill
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};