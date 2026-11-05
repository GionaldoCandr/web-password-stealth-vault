# Teks Daring Pengumpulan Modul 6 Praktikum PAW
## PostgreSQL dan Prisma ORM — Stealth Password Vault

Salin teks di bawah ini ke dalam kolom teks daring penyerahan tugas pada e-learning:

---

**Dokumen Teknis Modul 6 — PostgreSQL dan Prisma ORM**  
- **Nama Mahasiswa:** Gionaldo Chandrawansah  
- **NIM:** 105224031  
- **Mata Kuliah:** Praktikum Pengembangan Aplikasi Web (052356) · 1 SKS · Semester 5  
- **Dosen Pengampu:** Muhammad Fakhrul Safitra, S.Kom., M.Kom.  
- **Produk:** Stealth Password Vault — Zero-Disk Credential Management & Lab Hub  
- **Cabang Git:** `main`  
- **Tautan Repositori Dokumen Teknis di GitHub:**  
  https://github.com/GionaldoCandr/web-password-stealth-vault/blob/main/docs/praktikum/Week6/modul-06.md  

---

### Ringkasan Pemenuhan Rubrik Penilaian (Skor 4 / Maksimal 100%)

1. **Ketepatan Teknis (35%):**
   - Skema dua entitas berelasi 1:N berbasis produk Stealth Vault: `VaultCredential` (kredensial tersimpan) dan `AuditLog` (rekam jejak verifikasi & pairing perangkat).
   - Dilengkapi primary key (`SERIAL`), foreign key (`AuditLog_credentialId_fkey`), constraint unik `@unique` pada nama layanan (`service`), dan constraint unik komposit `@@unique([credentialId, deviceId])`.
   - Aturan penghapusan `onDelete: Restrict` dipilih secara sadar guna mencegah pemusnahan jejak audit forensik secara tidak sengaja.
   - Folder migrasi ter-commit (`prisma/migrations/20261016140000_init/migration.sql`).
   - Skrip `prisma/seed.ts` menggunakan operasi `upsert` sehingga *idempotent* dan dapat dijalankan ulang tanpa galat `P2002`.
   - Operasi CRUD dan transaksi atomik `prisma.$transaction` terimplementasi dan berfungsi penuh.

2. **Bukti Pengujian (30%):**
   - Bukti keluaran eksekusi `npx prisma db seed` dijalankan 2x berturut-turut menghasilkan jumlah entri kredensial dan audit yang sama (`Seed selesai: 6 item kredensial, 6 audit log`).
   - Bukti struktur tabel dan indeks relasi dari `psql` (`\d "AuditLog"`).
   - Bukti pengujian transaksi rollback atomik: ketika perintah kedua dipaksa gagal (P2025), penghapusan audit log (`deleteMany`) di-rollback 100% dan data tetap utuh.
   - 10 skenario pengujian fungsional CRUD dan relasi produk Stealth Vault tercatat lengkap dengan status **10/10 LULUS (100%)**.

3. **Penjelasan Keputusan Teknis (20%):**
   - Alasan aturan `onDelete: Restrict` untuk menjaga integritas data produk Stealth Vault dan mencegah hilangnya riwayat audit akses/pairing P2P.
   - Alasan constraint unik `@unique` (mencegah duplikasi entri layanan) dan `@@unique([credentialId, deviceId])` (satu perangkat hanya memiliki 1 status audit aktif per akun).
   - Alasan `upsert` pada seed untuk menjamin idempotensi saat pembangunan ulang lingkungan.
   - Pemilihan bentuk transaksi larik `prisma.$transaction([q1, q2])` untuk ketergantungan penghapusan berantai.

4. **Pencatatan Pemanfaatan AI (15%):**
   - Transparansi lengkap: alat bantu (Antigravity AI / Google Deepmind), rincian prompt perintah utama, bagian modul yang diadopsi, serta 4 tahapan cara verifikasi teknis (`tsc --noEmit`, verifikasi `psql`, uji seed berulang, dan uji transaksi rollback).

