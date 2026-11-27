import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  bacaId,
  bacaJson,
  denganPenangananGalat,
  galatValidasi,
  problem,
} from "@/lib/api/problem";
import { skemaCredentialUbah } from "@/lib/skema";

type Ctx = { params: Promise<{ id: string }> };

const idTidakSah = () =>
  problem(400, "Bad Request", { detail: "id harus bilangan bulat positif." });

const tidakAda = (id: number) =>
  problem(404, "Not Found", { detail: `Kredensial ${id} tidak ditemukan.` });

// P2025: rekaman yang akan diubah atau dihapus tidak ditemukan
const rekamanTidakAda = (e: unknown) =>
  e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025";

// P2002: pelanggaran constraint unik (@unique pada kolom service)
const konflikUnik = (e: unknown) =>
  e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002";

// GET /api/v1/credentials/{id}
export const GET = denganPenangananGalat(
  async (_request: Request, { params }: Ctx) => {
    const id = await bacaId(params);
    if (id === null) return idTidakSah();

    const credential = await prisma.vaultCredential.findUnique({
      where: { id },
    });
    return credential ? Response.json(credential) : tidakAda(id);
  }
);

// PATCH /api/v1/credentials/{id}: ubah sebagian field
export const PATCH = denganPenangananGalat(
  async (request: Request, { params }: Ctx) => {
    const id = await bacaId(params);
    if (id === null) return idTidakSah();

    const body = await bacaJson(request);
    if (!body.ok) return body.res;

    const hasil = skemaCredentialUbah.safeParse(body.data);
    if (!hasil.success) return galatValidasi(hasil.error);

    try {
      const credential = await prisma.vaultCredential.update({
        where: { id },
        data: hasil.data,
      });
      return Response.json(credential);
    } catch (e) {
      if (rekamanTidakAda(e)) return tidakAda(id);
      if (konflikUnik(e)) {
        return problem(409, "Conflict", {
          detail: "Nama layanan (service) sudah digunakan oleh kredensial lain.",
          errors: {
            service: ["Nama layanan (service) bentrok dengan data yang ada."],
          },
        });
      }
      throw e;
    }
  }
);

// DELETE /api/v1/credentials/{id}
export const DELETE = denganPenangananGalat(
  async (_request: Request, { params }: Ctx) => {
    const id = await bacaId(params);
    if (id === null) return idTidakSah();

    const jumlahAudit = await prisma.auditLog.count({
      where: { credentialId: id },
    });
    if (jumlahAudit > 0) {
      return problem(409, "Conflict", {
        detail: `Kredensial ${id} masih memiliki ${jumlahAudit} log audit terkait.`,
      });
    }

    try {
      await prisma.vaultCredential.delete({ where: { id } });
    } catch (e) {
      if (rekamanTidakAda(e)) return tidakAda(id);
      throw e;
    }

    return new Response(null, { status: 204 });
  }
);
