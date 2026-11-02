'use client';

import React from 'react';
import { Shield, Key, Globe, Terminal, Cpu, Database, CheckCircle2, Lock } from 'lucide-react';

interface StickmanCourseIllustrationProps {
  courseId: string;
  phase: number;
}

export const StickmanCourseIllustration: React.FC<StickmanCourseIllustrationProps> = ({
  courseId,
  phase,
}) => {
  // 1. Keamanan Komputer & Siber (KKS)
  if (courseId === 'kks') {
    return (
      <div className="p-3 bg-slate-950/70 rounded-2xl border border-rose-500/20 flex items-center justify-between gap-3 my-2">
        <div className="flex items-center gap-3">
          <svg
            width="50"
            height="55"
            viewBox="0 0 80 90"
            className="stroke-rose-400 fill-none stroke-[2.8] stroke-linecap-round stroke-linejoin-round shrink-0"
          >
            <circle cx="40" cy="18" r="10" className="fill-rose-950/40" />
            <line x1="40" y1="28" x2="40" y2="58" />
            {/* Holding large shield with left hand */}
            <line x1="40" y1="36" x2="20" y2="42" />
            <path d="M 12 34 Q 20 32 28 34 Q 28 50 20 60 Q 12 50 12 34 Z" className="stroke-rose-300 fill-rose-500/20 stroke-[2]" />
            {/* Right hand pointing or bracing */}
            <line x1="40" y1="36" x2="60" y2="48" />
            <line x1="40" y1="58" x2="28" y2="82" />
            <line x1="40" y1="58" x2="52" y2="82" />
          </svg>

          <div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-rose-400 block">
              Fokus Kompetensi KKS — {phase === 4 ? 'Incident Playbook & Audit' : `Tahap ${phase}`}
            </span>
            <p className="text-xs text-slate-200 font-semibold">
              {phase === 1 && 'Stickman menerapkan CIA Triad & Threat Modeling STRIDE'}
              {phase === 2 && 'Stickman menganalisis kerentanan memori & mitigasi dump'}
              {phase === 3 && 'Stickman mengamankan komunikasi jaringan & validasi session'}
              {phase === 4 && 'Stickman mengeksekusi Playbook PB-01 & Kebijakan ISO/IEC 27001'}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-mono">
          <Shield className="w-3.5 h-3.5" />
          <span>Defensive Security</span>
        </div>
      </div>
    );
  }

  // 2. Kriptografi
  if (courseId === 'kripto') {
    return (
      <div className="p-3 bg-slate-950/70 rounded-2xl border border-cyan-500/20 flex items-center justify-between gap-3 my-2">
        <div className="flex items-center gap-3">
          <svg
            width="50"
            height="55"
            viewBox="0 0 80 90"
            className="stroke-cyan-400 fill-none stroke-[2.8] stroke-linecap-round stroke-linejoin-round shrink-0"
          >
            <circle cx="40" cy="18" r="10" className="fill-cyan-950/40" />
            <line x1="40" y1="28" x2="40" y2="58" />
            {/* Holding key and cipher box */}
            <line x1="40" y1="36" x2="20" y2="40" />
            <circle cx="16" cy="38" r="4" className="stroke-cyan-300 fill-cyan-500/20" />
            <line x1="40" y1="36" x2="58" y2="38" />
            <rect x="58" y="32" width="12" height="12" rx="2" className="stroke-cyan-300 fill-cyan-950/40 stroke-[1.8]" />
            <line x1="40" y1="58" x2="28" y2="82" />
            <line x1="40" y1="58" x2="52" y2="82" />
          </svg>

          <div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-400 block">
              Fokus Kompetensi Kriptografi — {phase === 4 ? 'AEAD End-to-End' : `Tahap ${phase}`}
            </span>
            <p className="text-xs text-slate-200 font-semibold">
              {phase === 1 && 'Stickman membuktikan sifat involutif XOR & sandi substitusi'}
              {phase === 2 && 'Stickman mengukur Avalanche Effect 50% & Invers Modular EEA'}
              {phase === 3 && 'Stickman membangkitkan pasangan kunci RSA & Diffie-Hellman'}
              {phase === 4 && 'Stickman memvalidasi enkripsi terotentikasi AES-256 GCM AEAD'}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono">
          <Key className="w-3.5 h-3.5" />
          <span>Cipher Engineering</span>
        </div>
      </div>
    );
  }

  // 3. Pengembangan Aplikasi Web (PAW Teori & Praktikum)
  return (
    <div className="p-3 bg-slate-950/70 rounded-2xl border border-blue-500/20 flex items-center justify-between gap-3 my-2">
      <div className="flex items-center gap-3">
        <svg
          width="50"
          height="55"
          viewBox="0 0 80 90"
          className="stroke-blue-400 fill-none stroke-[2.8] stroke-linecap-round stroke-linejoin-round shrink-0"
        >
          <circle cx="40" cy="18" r="10" className="fill-blue-950/40" />
          <line x1="40" y1="28" x2="40" y2="58" />
          {/* Typing on computer monitors */}
          <line x1="40" y1="36" x2="24" y2="48" />
          <line x1="40" y1="36" x2="56" y2="48" />
          <line x1="40" y1="58" x2="28" y2="82" />
          <line x1="40" y1="58" x2="52" y2="82" />
        </svg>

        <div>
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-400 block">
            Fokus Kompetensi Web (Teori &amp; Praktikum) — {phase === 4 ? 'Testing, Docker, CI/CD' : `Tahap ${phase}`}
          </span>
          <p className="text-xs text-slate-200 font-semibold">
            {phase === 1 && 'Stickman membangun arsitektur Web modern Next.js & Tailwind CSS'}
            {phase === 2 && 'Stickman mendesain UI interaktif & validasi state reaktif'}
            {phase === 3 && 'Stickman menghubungkan RESTful API, RFC 9457 & WebSocket real-time'}
            {phase === 4 && 'Stickman mengotomasi pengujian Vitest, kontainerisasi Docker & CI/CD'}
          </p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-mono">
        <Globe className="w-3.5 h-3.5" />
        <span>Full-Stack Web</span>
      </div>
    </div>
  );
};

