"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { skemaVaultCredential, skemaAuditLog } from "@/lib/skema";
import { Prisma } from "@/generated/prisma/client";

export type StatusAksi = {
  sukses?: boolean;
  pesan?: string;
  galat?: Record<string, string[]>;
};

// =========================================================================
// 1. CREATE: Tambah Kredensial Baru (VaultCredential)
// =========================================================================
export async function tambahCredential(
  _prevState: StatusAksi,
  formData: FormData
): Promise<StatusAksi> {
  const dataMentah = {
    service: formData.get("service"),
    category: formData.get("category"),
    username: formData.get("username"),
    encryptedSecret: formData.get("encryptedSecret"),
    isActive: formData.get("isActive"),
    notes: formData.get("notes") || undefined,
  };

  const validasi = skemaVaultCredential.safeParse(dataMentah);

  if (!validasi.success) {
    return {
      sukses: false,
      pesan: "Gagal memvalidasi masukan kredensial.",
      galat: validasi.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.vaultCredential.create({
      data: validasi.data,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          sukses: false,
          pesan: "Nama layanan sudah terdaftar dalam brankas.",
          galat: {
            service: ["Nama layanan (service) ini sudah digunakan. Gunakan domain yang berbeda."],
          },
        };
      }
    }
    console.error("Galat tak terduga saat menambah kredensial:", error);
    return {
      sukses: false,
      pesan: "Terjadi kesalahan internal pada basis data.",
    };
  }

  revalidatePath("/vault");
  return {
    sukses: true,
    pesan: "Kredensial baru berhasil disimpan secara persisten ke PostgreSQL.",
  };
}

// =========================================================================
// 2. UPDATE: Ubah Kredensial yang Ada (VaultCredential)
// =========================================================================
export async function ubahCredential(
  id: number,
  _prevState: StatusAksi,
  formData: FormData
): Promise<StatusAksi> {
  const dataMentah = {
    service: formData.get("service"),
    category: formData.get("category"),
    username: formData.get("username"),
    encryptedSecret: formData.get("encryptedSecret"),
    isActive: formData.get("isActive"),
    notes: formData.get("notes") || undefined,
  };

  const validasi = skemaVaultCredential.safeParse(dataMentah);

  if (!validasi.success) {
    return {
      sukses: false,
      pesan: "Gagal memvalidasi pembaruan kredensial.",
      galat: validasi.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.vaultCredential.update({
      where: { id },
      data: validasi.data,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          sukses: false,
          pesan: "Nama layanan sudah digunakan oleh kredensial lain.",
          galat: {
            service: ["Nama layanan (service) ini bentrok dengan akun lain."],
          },
        };
      }
      if (error.code === "P2025") {
        return {
          sukses: false,
          pesan: "Kredensial tidak ditemukan atau telah dihapus dari basis data.",
        };
      }
    }
    console.error("Galat tak terduga saat memperbarui kredensial:", error);
    throw error;
  }

  revalidatePath("/vault");
  revalidatePath(`/vault/${id}`);
  return {
    sukses: true,
    pesan: "Perubahan kredensial berhasil disimpan.",
  };
}

// =========================================================================
// 3. DELETE: Hapus Kredensial & Relasi AuditLog (Transaksi Atomik)
// =========================================================================
export async function hapusCredential(id: number) {
  try {
    // Menghapus data anak (AuditLog) dan data induk (VaultCredential)
    // dalam satu kesatuan transaksi atomik berantai (memenuhi onDelete: Restrict)
    await prisma.$transaction([
      prisma.auditLog.deleteMany({ where: { credentialId: id } }),
      prisma.vaultCredential.delete({ where: { id } }),
    ]);
  } catch (error) {
    console.error("Galat saat transaksi penghapusan kredensial:", error);
    throw error; // Diteruskan ke error.tsx
  }

  revalidatePath("/vault");
  // Pemanggilan redirect() WAJIB di luar blok try-catch agar eksepsi NEXT_REDIRECT tidak tertelan
  redirect("/vault");
}

// =========================================================================
// 4. CREATE: Tambah Rekam Jejak Audit (AuditLog)
// =========================================================================
export async function tambahAuditLog(
  credentialId: number,
  _prevState: StatusAksi,
  formData: FormData
): Promise<StatusAksi> {
  const dataMentah = {
    deviceId: formData.get("deviceId"),
    action: formData.get("action"),
    securityRate: formData.get("securityRate"),
    details: formData.get("details"),
  };

  const validasi = skemaAuditLog.safeParse(dataMentah);

  if (!validasi.success) {
    return {
      sukses: false,
      pesan: "Gagal memvalidasi masukan log audit.",
      galat: validasi.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.auditLog.create({
      data: {
        credentialId,
        deviceId: validasi.data.deviceId,
        action: validasi.data.action,
        securityRate: validasi.data.securityRate,
        details: validasi.data.details,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          sukses: false,
          pesan: "Perangkat ini sudah mencatat log audit pada kredensial ini.",
          galat: {
            deviceId: ["Perangkat ini sudah memiliki catatan status audit aktif."],
          },
        };
      }
      if (error.code === "P2003") {
        return {
          sukses: false,
          pesan: "Kredensial induk tidak ditemukan di basis data.",
        };
      }
    }
    console.error("Galat tak terduga saat menambah log audit:", error);
    return {
      sukses: false,
      pesan: "Terjadi kesalahan sistem saat menyimpan log audit.",
    };
  }

  revalidatePath(`/vault/${credentialId}`);
  return {
    sukses: true,
    pesan: "Rekam jejak audit baru berhasil dicatat ke PostgreSQL.",
  };
}

// =========================================================================
// 5. DELETE: Hapus Log Audit Spesifik (AuditLog)
// =========================================================================
export async function hapusAuditLog(id: number, credentialId: number) {
  try {
    await prisma.auditLog.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Galat saat menghapus log audit:", error);
    throw error;
  }

  revalidatePath(`/vault/${credentialId}`);
}
