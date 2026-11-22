import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { dataAwal } from "./data-awal";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  // Bersihkan data lama untuk memastikan database bersih dari data riil / pribadi
  await prisma.auditLog.deleteMany({});
  await prisma.vaultCredential.deleteMany({});

  for (const data of dataAwal) {
    // 1. Buat VaultCredential demo enterprise
    const credential = await prisma.vaultCredential.create({
      data,
    });

    // 2. Buat AuditLog awal terkait
    await prisma.auditLog.create({
      data: {
        credentialId: credential.id,
        deviceId: "PC-SEC-OPS-01",
        action: "PROVISION_SEED",
        securityRate: 5,
        details: "Audit awal integritas enkripsi kredensial AES-256-GCM terverifikasi valid.",
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
