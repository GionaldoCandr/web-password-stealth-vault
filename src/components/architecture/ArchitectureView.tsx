'use client';

import React from 'react';
import { Monitor, Smartphone, ArrowRight, Puzzle } from 'lucide-react';
import { useSandboxStore } from '@/stores/useSandboxStore';
import { StickmanArchitectureP2P } from '@/components/stickman/StickmanArchitectureP2P';

export const ArchitectureView: React.FC = () => {
  const { themeMode } = useSandboxStore();
  const isLight = themeMode === 'light';

  return (
    <div className="flex-1 p-8 max-w-5xl mx-auto w-full space-y-8 overflow-y-auto">
      <div>
        <h2 className="text-xl font-bold mb-2 text-cyan-400">Arsitektur Detail Stealth Password Vault</h2>
        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Diagram alur data komponen PC, Android, Extension DOM Parser, &amp; Memory Core.
        </p>
      </div>

      {/* Stickman P2P Architecture Illustration */}
      <StickmanArchitectureP2P />

      <div className="space-y-6">
        {/* Core PC Architecture */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">1. Core PC Architecture (Volatile Memory Engine)</h3>
              <p className="text-xs text-slate-400">
                Proses Tauri Rust yang berjalan tanpa menyisakan file terdekripsi di Disk.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-cyan-400 font-bold">
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">[Win + R: &quot;mypass&quot;]</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">[Registry Alias Match]</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">[RAM Process Allocation]</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Aplikasi membaca file database terenkripsi SQLite/binari dari direktori tersembunyi{' '}
              <code className="text-cyan-300 font-mono">%LOCALAPPDATA%\Microsoft\SystemCache\</code>, lalu hasil
              dekripsi disimpan secara eksklusif pada heap memori terproteksi.
            </p>
          </div>
        </div>

        {/* P2P Mobile Sync Architecture */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                2. P2P Mobile Sync Architecture (Local TLS Port 14202)
              </h3>
              <p className="text-xs text-slate-400">Sinkronisasi lokal antar HP Android dan PC tanpa perantara cloud server.</p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-cyan-400 font-bold">
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">[Android QR Scan]</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">[TLS Local Handshake]</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">[CRDT Timestamp Merge]</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Kredensial disinkronkan secara aman melalui protokol CRDT Last-Write-Wins, memastikan data konsisten di HP dan
              PC tanpa pernah menyentuh internet luar.
            </p>
          </div>
        </div>

        {/* Browser Extension IPC Architecture */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Puzzle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                3. Browser Extension DOM Parsing &amp; IPC Bridge (Port 14201)
              </h3>
              <p className="text-xs text-slate-400">Injeksi autofill dan penangkapan form kredensial otomatis.</p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-indigo-400 font-bold">
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">[Web Submit Event]</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">[Floating Prompt Modal]</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">[Local POST :14201/sync-pass]</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Kredensial dikirim langsung dari Chrome / Brave / Edge extension ke biner desktop di port 14201 dengan validasi
              ganda: Token Registry Win+R dan Master Password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

