import type { NextRequest } from "next/server";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  bacaJson,
  denganPenangananGalat,
  galatValidasi,
  problem,
} from "@/lib/api/problem";
import { skemaCredentialBaru, skemaKueriCredential } from "@/lib/skema";

// GET /api/v1/credentials?halaman=1&batas=10&kategori=work
export const GET = denganPenangananGalat(async (request: NextRequest) => {
  const kueri = skemaKueriCredential.safeParse(
    Object.fromEntries(request.nextUrl.searchParams)
  );
  if (!kueri.success) {
    return problem(400, "Bad Request", {
      detail: "Parameter kueri tidak valid.",
      errors: z.flattenError(kueri.error).fieldErrors,
    });
  }

  const { halaman, batas, kategori } = kueri.data;
  const where = kategori ? { category: kategori } : {};

  const [data, total] = await prisma.$transaction([
    prisma.vaultCredential.findMany({
      where,
      orderBy: { id: "asc" },
      skip: (halaman - 1) * batas,
      take: batas,
    }),
    prisma.vaultCredential.count({ where }),
  ]);

  return Response.json({
    data,
    meta: { halaman, batas, total },
  });
});

// POST /api/v1/credentials
export const POST = denganPenangananGalat(async (request: Request) => {
  const body = await bacaJson(request);
  if (!body.ok) return body.res; // 400: body bukan JSON valid

  const hasil = skemaCredentialBaru.safeParse(body.data);
  if (!hasil.success) return galatValidasi(hasil.error); // 422: gagal validasi Zod

  try {
    const credential = await prisma.vaultCredential.create({
      data: hasil.data,
    });

    return Response.json(credential, {
      status: 201,
      headers: { Location: `/api/v1/credentials/${credential.id}` },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return problem(409, "Conflict", {
        detail: `Layanan '${hasil.data.service}' sudah terdaftar di dalam brankas.`,
        errors: {
          service: ["Nama layanan (service) ini sudah digunakan."],
        },
      });
    }
    throw error;
  }
});
