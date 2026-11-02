'use client';

import React, { useState, useEffect } from 'react';
import { CloudOff, Wifi, ShieldCheck, Lock, Smartphone, Laptop } from 'lucide-react';

export const StickmanArchitectureP2P: React.FC = () => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse((prev) => (prev + 1) % 3);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-4 p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Wifi className="w-3.5 h-3.5" /> Sinkronisasi P2P Langsung (PC &lt;&gt; Mobile) Tanpa Server Cloud
        </span>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          TLS 1.3 Local Network
        </span>
      </div>

      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Left: Stickman PC */}
        <div className="flex flex-col items-center text-center">
          <svg width="70" height="85" viewBox="0 0 100 120" className="stroke-cyan-400 fill-none stroke-[3.5] stroke-linecap-round stroke-linejoin-round">
            <circle cx="50" cy="24" r="14" className="fill-cyan-950/30" />
            <line x1="50" y1="38" x2="50" y2="76" />
            <line x1="50" y1="48" x2="25" y2="60" />
            <line x1="50" y1="48" x2="80" y2="55" />
            <line x1="50" y1="76" x2="35" y2="108" />
            <line x1="50" y1="76" x2="65" y2="108" />
          </svg>
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-200 mt-1">
            <Laptop className="w-3.5 h-3.5 text-cyan-400" /> PC Vault Master
          </div>
          <span className="text-[9px] font-mono text-slate-500">Port 14202 Listener</span>
        </div>

        {/* Center: Encrypted Wave Beam & Crossed Out Cloud */}
        <div className="flex flex-col items-center justify-center flex-1 space-y-3 px-4">
          {/* Cloud with Red X */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-500">
            <CloudOff className="w-4 h-4 text-rose-400" />
            <span className="text-[10px] font-mono text-slate-400">Server Cloud Terpusat: <strong>DITIADAKAN</strong></span>
          </div>

          {/* Glowing Animated P2P Beam */}
          <div className="w-full relative flex items-center justify-center py-2">
            <div className="w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 rounded-full" />
            <div
              className="absolute p-1.5 rounded-full bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-400 transition-all duration-700"
              style={{
                left: pulse === 0 ? '20%' : pulse === 1 ? '50%' : '80%',
              }}
            >
              <Lock className="w-3 h-3 text-slate-950" />
            </div>
          </div>
          <span className="text-[9px] font-mono text-cyan-400">Enkripsi End-to-End AES-256-GCM + CRDT Merge</span>
        </div>

        {/* Right: Stickman Mobile Android */}
        <div className="flex flex-col items-center text-center">
          <svg width="70" height="85" viewBox="0 0 100 120" className="stroke-emerald-400 fill-none stroke-[3.5] stroke-linecap-round stroke-linejoin-round">
            <circle cx="50" cy="24" r="14" className="fill-emerald-950/30" />
            <line x1="50" y1="38" x2="50" y2="76" />
            <line x1="50" y1="48" x2="20" y2="55" />
            <line x1="50" y1="48" x2="75" y2="60" />
            <line x1="50" y1="76" x2="35" y2="108" />
            <line x1="50" y1="76" x2="65" y2="108" />
          </svg>
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-200 mt-1">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> Android Client
          </div>
          <span className="text-[9px] font-mono text-slate-500">Scan QR Handshake</span>
        </div>
      </div>
    </div>
  );
};

