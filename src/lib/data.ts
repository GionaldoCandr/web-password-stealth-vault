import "server-only";
import { prisma } from "@/lib/prisma";
import type { VaultCredential } from "@/lib/tipe";

const kolomCredential = {
  id: true,
  service: true,
  category: true,
  username: true,
  encryptedSecret: true,
  isActive: true,
  notes: true,
  createdAt: true,
} as const;

export async function ambilDaftarCredential(): Promise<VaultCredential[]> {
  return prisma.vaultCredential.findMany({
    select: kolomCredential,
    orderBy: { createdAt: "desc" },
  });
}

// Alias kompatibilitas
export const ambilDaftarItem = ambilDaftarCredential;

export async function ambilCredential(id: number) {
  return prisma.vaultCredential.findUnique({
    where: { id },
    select: {
      ...kolomCredential,
      auditLogs: {
        select: {
          id: true,
          deviceId: true,
          action: true,
          securityRate: true,
          details: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

// Alias kompatibilitas
export const ambilItem = ambilCredential;
