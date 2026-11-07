"use client";

import { useEffect } from "react";

export default function GalatVault({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Catat galat ke konsol peramban untuk kebutuhan pelaporan & debugging
    console.error("Galat Segmen Vault:", error);
  }, [error]);

  return (
    <div role="alert" className="mx-auto max-w-xl p-6 bg-slate-900/90 border border-red-500/40 rounded-xl my-8 text-white shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span className="p-2 bg-red-500/20 text-red-400 rounded-lg text-xl">⚠️</span>
        <div>
          <h2 className="text-xl font-bold text-red-400">Kredensial Brankas Gagal Diproses</h2>
          <p className="text-sm text-slate-300">
            Terjadi kendala saat memuat atau memutasi data kredensial brankas.
          </p>
        </div>
      </div>
      <div className="mt-4 p-3 bg-slate-950/80 rounded-lg border border-slate-800 font-mono text-xs text-slate-400">
        Kode Rujukan (Digest): <span className="text-amber-400">{error.digest ?? "lokal-development"}</span>
      </div>
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition cursor-pointer"
        >
          Coba Muat Ulang (Retry)
        </button>
      </div>
    </div>
  );
}

