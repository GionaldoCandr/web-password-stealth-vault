# Teks Daring Tugas Pendahuluan Modul 8: RESTful API dengan Route Handlers

Salin seluruh teks di bawah garis pembatas ke kolom teks daring pengumpulan **Tugas Pendahuluan Modul 8** di e-learning (tenggat Jumat, 27 November 2026, pukul 13.30 WIB).

---

**Tugas Pendahuluan Modul 8: RESTful API dengan Route Handlers**  
- **Nama / NIM:** Gionaldo Chandrawansah / 105224031  
- **Produk:** Stealth Password Vault (`web-password-stealth-vault`)  
- **Repositori:** https://github.com/GionaldoCandr/web-password-stealth-vault  
- **Tautan Berkas:** https://github.com/GionaldoCandr/web-password-stealth-vault/blob/praktikum/modul-08/docs/praktikum/Week8/tugas-pendahuluan.md  

### 1. Tabel Endpoint Produk (`/api/v1`)
| No | Metode | Path | Kebutuhan (`docs/kebutuhan.md`) | Semua Kode Status yang Mungkin |
| :---: | :---: | :--- | :---: | :--- |
| 1 | `GET` | `/api/v1/credentials` | K-01, K-06, K-09 | `200`, `400`, `500` |
| 2 | `POST` | `/api/v1/credentials` | K-01, K-02, K-06, K-09 | `201`, `400`, `409`, `422`, `500` |
| 3 | `GET` | `/api/v1/credentials/{id}` | K-01, K-06, K-09 | `200`, `400`, `404`, `500` |
| 4 | `PATCH` | `/api/v1/credentials/{id}` | K-01, K-06, K-07, K-09 | `200`, `400`, `404`, `409`, `422`, `500` |
| 5 | `DELETE` | `/api/v1/credentials/{id}` | K-01, K-05, K-09 | `204`, `400`, `404`, `409`, `500` |
| 6 | `GET` | `/api/v1/credentials/{id}/audit-logs` | K-05, K-07, K-09 | `200`, `400`, `404`, `500` |
| 7 | `POST` | `/api/v1/credentials/{id}/audit-logs` | K-05, K-07, K-09 | `201`, `400`, `404`, `409`, `422`, `500` |

### 2. Arti Aman & Idempoten serta Sifat Metode HTTP
- **Aman (*Safe*):** Operasi hanya membaca data tanpa mengubah state/isi resource di server sehingga aman diulang dan di-cache.
- **Idempoten (*Idempotent*):** Pengiriman satu maupun berkali-kali permintaan yang identik menghasilkan keadaan akhir yang sama di server (meski respons HTTP dapat berbeda).
- **Klasifikasi:**
  - **`GET`**: Aman (**Ya**), Idempoten (**Ya**). *Contoh:* `GET /api/v1/credentials?halaman=1&batas=10` hanya membaca daftar kredensial tanpa memodifikasi database.
  - **`POST`**: Aman (**Tidak**), Idempoten (**Tidak**). *Contoh:* `POST /api/v1/credentials` membuat kredensial baru di PostgreSQL setiap kali berhasil.
  - **`PATCH`**: Aman (**Tidak**), Idempoten (**Tidak dijamin**). *Contoh:* `PATCH /api/v1/credentials/19` dengan `{"isActive":false}` memodifikasi sebagian kolom; secara semantik RFC 9110 mutasi parsial tidak dijamin idempoten.
  - **`DELETE`**: Aman (**Tidak**), Idempoten (**Ya**). *Contoh:* `DELETE /api/v1/credentials/19` pertama menjawab `204 No Content`, panggilan kedua menjawab `404 Not Found`, tetapi keadaan akhir database sama: kredensial 19 sudah tidak ada.

### 3. Kode Status untuk Empat Kasus & Alasan
1. **Body bukan JSON (`400 Bad Request`):** Permintaan cacat secara sintaksis sehingga `request.json()` gagal mem-parsing payload sebelum masuk ke tahap validasi aturan field.
2. **JSON valid dengan kategori tidak dikenal (`422 Unprocessable Content`):** JSON berhasil di-parse dan terstruktur sah, tetapi isi field `category` melanggar enum skema Zod (`campus`, `finance`, `work`, `social`).
3. **ID yang tidak ada (`404 Not Found`):** Format parameter `id` sah (bilangan bulat positif), namun record tidak ditemukan di tabel `VaultCredential` (`findUnique === null` / Prisma `P2025`).
4. **Menghapus item yang masih memiliki data relasi (`409 Conflict`):** Penghapusan bertentangan dengan keadaan integritas referensial (`onDelete: Restrict`) karena masih terdapat baris anak `AuditLog` yang merujuk ke kredensial terkait.

### 4. Contoh Respons Galat Problem Details (RFC 9457) untuk Kasus `404`
```http
HTTP/1.1 404 Not Found
content-type: application/problem+json

{
  "type": "about:blank",
  "title": "Not Found",
  "status": 404,
  "detail": "Kredensial 99999 tidak ditemukan."
}
```

### 5. Alasan `params` Next.js 16 Di-`await` dan Divalidasi Sebelum Kueri Prisma
- **Wajib `await`:** Pada Next.js 15/16, `params` berbentuk `Promise<{ id: string }>` (*Async Dynamic API*). Mengakses properti secara sinkron tanpa `await` menghasilkan `undefined` (gagal baca `NaN` saat runtime maupun error tipe di TypeScript).
- **Wajib validasi sebelum Prisma:** Parameter URL berasal dari klien dalam bentuk `string` mentah yang dapat berisi `"abc"`, `"0"`, `"-3"`, atau `"1.5"`. Validasi awal di `bacaId()` memakai pengecekan digit dan Zod `z.coerce.number().int().positive()` menolak masukan ilegal dengan `400 Bad Request` sebelum kueri Prisma dieksekusi, sehingga mencegah `PrismaClientValidationError` / `500`.

### Catatan Pemanfaatan AI
- **Alat:** Antigravity AI (Google Gemini).
- **Bagian yang dibantu:** Penyusunan tabel pemetaan endpoint ke `docs/kebutuhan.md`, analisis semantik metode RFC 9110, format contoh RFC 9457, dan perumusan alasan teknis validasi `params` Next.js 16.
- **Verifikasi:** Memeriksa langsung kode handler di `src/app/api/v1/`, skema di `src/lib/skema.ts`, helper `src/lib/api/problem.ts`, serta menguji langsung respons `curl -i` ke server lokal.
