'use client';

import React, { useState, useEffect } from 'react';
import { Hammer, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface StickmanShatterRebuilderProps {
  isActive: boolean;
  activeTab: string;
  isLight: boolean;
  onFinish?: () => void;
}

export const StickmanShatterRebuilder: React.FC<StickmanShatterRebuilderProps> = ({
  isActive,
  activeTab,
  isLight,
  onFinish,
}) => {
  // Animation stage:
  // 0: Initial shatter (kartu pecah / hancur berantakan)
  // 1: Stickman rushing in and picking up shards (memungut pecahan)
  // 2: Welding & fusing pieces together (menyusun & mengelas sambungan)
  // 3: Finished! Clean card restored (kartu utuh kembali & stickman selebrasi)
  const [animStage, setAnimStage] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    if (!isActive) return;

    // Timeline sequence (tuned for smooth responsiveness without lag)
    // T = 0ms: Shatter occurs
    const t0 = setTimeout(() => {
      setAnimStage(0);
    }, 0);

    // T = 180ms: Stickman team rushes in to grab pieces
    const t1 = setTimeout(() => {
      setAnimStage(1);
    }, 180);

    // T = 450ms: Welding and pushing shards into perfect place
    const t2 = setTimeout(() => {
      setAnimStage(2);
    }, 450);

    // T = 780ms: Shards fuse seamlessly, stickmen celebrate
    const t3 = setTimeout(() => {
      setAnimStage(3);
    }, 780);

    // T = 1100ms: Finish sequence
    const t4 = setTimeout(() => {
      if (onFinish) onFinish();
    }, 1100);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isActive, onFinish]);

  if (!isActive) return null;

  const tabNames: Record<string, string> = {
    home: 'BERANDA',
    intro: 'WHY STEALTH?',
    docs: 'GUIDEBOOK',
    lab: 'INTERACTIVE LAB',
    architecture: 'ARCHITECTURE',
    curriculum: 'KURIKULUM',
  };

  const currentTabName = tabNames[activeTab] || activeTab.toUpperCase();

  // Styles based on stage
  // Stage 0: Shattered far apart with high tilt
  // Stage 1: Stickmen carrying shards halfway back
  // Stage 2: Snapped close with welding glow
  // Stage 3: Fully fused together at (0,0) with 0 rotation
  const shardTransforms = {
    // Top-Left Shard
    tl:
      animStage === 0
        ? 'translate(-38px, -24px) rotate(-11deg) scale(0.92)'
        : animStage === 1
        ? 'translate(-18px, -11px) rotate(-5deg) scale(0.96)'
        : animStage === 2
        ? 'translate(-3px, -2px) rotate(-1deg) scale(0.99)'
        : 'translate(0px, 0px) rotate(0deg) scale(1)',

    // Top-Right Shard
    tr:
      animStage === 0
        ? 'translate(36px, -28px) rotate(13deg) scale(0.93)'
        : animStage === 1
        ? 'translate(16px, -12px) rotate(6deg) scale(0.97)'
        : animStage === 2
        ? 'translate(3px, -2px) rotate(1deg) scale(0.99)'
        : 'translate(0px, 0px) rotate(0deg) scale(1)',

    // Bottom-Left Shard
    bl:
      animStage === 0
        ? 'translate(-32px, 30px) rotate(-14deg) scale(0.91)'
        : animStage === 1
        ? 'translate(-14px, 14px) rotate(-6deg) scale(0.96)'
        : animStage === 2
        ? 'translate(-2px, 2px) rotate(-1deg) scale(0.99)'
        : 'translate(0px, 0px) rotate(0deg) scale(1)',

    // Bottom-Right Shard
    br:
      animStage === 0
        ? 'translate(34px, 28px) rotate(12deg) scale(0.92)'
        : animStage === 1
        ? 'translate(15px, 12px) rotate(5deg) scale(0.97)'
        : animStage === 2
        ? 'translate(2px, 2px) rotate(1deg) scale(0.99)'
        : 'translate(0px, 0px) rotate(0deg) scale(1)',
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
      {/* Subtle Screen Ambient Flash on Shatter */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
          animStage === 0
            ? isLight
              ? 'bg-cyan-500/10'
              : 'bg-cyan-500/15'
            : animStage === 3
            ? isLight
              ? 'bg-emerald-500/10'
              : 'bg-emerald-500/10'
            : 'opacity-0'
        }`}
      />

      {/* Main Shatter & Reconstruct Theater Card */}
      <div className="relative w-full max-w-lg mx-auto flex flex-col items-center">
        {/* Top Status Banner */}
        <div
          className={`mb-4 px-4 py-1.5 rounded-full border shadow-xl flex items-center gap-2 text-xs font-mono font-bold transition-all duration-300 ${
            animStage === 0
              ? 'bg-rose-950/80 border-rose-500/60 text-rose-300 animate-pulse'
              : animStage === 1
              ? isLight
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-amber-950/80 border-amber-500/60 text-amber-300'
              : animStage === 2
              ? isLight
                ? 'bg-cyan-100 border-cyan-400 text-cyan-900'
                : 'bg-cyan-950/80 border-cyan-500/60 text-cyan-300'
              : isLight
              ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
              : 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
          }`}
        >
          {animStage === 0 && (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
              <span>STATUS: KARTU PECAH DI MEMORI [{currentTabName}]</span>
            </>
          )}
          {animStage === 1 && (
            <>
              <Hammer className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>TIM STICKMAN MEMUNGUT PECAHAN KARTU...</span>
            </>
          )}
          {animStage === 2 && (
            <>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>MENGELAS &amp; MENYUSUN ULANG MODULAR CARD...</span>
            </>
          )}
          {animStage === 3 && (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>KARTU UTUH &amp; TERKUNCI SEMPURNA (100%)</span>
            </>
          )}
        </div>

        {/* The Card Stage with 4 Fractured Shards & Active Stickman Crew */}
        <div className="relative w-full h-64 sm:h-72 select-none">
          {/* Card Frame Backdrop */}
          <div
            className={`absolute inset-0 rounded-3xl border transition-all duration-300 ${
              animStage === 3
                ? isLight
                  ? 'border-emerald-400 bg-white shadow-2xl shadow-emerald-500/20'
                  : 'border-emerald-400 bg-slate-900 shadow-2xl shadow-emerald-500/30'
                : 'border-transparent bg-transparent'
            }`}
          />

          {/* =========================================================
              SHARD 1: TOP-LEFT FRACTURED PIECE
              ========================================================= */}
          <div
            className="absolute top-0 left-0 w-1/2 h-1/2 origin-bottom-right transition-transform duration-300 ease-out"
            style={{ transform: shardTransforms.tl }}
          >
            <div
              className={`w-full h-full p-4 rounded-tl-3xl border flex flex-col justify-between overflow-hidden relative shadow-lg ${
                isLight
                  ? 'bg-slate-50/95 border-cyan-400/60 text-slate-800'
                  : 'bg-slate-900/95 border-cyan-500/50 text-slate-100'
              }`}
              style={{
                clipPath: animStage === 3 ? 'none' : 'polygon(0 0, 100% 0, 88% 100%, 0 84%)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                  {currentTabName} {"//"} SHARD_01
                </span>
              </div>
              <div className="space-y-1">
                <div className="h-3 w-28 bg-cyan-500/20 rounded" />
                <div className="h-2 w-20 bg-slate-500/30 rounded" />
              </div>
              {/* Jagged crack glow edge */}
              {animStage < 3 && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-amber-400 to-rose-400 opacity-80" />
              )}
            </div>
          </div>

          {/* =========================================================
              SHARD 2: TOP-RIGHT FRACTURED PIECE
              ========================================================= */}
          <div
            className="absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left transition-transform duration-300 ease-out"
            style={{ transform: shardTransforms.tr }}
          >
            <div
              className={`w-full h-full p-4 rounded-tr-3xl border flex flex-col justify-between items-end overflow-hidden relative shadow-lg ${
                isLight
                  ? 'bg-slate-50/95 border-cyan-400/60 text-slate-800'
                  : 'bg-slate-900/95 border-cyan-500/50 text-slate-100'
              }`}
              style={{
                clipPath: animStage === 3 ? 'none' : 'polygon(0 0, 100% 0, 100% 86%, 12% 100%)',
              }}
            >
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                AES-256 [GCM]
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              {/* Jagged crack glow edge */}
              {animStage < 3 && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-amber-400 to-rose-400 opacity-80" />
              )}
            </div>
          </div>

          {/* =========================================================
              SHARD 3: BOTTOM-LEFT FRACTURED PIECE
              ========================================================= */}
          <div
            className="absolute bottom-0 left-0 w-1/2 h-1/2 origin-top-right transition-transform duration-300 ease-out"
            style={{ transform: shardTransforms.bl }}
          >
            <div
              className={`w-full h-full p-4 rounded-bl-3xl border flex flex-col justify-between overflow-hidden relative shadow-lg ${
                isLight
                  ? 'bg-slate-50/95 border-cyan-400/60 text-slate-800'
                  : 'bg-slate-900/95 border-cyan-500/50 text-slate-100'
              }`}
              style={{
                clipPath: animStage === 3 ? 'none' : 'polygon(0 16%, 88% 0, 100% 100%, 0 100%)',
              }}
            >
              <div className="space-y-1 mt-1">
                <div className="h-2 w-32 bg-slate-500/30 rounded" />
                <div className="h-2 w-24 bg-slate-500/20 rounded" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
                <span>MEM_ADDR: 0x7FFF0040</span>
              </div>
              {/* Jagged crack glow edge */}
              {animStage < 3 && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-400 opacity-80" />
              )}
            </div>
          </div>

          {/* =========================================================
              SHARD 4: BOTTOM-RIGHT FRACTURED PIECE
              ========================================================= */}
          <div
            className="absolute bottom-0 right-0 w-1/2 h-1/2 origin-top-left transition-transform duration-300 ease-out"
            style={{ transform: shardTransforms.br }}
          >
            <div
              className={`w-full h-full p-4 rounded-br-3xl border flex flex-col justify-between items-end overflow-hidden relative shadow-lg ${
                isLight
                  ? 'bg-slate-50/95 border-cyan-400/60 text-slate-800'
                  : 'bg-slate-900/95 border-cyan-500/50 text-slate-100'
              }`}
              style={{
                clipPath: animStage === 3 ? 'none' : 'polygon(12% 0, 100% 14%, 100% 100%, 0 100%)',
              }}
            >
              <div className="h-2 w-24 bg-slate-500/30 rounded mt-1" />
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-emerald-400">
                  RECONSTRUCTED
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              {/* Jagged crack glow edge */}
              {animStage < 3 && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-400 opacity-80" />
              )}
            </div>
          </div>

          {/* =========================================================
              DYNAMIC STICKMAN BUILDER SQUAD OVERLAY (3 WORKERS)
              ========================================================= */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 400 240"
          >
            {/* -------------------------------------------------------
                STICKMAN 1: LEFT CARRIER (Worker Alex)
                Picks up bottom-left falling piece and pushes it into place
                ------------------------------------------------------- */}
            <g
              className="transition-all duration-300 ease-out"
              transform={
                animStage === 0
                  ? 'translate(25, 130)'
                  : animStage === 1
                  ? 'translate(55, 115)'
                  : animStage === 2
                  ? 'translate(80, 110)'
                  : 'translate(50, 140)'
              }
            >
              {/* Head with Worker Bandana */}
              <circle
                cx="20"
                cy="20"
                r="7"
                strokeWidth="2.5"
                className={isLight ? 'stroke-cyan-700 fill-cyan-100' : 'stroke-cyan-400 fill-cyan-950'}
              />
              {/* Bandana Knot */}
              <path
                d="M 13 18 L 9 15 M 13 21 L 8 23"
                strokeWidth="2"
                className={isLight ? 'stroke-amber-600' : 'stroke-amber-400'}
              />

              {/* Body */}
              <line
                x1="20"
                y1="27"
                x2="20"
                y2="45"
                strokeWidth="2.5"
                className={isLight ? 'stroke-cyan-700' : 'stroke-cyan-400'}
              />

              {/* Arms: Lifting / Pushing the Shard */}
              {animStage === 3 ? (
                // Wiping brow / cheerful salute
                <path
                  d="M 20 31 L 28 24 L 26 18 M 20 33 L 12 40"
                  strokeWidth="2.5"
                  className={isLight ? 'stroke-cyan-700' : 'stroke-cyan-400'}
                />
              ) : (
                // Both arms extended holding up the shard
                <path
                  d="M 20 32 L 32 22 L 40 18 M 20 34 L 28 26 L 36 24"
                  strokeWidth="2.5"
                  className={isLight ? 'stroke-amber-600' : 'stroke-amber-400'}
                />
              )}

              {/* Legs in pushing/running stance */}
              <line
                x1="20"
                y1="45"
                x2="10"
                y2="62"
                strokeWidth="2.5"
                className={isLight ? 'stroke-cyan-700' : 'stroke-cyan-400'}
              />
              <line
                x1="20"
                y1="45"
                x2="28"
                y2="62"
                strokeWidth="2.5"
                className={isLight ? 'stroke-cyan-700' : 'stroke-cyan-400'}
              />

              {/* Speech/Action Callout Bubble */}
              {animStage === 1 && (
                <g transform="translate(-15, -16)">
                  <rect
                    x="0"
                    y="0"
                    width="65"
                    height="16"
                    rx="4"
                    className="fill-slate-900 stroke-amber-400 stroke-[1.2]"
                  />
                  <text
                    x="32"
                    y="11"
                    textAnchor="middle"
                    className="fill-amber-300 font-mono text-[8px] font-bold"
                  >
                    LIFTING SHARD!
                  </text>
                </g>
              )}
            </g>

            {/* -------------------------------------------------------
                STICKMAN 2: RIGHT HOISTER (Worker Ben)
                Pulls and carries the top-right shard back into place
                ------------------------------------------------------- */}
            <g
              className="transition-all duration-300 ease-out"
              transform={
                animStage === 0
                  ? 'translate(315, 30)'
                  : animStage === 1
                  ? 'translate(285, 45)'
                  : animStage === 2
                  ? 'translate(265, 55)'
                  : 'translate(295, 45)'
              }
            >
              {/* Head with Cyber Visor */}
              <circle
                cx="20"
                cy="20"
                r="7"
                strokeWidth="2.5"
                className={isLight ? 'stroke-cyan-700 fill-cyan-100' : 'stroke-cyan-400 fill-cyan-950'}
              />
              <line
                x1="16"
                y1="19"
                x2="24"
                y2="19"
                strokeWidth="2"
                className={isLight ? 'stroke-cyan-900' : 'stroke-cyan-200'}
              />

              {/* Body */}
              <line
                x1="20"
                y1="27"
                x2="20"
                y2="45"
                strokeWidth="2.5"
                className={isLight ? 'stroke-cyan-700' : 'stroke-cyan-400'}
              />

              {/* Arms: Holding Shard / Double Thumbs-Up */}
              {animStage === 3 ? (
                // Double thumbs up
                <path
                  d="M 20 31 L 28 24 L 29 17 M 20 31 L 12 24 L 11 17"
                  strokeWidth="2.5"
                  className={isLight ? 'stroke-emerald-600' : 'stroke-emerald-400'}
                />
              ) : (
                // Pulling piece inward
                <path
                  d="M 20 32 L 8 22 L 0 16 M 20 34 L 12 28 L 4 22"
                  strokeWidth="2.5"
                  className={isLight ? 'stroke-amber-600' : 'stroke-amber-400'}
                />
              )}

              {/* Legs */}
              <line
                x1="20"
                y1="45"
                x2="12"
                y2="62"
                strokeWidth="2.5"
                className={isLight ? 'stroke-cyan-700' : 'stroke-cyan-400'}
              />
              <line
                x1="20"
                y1="45"
                x2="28"
                y2="62"
                strokeWidth="2.5"
                className={isLight ? 'stroke-cyan-700' : 'stroke-cyan-400'}
              />

              {/* Action Callout Bubble */}
              {animStage === 1 && (
                <g transform="translate(-10, -16)">
                  <rect
                    x="0"
                    y="0"
                    width="60"
                    height="16"
                    rx="4"
                    className="fill-slate-900 stroke-amber-400 stroke-[1.2]"
                  />
                  <text
                    x="30"
                    y="11"
                    textAnchor="middle"
                    className="fill-amber-300 font-mono text-[8px] font-bold"
                  >
                    ALIGNING TOP!
                  </text>
                </g>
              )}
            </g>

            {/* -------------------------------------------------------
                STICKMAN 3: FOREMAN WELDER (Foreman Leo)
                In the center seam, welding the shards with laser sparks!
                ------------------------------------------------------- */}
            <g
              className="transition-all duration-300 ease-out"
              transform={
                animStage === 0
                  ? 'translate(180, 80) scale(0.9)'
                  : animStage === 1
                  ? 'translate(185, 75) scale(1)'
                  : animStage === 2
                  ? 'translate(185, 70) scale(1.05)'
                  : 'translate(185, 72) scale(1)'
              }
            >
              {/* Welder Helmet Head */}
              <circle
                cx="20"
                cy="18"
                r="8"
                strokeWidth="2.5"
                className={isLight ? 'stroke-cyan-700 fill-cyan-100' : 'stroke-cyan-400 fill-cyan-950'}
              />
              <rect
                x="15"
                y="15"
                width="10"
                height="6"
                rx="1"
                className={isLight ? 'fill-amber-500' : 'fill-amber-400'}
              />

              {/* Body */}
              <line
                x1="20"
                y1="26"
                x2="20"
                y2="46"
                strokeWidth="2.5"
                className={isLight ? 'stroke-cyan-700' : 'stroke-cyan-400'}
              />

              {/* Arms holding welding laser torch */}
              {animStage === 3 ? (
                // Holding victory sign
                <path
                  d="M 20 30 L 28 20 L 32 14 M 20 32 L 12 40"
                  strokeWidth="2.5"
                  className={isLight ? 'stroke-emerald-600' : 'stroke-emerald-400'}
                />
              ) : (
                // Welding torch pose aiming at central seam
                <path
                  d="M 20 32 L 28 36 L 36 34 M 20 34 L 26 40 L 32 38"
                  strokeWidth="2.5"
                  className={isLight ? 'stroke-cyan-700' : 'stroke-cyan-400'}
                />
              )}

              {/* Welding Torch Tool */}
              {animStage !== 3 && (
                <rect
                  x="35"
                  y="32"
                  width="7"
                  height="4"
                  rx="1"
                  className="fill-cyan-400 stroke-cyan-200 stroke-[1]"
                />
              )}

              {/* Glowing Laser Beam on Welding Seam */}
              {animStage === 2 && (
                <>
                  <line
                    x1="42"
                    y1="34"
                    x2="55"
                    y2="34"
                    strokeWidth="3"
                    className="stroke-cyan-300 animate-pulse"
                  />
                  {/* Flying Welding Spark Particles */}
                  <circle cx="56" cy="30" r="1.5" className="fill-amber-400 animate-ping" />
                  <circle cx="58" cy="38" r="1.5" className="fill-cyan-300 animate-ping" />
                  <circle cx="62" cy="33" r="2" className="fill-yellow-300 animate-pulse" />
                  <line
                    x1="55"
                    y1="34"
                    x2="65"
                    y2="28"
                    strokeWidth="1.2"
                    className="stroke-amber-300"
                  />
                  <line
                    x1="55"
                    y1="34"
                    x2="64"
                    y2="40"
                    strokeWidth="1.2"
                    className="stroke-cyan-300"
                  />
                </>
              )}

              {/* Legs */}
              <line
                x1="20"
                y1="46"
                x2="12"
                y2="64"
                strokeWidth="2.5"
                className={isLight ? 'stroke-cyan-700' : 'stroke-cyan-400'}
              />
              <line
                x1="20"
                y1="46"
                x2="28"
                y2="64"
                strokeWidth="2.5"
                className={isLight ? 'stroke-cyan-700' : 'stroke-cyan-400'}
              />

              {/* Success Badge on Finished */}
              {animStage === 3 && (
                <g transform="translate(24, 0)">
                  <circle cx="10" cy="10" r="8" className="fill-emerald-500 stroke-none" />
                  <path
                    d="M 6 10 L 9 13 L 14 7"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              )}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
