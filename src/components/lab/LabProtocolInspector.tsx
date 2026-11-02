'use client';

import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Puzzle,
  Smartphone,
  Monitor,
  Database,
  CheckCircle2,
  Copy,
  Zap,
  RefreshCw,
  Terminal,
} from 'lucide-react';
import { useSandboxStore } from '@/stores/useSandboxStore';

export const LabProtocolInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'extension' | 'android' | 'registry' | 'memory'>('extension');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { handleCommandSubmit, themeMode } = useSandboxStore();

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const extensionPayload = JSON.stringify(
    {
      aliasToken: 'mypass',
      masterPassword: '••••••••••••',
      data: {
        site: 'portal.kampus.ac.id',
        username: 'mahasiswa_01@univ.ac.id',
        password: 'SuperSecretVaultPass#2026',
      },
    },
    null,
    2
  );

  const crdtSyncPayload = JSON.stringify(
    {
      vault_items: [
        {
          id: 'item-pc-201',
          site: 'github.com',
          username: 'stealth-dev',
          category: 'Kampus',
          updated_at: 1730510400,
        },
        {
          id: 'item-mob-305',
          site: 'proton.me',
          username: 'vault@stealth.net',
          category: 'Pribadi',
          updated_at: 1730511800,
        },
      ],
    },
    null,
    2
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Header Tabs */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-slate-200">
            Skema Data Parsing &amp; IPC Protocol (Berdasarkan Source Code Asli)
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('extension')}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'extension'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Puzzle className="w-3 h-3" /> Extension &gt; PC (:14201)
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'android'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3 h-3" /> Android &lt;&gt; PC (:14202)
          </button>
          <button
            onClick={() => setActiveTab('registry')}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'registry'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3 h-3" /> Win+R Registry
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Tab 1: Extension > PC Handshake */}
        {activeTab === 'extension' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-cyan-400 font-mono">POST http://127.0.0.1:14201/sync-pass</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Dipanggil oleh <code className="text-slate-300 font-mono">popup.js</code> setelah form submit tertangkap oleh <code className="text-slate-300 font-mono">content.js</code>.
                </p>
              </div>
              <button
                onClick={() => handleCommandSubmit('extension --autofill')}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-[11px] rounded-lg transition flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <Zap className="w-3.5 h-3.5" /> Test Handshake Payload
              </button>
            </div>

            <div className="relative bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1.5">
                <span>REQUEST BODY (JSON Schema)</span>
                <button
                  onClick={() => handleCopy(extensionPayload, 'ext')}
                  className="hover:text-cyan-400 flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'ext' ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'ext' ? 'Tersalin' : 'Salin JSON'}</span>
                </button>
              </div>
              <pre className="font-mono text-xs text-cyan-300 overflow-x-auto">{extensionPayload}</pre>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-slate-200">Alur Parsing di Kode Sumber:</span>
              <p>1. Form submit memicu <code className="text-cyan-400">chrome.runtime.sendMessage(&apos;SAVE_PENDING_DATA&apos;)</code></p>
              <p>2. Background service worker menyimpan sementara ke <code className="text-cyan-400">chrome.storage.local</code></p>
              <p>3. User menginputkan Alias Token &amp; Master Password pada popup toolbar</p>
              <p>4. Request POST dikirim ke listener PC port 14201, didekripsi langsung di heap memori RAM</p>
            </div>
          </div>
        )}

        {/* Tab 2: Android <> PC CRDT P2P Sync */}
        {activeTab === 'android' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-emerald-400 font-mono">GET &amp; POST http://[PC_IP]:14202/api/sync</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Sinkronisasi dua arah tanpa cloud menggunakan algoritma timestamp CRDT merge pada <code className="text-slate-300 font-mono">AppMobile.jsx</code>.
                </p>
              </div>
              <button
                onClick={() => handleCommandSubmit('p2p --sync')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-[11px] rounded-lg transition flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Test CRDT Sync
              </button>
            </div>

            <div className="relative bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1.5">
                <span>CRDT PAYLOAD &amp; EVENT NOTIFICATION</span>
                <button
                  onClick={() => handleCopy(crdtSyncPayload, 'crdt')}
                  className="hover:text-cyan-400 flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'crdt' ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'crdt' ? 'Tersalin' : 'Salin JSON'}</span>
                </button>
              </div>
              <pre className="font-mono text-xs text-emerald-300 overflow-x-auto">{crdtSyncPayload}</pre>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-slate-200">Logika Conflict Resolution:</span>
              <p>• HP mengambil data PC dengan <code className="text-cyan-400">GET /api/sync</code></p>
              <p>• Timestamps dibandingkan: <code className="text-emerald-400">item.updated_at &gt;= existing.updated_at</code> (Timestamp terbaru menang)</p>
              <p>• Hasil penggabungan di-POST balik ke PC &amp; memicu event Tauri <code className="text-cyan-300 font-mono">p2p-data-updated</code></p>
            </div>
          </div>
        )}

        {/* Tab 3: Windows Run Registry Alias */}
        {activeTab === 'registry' && (
          <div className="space-y-3">
            <div className="text-xs">
              <span className="font-bold text-amber-400 font-mono">Windows Run Registry Alias Hook</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Memungkinkan eksekusi instan via <code className="text-cyan-300 font-mono">Win + R &gt; mypass</code> tanpa shortcut desktop.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-500 text-[10px]">REGISTRY PATH (HKEY_CURRENT_USER):</div>
              <div className="text-cyan-300 bg-slate-900 p-2 rounded border border-slate-800 break-all">
                HKCU\Software\Microsoft\Windows\CurrentVersion\App Paths\mypass.exe
              </div>
              <div className="text-slate-400 text-[11px] pt-1">
                (Default) = <span className="text-emerald-300">&quot;%LOCALAPPDATA%\Microsoft\SystemCache\win_service_host.exe&quot;</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-400">
              Saat installer dijalankan, file biner disamarkan di folder cache sistem Windows, didaftarkan pada Registry App Paths, dan instan dieksekusi ke memori RAM terproteksi saat pengguna mengetikkan kata kunci rahasia.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

