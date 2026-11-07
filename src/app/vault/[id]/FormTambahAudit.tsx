"use client";

import React, { useActionState } from "react";
import { tambahAuditLog, type StatusAksi } from "../actions";
import { PlusCircle, CheckCircle2, AlertTriangle, ShieldAlert, Laptop, Star, FileText } from "lucide-react";

interface FormTambahAuditProps {
  credentialId: number;
}

export const FormTambahAudit: React.FC<FormTambahAuditProps> = ({ credentialId }) => {
  const tambahLogDenganId = tambahAuditLog.bind(null, credentialId);
  const [state, formAction, isPending] = useActionState<StatusAksi, FormData>(
    tambahLogDenganId,
    {}
  );

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
          <PlusCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Catat Log Audit Keamanan</h3>
          <p className="text-xs text-slate-400">
            Relasi 1:N — Tambah entri inspeksi perangkat lokal pada kredensial ini
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Kolom Perangkat / Device ID */}
          <div>
            <label htmlFor="deviceId" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-blue-400" />
              ID Perangkat / Device ID <span className="text-red-400">*</span>
            </label>
            <input
              id="deviceId"
              name="deviceId"
              type="text"
              placeholder="Contoh: PC-STEALTH-PRO-02"
              className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
                state.galat?.deviceId
                  ? "border-red-500/60 focus:ring-red-500/40"
                  : "border-slate-800 focus:ring-blue-500/40 focus:border-blue-500/40"
              }`}
            />
            {state.galat?.deviceId && (
              <p className="mt-1.5 text-[11px] text-red-400">{state.galat.deviceId[0]}</p>
            )}
          </div>

          {/* Kolom Aksi Audit */}
          <div>
            <label htmlFor="action" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
              Tindakan / Aksi Audit <span className="text-red-400">*</span>
            </label>
            <select
              id="action"
              name="action"
              defaultValue="INSPECTION_SCAN"
              className={`w-full px-3 py-2.5 bg-slate-950 border rounded-xl text-xs text-white focus:outline-none focus:ring-2 transition ${
                state.galat?.action
                  ? "border-red-500/60 focus:ring-red-500/40"
                  : "border-slate-800 focus:ring-blue-500/40 focus:border-blue-500/40"
              }`}
            >
              <option value="INSPECTION_SCAN">INSPECTION_SCAN — Audit Integritas</option>
              <option value="KEY_ROTATION">KEY_ROTATION — Rotasi Kunci Enkripsi</option>
              <option value="ACCESS_CHECK">ACCESS_CHECK — Verifikasi Akses Memori</option>
              <option value="POLICY_AUDIT">POLICY_AUDIT — Evaluasi Kepatuhan Sandi</option>
            </select>
            {state.galat?.action && (
              <p className="mt-1.5 text-[11px] text-red-400">{state.galat.action[0]}</p>
            )}
          </div>
        </div>

        {/* Skor Keamanan (1 - 5) */}
        <div>
          <label htmlFor="securityRate" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            Skor Keamanan / Security Rate (1-5) <span className="text-red-400">*</span>
          </label>
          <div className="flex items-center gap-4">
            <select
              id="securityRate"
              name="securityRate"
              defaultValue="5"
              className={`w-36 px-3 py-2.5 bg-slate-950 border rounded-xl text-xs text-white focus:outline-none focus:ring-2 transition ${
                state.galat?.securityRate
                  ? "border-red-500/60 focus:ring-red-500/40"
                  : "border-slate-800 focus:ring-blue-500/40 focus:border-blue-500/40"
              }`}
            >
              <option value="5">⭐⭐⭐⭐⭐ 5 (Sangat Kuat)</option>
              <option value="4">⭐⭐⭐⭐ 4 (Kuat)</option>
              <option value="3">⭐⭐⭐ 3 (Cukup)</option>
              <option value="2">⭐⭐ 2 (Rentan)</option>
              <option value="1">⭐ 1 (Kritis / Bahaya)</option>
            </select>
            <span className="text-[11px] text-slate-400">
              Penilaian postur keamanan kredensial saat diinspeksi oleh perangkat bersangkutan.
            </span>
          </div>
          {state.galat?.securityRate && (
            <p className="mt-1.5 text-[11px] text-red-400">{state.galat.securityRate[0]}</p>
          )}
        </div>

        {/* Rincian Hasil Audit */}
        <div>
          <label htmlFor="details" className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            Rincian Temuan / Bukti Enkripsi <span className="text-red-400">*</span>
          </label>
          <textarea
            id="details"
            name="details"
            rows={3}
            placeholder="Deskripsikan hasil pengujian atau status cipher AES-GCM (minimal 5 karakter)..."
            className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition resize-none ${
              state.galat?.details
                ? "border-red-500/60 focus:ring-red-500/40"
                : "border-slate-800 focus:ring-blue-500/40 focus:border-blue-500/40"
            }`}
          />
          {state.galat?.details && (
            <p className="mt-1.5 text-[11px] text-red-400">{state.galat.details[0]}</p>
          )}
        </div>

        {/* Tombol Simpan Audit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-950/40 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Menyimpan Rekam Jejak Audit...</span>
            </>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4" />
              <span>Tambahkan Log Audit ke Database</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
