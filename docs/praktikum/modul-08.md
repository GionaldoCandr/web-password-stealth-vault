# Dokumen Teknis Modul 8 — RESTful API dengan Route Handlers

**Nama/NIM:** Gionaldo Chandrawansah / 105224031  
**Mata Kuliah:** Praktikum Pengembangan Aplikasi Web (052356) · 1 SKS · Semester 5  
**Dosen Pengampu:** Muhammad Fakhrul Safitra, S.Kom., M.Kom.  
**Repositori:** [https://github.com/GionaldoCandr/web-password-stealth-vault](https://github.com/GionaldoCandr/web-password-stealth-vault)  
**Branch & Pull Request:** `praktikum/modul-08` $\rightarrow$ `main`  
**Produk:** Stealth Password Vault (`web-password-stealth-vault`)

---

## 1. Daftar Endpoint

Produk **Stealth Password Vault** mengekspos **7 operasi endpoint RESTful API** di bawah prefix berversi `/api/v1` yang melayani dua entitas relasional PostgreSQL (`VaultCredential` sebagai entitas induk dan `AuditLog` sebagai entitas anak 1:N). Kebutuhan produk dirujuk ke [`docs/kebutuhan.md`](../kebutuhan.md) (selaras dengan `MATRIKS_KETERLACAKAN.md`):

| No | Metode | Path (di bawah `/api/v1`) | Kebutuhan (`docs/kebutuhan.md`) | Kode Status yang Mungkin | Deskripsi Ringkas |
| :---: | :---: | :--- | :---: | :--- | :--- |
| 1 | `GET` | `/api/v1/credentials` | **K-01, K-06, K-09** | `200`, `400`, `500` | Mengambil daftar kredensial terenkripsi dengan paginasi (`halaman`, `batas`) dan filter `kategori`. |
| 2 | `POST` | `/api/v1/credentials` | **K-01, K-02, K-06, K-09** | `201`, `400`, `409`, `422`, `500` | Membuat entri kredensial terenkripsi baru dan mengembalikan header `Location`. |
| 3 | `GET` | `/api/v1/credentials/{id}` | **K-01, K-06, K-09** | `200`, `400`, `404`, `500` | Mengambil rincian satu kredensial berdasarkan ID numerik positif. |
| 4 | `PATCH` | `/api/v1/credentials/{id}` | **K-01, K-06, K-07, K-09** | `200`, `400`, `404`, `409`, `422`, `500` | Memperbarui sebagian field kredensial (body `{}` ditolak `422`). |
| 5 | `DELETE` | `/api/v1/credentials/{id}` | **K-01, K-05, K-09** | `204`, `400`, `404`, `409`, `500` | Menghapus kredensial jika tidak memiliki relasi `AuditLog` aktif (`409` bila masih berelasi). |
| 6 | `GET` | `/api/v1/credentials/{id}/audit-logs` | **K-05, K-07, K-09** | `200`, `400`, `404`, `500` | Mengambil riwayat jejak audit perangkat berelasi milik kredensial tertentu. |
| 7 | `POST` | `/api/v1/credentials/{id}/audit-logs` | **K-05, K-07, K-09** | `201`, `400`, `404`, `409`, `422`, `500` | Mencatat log audit keamanan baru dari perangkat klien pada kredensial tertentu. |

*(Metode HTTP yang tidak diekspor seperti `PUT /api/v1/credentials/{id}` otomatis dijawab Next.js App Router dengan **`405 Method Not Allowed`**, dan permintaan `OPTIONS` otomatis menghasilkan **`204 No Content`** beserta header `Allow`.)*

---

## 2. Implementasi Route Handler dan Validasi

### A. Struktur Folder `src/app/api/v1` dan Helper `src/lib/api/problem.ts`

Seluruh berkas Route Handlers ditempatkan terpisah dari halaman antarmuka web (`page.tsx`) di dalam pohon direktori berikut:

```text
src/
├── app/
│   └── api/
│       └── v1/
│           └── credentials/
│               ├── route.ts                     # GET, POST /api/v1/credentials
│               └── [id]/
│                   ├── route.ts                 # GET, PATCH, DELETE /api/v1/credentials/{id}
│                   └── audit-logs/
│                       └── route.ts             # GET, POST /api/v1/credentials/{id}/audit-logs
└── lib/
    ├── skema.ts                                 # Skema Zod 4 bersama (Server Action + REST API)
    └── api/
        └── problem.ts                           # Helper RFC 9457, bacaJson, bacaId, & pembungkus 500
```

Isi berkas [`src/lib/api/problem.ts`](../../src/lib/api/problem.ts) mengimplementasikan empat fungsi inti plus pembungkus opsional `denganPenangananGalat()`:
- **`problem(status, title, extra)`**: Mengembalikan `Response.json({ type: "about:blank", title, status, ...extra }, { status, headers: { "Content-Type": "application/problem+json" } })`.
- **`galatValidasi(error)`**: Mengekstrak pesan per field via `z.flattenError(error)` dan merespons dengan `422 Unprocessable Content`.
- **`bacaJson(request)`**: Membaca payload `request.json()` secara aman dalam `try-catch`; mengembalikan `{ ok: false, res }` berupa `400 Bad Request` apabila body bukan JSON valid.
- **`bacaId(params)`**: Meng-`await params` (`Promise<{ id: string }>`), memverifikasi karakter hanya digit angka (`/^\d+$/`), lalu mem-parsing via `skemaId` agar nilai non-bilangan bulat positif (`abc`, `0`, `-3`, `1.5`) langsung ditolak sebelum menyentuh Prisma.
- **`denganPenangananGalat(handler)` *(Tantangan Pengayaan)***: Pembungkus generic Route Handler yang menangkap eksepsi tak terduga di tingkat atas, mencatat log penuh di terminal server melalui `console.error`, dan mengirim respons aman `500 Internal Server Error` berformat `application/problem+json` lengkap dengan field `instance` berisi pathname permintaan tanpa membocorkan *stack trace* atau galat Prisma mentah.

---

### B. Skema Zod 4 yang Dipakai (`src/lib/skema.ts`)

Aturan dasar field didefinisikan satu kali pada `skemaCredentialDasar` dan `skemaAuditLogDasar` untuk dipakai bersama oleh **Server Actions (Modul 5/6)** dan **Route Handlers (Modul 8)**:

1. **Validasi Body JSON:**
   - `skemaCredentialBaru`: Memperluas `skemaCredentialDasar` (`service` min 3 max 100, `category` enum `["campus", "finance", "work", "social"]`, `username` min 3 max 80, `encryptedSecret` min 8 max 512, `notes` opsional max 500) ditambah `isActive: z.boolean().default(true)`. Berbeda dari `skemaVaultCredential` (FormData HTML yang mentransformasi string `"true"`/`"false"`), API menerima boolean JSON ketat sehingga string `"false"` ditolak dengan `422`.
   - `skemaCredentialUbah`: Versi `.partial()` dari `skemaCredentialDasar` + `isActive: z.boolean()`, dilengkapi `.refine((o) => Object.keys(o).length > 0, { error: "Kirim minimal satu field yang diubah." })` untuk menolak `{}`.
   - `skemaAuditLogBaru`: Memvalidasi `deviceId` (3–50 karakter), `action` (2–60 karakter), `details` (5–500 karakter), dan `securityRate` bertipe angka bulat `1..5`.
2. **Validasi Parameter Path (`{id}`):**
   - `skemaId = z.coerce.number().int().positive()` dipadukan dengan pengecekan digit murni `/^\d+$/` pada `bacaId()`.
3. **Validasi Parameter Kueri (`GET /credentials`):**
   - `skemaKueriCredential`: `halaman` (bilangan bulat $\ge 1$, default `1`), `batas` (bilangan bulat $1..50$, default `10`), dan `kategori` opsional bertipe enum `KATEGORI_VAULT`.

---

### C. Aturan Pemetaan Hasil ke Kode Status HTTP

| Kode Status | Kondisi Pemetaan di Handler |
| :---: | :--- |
| **`200 OK`** | `GET` daftar/detail/audit-logs berhasil atau `PATCH` berhasil memperbarui data di PostgreSQL. |
| **`201 Created`** | `POST /credentials` atau `POST /credentials/{id}/audit-logs` berhasil membuat baris baru (disertai header `Location`). |
| **`204 No Content`** | `DELETE /credentials/{id}` berhasil menghapus baris tanpa body respons. |
| **`400 Bad Request`** | Bentuk permintaan rusak: payload bukan JSON valid (`bacaJson`), parameter kueri melanggar batas (mis. `batas=500`), atau parameter path `id` bukan bilangan bulat positif (mis. `id=abc`). |
| **`404 Not Found`** | Parameter `id` sah, namun record `VaultCredential` tidak ditemukan di database (`findUnique === null` atau Prisma error `P2025` pada `PATCH`/`DELETE`). |
| **`405 Method Not Allowed`** | Otomatis oleh Next.js bila klien memanggil metode HTTP yang tidak diekspor pada path tersebut (mis. `PUT /api/v1/credentials/13`). |
| **`409 Conflict`** | Bertentangan dengan keadaan data saat ini: (a) `DELETE` kredensial yang masih memiliki relasi `AuditLog` (`jumlahAudit > 0`), atau (b) Prisma `P2002` akibat duplikasi `@unique` `service` pada `POST`/`PATCH` serta duplikasi `@@unique([credentialId, deviceId])` pada `POST audit-logs`. |
| **`422 Unprocessable Content`** | JSON valid secara sintaks, tetapi gagal lolos validasi aturan skema Zod (mis. `category: "transportasi"`, string terlalu pendek, atau body `PATCH` kosong `{}`). |
| **`500 Internal Server Error`** | Galat tak terduga (mis. koneksi database putus) ditangkap oleh `denganPenangananGalat()` dan dikembalikan sebagai Problem Details aman ber-`instance`. |

---

## 3. Format Galat Problem Details (RFC 9457)

Berikut tangkapan respons HTTP aktual langsung dari pengujian `curl.exe -i` terhadap server Next.js produk:

### A. Respons `400 Bad Request` (Body Bukan JSON)
```http
HTTP/1.1 400 Bad Request
content-type: application/problem+json

{"type":"about:blank","title":"Bad Request","status":400,"detail":"Body harus JSON yang valid."}
```

### B. Respons `404 Not Found` (ID Tidak Ditemukan)
```http
HTTP/1.1 404 Not Found
content-type: application/problem+json

{"type":"about:blank","title":"Not Found","status":404,"detail":"Kredensial 99999 tidak ditemukan."}
```

### C. Respons `409 Conflict` (`DELETE` Item yang Masih Memiliki Relasi `AuditLog`)
```http
HTTP/1.1 409 Conflict
content-type: application/problem+json

{"type":"about:blank","title":"Conflict","status":409,"detail":"Kredensial 13 masih memiliki 1 log audit terkait."}
```

### D. Respons `422 Unprocessable Content` (JSON Valid, Gagal Validasi Zod)
```http
HTTP/1.1 422 Unprocessable Entity
content-type: application/problem+json

{"type":"about:blank","title":"Unprocessable Content","status":422,"detail":"Data tidak lolos validasi.","errors":{"service":["Nama layanan minimal 3 karakter"],"category":["Kategori tidak dikenal (pilih: campus, finance, work, social)"],"username":["Username minimal 3 karakter"],"encryptedSecret":["Ciphertext minimal 8 karakter"]}}
```
*(Catatan teknis: Node.js `Response.json(..., { status: 422 })` mengirimkan frasa alasan HTTP `422 Unprocessable Entity` pada baris status TCP HTTP/1.1 sesuai tabel status bawaan runtime Node, sedangkan payload `title` RFC 9457 eksplisit menuliskan `"Unprocessable Content"` sesuai RFC 9110 §15.5.21.)*

---

## 4. Spesifikasi OpenAPI

- **Berkas Kontrak OpenAPI 3.1.0:** [`docs/api/openapi.yaml`](../api/openapi.yaml)
- **Konfigurasi Linter Redocly:** [`redocly.yaml`](../../redocly.yaml)
- **Bundel Dokumentasi HTML Interaktif:** [`docs/api/index.html`](../api/index.html) (299 KiB)

### Keluaran `npx @redocly/cli lint docs/api/openapi.yaml`
```text
validating docs\api\openapi.yaml...
docs\api\openapi.yaml: validated in 75ms

Woohoo! Your API description is valid. 🎉
```
*(Lolos bersih dengan **0 galat** dan **0 peringatan**.)*

### Keluaran `npx @redocly/cli build-docs docs/api/openapi.yaml -o docs/api/index.html`
```text
Found redocly.yaml and using 'openapi' options
Prerendering docs

🎉 bundled successfully in: docs/api/index.html (299 KiB) [⏱ 439ms].
```

### Selisih yang Ditemukan Antara Spesifikasi Awal dan Implementasi Kode serta Perbaikannya
1. **Penanganan Konflik Unik (`P2002`) pada `POST` dan `PATCH`**: Pada draf awal, hanya operasi `DELETE` yang mencantumkan respons `"409"`. Karena model `VaultCredential` memiliki `@unique` pada kolom `service` (dan `AuditLog` memiliki `@@unique([credentialId, deviceId])`), kode Route Handler menangani `P2002` menjadi `409 Conflict` serta kontrak OpenAPI diperbarui untuk mencantumkan `"409": { $ref: "#/components/responses/Problem" }` pada operasi `POST` dan `PATCH`.
2. **Tipe Kolom Opsional Nullable `notes`**: Pada input `CredentialBaru`, field `notes` bersifat opsional (`string | undefined`), sedangkan objek balikan `VaultCredential` dari PostgreSQL/Prisma mengembalikan `notes: string | null`. Untuk menjaga kepatuhan OpenAPI 3.1.0 (JSON Schema 2020-12), skema respons `Credential` mendefinisikan `notes: { type: ["string", "null"], maxLength: 500 }`, sementara skema input `CredentialBaru` dan `CredentialUbah` memakai `type: string`.
3. **Keselarasan Batas Panjang String**: Batas panjang `service` (`minLength: 3, maxLength: 100`), `username` (`3..80`), `encryptedSecret` (`8..512`), dan `notes` (`maxLength: 500`) di `docs/api/openapi.yaml` disamakan persis dengan `src/lib/skema.ts`.
4. **Definisi Keamanan dan Parameter Path**: Menambahkan `security: []` di root OpenAPI dan mereferensikan `$ref: "#/components/parameters/IdCredential"` di tingkat path sesuai aturan `security-defined` dan `path-parameters-defined` pada Redocly `recommended`.

---

## 5. Hasil Pengujian Manual

Pengujian langsung dilakukan terhadap server produksi Next.js 16.4.6 yang terhubung ke basis data PostgreSQL lokal melalui `curl.exe -i` serta koleksi Bruno di [`docs/api/bruno/`](../api/bruno/).

### Tabel 19 Kasus Uji Manual (`curl.exe -i`)

| No | Permintaan | Status Harapan | Status Aktual | Hasil |
| :---: | :--- | :---: | :---: | :---: |
| 1 | `GET /api/v1/credentials?batas=2` | `200` | `200 OK` | **LULUS** |
| 2 | `GET /api/v1/credentials?kategori=work` | `200` | `200 OK` | **LULUS** |
| 3 | `GET /api/v1/credentials?batas=500` (melebihi batas max 50) | `400` | `400 Bad Request` (`application/problem+json`) | **LULUS** |
| 4 | `POST /api/v1/credentials` payload sah (`vault-api-demo.sentinel.local`) | `201` | `201 Created` + `Location: /api/v1/credentials/19` | **LULUS** |
| 5 | `POST /api/v1/credentials` body rusak bukan JSON (`{"service":`) | `400` | `400 Bad Request` (`application/problem+json`) | **LULUS** |
| 6 | `POST /api/v1/credentials` kategori tidak dikenal `"transportasi"` | `422` | `422 Unprocessable Entity` (`application/problem+json`) | **LULUS** |
| 7 | `POST /api/v1/credentials` duplikat `service` (`P2002`) | `409` | `409 Conflict` (`application/problem+json`) | **LULUS** |
| 8 | `GET /api/v1/credentials/13` (ID sah tersedia) | `200` | `200 OK` | **LULUS** |
| 9 | `GET /api/v1/credentials/abc` (parameter path ilegal) | `400` | `400 Bad Request` (`application/problem+json`) | **LULUS** |
| 10 | `GET /api/v1/credentials/99999` (ID tidak ada) | `404` | `404 Not Found` (`application/problem+json`) | **LULUS** |
| 11 | `PATCH /api/v1/credentials/19` payload parsial sah (`{"isActive":false}`) | `200` | `200 OK` (`isActive` berubah menjadi `false`) | **LULUS** |
| 12 | `PATCH /api/v1/credentials/19` body kosong `{}` | `422` | `422 Unprocessable Entity` (`application/problem+json`) | **LULUS** |
| 13 | `DELETE /api/v1/credentials/13` (masih punya 1 `AuditLog`) | `409` | `409 Conflict` (`application/problem+json`) | **LULUS** |
| 14 | `DELETE /api/v1/credentials/19` (tanpa relasi, eksekusi pertama) | `204` | `204 No Content` (body kosong) | **LULUS** |
| 15 | `DELETE /api/v1/credentials/19` (eksekusi kedua, uji idempoten) | `404` | `404 Not Found` (`application/problem+json`) | **LULUS** |
| 16 | `GET /api/v1/credentials/13/audit-logs` (nested relasi 1:N) | `200` | `200 OK` | **LULUS** |
| 17 | `PUT /api/v1/credentials/13` (metode tidak diekspor) | `405` | `405 Method Not Allowed` | **LULUS** |
| 18 | `OPTIONS /api/v1/credentials/13` | `204` | `204 No Content` + `allow: DELETE, GET, HEAD, OPTIONS, PATCH` | **LULUS** |
| 19 | `POST /api/v1/credentials/13/audit-logs` (uji `201` lalu duplikat `deviceId` `409`) | `201` & `409` | `201 Created` lalu `409 Conflict` | **LULUS** |

**Persentase Kasus Lulus:** **19 / 19 (100% Lulus)** — melampaui target minimum 90%.

### Cuplikan Keluaran Autentik `curl.exe -i`
```http
$ curl.exe -i -X POST "http://localhost:3000/api/v1/credentials" -H "Content-Type: application/json" -d '{"service":"vault-api-demo.sentinel.local","category":"work","username":"api-tester","encryptedSecret":"U2FsdGVkX19TestCipher999=","isActive":true}'
HTTP/1.1 201 Created
content-type: application/json
location: /api/v1/credentials/19

{"id":19,"service":"vault-api-demo.sentinel.local","category":"work","username":"api-tester","encryptedSecret":"U2FsdGVkX19TestCipher999=","isActive":true,"notes":"Kredensial uji Route Handler Modul 8","createdAt":"2026-11-27T02:36:41.874Z"}

$ curl.exe -i -X DELETE "http://localhost:3000/api/v1/credentials/19"
HTTP/1.1 204 No Content

$ curl.exe -i -X DELETE "http://localhost:3000/api/v1/credentials/19"
HTTP/1.1 404 Not Found
content-type: application/problem+json

{"type":"about:blank","title":"Not Found","status":404,"detail":"Kredensial 19 tidak ditemukan."}

$ curl.exe -i -X DELETE "http://localhost:3000/api/v1/credentials/13"
HTTP/1.1 409 Conflict
content-type: application/problem+json

{"type":"about:blank","title":"Conflict","status":409,"detail":"Kredensial 13 masih memiliki 1 log audit terkait."}

$ curl.exe -i -X OPTIONS "http://localhost:3000/api/v1/credentials/13"
HTTP/1.1 204 No Content
allow: DELETE, GET, HEAD, OPTIONS, PATCH
```

### Tangkapan Layar Koleksi Bruno & Pratinjau OpenAPI
> *(Catatan: Tempatkan tangkapan layar Anda pada folder `docs/praktikum/Week8/` lalu pastikan nama berkas sesuai panduan pengisian di bawah ini.)*
- Koleksi Bruno telah disiapkan di [`docs/api/bruno/`](../api/bruno/) berisi 6 skenario berasersi (`res.status`).
- ![Hasil Runner Koleksi Bruno Modul 8](Week8/bruno-runner.png)
- ![Pratinjau Dokumentasi Redoc docs/api/index.html](Week8/redoc-preview.png)

---

## 6. Keputusan Teknis dan Kendala

1. **Pemilihan `400 Bad Request` vs `422 Unprocessable Content` (RFC 9110 §15.5.1 & §15.5.21; RFC 9457):**
   - `400 Bad Request` digunakan khusus untuk cacat **sintaksis atau format tingkat permintaan** sebelum validasi domain, yaitu: body yang gagal di-parse oleh `request.json()` (`bacaJson`), parameter kueri ilegal (`batas=500`), atau parameter path `id` non-bilangan bulat positif (`id=abc`).
   - `422 Unprocessable Content` digunakan ketika struktur transport HTTP dan sintaks JSON **sepenuhnya valid**, namun isi/semantik payload gagal memenuhi aturan skema bisnis Zod 4 (misalnya `category: "transportasi"`, string di bawah `minLength`, atau body `PATCH` kosong `{}`), disertai objek ekstensi `errors` hasil `z.flattenError()`.
2. **Pemilihan `409 Conflict` pada `DELETE /api/v1/credentials/{id}` vs `onDelete: Cascade`:**
   - Skema Prisma produk (`AuditLog`) menggunakan aturan referensial **`onDelete: Restrict`**. Pada produk pengelola kredensial keamanan, menghapus akun induk beserta seluruh riwayat auditnya secara diam-diam via `Cascade` akan melanggar prinsip jejak audit forensik (*non-repudiation*).
   - Oleh karena itu, endpoint API `DELETE /api/v1/credentials/{id}` secara eksplisit menghitung relasi anak `auditLog.count()` sebelum menghapus dan mengembalikan **`409 Conflict`** jika masih ada `AuditLog` terkait (mencegah kebocoran exception `P2003` sekaligus melindungi jejak audit). Sementara itu, penghapusan berantai sadar (*conscious atomic deletion*) di UI tetap dilayani secara eksplisit melalui `prisma.$transaction` pada Server Action `/vault`.
3. **Pembatasan Maksimum Paginasi (`batas <= 50`):**
   - Parameter `batas` dibatasi ketat maksimal `50` pada skema Zod (`skemaKueriCredential`) dan kontrak OpenAPI (`maximum: 50`). Hal ini mencegah kerentanan **OWASP API4:2023 (*Unrestricted Resource Consumption*)**, di mana klien dapat meminta `?batas=1000000` dan memicu lonjakan memori server serta penguncian I/O PostgreSQL.
4. **Struktur Path Berversi (`/api/v1`) dan Penamaan Resource Jamak:**
   - Menggunakan segmen `/api/v1/` agar kontrak API terisolasi dari halaman App Router (`page.tsx`) serta menjaga kompatibilitas ke belakang (*backwards compatibility*) bila terjadi perubahan destruktif di `/api/v2`. Nama path memakai bentuk jamak sesuai standar desain koleksi REST: `/credentials`, `/credentials/{id}`, dan `/credentials/{id}/audit-logs`.
5. **Kendala Pengujian `curl` di Windows PowerShell:**
   - Di Windows PowerShell, `curl` merupakan alias bawaan untuk `Invoke-WebRequest` dan parsing tanda kutip ganda/tunggal JSON di baris perintah kerap memicu galat *malformed JSON* (`400`). Kendala diselesaikan dengan memanggil biner asli `curl.exe` serta mengirim payload JSON melalui berkas (`--data "@file.json"`) atau melalui antarmuka grafis Bruno.

---

## 7. Catatan Pemanfaatan AI

- **Alat Bantu:** Antigravity AI (Google Gemini).
- **Perintah Utama (*Prompt*)**: Menerapkan materi Modul 8 RESTful API dengan Route Handlers pada produk `web-password-stealth-vault` (mencakup helper RFC 9457, skema Zod 4 bersama, Route Handlers `/api/v1/credentials`, spesifikasi OpenAPI 3.1.0 + Redocly CLI lint, koleksi Bruno, Tugas Pendahuluan, dan Dokumen Teknis).
- **Bagian yang Digunakan dan Disesuaikan:**
  1. Refactoring `src/lib/skema.ts` untuk memisahkan `skemaCredentialDasar` (dipakai bersama UI FormData dan REST API JSON) serta menambahkan `skemaCredentialBaru`, `skemaCredentialUbah`, `skemaKueriCredential`, `skemaAuditLogBaru`, dan `skemaId`.
  2. Implementasi `src/lib/api/problem.ts` termasuk helper `problem()`, `galatValidasi()`, `bacaJson()`, `bacaId()` (dengan tambahan regex digit ketat `/^\d+$/`), dan pembungkus galat 500 `denganPenangananGalat<TReq, TArgs>()` yang disesuaikan agar generik TypeScript cocok dengan `NextRequest` maupun `Request`.
  3. Implementasi Route Handlers `/api/v1/credentials`, `/api/v1/credentials/[id]`, dan `/api/v1/credentials/[id]/audit-logs` lengkap dengan penanganan Prisma `P2002` (`409`) & `P2025` (`404`).
  4. Penyusunan kontrak `docs/api/openapi.yaml` OpenAPI 3.1.0 dan skenario Bruno `docs/api/bruno/`.
- **Cara Memverifikasi Hasil:**
  1. Pemeriksaan tipe statis `npx tsc --noEmit` (hasil: **0 galat**).
  2. Pemeriksaan linter kode `npm run lint` (hasil: **0 galat**).
  3. Pemeriksaan kontrak OpenAPI `npx @redocly/cli lint docs/api/openapi.yaml` (hasil: **`Woohoo! Your API description is valid.`**, 0 galat & 0 peringatan) dan bundel HTML `docs/api/index.html`.
  4. Pengujian build produksi `npm run build` (berhasil dengan 3 rute dinamis API `/api/v1/...`).
  5. Pengujian langsung HTTP end-to-end 19 kasus uji dengan `curl.exe -i` ke server produksi Next.js dan PostgreSQL lokal (**19/19 lulus**).
