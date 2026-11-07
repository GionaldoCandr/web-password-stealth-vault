"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Boundary:", error);
  }, [error]);

  return (
    <div role="alert" className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center text-white">
      <div className="max-w-md p-6 bg-slate-900/90 border border-red-500/30 rounded-2xl shadow-xl">
        <span className="text-4xl block mb-3">🛡️</span>
        <h2 className="text-xl font-bold text-red-400">Terjadi Kesalahan Sistem</h2>
        <p className="mt-2 text-sm text-slate-300">
          Aplikasi Stealth Vault mengalami kendala tak terduga.
        </p>
        <p className="mt-2 text-xs font-mono text-slate-400">
          ID Galat (Digest): {error.digest ?? "none"}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-semibold transition"
        >
          Muat Ulang Aplikasi
        </button>
      </div>
    </div>
  );
}

