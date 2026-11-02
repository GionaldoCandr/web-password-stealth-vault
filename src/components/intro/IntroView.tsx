'use client';

import React from 'react';
import { AlertTriangle, XCircle, Shield, CheckCircle } from 'lucide-react';
import { StickmanIntroThreat } from '@/components/stickman/StickmanIntroThreat';
import { useSandboxStore } from '@/stores/useSandboxStore';

export const IntroView: React.FC = () => {
  const { themeMode } = useSandboxStore();
  const isLight = themeMode === 'light';

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full p-6 sm:p-8 overflow-y-auto space-y-10">
      {/* Intro Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">
          Security Threat Analysis
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Mengapa Harus Pindah dari Penyimpanan Password Tradisional?
        </h2>
        <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Simulasi visual di bawah menggambarkan ancaman nyata saat kredensial diletakkan secara sembarangan di catatan
          fisik, text file, atau browser database.
        </p>
      </div>

      {/* ENHANCED INTERACTIVE STICKMAN THREAT SIMULATOR */}
      <StickmanIntroThreat />

      {/* Side-by-side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insecure Storage Risk */}
        <div className="bg-rose-950/20 border border-rose-500/30 p-6 rounded-3xl space-y-5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-rose-300">Resiko Metode Biasa</h3>
              <p className="text-xs text-rose-400/80">Sticky Notes &amp; Browser Storage</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-rose-900/40 flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-300 block mb-0.5">Penyimpanan Terbuka di Disk</strong>
                <span className="text-slate-400 leading-relaxed text-[11px]">
                  Dapat dicuri oleh peretas fisik atau malware lokal (Lumma, RedLine) dalam hitungan detik via path file standar.
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-rose-900/40 flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-300 block mb-0.5">Ketergantungan Server Cloud</strong>
                <span className="text-slate-400 leading-relaxed text-[11px]">
                  Rentan terkena dampak kebocoran server pusat (data breach) pihak ketiga di luar kendali kita.
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-rose-900/40 flex items-start gap-2.5">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-300 block mb-0.5">Jejak Digital Forensik Abadi</strong>
                <span className="text-slate-400 leading-relaxed text-[11px]">
                  File teks yang dihapus dari Recycle Bin masih dapat dipulihkan dengan alat data recovery karena sektor disk tidak di-zeroize.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stealth Vault Security */}
        <div className="bg-cyan-950/20 border border-cyan-500/30 p-6 rounded-3xl space-y-5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-2xl border border-cyan-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-cyan-300">Keunggulan Stealth Vault</h3>
              <p className="text-xs text-cyan-400/80">Volatile Memory &amp; Zero Persistent Storage</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-cyan-900/40 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-300 block mb-0.5">100% Volatile RAM Execution</strong>
                <span className="text-slate-400 leading-relaxed text-[11px]">
                  Kredensial didekripsi hanya di memori RAM. Begitu proses ditutup, seluruh blok memori langsung di-zeroize sempurna.
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-cyan-900/40 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-300 block mb-0.5">Enkripsi GCM Berotentikasi (AEAD)</strong>
                <span className="text-slate-400 leading-relaxed text-[11px]">
                  Data diproteksi dengan kunci AES-256 dan tag integritas 128-bit yang menolak tampering payload seketika.
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-cyan-900/40 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-300 block mb-0.5">Sinkronisasi P2P Langsung Lokal</strong>
                <span className="text-slate-400 leading-relaxed text-[11px]">
                  Sinkronisasi antar PC dan Android menggunakan jaringan lokal port 14202 tanpa melewati cloud server mana pun.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
