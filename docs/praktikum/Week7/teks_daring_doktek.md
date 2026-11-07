# Teks Daring Pengumpulan Dokumen Teknis Modul 7
## Debugging dan Telaah Kode — Stealth Password Vault

Salin teks di bawah ini ke kolom teks daring pengumpulan Dokumen Teknis Modul 7 di e-learning:

---

**Dokumen Teknis Modul 7 — Debugging dan Telaah Kode**  
- **Nama Mahasiswa:** Gionaldo Chandrawansah  
- **NIM:** 105224031  
- **Mata Kuliah:** Praktikum Pengembangan Aplikasi Web (052356) · 1 SKS · Semester 5  
- **Dosen Pengampu:** Muhammad Fakhrul Safitra, S.Kom., M.Kom.  
- **Produk:** Stealth Password Vault (`web-password-stealth-vault`)  
- **Tautan Repositori Dokumen Teknis di GitHub:**  
  https://github.com/GionaldoCandr/web-password-stealth-vault/blob/main/docs/praktikum/Week7/modul-07.md  
  *(Atau alternatif berkas standar: https://github.com/GionaldoCandr/web-password-stealth-vault/blob/main/docs/praktikum/modul-07.md)*  
- **Tautan Pull Request (PR):**  
  https://github.com/GionaldoCandr/web-password-stealth-vault/pull/1  

---

### Ringkasan Pemenuhan Rubrik Penilaian (Skor Maksimal 100 Poin)

1. **Ketepatan Teknis (35%):**
   - 4 galat pada usulan kode AI berhasil diidentifikasi dan diperbaiki pada akar penyebabnya:
     - **Issue #11:** Memperbaiki bug konversi boolean `z.coerce.boolean()` yang mengevaluasi `Boolean("false") === true` menjadi transform string boolean eksplisit.
     - **Issue #12:** Mengeluarkan pemanggilan `redirect("/vault")` dari dalam blok `try-catch` agar eksepsi internal `NEXT_REDIRECT` tidak tertelan.
     - **Issue #13:** Mengatasi penolakan foreign key `ON DELETE RESTRICT` (galat `P2003`) dengan menerapkan transaksi atomik berantai `prisma.$transaction([deleteAuditLogs, deleteCredential])` dan meneruskan galat tak terduga ke Error Boundary.
     - **Issue #14:** Mengganti pengelolaan state ganda `useEffect` dependensi kosong pada penghitung sisa karakter ulasan menjadi nilai turunan murni saat render (`const sisa = 280 - isi.length`).
   - Berkas konfigurasi debugger `.vscode/launch.json` dan Error Boundary `src/app/vault/[id]/error.tsx` terpasang dan berfungsi penuh.
   - Pengecekan tipe statis `npx tsc --noEmit` lolos bersih dengan 0 kesalahan.

2. **Bukti Pengujian (30%):**
   - Setiap galat dilengkapi langkah reproduksi terstruktur (lingkungan, data awal, langkah bernomor, hasil yang diharapkan, hasil aktual, dan frekuensi 100% $\rightarrow$ 0%).
   - Dilengkapi bukti autentik penelusuran sebelum perbaikan: inspeksi payload tab Network, nilai variabel pada Debug Console VS Code, pesan `e.digest` milik `NEXT_REDIRECT`, *stack trace* Prisma `P2003`, dan tampilan state React Developer Tools.
   - Bukti reproduksi ulang sesudah perbaikan menunjukkan seluruh fitur berjalan normal.

3. **Penjelasan Keputusan Teknis (20%):**
   - Penjelasan mendalam pemilihan transform boolean terpadu pada Zod dibandingkan pemaksa tipe `coerce`.
   - Pemilihan transaksi atomik `prisma.$transaction` dibandingkan `Cascade` (yang berisiko melenyapkan jejak audit keamanan) maupun `Reject` (yang merusak pengalaman pengguna).
   - Penjelasan filosofi React 19 dalam memilih nilai turunan saat render (*derived value*) untuk menghindari *double-render* dan *stale state* dibanding `useEffect`.
   - Batasan tegas kapan galat ditangani di Server Action (galat masukan & bisnis yang dapat diprediksi) dan kapan diteruskan ke `error.tsx` (galat sistem tak terduga).
   - Tanggapan telaah kode beralasan teknis pada 3 komentar yang diterima dari rekan praktikan.

4. **Pencatatan Pemanfaatan AI (15%):**
   - Transparansi menyeluruh: Alat bantu (Antigravity AI / Google Deepmind), 4 prompt perintah utama, bagian kode usulan AI yang dievaluasi, 4 galat yang ditemukan pada kode AI, perubahan perbaikan yang dilakukan, serta 3 metode verifikasi mandiri (`tsc --noEmit`, pengujian debugger VS Code, dan pengujian fungsional).

