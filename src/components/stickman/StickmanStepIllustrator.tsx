'use client';

import React, { useState, useEffect } from 'react';
import {
  Download,
  Terminal,
  Key,
  Database,
  Smartphone,
  QrCode,
  Wifi,
  Puzzle,
  Globe,
  CheckCircle2,
  Lock,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface StickmanStepIllustratorProps {
  platform: 'pc' | 'android' | 'extension';
  step: number;
}

export const StickmanStepIllustrator: React.FC<StickmanStepIllustratorProps> = ({
  platform,
  step,
}) => {
  const [pulseTick, setPulseTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 4);
    }, 700);
    return () => clearInterval(timer);
  }, []);

  // PC Steps Visuals
  const renderPCVisual = () => {
    switch (step) {
      case 1:
        // PC Step 1: Stickman extracting binary & registering Windows Registry
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3">
              <svg
                width="70"
                height="80"
                viewBox="0 0 100 120"
                className="stroke-cyan-400 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round shrink-0"
              >
                <circle cx="50" cy="24" r="14" className="fill-cyan-950/40" />
                <line x1="50" y1="38" x2="50" y2="76" />
                <line x1="50" y1="48" x2="22" y2="58" />
                <line x1="50" y1="48" x2="78" y2="58" />
                <line x1="50" y1="76" x2="35" y2="110" />
                <line x1="50" y1="76" x2="65" y2="110" />
                {/* Wrench / tool in hand */}
                <path d="M 78 58 L 90 50 L 94 54 L 84 62 Z" className="stroke-amber-400 fill-amber-500/20 stroke-[1.5]" />
              </svg>
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                  Tahap 1: Registry Registration
                </span>
                <p className="text-xs text-slate-200 font-bold">
                  Stickman mendaftarkan alias ke Windows Registry
                </p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  HKCU\...\App Paths\mypass.exe
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
              <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" /> Registry Hook Active
              </div>
              <div className="text-[10px] text-slate-400">
                Binary: <span className="text-emerald-400">%LOCALAPPDATA%\...\win_service_host.exe</span>
              </div>
            </div>
          </div>
        );

      case 2:
        // PC Step 2: Stickman pressing Win + R and typing "mypass"
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3">
              <svg
                width="70"
                height="80"
                viewBox="0 0 100 120"
                className="stroke-cyan-400 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round shrink-0"
              >
                <circle cx="50" cy="24" r="14" className="fill-cyan-950/40" />
                <line x1="50" y1="38" x2="50" y2="76" />
                {/* Typing arms */}
                <path
                  d={
                    pulseTick % 2 === 0
                      ? 'M 50 48 L 30 65 L 42 74'
                      : 'M 50 48 L 34 62 L 46 72'
                  }
                  className="stroke-cyan-300 transition-all duration-200"
                />
                <line x1="50" y1="48" x2="72" y2="65" />
                <line x1="50" y1="76" x2="35" y2="110" />
                <line x1="50" y1="76" x2="65" y2="110" />
              </svg>
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                  Tahap 2: Windows Run Stealth
                </span>
                <p className="text-xs text-slate-200 font-bold">
                  Stickman menekan Win + R &amp; mengetik &quot;mypass&quot;
                </p>
                <div className="flex items-center gap-1.5 mt-1 font-mono text-[11px] text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 w-fit">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>Win + R &gt; mypass</span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono text-emerald-400 font-bold">PID: 8842 [RAM Only]</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
          </div>
        );

      case 3:
        // PC Step 3: Stickman master key authentication & decryption
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3">
              <svg
                width="70"
                height="80"
                viewBox="0 0 100 120"
                className="stroke-cyan-400 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round shrink-0"
              >
                <circle cx="50" cy="24" r="14" className="fill-cyan-950/40" />
                <line x1="50" y1="38" x2="50" y2="76" />
                {/* Holding glowing key */}
                <line x1="50" y1="48" x2="72" y2="44" />
                <circle cx="78" cy="42" r="5" className="stroke-amber-400 fill-amber-500/20" />
                <line x1="82" y1="44" x2="90" y2="48" className="stroke-amber-400 stroke-[2]" />
                <line x1="86" y1="46" x2="86" y2="50" className="stroke-amber-400 stroke-[2]" />
                <line x1="50" y1="48" x2="28" y2="60" />
                <line x1="50" y1="76" x2="35" y2="110" />
                <line x1="50" y1="76" x2="65" y2="110" />
              </svg>
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Tahap 3: Master Key Verification
                </span>
                <p className="text-xs text-slate-200 font-bold">
                  Stickman memasukkan Master Password ke Vault
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Argon2id KDF mendrive kunci enkripsi AES-256 GCM
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <div className="text-[11px]">
                <div className="font-bold text-slate-200">Vault Unlocked</div>
                <div className="text-[10px] text-emerald-400 font-mono">Zero Disk Plaintext</div>
              </div>
            </div>
          </div>
        );

      case 4:
      default:
        // PC Step 4: Stickman managing credentials in RAM
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3">
              <svg
                width="70"
                height="80"
                viewBox="0 0 100 120"
                className="stroke-cyan-400 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round shrink-0"
              >
                <circle cx="50" cy="24" r="14" className="fill-cyan-950/40" />
                <line x1="50" y1="38" x2="50" y2="76" />
                <line x1="50" y1="48" x2="25" y2="55" />
                <line x1="50" y1="48" x2="75" y2="55" />
                <line x1="50" y1="76" x2="35" y2="110" />
                <line x1="50" y1="76" x2="65" y2="110" />
              </svg>
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  Tahap 4: Volatile RAM Heap
                </span>
                <p className="text-xs text-slate-200 font-bold">
                  Stickman mengelola kredensial di RAM berproteksi
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Listener aktif di port 14201 (Extension) &amp; 14202 (Android P2P)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-[11px] font-mono text-cyan-300 font-bold">memset_s Zeroize Ready</span>
            </div>
          </div>
        );
    }
  };

  // Android Steps Visuals
  const renderAndroidVisual = () => {
    switch (step) {
      case 1:
        // Android Step 1: Stickman installing APK on smartphone
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3">
              <svg
                width="70"
                height="80"
                viewBox="0 0 100 120"
                className="stroke-cyan-400 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round shrink-0"
              >
                <circle cx="50" cy="24" r="14" className="fill-cyan-950/40" />
                <line x1="50" y1="38" x2="50" y2="76" />
                {/* Holding Smartphone */}
                <line x1="50" y1="48" x2="72" y2="52" />
                <rect x="70" y="40" width="18" height="28" rx="3" className="stroke-emerald-400 fill-emerald-950/40 stroke-[2]" />
                <circle cx="79" cy="64" r="1.5" className="fill-emerald-400 stroke-none" />
                <line x1="50" y1="48" x2="28" y2="60" />
                <line x1="50" y1="76" x2="35" y2="110" />
                <line x1="50" y1="76" x2="65" y2="110" />
              </svg>
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  Tahap 1: Instalasi APK Android
                </span>
                <p className="text-xs text-slate-200 font-bold">
                  Stickman menginstall app.apk pada perangkat smartphone
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Package: <code className="text-cyan-300 font-mono">com.stealthvault.app</code>
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-mono text-slate-300">smart_installer &gt; app.apk</span>
            </div>
          </div>
        );

      case 2:
        // Android Step 2: Stickman scanning PC QR code
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3">
              <svg
                width="70"
                height="80"
                viewBox="0 0 100 120"
                className="stroke-cyan-400 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round shrink-0"
              >
                <circle cx="50" cy="24" r="14" className="fill-cyan-950/40" />
                <line x1="50" y1="38" x2="50" y2="76" />
                {/* Aiming phone camera forward */}
                <line x1="50" y1="48" x2="75" y2="50" />
                <rect x="74" y="42" width="16" height="24" rx="2" className="stroke-cyan-400 fill-cyan-950/40 stroke-[2]" />
                {/* Laser beam */}
                <line
                  x1="90"
                  y1="54"
                  x2="115"
                  y2="54"
                  className="stroke-rose-400 stroke-[2] stroke-dasharray-[3,3] animate-pulse"
                />
                <line x1="50" y1="48" x2="28" y2="60" />
                <line x1="50" y1="76" x2="35" y2="110" />
                <line x1="50" y1="76" x2="65" y2="110" />
              </svg>
              <div>
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider block">
                  Tahap 2: QR Scanner P2P Pairing
                </span>
                <p className="text-xs text-slate-200 font-bold">
                  Stickman memindai QR Code PC untuk mendapatkan target IP:Port
                </p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Target: 192.168.0.x:14202
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-cyan-400 animate-pulse" />
              <div className="text-[10px] font-mono text-emerald-400">
                <div>Pairing Token Match</div>
                <div className="text-slate-400">Handshake Ready</div>
              </div>
            </div>
          </div>
        );

      case 3:
      default:
        // Android Step 3: CRDT Sync two-way
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3">
              <svg
                width="70"
                height="80"
                viewBox="0 0 100 120"
                className="stroke-cyan-400 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round shrink-0"
              >
                <circle cx="50" cy="24" r="14" className="fill-cyan-950/40" />
                <line x1="50" y1="38" x2="50" y2="76" />
                <line x1="50" y1="48" x2="25" y2="52" />
                <line x1="50" y1="48" x2="75" y2="52" />
                <line x1="50" y1="76" x2="35" y2="110" />
                <line x1="50" y1="76" x2="65" y2="110" />
              </svg>
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                  Tahap 3: CRDT Timestamp Merge
                </span>
                <p className="text-xs text-slate-200 font-bold">
                  Stickman melihat data HP &amp; PC tersinkronisasi otomatis
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Event: <code className="text-cyan-300 font-mono">p2p-data-updated</code> terpanggil di desktop
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
              <Wifi className="w-4 h-4 text-emerald-400" />
              <div className="text-[10px] font-mono">
                <span className="text-emerald-400 font-bold">2-Way Sync OK</span>
                <div className="text-slate-500">Zero Cloud Relied</div>
              </div>
            </div>
          </div>
        );
    }
  };

  // Extension Steps Visuals
  const renderExtensionVisual = () => {
    switch (step) {
      case 1:
        // Extension Step 1: Loading Unpacked Extension
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3">
              <svg
                width="70"
                height="80"
                viewBox="0 0 100 120"
                className="stroke-cyan-400 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round shrink-0"
              >
                <circle cx="50" cy="24" r="14" className="fill-cyan-950/40" />
                <line x1="50" y1="38" x2="50" y2="76" />
                {/* Holding puzzle piece */}
                <line x1="50" y1="48" x2="75" y2="50" />
                <circle cx="80" cy="50" r="6" className="stroke-amber-400 fill-amber-500/20" />
                <line x1="50" y1="48" x2="28" y2="60" />
                <line x1="50" y1="76" x2="35" y2="110" />
                <line x1="50" y1="76" x2="65" y2="110" />
              </svg>
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Tahap 1: Load Unpacked Extension
                </span>
                <p className="text-xs text-slate-200 font-bold">
                  Stickman memuat folder browser-extension di chrome://extensions
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Developer Mode &gt; Load unpacked &gt; Manifest V3
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
              <Puzzle className="w-4 h-4 text-amber-400" />
              <div className="text-[10px] font-mono">
                <div className="text-slate-200 font-bold">Stealth Assistant</div>
                <div className="text-emerald-400">Extension Active</div>
              </div>
            </div>
          </div>
        );

      case 2:
        // Extension Step 2: Form submit detection & Floating Modal
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3">
              <svg
                width="70"
                height="80"
                viewBox="0 0 100 120"
                className="stroke-cyan-400 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round shrink-0"
              >
                <circle cx="50" cy="24" r="14" className="fill-cyan-950/40" />
                <line x1="50" y1="38" x2="50" y2="76" />
                {/* Typing on web form */}
                <line x1="50" y1="48" x2="72" y2="58" />
                <line x1="50" y1="48" x2="32" y2="58" />
                <line x1="50" y1="76" x2="35" y2="110" />
                <line x1="50" y1="76" x2="65" y2="110" />
              </svg>
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                  Tahap 2: DOM Form Capture &amp; Modal
                </span>
                <p className="text-xs text-slate-200 font-bold">
                  content.js mendeteksi form submit &amp; memunculkan floating modal
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  &quot;Simpan akun baru untuk domain ini?&quot;
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-cyan-500/30 shadow-lg flex flex-col gap-1 text-[10px]">
              <span className="text-cyan-400 font-bold">Floating Save Modal</span>
              <span className="text-slate-400 font-mono">User: user@mail.com</span>
              <span className="text-slate-500 font-mono">Pass: ••••••••••••</span>
            </div>
          </div>
        );

      case 3:
      default:
        // Extension Step 3: Popup authorization & HTTP POST to PC :14201
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3">
              <svg
                width="70"
                height="80"
                viewBox="0 0 100 120"
                className="stroke-cyan-400 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round shrink-0"
              >
                <circle cx="50" cy="24" r="14" className="fill-cyan-950/40" />
                <line x1="50" y1="38" x2="50" y2="76" />
                {/* Clicking toolbar popup */}
                <line x1="50" y1="48" x2="76" y2="44" />
                <line x1="50" y1="48" x2="28" y2="60" />
                <line x1="50" y1="76" x2="35" y2="110" />
                <line x1="50" y1="76" x2="65" y2="110" />
              </svg>
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  Tahap 3: Local Handshake (Port 14201)
                </span>
                <p className="text-xs text-slate-200 font-bold">
                  Stickman memasukkan Token Win+R &amp; mengirim POST :14201/sync-pass
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                  POST http://127.0.0.1:14201/sync-pass
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div className="text-[10px] font-mono">
                <div className="text-emerald-400 font-bold">Handshake 200 OK</div>
                <div className="text-slate-400">Data Stored in RAM</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-lg">
      {platform === 'pc' && renderPCVisual()}
      {platform === 'android' && renderAndroidVisual()}
      {platform === 'extension' && renderExtensionVisual()}
    </div>
  );
};

