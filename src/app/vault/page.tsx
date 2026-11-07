import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FormTambahCredential } from "./FormTambahCredential";
import { hapusCredential } from "./actions";
import {
  Shield,
  KeyRound,
  ExternalLink,
  Trash2,
  Lock,
  History,
  Activity,
  ArrowLeft,
  Database,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Brankas Kredensial Persisten (Milestone 2) - Stealth Vault",
  description: "Pengelolaan data akun kredensial terenkripsi dengan PostgreSQL dan Prisma ORM 7",
};

export default async function VaultPage() {
  // 1. READ: Ambil seluruh kredensial dari PostgreSQL beserta relasi AuditLog
  const credentials = await prisma.vaultCredential.findMany({
    include: {
      auditLogs: {
        select: {
          id: true,
          deviceId: true,
          action: true,
          securityRate: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalAuditLogs = credentials.reduce((sum, item) => sum + item.auditLogs.length, 0);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "campus":
        return { label: "Kampus", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      case "finance":
        return { label: "Finansial", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
      case "work":
        return { label: "Pekerjaan", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
      case "social":
        return { label: "Sosial", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" };
      default:
        return { label: category, color: "bg-slate-500/10 text-slate-400 border-slate-500/20" };
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg">
              <Database className="w-4 h-4" />
            </span>
            <div>
              <h1 className="text-sm font-bold text-white flex items-center gap-2">
                Brankas Persisten PostgreSQL
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                  v0.2
                </span>
              </h1>
              <p className="text-[10px] text-slate-400">
                Prisma ORM 7 · Relasi 1:N VaultCredential &amp; AuditLog · Zod Server Actions
              </p>
            </div>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs flex items-center gap-2 text-slate-300">
            <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
            <span>{credentials.length} Kredensial</span>
          </div>
          <div className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs flex items-center gap-2 text-slate-300 hidden sm:flex">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>{totalAuditLogs} Log Audit</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Banner Penjelasan Milestone 2 */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-slate-900 border border-cyan-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-xl mt-0.5">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                Milestone 2: Integrasi Logika Server &amp; Basis Data Relasional
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
                Seluruh data akun pada halaman ini disimpan secara persisten di <strong>PostgreSQL 18</strong> melalui <strong>Prisma ORM 7</strong>. Data tidak akan hilang saat halaman dimuat ulang. Setiap akun terikat dengan entitas anak <strong>AuditLog</strong> dengan aturan perlindungan <code>onDelete: Restrict</code>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <span className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-400 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              DB: Connected
            </span>
          </div>
        </div>

        {/* 2 Kolom Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Kolom Kiri: Form Tambah Kredensial Baru */}
          <div className="lg:col-span-5 sticky top-20">
            <FormTambahCredential />
          </div>

          {/* Kolom Kanan: Daftar Kredensial Persisten */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                Daftar Akun Kredensial di Brankas ({credentials.length})
              </h2>
              <span className="text-[11px] text-slate-400">
                Terurut dari yang paling baru
              </span>
            </div>

            {credentials.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl">
                <Lock className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-300">Belum Ada Kredensial di Basis Data</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Gunakan formulir di sebelah kiri untuk menambahkan akun baru atau jalankan <code>npx prisma db seed</code> untuk mengisi data sintetis awal.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {credentials.map((cred) => {
                  const badge = getCategoryBadge(cred.category);
                  const deleteActionWithId = hapusCredential.bind(null, cred.id);

                  return (
                    <div
                      key={cred.id}
                      className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all duration-200 group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                          <h3 className="text-sm font-bold text-white truncate group-hover:text-cyan-400 transition">
                            {cred.service}
                          </h3>
                          {cred.isActive ? (
                            <span className="text-[10px] flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Aktif
                            </span>
                          ) : (
                            <span className="text-[10px] flex items-center gap-1 text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                              <AlertCircle className="w-2.5 h-2.5" /> Non-Aktif
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-400 flex items-center gap-3">
                          <span>User: <strong className="text-slate-300 font-mono">{cred.username}</strong></span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-[11px] text-cyan-400 font-mono">
                            <History className="w-3 h-3 text-cyan-500" />
                            {cred.auditLogs.length} Log Audit
                          </span>
                        </div>

                        <div className="p-1.5 bg-slate-950/70 rounded-lg border border-slate-800/80 font-mono text-[11px] text-cyan-300 truncate max-w-md">
                          🔒 {cred.encryptedSecret}
                        </div>

                        {cred.notes && (
                          <p className="text-[11px] text-slate-400 italic">
                            Catatan: {cred.notes}
                          </p>
                        )}
                      </div>

                      {/* Tombol Aksi (Detail & Hapus) */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <Link
                          href={`/vault/${cred.id}`}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Detail &amp; Audit</span>
                        </Link>

                        <form action={deleteActionWithId}>
                          <button
                            type="submit"
                            title="Hapus Kredensial dan Log Audit terkait (Transaksi Atomik)"
                            className="p-1.5 bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-500/20 hover:border-red-500/40 rounded-lg text-xs transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
