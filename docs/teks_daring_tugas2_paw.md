# Teks Daring Pengumpulan Tugas 2 (Milestone 2) — Pemrograman Aplikasi Web

**Mata Kuliah:** Pemrograman Aplikasi Web (052355 / 052356)  
**Tugas:** Tugas 2 — Milestone 2: Integrasi Logika Server dan Database Produk Web  
**Sub-CPMK:** 3 (C3, P4)  
**Nama Mahasiswa / NIM:** [Nama Lengkap Anda] / [NIM Anda]  
**Repositori GitHub:** https://github.com/GionaldoCandr/web-password-stealth-vault (Monorepo root: https://github.com/giobap/Root-Pass-Project)  
**Folder Produk:** `web-password-stealth-vault/`  
**Penanda Rilis (Git Tag):** `v0.2`  
**Hash Commit:** `e65a244e30949065d8911ddcea73181a08088875`  

---

### Ringkasan Capaian Milestone 2 (v0.2)
Pada Milestone 2 ini, produk **Stealth Password Vault** telah berhasil mengintegrasikan logika server Next.js 16 App Router dengan basis data relasional PostgreSQL 18 melalui Prisma ORM 7, mencakup:

1. **Pemodelan Data Relasional 1:N (Prisma ORM 7 & PostgreSQL):**
   - Entitas Induk: `VaultCredential` (id, service, category, username, encryptedSecret, isActive, notes, createdAt, updatedAt).
   - Entitas Anak: `AuditLog` (id, deviceId, action, securityRate, details, createdAt, credentialId).
   - Integritas referensial: `onDelete: Restrict` untuk integritas audit non-repudiation, dan composite unique constraint `@@unique([credentialId, deviceId])`.
   - File migrasi SQL ter-commit di `prisma/migrations/20261016140000_init/migration.sql`.
   - Seeding data sintetis idempotent via `prisma/seed.ts` menggunakan operasi `upsert`.

2. **Logika Server & Server Actions (`src/app/vault/actions.ts`):**
   - Operasi CRUD penuh: `tambahCredential`, `ubahCredential`, `hapusCredential`, `tambahAuditLog`, dan `hapusAuditLog`.
   - Transaksi sekuensial atomik (`prisma.$transaction`) untuk penghapusan entitas berelasi secara aman.
   - Penempatan `redirect("/vault")` di luar blok `try-catch` sesuai standar arsitektur Next.js.
   - Revalidasi cache reaktif via `revalidatePath`.

3. **Validasi Masukan Sisi Server (Zod 4):**
   - Skema validasi terpusat pada `src/lib/skema.ts` (`skemaVaultCredential` dan `skemaAuditLog`).
   - Penanganan error granular per field dengan umpan balik visual interaktif pada UI (`useActionState`).
   - Penanganan kode galat Prisma: `P2002` (bentrok nama layanan unik) dan `P2025` (entitas tidak ditemukan).

4. **Keterhubungan Antarmuka Pengguna (UI Integration):**
   - Halaman `/vault`: Katalog kredensial persisten, badge kategori, counter dinamis log audit, dan formulir tambah akun baru.
   - Halaman `/vault/[id]`: Detail akun, form pembaruan data prefilled, formulir pencatatan log audit perangkat, kartu histori audit dengan tombol hapus, dan zona bahaya transaksi atomik.
   - Halaman `/vault/not-found.tsx`: Penanganan fallback 404 elegan saat record tidak ditemukan.
   - Navigasi global terintegrasi pada `HeaderNav.tsx` menuju `/vault` berlabel "Brankas DB v0.2".

5. **Hasil Pengujian CRUD:**
   - 10 skenario pengujian (8 CRUD + 2 Relasi) telah dijalankan dengan tingkat kelulusan **100% (10/10 lulus)**.
   - Laporan lengkap pengujian terdokumentasi pada berkas `docs/pengujian-crud.md`.
