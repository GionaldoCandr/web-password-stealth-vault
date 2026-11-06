import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalUntukPrisma = globalThis as unknown as { prisma?: PrismaClient };

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma =
  globalUntukPrisma.prisma ??
  new PrismaClient({
    adapter,
    // Modul 7: Tampilkan setiap kueri SQL di terminal debug untuk memantau transaksi
    log: ["query", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalUntukPrisma.prisma = prisma;
}
