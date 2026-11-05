# Teks Daring Tugas Pendahuluan Modul 7: Debugging dan Telaah Kode
**Mata Kuliah:** Praktikum Pengembangan Aplikasi Web (052356) · 1 SKS · Semester 5  
**Dosen Pengampu:** Muhammad Fakhrul Safitra, S.Kom., M.Kom.  
**Program Studi:** Ilmu Komputer, Universitas Pertamina  
**Nama Mahasiswa:** Gionaldo Chandrawansah  
**NIM:** 105224031  
**Produk:** Stealth Password Vault (`web-password-stealth-vault`)  
**Tautan Berkas di GitHub:** https://github.com/GionaldoCandr/web-password-stealth-vault/blob/main/docs/praktikum/Week7/tugas-pendahuluan.md  

---

### Jawaban Butir Tugas Pendahuluan

#### 1. Langkah Reproduksi Galat pada Produk
- **Judul Galat:** Pelanggaran Integritas Foreign Key Prisma P2003 saat Menghapus Entitas Induk `VaultCredential` yang Memiliki Riwayat Relasi `AuditLog`
- **Lingkungan:** Windows 11 64-bit, Node.js v24.x LTS, Next.js 16.4.2, Prisma ORM 7.10.1, PostgreSQL 18, branch `main` (commit 7caa79d).
- **Data Awal:** Kredensial ID 1 (`service: "portal.universitaspertamina.ac.id"`) memiliki 1 riwayat audit di tabel `AuditLog` (`deviceId: "PC-STEALTH-MASTER-01"`). Relasi foreign key menerapkan `onDelete: Restrict`.
- **Langkah Reproduksi Bernomor:**
  1. Buka peramban dan navigasi ke URL detail kredensial: `http://localhost:3000/vault/1`.
  2. Buka DevTools (F12) -> tab Network -> aktifkan opsi "Preserve log".
  3. Klik tombol merah "Hapus Kredensial" yang memicu Server Action `hapusCredential(1)`.
  4. Periksa log terminal server Next.js dan panel respons Network pada peramban.
- **Hasil yang Diharapkan:** Kredensial dan audit log terhapus tuntas melalui transaksi atomik `prisma.$transaction`, lalu diarahkan kembali ke `/vault`.
- **Hasil Aktual:** Server Action melempar eksepsi `PrismaClientKnownRequestError` dengan kode galat `P2003` (*Foreign key constraint violated on fields: credentialId*), menghasilkan status 500 karena PostgreSQL menolak penghapusan baris induk yang masih dirujuk baris anak saat `ON DELETE RESTRICT`.
- **Frekuensi:** 100% (selalu terjadi jika kredensial memiliki minimal 1 audit log dan dihapus tanpa transaksi).

---

#### 2. Perbedaan Breakpoint, Conditional Breakpoint, dan Logpoint di VS Code
1. **Breakpoint (Biasa):**
   - *Cara Kerja:* Menjeda (*pause*) eksekusi kode secara mutlak setiap kali alur eksekusi mencapainya, memungkinkan inspeksi variabel di panel Variables/Call Stack dan eksekusi step-by-step (F10/F11).
   - *Situasi Tepat:* Memeriksa penerimaan parameter masukan awal pada Server Action (`tambahCredential`) untuk memastikan payload `formData` diterima dengan benar dari form peramban.
2. **Conditional Breakpoint:**
   - *Cara Kerja:* Hanya menjeda eksekusi bila ekspresi boolean tertentu bernilai `true` (*truthy*) atau hit count tercapai; jika false program terus berjalan normal.
   - *Situasi Tepat:* Men-debug perulangan (*loop*) batch sinkronisasi data akun di mana galat enkripsi hanya muncul pada item spesifik (kondisi: `item.service === "github.com"`), sehingga tidak perlu menekan F5 berkali-kali secara manual.
3. **Logpoint:**
   - *Cara Kerja:* Tidak menghentikan program sama sekali; mengevaluasi ekspresi dan mencetak pesan string terinterpolasi langsung ke panel Debug Console VS Code tanpa menyisipkan kode `console.log` di berkas sumber.
   - *Situasi Tepat:* Memantau latensi dekripsi atau state Client Component yang sensitif terhadap jeda waktu (*timing-sensitive*) tanpa mengganggu aliran eksekusi dan tanpa mengotori berkas Git.

---

