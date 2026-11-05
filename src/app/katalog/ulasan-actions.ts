"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { skemaAuditLog } from "@/lib/skema";
import type { StatusForm } from "@/lib/status-form";

export async function tambahAuditLog(
  credentialId: number,
  _prev: StatusForm,
  formData: FormData
): Promise<StatusForm> {
  const hasil = skemaAuditLog.safeParse(Object.fromEntries(formData));
  if (!hasil.success) {
    return { galat: z.flattenError(hasil.error).fieldErrors };
  }

  try {
    await prisma.auditLog.create({
      data: { ...hasil.data, credentialId },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { galat: { deviceId: ["Perangkat ini sudah memiliki catatan audit pada kredensial ini"] } };
      }
      if (e.code === "P2003") {
        return { pesan: "Kredensial tidak ditemukan dalam brankas." };
      }
    }
    throw e;
  }

  revalidatePath(`/katalog/${credentialId}`);
  revalidatePath(`/vault/${credentialId}`);
  return { pesan: "Catatan audit berhasil ditambahkan." };
}

// Alias kompatibilitas
export const tambahUlasan = tambahAuditLog;

export async function hapusAuditLog(id: number, credentialId: number) {
  await prisma.auditLog.deleteMany({
    where: { id, credentialId },
  });
  revalidatePath(`/katalog/${credentialId}`);
  revalidatePath(`/vault/${credentialId}`);
}

// Alias kompatibilitas
export const hapusUlasan = hapusAuditLog;
