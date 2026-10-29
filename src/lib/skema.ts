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