'use client';

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Shield,
  Key,
  Globe,
  Binary,
  Layers,
  Award,
  Zap,
  Cpu,
  Lock,
  Terminal,
  Activity,
} from 'lucide-react';

interface StickmanPhaseHeroProps {
  phase: number;
}

export const StickmanPhaseHero: React.FC<StickmanPhaseHeroProps> = ({ phase }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  // Phase 1: Cyber Novice & XOR Basics
  if (phase === 1) {
    return (
      <div className="w-full max-w-4xl mx-auto my-4 p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Binary className="w-4 h-4 text-cyan-400" /> Tahap 1: Fondasi Keamanan, Operasi XOR, &amp; Arsitektur Web
          </span>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
            Pekan 1 – 4 (Dasar &amp; CIA Triad)
          </span>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            {/* Stickman with XOR Gate & Shield */}
            <svg
              width="70"
              height="80"
              viewBox="0 0 100 120"
              className="stroke-cyan-400 fill-none stroke-[3.5] stroke-linecap-round stroke-linejoin-round shrink-0"
            >
              <circle cx="50" cy="24" r="14" className="fill-cyan-950/40" />
              <line x1="50" y1="38" x2="50" y2="76" />
              {/* Left hand holding mini shield */}
              <line x1="50" y1="48" x2="24" y2="54" />
              <path d="M 16 46 Q 24 44 32 46 Q 32 60 24 68 Q 16 60 16 46 Z" className="stroke-cyan-300 fill-cyan-500/20 stroke-[2]" />
              {/* Right hand pointing to XOR gate */}
              <line x1="50" y1="48" x2="78" y2="50" />
              <line x1="50" y1="76" x2="35" y2="110" />
              <line x1="50" y1="76" x2="65" y2="110" />
            </svg>

            <div>
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                Stickman Cyber Novice
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-md leading-relaxed">
                Mempelajari prinsip Triad CIA (Confidentiality, Integrity, Availability), matematika kriptografi dasar
                gerbang logika XOR (\(A \oplus B\)), serta inisiasi antarmuka web modern Next.js.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300">
            <div className="text-cyan-400 font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> XOR Involutif
            </div>
            <div className="text-[10px] text-slate-400">
              \(C = P \oplus K \implies P = C \oplus K\)
            </div>
            <div className="text-[10px] text-emerald-400 pt-0.5">CIA Triad Verified</div>
          </div>
        </div>
      </div>
    );
  }

  // Phase 2: Hash Avalanche & Modular Arithmetic
  if (phase === 2) {
    return (
      <div className="w-full max-w-4xl mx-auto my-4 p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-amber-400" /> Tahap 2: Avalanche Effect, Modular Arithmetic, &amp; State Management
          </span>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            Pekan 5 – 8 (UTS Milestone)
          </span>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            {/* Stickman weighing hash bits on balance scale */}
            <svg
              width="70"
              height="80"
              viewBox="0 0 100 120"
              className="stroke-amber-400 fill-none stroke-[3.5] stroke-linecap-round stroke-linejoin-round shrink-0"
            >
              <circle cx="50" cy="24" r="14" className="fill-amber-950/40" />
              <line x1="50" y1="38" x2="50" y2="76" />
              {/* Arms holding balance bar */}
              <line x1="20" y1="46" x2="80" y2={frame % 2 === 0 ? 44 : 48} className="stroke-amber-300 stroke-[2.5]" />
              <line x1="50" y1="48" x2="50" y2="45" />
              {/* Left scale pan */}
              <line x1="20" y1="46" x2="20" y2="60" className="stroke-slate-500 stroke-[1.5]" />
              <rect x="14" y="60" width="12" height="8" rx="2" className="stroke-cyan-400 fill-cyan-950/40 stroke-[1.5]" />
              {/* Right scale pan */}
              <line x1="80" y1={frame % 2 === 0 ? 44 : 48} x2="80" y2={frame % 2 === 0 ? 58 : 62} className="stroke-slate-500 stroke-[1.5]" />
              <rect x="74" y={frame % 2 === 0 ? 58 : 62} width="12" height="8" rx="2" className="stroke-rose-400 fill-rose-950/40 stroke-[1.5]" />
              <line x1="50" y1="76" x2="35" y2="110" />
              <line x1="50" y1="76" x2="65" y2="110" />
            </svg>

            <div>
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                Stickman Cryptanalyst
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-md leading-relaxed">
                Membuktikan Avalanche Effect (\(\approx 50\%\) bit flipping), menghitung Invers Modular melalui Extended
                Euclidean Algorithm (EEA), dan manajemen State React terisolasi.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> Avalanche Target
            </div>
            <div className="text-[10px] text-slate-400">
              Bit Diff: <span className="text-emerald-400 font-bold">&ge; 50% Ideal</span>
            </div>
            <div className="text-[10px] text-cyan-400 pt-0.5">\(a \cdot x \equiv 1 \pmod n\)</div>
          </div>
        </div>
      </div>
    );
  }

  // Phase 3: Asymmetric Cryptography & P2P Mesh
  if (phase === 3) {
    return (
      <div className="w-full max-w-4xl mx-auto my-4 p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-blue-400" /> Tahap 3: Kriptografi Kunci Publik, Diffie-Hellman, &amp; RESTful API
          </span>
          <span className="text-[10px] font-mono text-blue-400 bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-500/30">
            Pekan 9 – 12 (Arsitektur Jaringan)
          </span>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            {/* Stickman exchanging asymmetric keys */}
            <svg
              width="70"
              height="80"
              viewBox="0 0 100 120"
              className="stroke-blue-400 fill-none stroke-[3.5] stroke-linecap-round stroke-linejoin-round shrink-0"
            >
              <circle cx="50" cy="24" r="14" className="fill-blue-950/40" />
              <line x1="50" y1="38" x2="50" y2="76" />
              {/* Left hand: Public Key */}
              <line x1="50" y1="48" x2="26" y2="44" />
              <circle cx="20" cy="42" r="5" className="stroke-cyan-300 fill-cyan-500/20" />
              {/* Right hand: Private Key Lock */}
              <line x1="50" y1="48" x2="74" y2="44" />
              <rect x="74" y="38" width="12" height="12" rx="2" className="stroke-rose-400 fill-rose-950/30 stroke-[2]" />
              <line x1="50" y1="76" x2="35" y2="110" />
              <line x1="50" y1="76" x2="65" y2="110" />
            </svg>

            <div>
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                Stickman Network Architect
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-md leading-relaxed">
                Mengintegrasikan pertukaran kunci Diffie-Hellman (ECDH), validasi skema API Zod (RFC 9457), dan
                komunikasi antar-perangkat via REST &amp; WebSocket.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300">
            <div className="text-blue-400 font-bold flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" /> Asymmetric ECDH
            </div>
            <div className="text-[10px] text-slate-400">
              Shared Key: <span className="text-emerald-400">TLS 1.3 Secrecy</span>
            </div>
            <div className="text-[10px] text-cyan-400 pt-0.5">RFC 9457 Problem Details</div>
          </div>
        </div>
      </div>
    );
  }

  // Phase 4: Final Capstone & Scholar Graduation
  return (
    <div className="w-full max-w-4xl mx-auto my-4 p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-emerald-400" /> Tahap 4: Incident Playbook, Usability SUS, &amp; Final Project Release
        </span>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          Pekan 13 – 16 (Capstone v1.0)
        </span>
      </div>

      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          {/* Stickman Scholar with Toga & Shield */}
          <svg
            width="70"
            height="80"
            viewBox="0 0 100 120"
            className="stroke-emerald-400 fill-none stroke-[3.5] stroke-linecap-round stroke-linejoin-round shrink-0"
          >
            {/* Toga Cap */}
            <polygon points="50,6 22,18 50,28 78,18" className="fill-blue-600 stroke-cyan-300 stroke-[2]" />
            <line x1="78" y1="18" x2="82" y2="30" className="stroke-amber-400 stroke-[2]" />
            <circle cx="50" cy="32" r="13" className="fill-emerald-950/40" />
            <line x1="50" y1="45" x2="50" y2="80" />
            {/* Holding Shield & Diploma */}
            <line x1="50" y1="55" x2="28" y2="60" />
            <path d="M 18 50 Q 28 48 38 50 Q 38 68 28 78 Q 18 68 18 50 Z" className="stroke-cyan-300 fill-cyan-500/20 stroke-[1.8]" />
            <line x1="50" y1="55" x2="72" y2="52" />
            <rect x="72" y="44" width="14" height="10" rx="1.5" className="stroke-amber-300 fill-amber-950/40 stroke-[1.8]" />
            <line x1="50" y1="80" x2="35" y2="110" />
            <line x1="50" y1="80" x2="65" y2="110" />
          </svg>

          <div>
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Stickman Capstone Scholar
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-md leading-relaxed">
              Penyelesaian Capstone Project menyeluruh: Eksekusi Playbook Insiden Siber PB-01, Evaluasi Skor SUS &ge; 68
              (Grade A), Vitest &amp; Docker CI/CD, dan pemenuhan Hak Cipta DJKI.
            </p>
          </div>
        </div>

        <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300">
          <div className="text-emerald-400 font-bold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> Final Capstone Score
          </div>
          <div className="text-[10px] text-slate-400">
            Rubrik R4: <span className="text-cyan-400 font-bold">70/70 Sempurna</span>
          </div>
          <div className="text-[10px] text-emerald-400 pt-0.5">SUS Score: 78.5 (Grade A)</div>
        </div>
      </div>
    </div>
  );
};

