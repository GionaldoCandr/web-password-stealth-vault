import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FormEditCredential } from "./FormEditCredential";
import { FormTambahAudit } from "./FormTambahAudit";
import { hapusCredential, hapusAuditLog } from "../actions";
import {
  ArrowLeft,
  KeyRound,
  Shield,
  Activity,
  Trash2,
  Calendar,
  Layers,
  AlertOctagon,
  Laptop,
  Star,
  CheckCircle2,
  Lock,
  Globe
} from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (isNaN(numId)) {
    return { title: "Kredensial Tidak Ditemukan" };
  }
  const credential = await prisma.vaultCredential.findUnique({
    where: { id: numId },
    select: { service: true },
  });
  return {
    title: credential ? `Detail: ${credential.service} - Stealth Vault` : "Kredensial Tidak Ditemukan",
  };
}

export default async function DetailCredentialPage({ params }: PageProps) {
  const { id } = await params;
  const numId = parseInt(id, 10);

  if (isNaN(numId)) {
    notFound();
  }

  const credential = await prisma.vaultCredential.findUnique({
    where: { id: numId },
    include: {
      auditLogs: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!credential) {
    notFound();
  }

  const deleteParentAction = hapusCredential.bind(null, credential.id);

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

  const badge = getCategoryBadge(credential.category);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/vault"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Brankas</span>
          </Link>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg">
              <KeyRound className="w-4 h-4" />
            </span>
            <div>
              <h1 className="text-sm font-bold text-white flex items-center gap-2">
                {credential.service}
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}>
                  {badge.label}
                </span>
                {credential.isActive ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Aktif
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    Nonaktif
                  </span>
                )}
              </h1>
              <p className="text-[10px] text-slate-400">
                ID Kredensial: #{credential.id} · Dibuat: {credential.createdAt.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs flex items-center gap-2 text-slate-300">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>{credential.auditLogs.length} Entri Log Audit</span>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Form Ubah Kredensial + Danger Zone (7 Kolom) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Form Edit */}
            <FormEditCredential credential={credential} />

            {/* Danger Zone: Hapus Kredensial Transaksional */}
            <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-red-200">Zona Bahaya: Hapus Kredensial</h3>
                  <p className="text-[11px] text-red-400/80">
                    Operasi ini bersifat permanen dan tidak dapat dibatalkan.
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Menghapus kredensial ini akan mengeksekusi <code className="text-red-300 font-mono">prisma.$transaction</code> untuk menghapus seluruh ({credential.auditLogs.length}) catatan log audit terkait terlebih dahulu guna mematuhi konstrain integritas referensial basis data (<code className="text-red-300 font-mono">onDelete: Restrict</code>).
              </p>
              <form action={deleteParentAction}>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer shadow-lg shadow-red-950/60"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Hapus Kredensial &amp; Seluruh Log Terkait</span>
                </button>
              </form>
            </div>
          </div>

          {/* Kolom Kanan: Log Audit Relasional 1:N (5 Kolom) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Form Tambah Audit */}
            <FormTambahAudit credentialId={credential.id} />

            {/* Daftar Log Audit */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-bold text-white">
                    Histori Audit ({credential.auditLogs.length})
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  Relasi: VaultCredential 1 ── N AuditLog
                </span>
              </div>

              {credential.auditLogs.length === 0 ? (
                <div className="p-6 text-center border border-dashed border-slate-800 rounded-xl bg-slate-950/40">
                  <Activity className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 font-semibold">Belum ada rekam jejak audit.</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Gunakan formulir di atas untuk mencatat verifikasi keamanan perangkat pertama.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {credential.auditLogs.map((log) => {
                    const deleteAuditAction = hapusAuditLog.bind(null, log.id, credential.id);

                    return (
                      <div
                        key={log.id}
                        className="p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl hover:border-slate-700 transition"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="p-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md">
                              <Laptop className="w-3 h-3" />
                            </span>
                            <span className="text-xs font-mono font-semibold text-slate-200">
                              {log.deviceId}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded">
                              {"⭐".repeat(log.securityRate)} {log.securityRate}/5
                            </span>
                            {/* Tombol Hapus Log Anak */}
                            <form action={deleteAuditAction}>
                              <button
                                type="submit"
                                title="Hapus entri log ini"
                                className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded transition cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </form>
                          </div>
                        </div>

                        <div className="mb-2">
                          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800/40">
                            {log.action}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                          {log.details}
                        </p>

                        <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between font-mono">
                          <span>Log ID: #{log.id}</span>
                          <span>{log.createdAt.toLocaleString("id-ID")}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
