'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSandboxStore } from '@/stores/useSandboxStore';
import { StealthVaultLogo } from './StealthVaultLogo';
import { Lock, Terminal, Cpu } from 'lucide-react';

const BINARY_STREAMS = [
  '01 10 11 00 10 01 10 11 00 01 11 10',
  '10 01 01 10 11 00 01 10 10 11 00 01',
  '00 11 10 01 01 10 11 00 10 01 01 10',
  '11 00 01 10 10 11 00 01 01 10 11 00',
  '01 01 10 11 00 10 01 01 11 00 10 01',
  '10 11 00 01 10 01 11 00 10 11 01 00',
];

const LOG_MESSAGES = [
  '01010011 01010100 01000101 01000001 01001100 01010100 01001000',
  'INITIALIZING ZERO-DISK VOLATILE MEMORY MATRIX...',
  'DECODING CIPHER STREAM [01101001 01101110 01101001 01110100]',
  'ASSEMBLING VAULT GRAPHIC TILES (AES-256-GCM)...',
  'VERIFYING NON-DISK RAM ZEROIZATION INTEGRITY...',
  'STEALTH VAULT MATRIX ASSEMBLED SUCCESSFULLY!',
];

export const CyberBootLoader: React.FC = () => {
  const { bootCompleted, setBootCompleted } = useSandboxStore();
  const [progress, setProgress] = useState(0);
  const [assembledTiles, setAssembledTiles] = useState<number[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Total 9 tiles (3x3 grid) for assembling the logo image
  const totalTiles = 9;

  const skipBoot = useCallback(() => {
    setIsFadingOut(true);
    setTimeout(() => {
      setBootCompleted(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('stealth_vault_booted', 'true');
      }
    }, 200);
  }, [setBootCompleted]);

  useEffect(() => {
    // Check session storage so it doesn't repeatedly flash on route transitions
    // unless triggered manually
    const sessionBooted = typeof window !== 'undefined' ? sessionStorage.getItem('stealth_vault_booted') : null;
    if (sessionBooted === 'true' && bootCompleted) {
      return;
    }

    const resetTimer = setTimeout(() => {
      setProgress(0);
      setAssembledTiles([]);
      setIsFadingOut(false);
    }, 0);

    // Staggered progressive assembly
    const tileInterval = setInterval(() => {
      setAssembledTiles((prev) => {
        if (prev.length < totalTiles) {
          const nextTile = prev.length;
          return [...prev, nextTile];
        }
        return prev;
      });
    }, 160);

    // Progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 5;
        return Math.min(100, prev + step);
      });
    }, 90);

    // Log messages ticker
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < LOG_MESSAGES.length - 1 ? prev + 1 : prev));
    }, 300);

    // Listen for Escape key to quickly skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipBoot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(resetTimer);
      clearInterval(tileInterval);
      clearInterval(progressInterval);
      clearInterval(logInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [bootCompleted, skipBoot]);

  // When all 9 tiles are assembled and progress reaches 100%
  useEffect(() => {
    if (assembledTiles.length >= totalTiles && progress >= 100) {
      const exitTimer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setBootCompleted(true);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('stealth_vault_booted', 'true');
          }
        }, 500); // Wait for fade-out transition
      }, 350);

      return () => clearTimeout(exitTimer);
    }
  }, [assembledTiles, progress, setBootCompleted]);

  if (bootCompleted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#070d1d]/95 backdrop-blur-2xl transition-all duration-500 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Matrix Binary Rain Streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 select-none">
        <div className="flex justify-between h-full font-mono text-[10px] text-cyan-400/80 leading-relaxed px-4">
          {BINARY_STREAMS.map((stream, idx) => (
            <div
              key={idx}
              className="flex flex-col space-y-2 animate-pulse"
              style={{ animationDuration: `${2 + (idx % 3)}s` }}
            >
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="tracking-widest">
                  {i % 2 === 0 ? stream : stream.split(' ').reverse().join(' ')}
                </span>
              ))}
            </div>
          ))}
        </div>
        {/* Horizontal Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-20 w-full animate-[scanline_3s_linear_infinite]" />
      </div>

      {/* Center Assembly HUD Box */}
      <div className="relative z-10 w-full max-w-md mx-4 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col items-center text-center backdrop-blur-xl">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between w-full border-b border-slate-800 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-400">
              STEALTH KERNEL DECRYPTOR
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
            01-10 DECODER
          </span>
        </div>

        {/* 3x3 MATRIX GRAPHIC ASSEMBLER */}
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 mb-6 p-2 rounded-2xl bg-slate-950/80 border border-cyan-500/30 shadow-inner flex items-center justify-center overflow-hidden">
          {/* Subtle Ambient Aura */}
          <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-2xl animate-pulse" />

          {/* Assembled Stealth Vault Logo in Background, revealed piece-by-piece */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 grid grid-cols-3 grid-rows-3 gap-1">
            {Array.from({ length: totalTiles }).map((_, index) => {
              const isAssembled = assembledTiles.includes(index);

              // Calculate background clip offset for 3x3 grid slice of logo
              const col = index % 3;
              const row = Math.floor(index / 3);

              return (
                <div
                  key={index}
                  className={`relative rounded-lg overflow-hidden border transition-all duration-300 flex items-center justify-center font-mono text-[9px] ${
                    isAssembled
                      ? 'border-cyan-400/50 bg-cyan-950/40 shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                      : 'border-slate-800 bg-slate-900/90 text-cyan-400/60'
                  }`}
                >
                  {isAssembled ? (
                    // Assembled Graphic Slice with Logo fragment
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          transform: `scale(3) translate(${(1 - col) * 33.3}%, ${(1 - row) * 33.3}%)`,
                        }}
                      >
                        <StealthVaultLogo size={130} />
                      </div>
                      {/* Scan Flash Overlay */}
                      <div className="absolute inset-0 bg-cyan-400/20 animate-pulse pointer-events-none" />
                    </div>
                  ) : (
                    // Unassembled Matrix Binary Code (01 10 scramble)
                    <div className="flex flex-col items-center justify-center space-y-0.5 select-none animate-pulse">
                      <span className="text-[10px] text-cyan-300 font-bold">
                        {index % 2 === 0 ? '01' : '10'}
                      </span>
                      <span className="text-[8px] text-slate-500">
                        {index % 3 === 0 ? '11' : '00'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Central Holographic Target Reticle */}
          <div className="absolute inset-0 pointer-events-none border border-cyan-500/20 rounded-2xl flex items-center justify-center">
            <div className="w-10 h-10 border border-dashed border-cyan-400/40 rounded-full animate-spin [animation-duration:8s]" />
          </div>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Menyusun Matriks Brankas...
            </span>
            <span className="text-cyan-400 font-bold tracking-wider">{progress}%</span>
          </div>

          {/* Glowing Track */}
          <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-150 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Dynamic Telemetry Log Console */}
        <div className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 flex items-center gap-2 mb-4">
          <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="truncate text-cyan-300/90 font-semibold">{LOG_MESSAGES[logIndex]}</span>
        </div>

        {/* Bottom Actions: Skip Button */}
        <div className="flex items-center justify-between w-full pt-1 text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-1 text-slate-400">
            <Lock className="w-3 h-3 text-cyan-400" /> AES-256 Memory Mode
          </span>
          <button
            onClick={skipBoot}
            className="text-slate-400 hover:text-cyan-300 transition cursor-pointer underline underline-offset-4 decoration-slate-700 hover:decoration-cyan-400"
          >
            Lewati [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
