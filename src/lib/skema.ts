import { z } from "zod";

// =========================================================================
// 1. Skema Simulasi Interaktif (Modul 5 — Auth, CLI, & RAM Vault Simulator)
// =========================================================================

// Skema Validasi Master Password Vault
export const skemaMasterPass = z.object({
  masterPassword: z
    .string()
    .min(8, "Master Password minimal harus 8 karakter")
    .max(64, "Master Password maksimal 64 karakter")
    .regex(/[A-Z]/, "Harus mengandung minimal 1 huruf kapital")
    .regex(/[0-9]/, "Harus mengandung minimal 1 angka"),
});

export type MasukanMasterPass = z.infer<typeof skemaMasterPass>;

// Skema Validasi Command Input CLI / Windows Run (MyPass)
export const skemaCommandRun = z.object({
  command: z
    .string()
    .trim()
    .min(1, "Perintah tidak boleh kosong")
    .refine(
      (val) => {
        const validCmds = [
          "mypass",
          "mypass --purge",
          "mypass --status",
          "vault --status",
          "clear",
          "help",
        ];
        return validCmds.includes(val.toLowerCase());
      },
      {
        message: 'Perintah tidak terdaftar. Ketik "help" untuk petunjuk.',
      }
    ),
});

export type MasukanCommandRun = z.infer<typeof skemaCommandRun>;

// Skema Validasi Form Tambah Credential Simulasi
export const skemaCredential = z.object({
  service: z
    .string()
    .trim()
    .min(3, "Nama layanan minimal 3 karakter")
    .max(50, "Nama layanan maksimal 50 karakter"),
  username: z.string().trim().min(3, "Username/Email minimal 3 karakter"),
  secret: z.string().min(8, "Password minimal 8 karakter"),
});

export type MasukanCredential = z.infer<typeof skemaCredential>;

// =========================================================================
// 2. Skema Produk Persisten (PostgreSQL & Prisma ORM 7 — Modul 6 & Modul 8)
// =========================================================================

export const KATEGORI_VAULT = ["campus", "finance", "work", "social"] as const;

// Aturan field bersama antara Formulir Server Actions (Modul 6) & REST API (Modul 8)
export const skemaCredentialDasar = z.object({
  service: z
    .string()
    .trim()
    .min(3, "Nama layanan minimal 3 karakter")
    .max(100, "Nama layanan maksimal 100 karakter"),
  category: z.enum(KATEGORI_VAULT, {
    error: "Kategori tidak dikenal (pilih: campus, finance, work, social)",
  }),
  username: z
    .string()
    .trim()
    .min(3, "Username minimal 3 karakter")
    .max(80, "Username maksimal 80 karakter"),
  encryptedSecret: z
    .string()
    .trim()
    .min(8, "Ciphertext minimal 8 karakter")
    .max(512, "Ciphertext maksimal 512 karakter"),
  notes: z
    .string()
    .trim()
    .max(500, "Catatan maksimal 500 karakter")
    .optional(),
});

// Server Actions (FormData HTML mengirim string -> perlu transform eksplisit boolean)
export const skemaVaultCredential = skemaCredentialDasar.extend({
  isActive: z
    .union([z.boolean(), z.string()])
    .transform((val) => val === true || val === "true" || val === "on")
    .default(true),
});

export type MasukanVaultCredential = z.infer<typeof skemaVaultCredential>;

// POST /api/v1/credentials: JSON bertipe ketat; isActive berupa boolean murni (default true)
export const skemaCredentialBaru = skemaCredentialDasar.extend({
  isActive: z
    .boolean({ error: "Field isActive harus berupa boolean (true/false)" })
    .default(true),
});

export type MasukanCredentialBaru = z.infer<typeof skemaCredentialBaru>;

// PATCH /api/v1/credentials/{id}: semua field opsional, tetapi minimal satu field wajib dikirim
export const skemaCredentialUbah = skemaCredentialDasar
  .extend({
    isActive: z.boolean({
      error: "Field isActive harus berupa boolean (true/false)",
    }),
  })
  .partial()
  .refine((o) => Object.keys(o).length > 0, {
    error: "Kirim minimal satu field yang diubah.",
  });

export type MasukanCredentialUbah = z.infer<typeof skemaCredentialUbah>;

// Parameter kueri GET /api/v1/credentials?halaman=1&batas=10&kategori=work
export const skemaKueriCredential = z.object({
  halaman: z.coerce
    .number({ error: "Parameter halaman harus berupa angka" })
    .int("Parameter halaman harus bilangan bulat")
    .min(1, "Parameter halaman minimal 1")
    .default(1),
  batas: z.coerce
    .number({ error: "Parameter batas harus berupa angka" })
    .int("Parameter batas harus bilangan bulat")
    .min(1, "Parameter batas minimal 1")
    .max(50, "Parameter batas maksimal 50 per halaman")
    .default(10),
  kategori: z
    .enum(KATEGORI_VAULT, {
      error: "Kategori tidak dikenal (pilih: campus, finance, work, social)",
    })
    .optional(),
});

export type KueriCredential = z.infer<typeof skemaKueriCredential>;

// Parameter path {id}: wajib bilangan bulat positif
export const skemaId = z.coerce
  .number({ error: "id harus berupa angka" })
  .int("id harus bilangan bulat")
  .positive("id harus bilangan bulat positif");

// =========================================================================
// 3. Skema Entitas Anak: AuditLog (FormData Modul 6 & JSON API Modul 8)
// =========================================================================

export const skemaAuditLogDasar = z.object({
  deviceId: z
    .string()
    .trim()
    .min(3, "ID perangkat minimal 3 karakter")
    .max(50, "ID perangkat maksimal 50 karakter"),
  action: z
    .string()
    .trim()
    .min(2, "Aksi audit minimal 2 karakter")
    .max(60, "Aksi audit maksimal 60 karakter"),
  details: z
    .string()
    .trim()
    .min(5, "Catatan audit minimal 5 karakter")
    .max(500, "Catatan audit maksimal 500 karakter"),
});

// Digunakan oleh Server Actions (FormData mengirim securityRate sebagai string)
export const skemaAuditLog = skemaAuditLogDasar.extend({
  securityRate: z.coerce
    .number()
    .int("Skor harus bilangan bulat")
    .min(1, "Skor minimal 1 (lemah)")
    .max(5, "Skor maksimal 5 (sangat kuat)"),
});

export type MasukanAuditLog = z.infer<typeof skemaAuditLog>;

// Digunakan oleh POST /api/v1/credentials/{id}/audit-logs (JSON bertipe angka ketat)
export const skemaAuditLogBaru = skemaAuditLogDasar.extend({
  securityRate: z
    .number({ error: "Skor securityRate harus berupa bilangan bulat (1–5)" })
    .int("Skor harus bilangan bulat")
    .min(1, "Skor minimal 1 (lemah)")
    .max(5, "Skor maksimal 5 (sangat kuat)"),
});

export type MasukanAuditLogBaru = z.infer<typeof skemaAuditLogBaru>;
