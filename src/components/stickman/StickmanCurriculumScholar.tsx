'use client';

import React from 'react';
import { GraduationCap, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const StickmanCurriculumScholar: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-4 p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4" /> Validasi Akademik: Integrasi Capstone Semester 5
        </span>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
          4 Mata Kuliah Terintegrasi
        </span>
      </div>

      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Stickman Scholar */}
        <div className="flex items-center gap-4">
          <svg width="80" height="95" viewBox="0 0 100 120" className="stroke-cyan-400 fill-none stroke-[3.5] stroke-linecap-round stroke-linejoin-round shrink-0">
            {/* Graduation Cap Toga */}
            <polygon points="50,4 20,18 50,30 80,18" className="fill-blue-600 stroke-cyan-300 stroke-[2]" />
            <line x1="80" y1="18" x2="84" y2="34" className="stroke-amber-400 stroke-[2.5]" />
            <circle cx="84" cy="35" r="2" className="fill-amber-400 stroke-none" />

            {/* Head */}
            <circle cx="50" cy="34" r="14" className="fill-cyan-950/30" />

            {/* Body */}
            <line x1="50" y1="48" x2="50" y2="82" />

            {/* Left Arm holding Shield */}
            <line x1="50" y1="56" x2="28" y2="60" />
            <path d="M 18 50 Q 28 48 38 50 Q 38 68 28 78 Q 18 68 18 50 Z" className="stroke-cyan-300 fill-cyan-500/20 stroke-[2]" />

            {/* Right Arm holding Diploma Certificate */}
            <line x1="50" y1="56" x2="72" y2="52" />
            <rect x="72" y="44" width="16" height="12" rx="2" className="stroke-amber-300 fill-amber-950/30 stroke-[2]" />
            <line x1="76" y1="48" x2="84" y2="48" className="stroke-amber-300 stroke-[1.5]" />
            <line x1="76" y1="52" x2="82" y2="52" className="stroke-amber-300 stroke-[1.5]" />

            {/* Legs */}
            <line x1="50" y1="82" x2="35" y2="112" />
            <line x1="50" y1="82" x2="65" y2="112" />
          </svg>

          <div>
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Standar Capstone Terpadu
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-sm">
              Satu produk digital bersama yang mengimplementasikan silabus teori dan praktikum 4 mata kuliah Semester 5 secara simultan.
            </p>
          </div>
        </div>

        {/* Right: Academic Pillar Badges */}
        <div className="grid grid-cols-2 gap-2 w-full md:w-auto text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-slate-200 block">KKS (052353)</span>
              <span className="text-[9px] text-slate-500">CIS Hardening &amp; ATT&amp;CK</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-slate-200 block">Kripto (052354)</span>
              <span className="text-[9px] text-slate-500">AEAD &amp; Hibrida TLS 1.3</span>
            </div>
          </div>

          <div className="col-span-2 p-2.5 rounded-xl bg-slate-900 border border-blue-500/30 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-slate-200 block">PAW Teori &amp; Praktikum (052355/052356)</span>
              <span className="text-[9px] text-slate-400">Next.js 16, Vitest, Docker &amp; Rubrik R4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

