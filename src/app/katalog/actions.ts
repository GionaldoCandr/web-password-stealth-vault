"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { skemaVaultCredential } from "@/lib/skema";
import type { StatusForm } from "@/lib/status-form";

function bacaFormCredential(formData: FormData) {
  return skemaVaultCredential.safeParse({
    ...Object.fromEntries(formData),
    isActive: formData.get("isActive") === "on" || formData.get("tersedia") === "on",
  });
}

export async function tambahCredential(
  _prev: StatusForm,
  formData: FormData
): Promise<StatusForm> {
  const hasil = bacaFormCredential(formData);
  if (!hasil.success) {
    return { galat: z.flattenError(hasil.error).fieldErrors };
  }

  try {
    await prisma.vaultCredential.create({ data: hasil.data });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { galat: { service: ["Layanan (service) sudah terdaftar dalam brankas"] } };
    }
    throw e;
  }

  revalidatePath("/katalog");
  revalidatePath("/vault");
  return { pesan: "Kredensial berhasil disimpan di brankas." };
}

// Alias kompatibilitas
export const tambahItem = tambahCredential;

export async function ubahCredential(
  id: number,
  _prev: StatusForm,
  formData: FormData
): Promise<StatusForm> {
  const hasil = bacaFormCredential(formData);
  if (!hasil.success) {
    return { galat: z.flattenError(hasil.error).fieldErrors };
  }

  try {
    await prisma.vaultCredential.update({ where: { id }, data: hasil.data });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { galat: { service: ["Layanan (service) sudah terdaftar dalam brankas"] } };
      }
      if (e.code === "P2025") {
        return { pesan: "Kredensial tidak ditemukan atau sudah dihapus dari brankas." };
      }
    }
    throw e;
  }

  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  revalidatePath("/vault");
  return { pesan: "Perubahan kredensial berhasil disimpan." };
}

// Alias kompatibilitas
export const ubahItem = ubahCredential;

export async function hapusCredential(id: number) {
  // Transaksi atomik: hapus seluruh AuditLog terlebih dahulu, lalu hapus VaultCredential
  await prisma.$transaction([
    prisma.auditLog.deleteMany({ where: { credentialId: id } }),
    prisma.vaultCredential.delete({ where: { id } }),
  ]);

  revalidatePath("/katalog");
  revalidatePath("/vault");
  redirect("/katalog");
}

// Alias kompatibilitas
export const hapusItem = hapusCredential;
