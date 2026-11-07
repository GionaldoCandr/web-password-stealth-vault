# STEALTH PASSWORD VAULT — WEB HUB & PERSISTENT DATABASE VAULT
## Portal Interaktif, Laboratorium Keamanan & Brankas Kredensial Persisten (Milestone 2)

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-7.10.1-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Zod](https://img.shields.io/badge/Validation-Zod%204-3E67B1?style=flat-square)](https://zod.dev/)
[![Milestone](https://img.shields.io/badge/Milestone-v0.2-emerald?style=flat-square)](https://github.com/giobap/Root-Pass-Project)

Modul web canggih berbasis **Next.js 16 App Router** yang menggabungkan:
1. **Interactive Security Lab & Curriculum Hub (Milestone 1 — v0.1):** Simulasi skenario ancaman siber, Master Password KDF, dan Zero-Disk RAM Vault.
2. **Persistent Database Vault (Milestone 2 — v0.2):** Pengelolaan data kredensial akun terenkripsi secara persisten di basis data PostgreSQL menggunakan Prisma ORM 7, Server Actions, dan validasi Zod.

---

## 📌 Pemetaan Kurikulum & Mata Kuliah Terpadu
Aplikasi ini dikembangkan untuk memenuhi capaian pembelajaran terintegrasi:
- **Pengembangan Aplikasi Web (052355 / 052356)** — Tugas 2 Milestone 2 (Sub-CPMK 3: C3, P4)
- **Kriptografi (052357)** — PBKDF2/Argon2id KDF, AES-256-GCM authenticated encryption
- **Keamanan Komputasi dan Siber (052353)** — Zero-Disk Footprint, RAM Zeroization, Audit Trail Non-Repudiation

---

## 🚀 Perubahan Utama Milestone 2 (`v0.1` ➔ `v0.2`)
| Fitur / Lapisan | Milestone 1 (`v0.1`) | Milestone 2 (`v0.2`) |
|---|---|---|
| **Penyimpanan Data** | Transient RAM Memory State (Zustand) | Persisten Relasional PostgreSQL 18 via Prisma ORM 7 |
| **Model Entitas** | Kredensial lokal tunggal di memori | Relasi 1:N: `VaultCredential` (Induk) &amp; `AuditLog` (Anak) |
| **Operasi CRUD** | Manipulasi array lokal sisi klien | Server Actions lengkap (Create, Read, Update, Delete) |
| **Integritas Relasi** | Tidak ada relasi basis data | `onDelete: Restrict` &amp; Transaksi Sekuensial Atomik (`prisma.$transaction`) |
| **Validasi Masukan** | Zod sisi browser | Validasi ketat sisi server (`src/lib/skema.ts`) dengan error map per field |
| **Penanganan Galat** | Try/catch standar | Penanganan Prisma Known Request Error (`P2002` duplicate, `P2025` not found) |
| **Antarmuka Rilis** | Hub Panduan &amp; Simulator Lab | Rute baru `/vault` (Katalog) &amp; `/vault/[id]` (Detail/Edit/Audit) |

---

## 🛠️ Arsitektur Teknologi & Prasyarat
- **Node.js**: `v20.x` atau lebih baru
- **Framework**: Next.js 16.4.2 (App Router, Server Actions, React 19)
- **Database**: PostgreSQL 18 (Port 5432)
- **ORM & Driver**: Prisma ORM 7.10.1 dengan `@prisma/adapter-pg`
- **Validasi**: Zod 4.6.7
- **Gaya & UI**: Tailwind CSS v4, Lucide React Icons

---

## 🗄️ Pemodelan Data Relasional (Prisma Schema)

```prisma
model VaultCredential {
  id              Int        @id @default(autoincrement())
  service         String     @unique
  category        String     @default("campus")
  username        String
  encryptedSecret String
  isActive        Boolean    @default(true)
  notes           String?
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt
  auditLogs       AuditLog[]
}

model AuditLog {
  id           Int             @id @default(autoincrement())
  deviceId     String
  action       String
  securityRate Int
  details      String
  createdAt    DateTime        @default(now())
  credentialId Int
  credential   VaultCredential @relation(fields: [credentialId], references: [id], onDelete: Restrict)

  @@unique([credentialId, deviceId])
}
```

### Karakteristik Desain Basis Data:
1. **Unik per Layanan (`@unique`):** Mencegah duplikasi akun untuk layanan web yang sama.
2. **Audit Trail Non-Repudiation (`onDelete: Restrict`):** Entitas anak `AuditLog` dilindungi dari penghapusan tidak disengaja.
3. **Integritas Perangkat (`@@unique([credentialId, deviceId])`):** Setiap perangkat hanya memiliki satu rekaman status audit aktif per kredensial.
4. **Transaksi Atomik (`prisma.$transaction`):** Penghapusan kredensial induk mengeksekusi penghapusan seluruh log anak terlebih dahulu secara atomik untuk memenuhi konstrain basis data.

---

## 💻 Panduan Instalasi & Menjalankan Aplikasi

### 1. Salin Konfigurasi Environment
Buat berkas `.env` dari salinan `.env.example`:
```bash
cp .env.example .env
```
Isi variabel koneksi PostgreSQL lokal:
```env
DATABASE_URL="postgresql://praktikum:lokal-saja-123@localhost:5432/produk?schema=public"
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Migrasi Skema Basis Data
Jalankan migrasi Prisma untuk membuat tabel di database PostgreSQL:
```bash
npx prisma migrate dev --name init
```

### 4. Sinkronisasi Prisma Client
```bash
npx prisma generate
```

### 5. Seeding Data Sintetis Awal (Idempotent)
Populasikan data awal kredensial dan rekam jejak audit menggunakan operasi `upsert`:
```bash
npx tsx prisma/seed.ts
```

### 6. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka tautan berikut pada peramban Anda:
- **Beranda & Lab Interaktif (Milestone 1):** [http://localhost:3000](http://localhost:3000)
- **Brankas Persisten PostgreSQL (Milestone 2):** [http://localhost:3000/vault](http://localhost:3000/vault)

---

## 🧪 Pengujian CRUD & Hasil Verifikasi

Seluruh 10 skenario pengujian (8 skenario CRUD dasar + 2 skenario relasi) telah diverifikasi dan memperoleh tingkat kelulusan **100% (10/10 Lulus)**.

Ringkasan skenario:
1. **Create Kredensial Valid:** Berhasil disimpan ke PostgreSQL dengan ID baru.
2. **Create Kredensial Invalid (Zod):** Penolakan server-side untuk string terlalu pendek dengan pesan inline error.
3. **Create Kredensial Duplikat (P2002):** Penolakan penambahan domain layanan yang sudah ada.
4. **Read Katalog Kredensial:** Menampilkan seluruh akun beserta counter agregasi log audit.
5. **Read Detail & Prefill:** Membuka `/vault/[id]` dengan formulir terisi otomatis dari basis data.
6. **Read 404 Not Found:** Penanganan graceful 404 via `not-found.tsx` untuk ID non-eksisten.
7. **Update Kredensial Valid:** Pembaruan data akun dan perubahan nilai `updatedAt`.
8. **Update Kredensial Konflik (P2002):** Penolakan saat mengubah nama domain menjadi bentrok dengan entitas lain.
9. **Create Relasi AuditLog:** Penambahan entri log audit baru terikat pada kredensial spesifik (1:N).
10. **Delete Relasi Atomik ($transaction):** Penghapusan transaksional berantai anak-lalu-induk mematuhi aturan `onDelete: Restrict`.

> 📄 **Laporan Lengkap Pengujian:** Silakan baca dokumentasi detail pada [docs/pengujian-crud.md](file:///c:/GIOIG/Root-Pass-Project/web-password-stealth-vault/docs/pengujian-crud.md).

---

## 📁 Struktur Direktori Penting
```
web-password-stealth-vault/
├── docs/
│   ├── pengujian-crud.md        # Laporan 10 skenario pengujian CRUD (Rubrik K1 & K2)
│   ├── teks_daring_tugas2_paw.md # Teks penyerahan daring untuk Moodle
│   └── praktikum/               # Dokumentasi praktikum mingguan (Week 7)
├── prisma/
│   ├── migrations/              # Berkas SQL migration resmi
│   ├── schema.prisma            # Skema entitas VaultCredential & AuditLog
│   └── seed.ts                  # Seeding idempotent via upsert
├── src/
│   ├── app/
│   │   ├── page.tsx             # Beranda & interactive lab simulator
│   │   └── vault/
│   │       ├── page.tsx         # Katalog kredensial & form tambah (Server Component)
│   │       ├── actions.ts       # Server Actions CRUD & Transaksi Prisma
│   │       ├── not-found.tsx    # Halaman 404 kredensial tidak ditemukan
│   │       ├── FormTambahCredential.tsx # Form tambah client component dengan useActionState
│   │       └── [id]/
│   │           ├── page.tsx     # Halaman detail kredensial & relasi audit (Dynamic route)
│   │           ├── FormEditCredential.tsx # Form perbarui kredensial
│   │           └── FormTambahAudit.tsx    # Form tambah log audit 1:N
│   ├── components/common/
│   │   └── HeaderNav.tsx        # Navigasi global terpadu (Beranda & Brankas DB)
│   └── lib/
│       ├── prisma.ts            # Prisma client singleton instance
│       └── skema.ts             # Skema validasi Zod sisi server
└── package.json
```

---

## 🛡️ Hak Cipta & Lisensi
Proyek ini dikembangkan secara independen untuk keperluan akademik Program Studi Ilmu Komputer Universitas Pertamina.
Lisensi: MIT.
