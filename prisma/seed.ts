import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { dataAwal } from "./data-awal";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  for (const data of dataAwal) {
    // 1. Upsert VaultCredential (idempotent berdasarkan service unik)
    const credential = await prisma.vaultCredential.upsert({
      where: { service: data.service },
      update: {},
      create: data,
    });

    // 2. Upsert AuditLog terkait (idempotent berdasarkan credentialId & deviceId)
    await prisma.auditLog.upsert({
      where: {
        credentialId_deviceId: {
          credentialId: credential.id,
          deviceId: "PC-STEALTH-MASTER-01",
        },
      },
      update: {},
      create: {
        credentialId: credential.id,
        deviceId: "PC-STEALTH-MASTER-01",
        action: "PROVISION_SEED",
        securityRate: 5,
        details: "Audit awal integritas enkripsi kredensial AES-256-GCM valid.",
      },
    });
  }

  const totalCredential = await prisma.vaultCredential.count();
  const totalAudit = await prisma.auditLog.count();
  console.log(`Seed selesai: ${totalCredential} item kredensial, ${totalAudit} audit log`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
