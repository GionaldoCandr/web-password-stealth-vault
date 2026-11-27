# Tugas Pendahuluan Modul 8: RESTful API dengan Route Handlers

**Mata Kuliah:** Praktikum Pengembangan Aplikasi Web (052356) · 1 SKS · Semester 5  
**Dosen Pengampu:** Muhammad Fakhrul Safitra, S.Kom., M.Kom.  
**Program Studi:** Ilmu Komputer, Universitas Pertamina  
**Nama Mahasiswa:** Gionaldo Chandrawansah  
**NIM:** 105224031  
**Produk:** Stealth Password Vault (`web-password-stealth-vault`)  
**Tautan Repositori:** [https://github.com/GionaldoCandr/web-password-stealth-vault](https://github.com/GionaldoCandr/web-password-stealth-vault)

---

## 1. Tabel Endpoint API Produk (Di Bawah `/api/v1`)

Seluruh kebutuhan fungsional dirujuk ke berkas spesifikasi kebutuhan produk `docs/kebutuhan.md` (selaras dengan `MATRIKS_KETERLACAKAN.md`). Produk **Stealth Password Vault** mengelola dua entitas PostgreSQL berelasi 1:N (`VaultCredential` dan `AuditLog`) melalui 7 operasi Route Handlers di bawah `/api/v1`:

| No | Metode | Path (di bawah `/api/v1`) | Kebutuhan yang Dilayani (`docs/kebutuhan.md`) | Semua Kode Status yang Mungkin |
| :---: | :---: | :--- | :---: | :--- |
| 1 | `GET` | `/api/v1/credentials` | **K-01, K-06, K-09** (Mengambil daftar kredensial terenkripsi berpaginasi dan filter kategori) | `200 OK`, `400 Bad Request`, `500 Internal Server Error` |
| 2 | `POST` | `/api/v1/credentials` | **K-01, K-02, K-06, K-09** (Menambahkan kredensial terenkripsi baru ke PostgreSQL dengan validasi Zod) | `201 Created`, `400 Bad Request`, `409 Conflict`, `422 Unprocessable Content`, `500 Internal Server Error` |
| 3 | `GET` | `/api/v1/credentials/{id}` | **K-01, K-06, K-09** (Membaca rincian satu kredensial terenkripsi berdasarkan ID) | `200 OK`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| 4 | `PATCH` | `/api/v1/credentials/{id}` | **K-01, K-06, K-07, K-09** (Memperbarui sebagian field kredensial atau status aktif `isActive`) | `200 OK`, `400 Bad Request`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Content`, `500 Internal Server Error` |
| 5 | `DELETE` | `/api/v1/credentials/{id}` | **K-01, K-05, K-09** (Menghapus kredensial bila tidak memiliki log audit aktif; `onDelete: Restrict`) | `204 No Content`, `400 Bad Request`, `404 Not Found`, `409 Conflict`, `500 Internal Server Error` |
| 6 | `GET` | `/api/v1/credentials/{id}/audit-logs` | **K-05, K-07, K-09** (Mengambil daftar jejak audit perangkat pada kredensial terkait) | `200 OK`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| 7 | `POST` | `/api/v1/credentials/{id}/audit-logs` | **K-05, K-07, K-09** (Mencatat riwayat inspeksi/sinkronisasi perangkat ke tabel `AuditLog`) | `201 Created`, `400 Bad Request`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Content`, `500 Internal Server Error` |

*(Catatan perilaku Next.js App Router: permintaan dengan metode yang tidak diekspor seperti `PUT` pada path di atas otomatis mengembalikan `405 Method Not Allowed`, dan `OPTIONS` otomatis menghasilkan `204 No Content` dengan header `Allow`.)*

---

## 2. Pengertian Sifat Aman (*Safe*) dan Idempoten (*Idempotent*)

Berdasarkan standar **RFC 9110 (HTTP Semantics)**:
- **Aman (*Safe*):** Metode HTTP bersifat aman apabila semantik operasinya hanya bersifat *read-only* dan **tidak mengubah keadaan (*state*) resource di server**. Permintaan aman boleh diulang secara otomatis maupun di-*cache* oleh klien/proxy.
- **Idempoten (*Idempotent*):** Metode HTTP bersifat idempoten apabila mengirim **satu atau beberapa permintaan yang identik menghasilkan efek akhir yang sama pada keadaan server** (meskipun kode status responsnya dapat berbeda, misalnya penghapusan pertama `204` dan pengulangan berikutnya `404`, karena kondisi akhir di basis data tetap sama: resource tersebut tidak ada).

Penentuan sifat untuk empat metode utama pada produk **Stealth Password Vault**:

| Metode | Aman (*Safe*)? | Idempoten? | Penjelasan & Contoh Konkret pada Produk |
| :---: | :---: | :---: | :--- |
| **`GET`** | **Ya** | **Ya** | **Alasan:** Hanya membaca data dari PostgreSQL tanpa memodifikasi tabel.<br>**Contoh:** `GET /api/v1/credentials?halaman=1&batas=10` selalu hanya mengambil satu halaman daftar kredensial tanpa menambah atau mengubah baris di tabel `VaultCredential`. |
| **`POST`** | **Tidak** | **Tidak** | **Alasan:** Setiap panggilan yang berhasil menciptakan resource baru atau berpotensi menggandakan efek di server.<br>**Contoh:** `POST /api/v1/credentials/13/audit-logs` (atau `POST /api/v1/credentials`) memodifikasi keadaan tabel di PostgreSQL dengan menambahkan baris rekaman baru. Mengulang permintaan `POST` berbeda/non-unik akan menciptakan entri baru lagi. |
| **`PATCH`** | **Tidak** | **Tidak dijamin** | **Alasan:** Memodifikasi sebagian data resource di server (tidak aman), dan berdasarkan RFC 9110 semantik `PATCH` **tidak dijamin idempoten** karena mutasi parsial dapat bergantung pada kondisi/operasi inkremental (meski mutasi sederhana `isActive: false` kebetulan sama, protokol tetap mengklasifikasikannya tidak dijamin idempoten).<br>**Contoh:** `PATCH /api/v1/credentials/19` dengan payload `{"isActive": false}` mengubah status kredensial pada database. |
| **`DELETE`** | **Tidak** | **Ya** | **Alasan:** Mengubah keadaan server dengan menghapus baris data (tidak aman), namun bersifat idempoten karena baik dipanggil 1 kali maupun 5 kali secara identik, hasil keadaan akhirnya di database sama-sama tidak ada lagi record tersebut.<br>**Contoh:** `DELETE /api/v1/credentials/19` pada eksekusi pertama menghapus kredensial ID 19 dan menjawab `204 No Content`; eksekusi kedua menjawab `404 Not Found`, tetapi keadaan akhir tabel tetap tidak memuat ID 19. |

---

## 3. Penentuan Kode Status untuk Empat Kasus Khusus

| No | Kasus Permintaan | Kode Status HTTP | Alasan Teknis (RFC 9110 & RFC 9457) |
| :---: | :--- | :---: | :--- |
| 1 | **Body bukan JSON** (misal `{"service":`) | **`400 Bad Request`** | Permintaan rusak secara sintaksis pada lapisan transport/format (*malformed syntax*). Fungsi `request.json()` di helper `bacaJson()` gagal mem-parsing payload sebelum validasi aturan bisnis/skema field dijalankan. |
| 2 | **JSON valid dengan kategori yang tidak dikenal** (misal `{"category": "transportasi"}`) | **`422 Unprocessable Content`** | Struktur dan sintaks JSON sudah sah serta dapat di-parse oleh server, namun isi/semantik nilainya melanggar aturan skema validasi Zod (`KATEGORI_VAULT` hanya menerima `"campus"`, `"finance"`, `"work"`, `"social"`). |
| 3 | **ID yang tidak ada** (misal `GET /api/v1/credentials/99999`) | **`404 Not Found`** | Format parameter path `id` sah (bilangan bulat positif), tetapi resource target tidak ditemukan di tabel `VaultCredential` (baik hasil `findUnique` bernilai `null` maupun eksepsi Prisma `P2025` pada `PATCH`/`DELETE`). |
| 4 | **Menghapus item yang masih memiliki data relasi** (misal `DELETE` kredensial dengan `AuditLog > 0`) | **`409 Conflict`** | Permintaan valid namun bertentangan (*conflict*) dengan keadaan data dan aturan integritas referensial `onDelete: Restrict` di PostgreSQL. Server memeriksa `auditLog.count()` terlebih dahulu dan menolak penghapusan dengan `409 Conflict` agar jejak audit keamanan tidak terhapus diam-diam maupun memicu crash foreign key `P2003`. |

---

## 4. Contoh Respons Galat Problem Details (RFC 9457) untuk Kasus `404`

Ketika klien mengirim permintaan `GET /api/v1/credentials/99999`, server merespons lengkap beserta header `Content-Type: application/problem+json` sebagai berikut:

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

---

## 5. Mengapa `params` di Route Handler Next.js 16 Harus di-`await` dan Divalidasi

1. **Alasan `params` harus di-`await`:**  
   Sejak Next.js 15 dan dilanjutkan pada Next.js 16, properti `params` pada argumen konteks kedua Route Handler bertipe asinkronus **`Promise<{ id: string }>`** (bagian dari kebijakan *Async Dynamic APIs* Next.js untuk mendukung rendering dinamis dan streaming tanpa memblokir rute secara sinkron). Jika kode langsung mengakses `params.id` tanpa `await`, TypeScript akan menolaknya pada pemeriksaan tipe statis dan pada saat runtime nilainya menjadi `undefined`, sehingga konversi angka menghasilkan `NaN`. Oleh karena itu, kode wajib menulis `(await params).id` atau menggunakan helper `await bacaId(params)`.
2. **Alasan nilainya wajib divalidasi sebelum dipakai pada kueri Prisma:**  
   Nilai `id` yang diekstrak dari URL selalu bertipe `string` dan berasal dari masukan klien yang tidak dapat dipercaya. Apabila string mentah seperti `"abc"`, `"0"`, `"-3"`, atau `"1.5"` langsung dikonversi dengan `Number(id)` atau `parseInt` dan diteruskan ke `prisma.vaultCredential.findUnique({ where: { id } })`, maka nilai `NaN` atau bilangan tidak valid akan memicu `PrismaClientValidationError` yang dapat menyebabkan galat internal server `500` maupun pemborosan kueri basis data. Validasi ketat via regex digit dan `skemaId` (`z.coerce.number().int().positive()`) di helper `bacaId()` memastikan masukan cacat langsung dihentikan lebih awal sebagai `400 Bad Request` dalam format Problem Details sebelum menyentuh Prisma.

---

## Catatan Pemanfaatan Kecerdasan Buatan (AI)
- **Alat Bantu:** Antigravity AI (Google Gemini).
- **Bagian yang Dibantu:** Penyelarasan pemetaan kebutuhan dari `docs/kebutuhan.md` & `MATRIKS_KETERLACAKAN.md` ke 7 operasi RESTful API `/api/v1/credentials`, perumusan penjelasan konseptual RFC 9110 (*safe* & *idempotent*), penetapan status 400/404/409/422, penyusunan contoh Problem Details RFC 9457, serta telaah mekanisme asynchronous `params` Next.js 16.
- **Cara Verifikasi:** Memeriksa langsung skema `prisma/schema.prisma`, kontrak skema Zod pada `src/lib/skema.ts`, helper `src/lib/api/problem.ts`, menjalankan `npx tsc --noEmit`, dan menguji respons aktual HTTP header/body dengan `curl -i` terhadap server Next.js lokal yang terhubung ke PostgreSQL.
