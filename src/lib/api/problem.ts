import { z } from "zod";
import { skemaId } from "@/lib/skema";

/**
 * Helper respons galat standar RFC 9457 (Problem Details for HTTP APIs).
 * Selalu mengirim header Content-Type: application/problem+json dan menyembunyikan
 * detail internal seperti stack trace, kueri SQL, atau galat Prisma mentah.
 */
export function problem(
  status: number,
  title: string,
  extra: Record<string, unknown> = {}
) {
  return Response.json(
    { type: "about:blank", title, status, ...extra },
    { status, headers: { "Content-Type": "application/problem+json" } }
  );
}

/**
 * Mengonversi kegagalan validasi Zod 4 menjadi respons 422 Unprocessable Content
 * berformat Problem Details lengkap dengan daftar kesalahan per field.
 */
export function galatValidasi(error: z.ZodError) {
  const { formErrors, fieldErrors } = z.flattenError(error);
  return problem(422, "Unprocessable Content", {
    detail: formErrors[0] ?? "Data tidak lolos validasi.",
    errors: fieldErrors,
  });
}

/**
 * Membaca body permintaan JSON secara aman.
 * Bila body bukan JSON valid (atau kosong pada endpoint POST/PATCH),
 * mengembalikan 400 Bad Request berjenis application/problem+json.
 */
export async function bacaJson(request: Request) {
  try {
    return { ok: true as const, data: (await request.json()) as unknown };
  } catch {
    const res = problem(400, "Bad Request", {
      detail: "Body harus JSON yang valid.",
    });
    return { ok: false as const, res };
  }
}

/**
 * Meng-await params Next.js 16 yang bertipe Promise dan memvalidasi parameter {id}
 * agar dijamin berupa bilangan bulat positif sebelum menyentuh kueri Prisma.
 */
export async function bacaId(params: Promise<{ id: string }>) {
  const { id } = await params;
  // Tolak whitespace/string kosong yang tidak murni angka agar ketat
  if (!/^\d+$/.test(id)) {
    return null;
  }
  const hasil = skemaId.safeParse(id);
  return hasil.success ? hasil.data : null;
}

/**
 * Tantangan Pengayaan (Modul 8): Pembungkus handler Route Handler yang menangkap
 * galat tak terduga di tingkat tertinggi, mencatat detail teknis hanya di log server,
 * dan mengembalikan respons aman 500 Problem Details beserta field instance.
 */
export function denganPenangananGalat<
  TReq extends Request = Request,
  TArgs extends unknown[] = []
>(
  handler: (request: TReq, ...args: TArgs) => Promise<Response>
) {
  return async (request: TReq, ...args: TArgs): Promise<Response> => {
    try {
      return await handler(request, ...args);
    } catch (error) {
      let pathname = "/";
      try {
        pathname = new URL(request.url).pathname;
      } catch {
        // Abaikan jika URL relatif
      }
      console.error(`[API 500] Galat tak terduga pada ${request.method} ${pathname}:`, error);
      return problem(500, "Internal Server Error", {
        detail: "Terjadi kesalahan internal pada server.",
        instance: pathname,
      });
    }
  };
}
