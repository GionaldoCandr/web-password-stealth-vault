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
        <span className={`text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${
          isLight
            ? 'bg-cyan-100 border border-cyan-300 text-cyan-800'
            : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
        }`}>
          Security Threat Analysis
        </span>
        <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
          isLight ? 'text-slate-900' : 'text-slate-100'
        }`}>
          Mengapa Harus Pindah dari Penyimpanan Password Tradisional?
        </h2>
        <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600 font-normal' : 'text-slate-400'}`}>
          Simulasi visual di bawah menggambarkan ancaman nyata saat kredensial diletakkan secara sembarangan di catatan
          fisik, text file, atau browser database.
        </p>
      </div>

      {/* ENHANCED INTERACTIVE STICKMAN THREAT SIMULATOR */}
      <StickmanIntroThreat />

      {/* Side-by-side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insecure Storage Risk */}
        <div className={`p-6 rounded-3xl space-y-5 backdrop-blur-xl border transition ${
          isLight
            ? 'bg-rose-50/70 border-rose-200/80 shadow-sm'
            : 'bg-rose-950/20 border border-rose-500/30'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl border ${
              isLight
                ? 'bg-rose-100 text-rose-700 border-rose-200'
                : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isLight ? 'text-rose-900' : 'text-rose-300'}`}>
                Resiko Metode Biasa
              </h3>
              <p className={`text-xs ${isLight ? 'text-rose-700' : 'text-rose-400/80'}`}>
                Sticky Notes &amp; Browser Storage
              </p>
            </div>
          </div>

          <div className={`space-y-3 text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 transition ${
              isLight
                ? 'bg-white border-rose-200/60 shadow-xs'
                : 'bg-slate-900/80 border-rose-900/40 shadow-md'
            }`}>
              <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className={`block mb-0.5 ${isLight ? 'text-rose-900' : 'text-rose-300'}`}>
                  Penyimpanan Terbuka di Disk
                </strong>
                <span className={`leading-relaxed text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Dapat dicuri oleh peretas fisik atau malware lokal (Lumma, RedLine) dalam hitungan detik via path file standar.
                </span>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 transition ${
              isLight
                ? 'bg-white border-rose-200/60 shadow-xs'
                : 'bg-slate-900/80 border-rose-900/40 shadow-md'
            }`}>
              <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className={`block mb-0.5 ${isLight ? 'text-rose-900' : 'text-rose-300'}`}>
                  Ketergantungan Server Cloud
                </strong>
                <span className={`leading-relaxed text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Rentan terkena dampak kebocoran server pusat (data breach) pihak ketiga di luar kendali kita.
                </span>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 transition ${
              isLight
                ? 'bg-white border-rose-200/60 shadow-xs'
                : 'bg-slate-900/80 border-rose-900/40 shadow-md'
            }`}>
              <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className={`block mb-0.5 ${isLight ? 'text-rose-900' : 'text-rose-300'}`}>
                  Jejak Digital Forensik Abadi
                </strong>
                <span className={`leading-relaxed text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  File teks yang dihapus dari Recycle Bin masih dapat dipulihkan dengan alat data recovery karena sektor disk tidak di-zeroize.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stealth Vault Security */}
        <div className={`p-6 rounded-3xl space-y-5 backdrop-blur-xl border transition ${
          isLight
            ? 'bg-cyan-50/70 border-cyan-200/80 shadow-sm'
            : 'bg-cyan-950/20 border-cyan-500/30'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl border ${
              isLight
                ? 'bg-cyan-100 text-cyan-700 border-cyan-200'
                : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
            }`}>
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isLight ? 'text-cyan-900' : 'text-cyan-300'}`}>
                Keunggulan Stealth Vault
              </h3>
              <p className={`text-xs ${isLight ? 'text-cyan-700' : 'text-cyan-400/80'}`}>
                Volatile Memory &amp; Zero Persistent Storage
              </p>
            </div>
          </div>

          <div className={`space-y-3 text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 transition ${
              isLight
                ? 'bg-white border-cyan-200/60 shadow-xs'
                : 'bg-slate-900/80 border-cyan-900/40 shadow-md'
            }`}>
              <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`} />
              <div>
                <strong className={`block mb-0.5 ${isLight ? 'text-cyan-900' : 'text-cyan-300'}`}>
                  100% Volatile RAM Execution
                </strong>
                <span className={`leading-relaxed text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Kredensial didekripsi hanya di memori RAM. Begitu proses ditutup, seluruh blok memori langsung di-zeroize sempurna.
                </span>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 transition ${
              isLight
                ? 'bg-white border-cyan-200/60 shadow-xs'
                : 'bg-slate-900/80 border-cyan-900/40 shadow-md'
            }`}>
              <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`} />
              <div>
                <strong className={`block mb-0.5 ${isLight ? 'text-cyan-900' : 'text-cyan-300'}`}>
                  Enkripsi GCM Berotentikasi (AEAD)
                </strong>
                <span className={`leading-relaxed text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Data diproteksi dengan kunci AES-256 dan tag integritas 128-bit yang menolak tampering payload seketika.
                </span>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 transition ${
              isLight
                ? 'bg-white border-cyan-200/60 shadow-xs'
                : 'bg-slate-900/80 border-cyan-900/40 shadow-md'
            }`}>
              <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`} />
              <div>
                <strong className={`block mb-0.5 ${isLight ? 'text-cyan-900' : 'text-cyan-300'}`}>
                  Sinkronisasi P2P Langsung Lokal
                </strong>
                <span className={`leading-relaxed text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
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
