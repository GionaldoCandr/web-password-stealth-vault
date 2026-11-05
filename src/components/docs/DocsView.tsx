'use client';

import React from 'react';
import {
  Monitor,
  Smartphone,
  Puzzle,
  Download,
  Database,
  Lock,
  Cpu,
  CheckCircle2,
  QrCode,
} from 'lucide-react';
import { StickmanDocsLauncher } from '@/components/stickman/StickmanDocsLauncher';
import { StickmanStepIllustrator } from '@/components/stickman/StickmanStepIllustrator';
import { useSandboxStore } from '@/stores/useSandboxStore';

export const DocsView: React.FC = () => {
  const {
    activePlatformGuide,
    setPlatformGuide,
    activeGuideStep,
    setGuideStep,
    winRunInput,
    setWinRunInput,
    handleRunSubmit,
    runLaunched,
    masterInput,
    setMasterInput,
    handleMasterPassUnlock,
    isLocked,
    formError,
    ramVault,
  } = useSandboxStore();

  const handleRunFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRunSubmit();
  };

  const handleUnlockFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleMasterPassUnlock();
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full p-6 sm:p-8 space-y-6 overflow-y-auto">
      {/* Stickman Win+R Launcher Animation Header */}
      <StickmanDocsLauncher />

      <div className="flex flex-col md:flex-row gap-8">
      {/* Left Navigation */}
      <aside className="w-full md:w-80 space-y-6 shrink-0">
        <div className="space-y-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-cyan-500 mb-3 flex items-center gap-2">
            <Monitor className="w-4 h-4" /> Pilih Platform Guide
          </h3>
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setPlatformGuide('pc')}
              className={`py-2 text-[11px] font-bold rounded-lg transition flex flex-col items-center gap-1 cursor-pointer ${
                activePlatformGuide === 'pc' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> PC
            </button>
            <button
              onClick={() => setPlatformGuide('android')}
              className={`py-2 text-[11px] font-bold rounded-lg transition flex flex-col items-center gap-1 cursor-pointer ${
                activePlatformGuide === 'android' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Android
            </button>
            <button
              onClick={() => setPlatformGuide('extension')}
              className={`py-2 text-[11px] font-bold rounded-lg transition flex flex-col items-center gap-1 cursor-pointer ${
                activePlatformGuide === 'extension' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5" /> Extension
            </button>
          </div>
        </div>

        {/* Step Navigation per Platform */}
        <div className="space-y-2">
          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            Tahapan Alur Penggunaan
          </h4>
          {activePlatformGuide === 'pc' &&
            [
              { step: 1, title: '1. Installation & Registry Setup', desc: 'Install & daftarkan alias `mypass`' },
              { step: 2, title: '2. Win + R Stealth Launch', desc: 'Eksekusi rahasia via Windows Run' },
              { step: 3, title: '3. Master Key Authentication', desc: 'Otentikasi & Dekripsi RAM Vault' },
              { step: 4, title: '4. Memory Vault Management', desc: 'Pengelolaan Kredensial di RAM' },
            ].map((s) => (
              <button
                key={s.step}
                onClick={() => setGuideStep(s.step)}
                className={`w-full text-left p-3 rounded-2xl border transition flex flex-col gap-1 cursor-pointer ${
                  activeGuideStep === s.step
                    ? 'bg-blue-900/30 border-cyan-400 text-cyan-300 shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                }`}
              >
                <span className="text-xs font-bold text-slate-200">{s.title}</span>
                <span className="text-[10px] opacity-80">{s.desc}</span>
              </button>
            ))}

          {activePlatformGuide === 'android' &&
            [
              { step: 1, title: '1. APK Installation & Permissions', desc: 'Instalasi file APK Android & Kamera' },
              { step: 2, title: '2. QR Code P2P Pairing', desc: 'Memindai QR Code PC untuk Pairing' },
              { step: 3, title: '3. Two-Way CRDT Data Sync', desc: 'Penggabungan kredensial otomatis' },
            ].map((s) => (
              <button
                key={s.step}
                onClick={() => setGuideStep(s.step)}
                className={`w-full text-left p-3 rounded-2xl border transition flex flex-col gap-1 cursor-pointer ${
                  activeGuideStep === s.step
                    ? 'bg-blue-900/30 border-cyan-400 text-cyan-300 shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                }`}
              >
                <span className="text-xs font-bold text-slate-200">{s.title}</span>
                <span className="text-[10px] opacity-80">{s.desc}</span>
              </button>
            ))}

          {activePlatformGuide === 'extension' &&
            [
              { step: 1, title: '1. Extension Installation & Grant', desc: 'Muat Unpacked Extension Browser' },
              { step: 2, title: '2. DOM Parsing & Input Detection', desc: 'Deteksi otomatis elemen password' },
              { step: 3, title: '3. Secure Injected Autofill', desc: 'Pengisian kredensial dari RAM PC' },
            ].map((s) => (
              <button
                key={s.step}
                onClick={() => setGuideStep(s.step)}
                className={`w-full text-left p-3 rounded-2xl border transition flex flex-col gap-1 cursor-pointer ${
                  activeGuideStep === s.step
                    ? 'bg-blue-900/30 border-cyan-400 text-cyan-300 shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                }`}
              >
                <span className="text-xs font-bold text-slate-200">{s.title}</span>
                <span className="text-[10px] opacity-80">{s.desc}</span>
              </button>
            ))}
        </div>
      </aside>

      {/* Right Interactive Workspace */}
      <article className="flex-1 space-y-6">
        {/* Dynamic Step Stickman Illustration */}
        <StickmanStepIllustrator platform={activePlatformGuide} step={activeGuideStep} />

        {/* PC GUIDE CONTENT WITH GRAPHICS */}
        {activePlatformGuide === 'pc' && (
          <>
            {activeGuideStep === 1 && (
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                    <Download className="w-5 h-5" /> 1. Instalasi & Registrasi Alias Windows
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Saat smart installer dijalankan, aplikasi mendaftarkan kunci Registry Windows pada path{' '}
                    <code className="text-cyan-300 font-mono">
                      HKCU\Software\Microsoft\Windows\CurrentVersion\App Paths\mypass.exe
                    </code>
                    .
                  </p>
                </div>

                {/* Graphic Visual Representation of Registry */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
                    <Database className="w-4 h-4 text-cyan-400" /> Windows Registry Editor Visualizer
                  </div>
                  <div className="font-mono text-xs space-y-1 text-slate-400">
                    <p className="text-slate-500">📁 HKEY_CURRENT_USER</p>
                    <p className="pl-4 text-slate-500">📁 Software \ Microsoft \ Windows \ CurrentVersion</p>
                    <p className="pl-8 text-cyan-400 font-bold">📁 App Paths \ mypass.exe</p>
                    <p className="pl-12 text-slate-300">
                      └── (Default) = &quot;%LOCALAPPDATA%\Microsoft\SystemCache\win_service_host.exe&quot;
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-2xl text-xs text-slate-300 space-y-1">
                  <p className="font-bold text-cyan-300">Mekanisme Anti-Forensik:</p>
                  <p className="text-slate-400 leading-relaxed">
                    Installer mengekstrak biner payload ke folder cache sistem, mendaftarkan alias ke registry, lalu
                    otomatis menghapus dirinya sendiri dari memori disk.
                  </p>
                </div>
              </div>
            )}

            {activeGuideStep === 2 && (
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
                    <Monitor className="w-5 h-5" /> 2. Windows Run Stealth Launch (<code>Win + R</code>)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Tekan kombinasi tombol <code>Win + R</code>, ketik{' '}
                    <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-400 font-mono">mypass</code> lalu
                    tekan Enter.
                  </p>
                </div>

                {/* Interactive Win + R Simulator Window */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-2xl max-w-md mx-auto space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Monitor className="w-3.5 h-3.5 text-cyan-400" /> Windows Run Dialog Simulator
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Win + R</span>
                  </div>

                  <form onSubmit={handleRunFormSubmit} className="space-y-3">
                    <p className="text-[11px] text-slate-400">
                      Ketik nama program <code className="text-cyan-400 font-mono">mypass</code> untuk membukanya:
                    </p>
                    <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 border border-slate-700 rounded-xl">
                      <span className="text-xs text-slate-400 font-mono font-bold">Open:</span>
                      <input
                        type="text"
                        value={winRunInput}
                        onChange={(e) => setWinRunInput(e.target.value)}
                        placeholder="mypass"
                        className="bg-transparent text-xs text-cyan-300 font-mono outline-none flex-1 placeholder:text-slate-600"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition cursor-pointer"
                      >
                        OK (Enter)
                      </button>
                    </div>
                  </form>

                  {runLaunched && (
                    <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-center space-y-1">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mx-auto" />
                      <p className="text-xs font-bold text-cyan-300">Registry Alias &quot;mypass&quot; Cocok!</p>
                      <p className="text-[10px] text-slate-400">
                        Aplikasi memuat proses ke RAM. Lanjut ke Langkah 3 untuk membuka Master Key.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeGuideStep === 3 && (
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                    <Lock className="w-5 h-5" /> 3. Master Key Authentication & Zod Validation
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Masukkan Master Password untuk menurunkan kunci dekripsi AES-256-GCM ke RAM.
                  </p>
                </div>

                {/* Auth Form Simulator */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 max-w-md mx-auto space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                      <Lock className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">Unlock Master Vault</h4>
                      <p className="text-[10px] text-slate-400">Gunakan password bawaan: &quot;Stealth@2026&quot;</p>
                    </div>
                  </div>

                  <form onSubmit={handleUnlockFormSubmit} className="space-y-3">
                    <input
                      type="password"
                      placeholder="Stealth@2026"
                      value={masterInput}
                      onChange={(e) => setMasterInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-400"
                    />
                    {formError && <p className="text-[10px] text-rose-400">{formError}</p>}
                    <button
                      type="submit"
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                    >
                      Buka Vault
                    </button>
                  </form>

                  {!isLocked && (
                    <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-center space-y-1">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mx-auto" />
                      <p className="text-xs font-bold text-cyan-300">Vault Terbuka di RAM!</p>
                      <p className="text-[10px] text-slate-400">Kredensial siap digunakan di Langkah 4.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeGuideStep === 4 && (
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
                <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                  <Cpu className="w-5 h-5" /> 4. Pengelolaan Kredensial di Memory Volatile (RAM)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Seluruh item terdekripsi hanya ditempatkan pada RAM. Ketika proses ditutup, seluruh memori di-zeroize.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ramVault.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-2 shadow-lg hover:border-cyan-500/50 hover:bg-slate-900/60 transition cursor-pointer"
                    >
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>{item.memoryAddress}</span>
                        <span className="text-cyan-400 font-bold">AES-GCM-256</span>
                      </div>
                      <div className="text-slate-100 font-bold">{item.service}</div>
                      <div className="text-[11px] text-slate-400">{item.username}</div>
                      <div className="text-[10px] text-cyan-400 tracking-wider pt-1">{item.encryptedSecret}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ANDROID MOBILE GRAPHIC GUIDE */}
        {activePlatformGuide === 'android' && (
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-cyan-400" />
              <div>
                <h3 className="text-base font-bold text-slate-100">Android P2P Local Sync Guide</h3>
                <p className="text-xs text-slate-400">Mekanisme pemindaian QR Code dan sinkronisasi Wi-Fi lokal port 14202</p>
              </div>
            </div>

            {/* Graphic Phone Frame Simulator */}
            <div className="w-64 mx-auto bg-slate-950 border-4 border-slate-800 rounded-[36px] p-4 shadow-2xl relative space-y-4">
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto" />
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center space-y-3">
                <QrCode className="w-16 h-16 text-cyan-400 mx-auto" />
                <p className="text-xs font-bold text-slate-200">Scan QR Code PC Target</p>
                <p className="text-[10px] text-slate-500 font-mono">http://192.168.1.100:14202</p>
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-[10px] text-cyan-300 font-bold">
                  P2P Pairing Active
                </div>
              </div>
              <div className="w-12 h-1 bg-slate-800 rounded-full mx-auto" />
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-cyan-400">Algoritma CRDT Last-Write-Wins (LWW):</h4>
              <p className="text-slate-400 leading-relaxed">
                Ketika Android dan PC terhubung, keduanya membandingkan timestamp milidetik (<code className="text-cyan-300 font-mono">updated_at</code>).
                Entri yang lebih baru secara otomatis menimpa entri lama tanpa menimbulkan konflik dan tanpa butuh koneksi internet.
              </p>
            </div>
          </div>
        )}

        {/* BROWSER EXTENSION GRAPHIC GUIDE */}
        {activePlatformGuide === 'extension' && (
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
            <div className="flex items-center gap-3">
              <Puzzle className="w-6 h-6 text-indigo-400" />
              <div>
                <h3 className="text-base font-bold text-slate-100">Browser Extension DOM Autofill Guide</h3>
                <p className="text-xs text-slate-400">Mekanisme Content Script memindai formulir login web</p>
              </div>
            </div>

            {/* Graphic Browser Mockup */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl space-y-3">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="bg-slate-950 px-3 py-1 rounded-lg text-[10px] font-mono text-slate-400 flex-1 text-center">
                  https://github.com/login
                </div>
              </div>

              <div className="p-6 space-y-4 max-w-sm mx-auto">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold">Username</label>
                  <input
                    type="text"
                    value="gio-stealth"
                    readOnly
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200"
                  />
                </div>
                <div className="space-y-1 relative">
                  <label className="text-[10px] text-slate-400 font-bold">Password</label>
                  <input
                    type="password"
                    value="••••••••••••"
                    readOnly
                    className="w-full bg-slate-900 border border-cyan-500/60 rounded-lg p-2 text-xs text-cyan-300 font-mono"
                  />
                  <div className="absolute right-2 top-6 px-2 py-0.5 bg-cyan-500 text-slate-950 font-bold text-[9px] rounded shadow">
                    Autofilled from RAM
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-cyan-400">Zero Cloud Extension Bridge:</h4>
              <p className="text-slate-400 leading-relaxed">
                Browser extension mengirim payload kredensial langsung ke local HTTP listener PC pada port{' '}
                <code className="text-cyan-300 font-mono">127.0.0.1:14201/sync-pass</code> dengan verifikasi token Win+R &
                Master Password.
              </p>
            </div>
          </div>
        )}
      </article>
      </div>
    </div>
  );
};

