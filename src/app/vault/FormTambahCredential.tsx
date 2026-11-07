"use client";

import React, { useActionState } from "react";
import { tambahCredential, type StatusAksi } from "./actions";
import { PlusCircle, Shield, CheckCircle2, AlertTriangle, KeyRound, Globe, User, Tag } from "lucide-react";

export const FormTambahCredential: React.FC = () => {
  const [state, formAction, isPending] = useActionState<StatusAksi, FormData>(
    tambahCredential,
    {}
  );

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl">
          <PlusCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Tambah Kredensial Baru</h2>
          <p className="text-xs text-slate-400">
            Simpan akun terenkripsi ke database PostgreSQL dengan validasi Zod di sisi server
          </p>
        </div>
      </div>

      {/* Pesan Sukses / Galat Global */}
      {state.pesan && (
        <div
          role="alert"
          className={`mb-5 p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
            state.sukses
              ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
              : "bg-red-950/40 border-red-500/30 text-red-300"
          }`}
        >
          {state.sukses ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
          )}
          <div>
            <p className="font-semibold">{state.pesan}</p>
          </div>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        {/* Kolom Service / Domain */}
        <div>
          <label htmlFor="service" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            Nama Layanan / Domain Web <span className="text-red-400">*</span>
          </label>
          <input
            id="service"
            name="service"
            type="text"
            placeholder="misal: gitlab.com atau portal.kampus.ac.id"
            className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
              state.galat?.service
                ? "border-red-500/60 focus:ring-red-500/40"
                : "border-slate-800 focus:ring-cyan-500/40 focus:border-cyan-500/40"
            }`}
          />
          {state.galat?.service && (
            <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1">
              <span>⚠️</span> {state.galat.service[0]}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Kategori */}
          <div>
            <label htmlFor="category" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              Kategori Vault <span className="text-red-400">*</span>
            </label>
            <select
              id="category"
              name="category"
              defaultValue="campus"
              className={`w-full px-3 py-2.5 bg-slate-950 border rounded-xl text-xs text-white focus:outline-none focus:ring-2 transition ${
                state.galat?.category
                  ? "border-red-500/60 focus:ring-red-500/40"
                  : "border-slate-800 focus:ring-cyan-500/40 focus:border-cyan-500/40"
              }`}
            >
              <option value="campus">Kampus / Akademik</option>
              <option value="finance">Finansial / Perbankan</option>
              <option value="work">Pekerjaan / Proyek</option>
              <option value="social">Media Sosial</option>
            </select>
            {state.galat?.category && (
              <p className="mt-1.5 text-[11px] text-red-400">{state.galat.category[0]}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              Username / Akun Pengguna <span className="text-red-400">*</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="misal: dev_admin_stealth"
              className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
                state.galat?.username
                  ? "border-red-500/60 focus:ring-red-500/40"
                  : "border-slate-800 focus:ring-cyan-500/40 focus:border-cyan-500/40"
              }`}
            />
            {state.galat?.username && (
              <p className="mt-1.5 text-[11px] text-red-400">{state.galat.username[0]}</p>
            )}
          </div>
        </div>

        {/* Encrypted Secret / Password Ciphertext */}
        <div>
          <label htmlFor="encryptedSecret" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
            Ciphertext AES-GCM (Secret Terenkripsi) <span className="text-red-400">*</span>
          </label>
          <input
            id="encryptedSecret"
            name="encryptedSecret"
            type="text"
            defaultValue="U2FsdGVkX19zZWNyZXQtc3RlYWx0aC12YXVsdC1rZXk="
            placeholder="Ciphertext minimal 8 karakter..."
            className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs font-mono text-cyan-300 placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
              state.galat?.encryptedSecret
                ? "border-red-500/60 focus:ring-red-500/40"
                : "border-slate-800 focus:ring-cyan-500/40 focus:border-cyan-500/40"
            }`}
          />
          {state.galat?.encryptedSecret && (
            <p className="mt-1.5 text-[11px] text-red-400">{state.galat.encryptedSecret[0]}</p>
          )}
        </div>

        {/* Status Ketersediaan / Aktif */}
        <div className="flex items-center gap-3 pt-1">
          <input
            id="isActive"
            name="isActive"
            type="checkbox"
            defaultChecked={true}
            value="true"
            className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500/40 cursor-pointer"
          />
          <label htmlFor="isActive" className="text-xs text-slate-300 cursor-pointer select-none">
            Aktifkan kredensial ini di brankas (*Active in Vault*)
          </label>
        </div>

        {/* Catatan Pemulihan */}
        <div>
          <label htmlFor="notes" className="block text-xs font-semibold text-slate-300 mb-1.5">
            Catatan Pemulihan / Notes (Opsional)
          </label>
          <input
            id="notes"
            name="notes"
            type="text"
            placeholder="misal: Akun autentikasi dua faktor via FIDO2 token"
            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40"
          />
        </div>

        {/* Tombol Simpan */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Menyimpan ke PostgreSQL...</span>
            </>
          ) : (
            <>
              <Shield className="w-3.5 h-3.5" />
              <span>Simpan Kredensial ke Brankas</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
