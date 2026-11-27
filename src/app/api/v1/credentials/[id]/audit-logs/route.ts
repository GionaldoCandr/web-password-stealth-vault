import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  bacaId,
  bacaJson,
  denganPenangananGalat,
  galatValidasi,
  problem,
} from "@/lib/api/problem";
import { skemaAuditLogBaru } from "@/lib/skema";

type Ctx = { params: Promise<{ id: string }> };

const idTidakSah = () =>
  problem(400, "Bad Request", { detail: "id harus bilangan bulat positif." });

const tidakAda = (id: number) =>
  problem(404, "Not Found", { detail: `Kredensial ${id} tidak ditemukan.` });

// GET /api/v1/credentials/{id}/audit-logs: resource bersarang dari relasi 1:N VaultCredential -> AuditLog
export const GET = denganPenangananGalat(
  async (_request: Request, { params }: Ctx) => {
    const id = await bacaId(params);
    if (id === null) return idTidakSah();

    const credential = await prisma.vaultCredential.findUnique({
      where: { id },
      select: { auditLogs: { orderBy: { id: "desc" } } },
    });

    if (!credential) return tidakAda(id);

    return Response.json({ data: credential.auditLogs });
  }
);

// POST /api/v1/credentials/{id}/audit-logs: catat entri log audit perangkat baru pada kredensial tertentu
export const POST = denganPenangananGalat(
  async (request: Request, { params }: Ctx) => {
    const id = await bacaId(params);
    if (id === null) return idTidakSah();

    const indukAda = await prisma.vaultCredential.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!indukAda) return tidakAda(id);

    const body = await bacaJson(request);
    if (!body.ok) return body.res;

    const hasil = skemaAuditLogBaru.safeParse(body.data);
    if (!hasil.success) return galatValidasi(hasil.error);

    try {
      const auditLog = await prisma.auditLog.create({
        data: {
          credentialId: id,
          ...hasil.data,
        },
      });

      return Response.json(auditLog, {
        status: 201,
        headers: { Location: `/api/v1/credentials/${id}/audit-logs` },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return problem(409, "Conflict", {
          detail: `Perangkat '${hasil.data.deviceId}' sudah mencatat log audit pada kredensial ${id}.`,
          errors: {
            deviceId: ["Perangkat ini sudah memiliki catatan status audit aktif."],
          },
        });
      }
      throw error;
    }
  }
);
