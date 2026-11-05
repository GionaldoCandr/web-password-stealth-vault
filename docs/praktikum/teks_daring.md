# Teks Daring Pengumpulan Modul 6 Praktikum PAW
## PostgreSQL dan Prisma ORM

Salin teks di bawah ini ke dalam kolom teks daring penyerahan tugas pada e-learning:

---

**Dokumen Teknis Modul 6 — PostgreSQL dan Prisma ORM**  
- **Nama Mahasiswa:** Gionaldo Chandrawansah  
- **NIM:** 105224031  
- **Mata Kuliah:** Praktikum Pengembangan Aplikasi Web (052356) · 1 SKS · Semester 5  
- **Dosen Pengampu:** Muhammad Fakhrul Safitra, S.Kom., M.Kom.  
- **Produk:** Stealth Password Vault — Interactive Documentation & Lab Hub  
- **Cabang Git:** `main`  
- **Tautan Repositori Dokumen Teknis di GitHub:**  
  https://github.com/GionaldoCandr/web-password-stealth-vault/blob/main/docs/praktikum/modul-06.md  

---

### Ringkasan Pemenuhan Rubrik Penilaian (Skor 4 / Maksimal 100%)

1. **Ketepatan Teknis (35%):**
   - Skema dua entitas berelasi 1:N (`Item` dan `Ulasan`) dengan primary key (`SERIAL`), foreign key (`Ulasan_itemId_fkey`), constraint unik (`Item_judul_key` & `Ulasan_itemId_nama_key`), serta aturan `onDelete: Restrict` yang dipilih secara sadar demi keamanan audit data.
   - Folder migrasi ter-commit (`prisma/migrations/20261016140000_init/migration.sql`).
   - Skrip `prisma/seed.ts` menggunakan operasi `upsert` sehingga *idempotent* dan dapat dijalankan ulang tanpa galat `P2002`.
   - Operasi CRUD dan transaksi atomik `prisma.$transaction` terimplementasi dan berfungsi penuh.

2. **Bukti Pengujian (30%):**
   - Bukti keluaran eksekusi `npx prisma db seed` dijalankan 2x berturut-turut menghasilkan jumlah item dan ulasan yang sama (`Seed selesai: 6 item, 6 ulasan`).
   - Bukti struktur tabel dan indeks relasi dari `psql` (`\d "Ulasan"`).
   - Bukti pengujian transaksi rollback atomik: ketika perintah kedua dipaksa gagal (P2025), penghapusan ulasan (`deleteMany`) di-rollback 100% dan data tetap utuh.
   - 10 skenario pengujian fungsional CRUD dan relasi tercatat lengkap dengan status **10/10 LULUS (100%)**.

3. **Penjelasan Keputusan Teknis (20%):**
   - Alasan aturan `onDelete: Restrict` untuk menjaga integritas data produk dan mencegah penghapusan ulasan/audit tanpa sadar.
   - Alasan constraint unik `@unique` (mencegah judul ganda) dan `@@unique([itemId, nama])` (satu nama hanya boleh mengulas satu kali per item).
   - Alasan `upsert` pada seed untuk menjamin idempotensi saat pembangunan ulang lingkungan.
   - Pemilihan bentuk transaksi larik `prisma.$transaction([q1, q2])` untuk ketergantungan penghapusan berantai.

4. **Pencatatan Pemanfaatan AI (15%):**
   - Transparansi lengkap: alat bantu (Antigravity AI / Google Deepmind), rincian prompt perintah utama, bagian modul yang diadopsi, serta 4 tahapan cara verifikasi teknis (`tsc --noEmit`, verifikasi `psql`, uji seed berulang, dan uji transaksi rollback).
