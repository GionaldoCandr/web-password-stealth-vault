'use client';

import React from 'react';
import { Wrench, CheckCircle2, Sparkles, Zap, Shield } from 'lucide-react';

interface StickmanTabOrganizerProps {
  isVisible: boolean;
  activeTab: string;
  step: 'scatter' | 'aligning' | 'locked';
  isLight: boolean;
}

export const StickmanTabOrganizer: React.FC<StickmanTabOrganizerProps> = ({
  isVisible,
  activeTab,
  step,
  isLight,
}) => {
  if (!isVisible) return null;

  const tabLabels: Record<string, string> = {
    home: 'Beranda',
    intro: 'Why Stealth?',
    docs: 'Guidebook',
    lab: 'Interactive Lab',
    architecture: 'Architecture',
    curriculum: 'Kurikulum',
  };

  const currentLabel = tabLabels[activeTab] || activeTab.toUpperCase();

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 pointer-events-none transition-all duration-300 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
      }`}
    >
      <div
        className={`flex items-center gap-3.5 px-4 py-2.5 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-200 ${
          isLight
            ? 'bg-white/95 border-cyan-300 text-slate-800 shadow-slate-300/80'
            : 'bg-slate-900/90 border-cyan-500/40 text-slate-100 shadow-cyan-950/60'
        }`}
      >
        {/* Dynamic Animated Stickman Architect SVG */}
        <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
          <svg
            width="44"
            height="44"
            viewBox="0 0 60 60"
            className={`fill-none stroke-linecap-round stroke-linejoin-round transition-all duration-200 ${
              isLight ? 'stroke-cyan-600' : 'stroke-cyan-400'
            }`}
          >
            {/* Stickman Head with Cyber Visor */}
            <circle
              cx="22"
              cy="16"
              r="7"
              strokeWidth="2.4"
              className={isLight ? 'fill-cyan-100' : 'fill-cyan-950/40'}
            />
            {/* Cyber Visor Line */}
            <line
              x1="18"
              y1="15"
              x2="26"
              y2="15"
              strokeWidth="2.5"
              className={isLight ? 'stroke-cyan-800' : 'stroke-cyan-300'}
            />

            {/* Stickman Spine / Body */}
            <line x1="22" y1="23" x2="22" y2="40" strokeWidth="2.4" />

            {/* Arm 1: Holding Tool / Giving Thumbs-Up */}
            {step === 'locked' ? (
              // Thumbs up pose
              <path
                d="M 22 28 L 32 24 L 33 16"
                strokeWidth="2.4"
                className={isLight ? 'stroke-emerald-600' : 'stroke-emerald-400'}
              />
            ) : (
              // Aiming cyber laser / magnetic alignment wrench
              <path
                d="M 22 28 L 34 22 L 40 18"
                strokeWidth="2.4"
                className={isLight ? 'stroke-cyan-700' : 'stroke-cyan-300'}
              />
            )}

            {/* Cyber Wrench / Alignment Laser Head */}
            {step === 'locked' ? (
              // Golden Check Star or Thumbs Up Badge
              <circle
                cx="33"
                cy="14"
                r="3"
                className={isLight ? 'fill-emerald-600 stroke-none' : 'fill-emerald-400 stroke-none'}
              />
            ) : (
              // Alignment Tool
              <rect
                x="38"
                y="15"
                width="6"
                height="6"
                rx="1"
                className={isLight ? 'fill-cyan-600 stroke-cyan-700' : 'fill-cyan-400 stroke-cyan-200'}
              />
            )}

            {/* Laser Alignment Beam firing when aligning */}
            {step === 'aligning' && (
              <line
                x1="44"
                y1="18"
                x2="58"
                y2="12"
                strokeWidth="2"
                strokeDasharray="2 2"
                className={`animate-pulse ${isLight ? 'stroke-cyan-600' : 'stroke-cyan-300'}`}
              />
            )}

            {/* Arm 2: Supporting balance */}
            <line x1="22" y1="30" x2="12" y2="35" strokeWidth="2.4" />

            {/* Legs in dynamic working / agile stance */}
            {step === 'locked' ? (
              <>
                <line x1="22" y1="40" x2="14" y2="54" strokeWidth="2.4" />
                <line x1="22" y1="40" x2="30" y2="54" strokeWidth="2.4" />
              </>
            ) : (
              <>
                <line x1="22" y1="40" x2="12" y2="52" strokeWidth="2.4" />
                <line x1="22" y1="40" x2="32" y2="52" strokeWidth="2.4" />
              </>
            )}
          </svg>

          {/* Sparkle ping when locked */}
          {step === 'locked' && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          )}
        </div>

        {/* Narrative Status Description */}
        <div className="flex flex-col pr-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-tight">
            {step === 'scatter' && (
              <>
                <Zap className={`w-3.5 h-3.5 animate-bounce ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
                <span className={isLight ? 'text-amber-700' : 'text-amber-300'}>
                  Merombak Tata Letak [{currentLabel}]...
                </span>
              </>
            )}
            {step === 'aligning' && (
              <>
                <Wrench className={`w-3.5 h-3.5 animate-spin [animation-duration:3s] ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`} />
                <span className={isLight ? 'text-cyan-800' : 'text-cyan-300'}>
                  Stickman Menata Kartu Modular...
                </span>
              </>
            )}
            {step === 'locked' && (
              <>
                <CheckCircle2 className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                <span className={isLight ? 'text-emerald-700' : 'text-emerald-300'}>
                  Kartu Tersusun Rapi &amp; Terkunci!
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[10px] ${isLight ? 'text-slate-500 font-medium' : 'text-slate-400'}`}>
              {step === 'scatter'
                ? 'Blok memori sedang direorganisasi...'
                : step === 'aligning'
                ? 'Optimalisasi viewport render aktif (Zero-Lag)'
                : `Modul [${currentLabel}] siap digunakan`}
            </span>
            <span
              className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                step === 'locked'
                  ? isLight
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                  : isLight
                  ? 'bg-cyan-100 text-cyan-800 border-cyan-300'
                  : 'bg-cyan-950/40 text-cyan-400 border-cyan-500/30'
              }`}
            >
              {step === 'scatter' ? '30%' : step === 'aligning' ? '75%' : '100%'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
