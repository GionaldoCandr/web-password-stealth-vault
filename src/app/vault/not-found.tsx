import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function VaultNotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
        <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Kredensial Tidak Ditemukan</h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Kredensial dengan pengenal (ID) yang diminta tidak ditemukan di database PostgreSQL atau mungkin telah dihapus.
        </p>
        <Link
          href="/vault"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-xl transition shadow-lg shadow-cyan-950/40"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Brankas Vault</span>
        </Link>
      </div>
    </div>
  );
}
