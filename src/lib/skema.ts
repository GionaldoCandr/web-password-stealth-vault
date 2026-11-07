import { z } from "zod";

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

// Skema Validasi Produk: Stealth Password Vault (Milestone 2 PostgreSQL & Prisma 7)
export const skemaVaultCredential = z.object({
  service: z
    .string()
    .trim()
    .min(3, "Nama layanan minimal 3 karakter")
    .max(100, "Nama layanan maksimal 100 karakter"),
  category: z.enum(["campus", "finance", "work", "social"]),
  username: z
    .string()
    .trim()
    .min(3, "Username minimal 3 karakter"),
  encryptedSecret: z
    .string()
    .trim()
    .min(8, "Ciphertext minimal 8 karakter"),
  isActive: z
    .union([z.boolean(), z.string()])
    .transform((val) => val === true || val === "true" || val === "on")
    .default(true),
  notes: z.string().trim().optional(),
});

export type MasukanVaultCredential = z.infer<typeof skemaVaultCredential>;

export const skemaAuditLog = z.object({
  deviceId: z
    .string()
    .trim()
    .min(3, "ID perangkat minimal 3 karakter")
    .max(50, "ID perangkat maksimal 50 karakter"),
  action: z
    .string()
    .trim()
    .min(2, "Aksi audit minimal 2 karakter"),
  securityRate: z.coerce
    .number()
    .int("Skor harus bilangan bulat")
    .min(1, "Skor minimal 1 (lemah)")
    .max(5, "Skor maksimal 5 (sangat kuat)"),
  details: z
    .string()
    .trim()
    .min(5, "Catatan audit minimal 5 karakter")
    .max(500, "Catatan audit maksimal 500 karakter"),
});

export type MasukanAuditLog = z.infer<typeof skemaAuditLog>;
