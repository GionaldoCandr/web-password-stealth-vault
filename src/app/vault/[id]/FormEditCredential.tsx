"use client";

import React, { useActionState } from "react";
import { ubahCredential, type StatusAksi } from "../actions";
import { Edit3, CheckCircle2, AlertTriangle, KeyRound, Globe, User, Tag, ShieldCheck } from "lucide-react";

interface FormEditCredentialProps {
  credential: {
    id: number;
    service: string;
    category: string;
    username: string;
    encryptedSecret: string;
    isActive: boolean;
    notes: string | null;
  };
}

export const FormEditCredential: React.FC<FormEditCredentialProps> = ({ credential }) => {
  const ubahDenganId = ubahCredential.bind(null, credential.id);
  const [state, formAction, isPending] = useActionState<StatusAksi, FormData>(
    ubahDenganId,
    {}
  );

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
          <Edit3 className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Perbarui Kredensial #{credential.id}</h2>
          <p className="text-xs text-slate-400">
            Perbarui data akun di database PostgreSQL dengan Server Action &amp; Zod
          </p>
        </div>
      </div>

      {/* Notifikasi Global */}
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
        {/* Kolom Service */}
        <div>
          <label htmlFor="service" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            Nama Layanan / Domain Web <span className="text-red-400">*</span>
          </label>
          <input
            id="service"
            name="service"
            type="text"
            defaultValue={credential.service}
            className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
              state.galat?.service
                ? "border-red-500/60 focus:ring-red-500/40"
                : "border-slate-800 focus:ring-amber-500/40 focus:border-amber-500/40"
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
              defaultValue={credential.category}
              className={`w-full px-3 py-2.5 bg-slate-950 border rounded-xl text-xs text-white focus:outline-none focus:ring-2 transition ${
                state.galat?.category
                  ? "border-red-500/60 focus:ring-red-500/40"
                  : "border-slate-800 focus:ring-amber-500/40 focus:border-amber-500/40"
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
              Identitas Akun / Username <span className="text-red-400">*</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={credential.username}
              className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
                state.galat?.username
                  ? "border-red-500/60 focus:ring-red-500/40"
                  : "border-slate-800 focus:ring-amber-500/40 focus:border-amber-500/40"
              }`}
            />
            {state.galat?.username && (
              <p className="mt-1.5 text-[11px] text-red-400">{state.galat.username[0]}</p>
            )}
          </div>
        </div>

        {/* Encrypted Secret Ciphertext */}
        <div>
          <label htmlFor="encryptedSecret" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
            Ciphertext Rahasia (Hex / Base64) <span className="text-red-400">*</span>
          </label>
          <input
            id="encryptedSecret"
            name="encryptedSecret"
            type="text"
            defaultValue={credential.encryptedSecret}
            className={`w-full px-3.5 py-2.5 bg-slate-950 border font-mono text-xs text-cyan-300 placeholder-slate-600 focus:outline-none focus:ring-2 transition ${
              state.galat?.encryptedSecret
                ? "border-red-500/60 focus:ring-red-500/40"
                : "border-slate-800 focus:ring-amber-500/40 focus:border-amber-500/40"
            }`}
          />
          {state.galat?.encryptedSecret && (
            <p className="mt-1.5 text-[11px] text-red-400">{state.galat.encryptedSecret[0]}</p>
          )}
        </div>

        {/* Catatan / Notes */}
        <div>
          <label htmlFor="notes" className="block text-xs font-semibold text-slate-300 mb-1.5">
            Catatan Tambahan (Opsional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={2}
            defaultValue={credential.notes || ""}
            className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition resize-none ${
              state.galat?.notes
                ? "border-red-500/60 focus:ring-red-500/40"
                : "border-slate-800 focus:ring-amber-500/40 focus:border-amber-500/40"
            }`}
          />
          {state.galat?.notes && (
            <p className="mt-1.5 text-[11px] text-red-400">{state.galat.notes[0]}</p>
          )}
        </div>

        {/* Checkbox Status Aktif */}
        <div className="flex items-center gap-3 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
          <input
            id="isActive"
            name="isActive"
            type="checkbox"
            defaultChecked={credential.isActive}
            value="true"
            className="w-4 h-4 text-amber-500 bg-slate-900 border-slate-700 rounded focus:ring-amber-500/40 focus:ring-2"
          />
          <label htmlFor="isActive" className="text-xs text-slate-300 cursor-pointer select-none">
            <span className="font-semibold text-white">Status Aktif Brankas</span>
            <span className="block text-[11px] text-slate-500">
              Kredensial dapat didekripsi dan digunakan oleh instansi lokal
            </span>
          </label>
        </div>

        {/* Tombol Simpan Perubahan */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-950/40 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Memproses Perubahan ke PostgreSQL...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Simpan Perubahan Kredensial</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