#### 3. Arti Kode Galat Prisma P2002, P2003, dan P2025
1. **P2002 (Unique Constraint Failed):**
   - *Arti:* Pelanggaran batasan kolom unik `@unique` atau komposit `@@unique`.
   - *Contoh pada Produk:* Menambah `VaultCredential` baru dengan nama layanan `service: "portal.universitaspertamina.ac.id"` yang sudah terdaftar di brankas, atau mencatat `AuditLog` kedua dari perangkat yang sama pada akun yang sama (`@@unique([credentialId, deviceId])`).
2. **P2003 (Foreign Key Constraint Failed):**
   - *Arti:* Pelanggaran integritas referensial antar-tabel (merujuk ke record yang tidak ada atau menghapus record induk yang masih dirujuk record anak pada skema `onDelete: Restrict`).
   - *Contoh pada Produk:* Menghapus `VaultCredential` yang masih memiliki log riwayat pada `AuditLog` saat `onDelete: Restrict`, atau menyisipkan `AuditLog` baru dengan `credentialId: 999999` yang tidak terdaftar.
3. **P2025 (Record to Update or Delete Not Found):**
   - *Arti:* Record target yang dicari pada klausa `where` untuk operasi update atau delete tidak ditemukan di basis data.
   - *Contoh pada Produk:* Mengubah catatan pemulihan kredensial ID 5 yang baru saja dihapus di tab peramban lain, sehingga `prisma.vaultCredential.update({ where: { id: 5 } })` gagal menemukan record tersebut.

---

#### 4. Evaluasi `Boolean("false")` dan Larangan `redirect()` di Dalam Blok `try`
1. **Mengapa `Boolean("false")` bernilai `true`:**
   - Standar ECMAScript mengatur bahwa nilai string yang berstatus *Falsy* HANYALAH string kosong `""` (panjang 0).
   - String berpanjang $\ge 1$ karakter (termasuk teks `"false"`, spasi `" "`, angka `"0"`) adalah string non-kosong yang bernilai *Truthy*. Maka `Boolean("false")` selalu menghasilkan nilai boolean primitif `true`.
   - *Solusi form:* Gunakan perbandingan eksplisit `val === "true"` atau parser Zod `z.stringbool()`.
2. **Mengapa `redirect()` tidak boleh dipanggil di dalam blok `try`:**
   - Di Next.js App Router, `redirect()` bekerja dengan **secara sengaja melempar galat khusus internal bernama `NEXT_REDIRECT`** untuk menghentikan seketika alur komputasi fungsi agar runtime Next.js dapat mengirim respons pengalihan HTTP 307/308 ke peramban.
   - Jika dipanggil di dalam blok `try`, eksepsi `NEXT_REDIRECT` akan **tertangkap oleh blok `catch` developer sendiri**, dianggap sebagai galat tak terduga, sehingga proses pengalihan HTTP Next.js gagal dan halaman web tidak berpindah.
   - *Praktik Benar:* Panggil `redirect()` di luar blok `try-catch` setelah proses basis data selesai.

---

#### 5. Pasangan Telaah Kode
- **Nama Mahasiswa:** Gionaldo Chandrawansah (NIM: 105224031)
- **Repositori Pemilik:** https://github.com/GionaldoCandr/web-password-stealth-vault
- **Nama Pasangan Telaah:** *(Ditetapkan oleh Dosen/Asisten Praktikum saat sesi)*
- **NIM Pasangan Telaah:** [NIM Pasangan]
- **URL Repositori Pasangan:** https://github.com/[username-pasangan]/[nama-repo-pasangan]
- **Bukti Undangan Collaborator:** Undangan kolaborator telah dikirimkan via menu GitHub Settings -> Collaborators dan telah diterima dengan hak akses *Write/Admin*.

---

### Catatan Pemanfaatan AI
- **Alat Bantu:** Antigravity AI (Google Deepmind Engine).
- **Bagian yang Dibantu:** Perumusan laporan langkah reproduksi galat terstruktur sesuai arsitektur Next.js & PostgreSQL, komparasi fitur debugging VS Code, serta analisis spesifikasi ECMAScript type coercion dan arsitektur eksepsi `NEXT_REDIRECT`.
- **Cara Verifikasi:** Pengujian langsung evaluasi `Boolean("false")` di terminal Node.js / Chrome DevTools, verifikasi dokumentasi Next.js untuk `redirect()`, dan verifikasi dokumentasi resmi Prisma ORM Error Reference.
