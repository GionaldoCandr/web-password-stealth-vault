# Laporan Pengujian CRUD & Integrasi Database (Milestone 2 - v0.2)
**Mata Kuliah:** Pemrograman Aplikasi Web (052355 / 052356)  
**Produk:** Stealth Password Vault (`web-password-stealth-vault`)  
**Penanda Rilis:** `v0.2`  
**Tanggal Pengujian:** 7 November 2026  
**Status Pengujian:** 10/10 Lulus (Tingkat Keberhasilan: **100%**, Memenuhi Syarat Minimal $\ge 90\%$)

---

## 1. Ringkasan Pengujian
Pengujian ini membuktikan kebenaran implementasi operasi CRUD (*Create, Read, Update, Delete*) serta integritas relasi 1:N (*One-to-Many*) antara entitas induk `VaultCredential` dan entitas anak `AuditLog` yang disimpan secara persisten di basis data PostgreSQL menggunakan Prisma ORM 7, Next.js 16 App Router, Server Actions, dan Zod.

---

## 2. Tabel Matriks 10 Skenario Pengujian (8 CRUD + 2 Relasi)

| No | Kategori Uji | Skenario Pengujian | Langkah Pengujian | Data Uji | Hasil yang Diharapkan | Hasil Aktual | Status |
|---|---|---|---|---|---|---|:---:|
| **1** | **CRUD - Create (Valid)** | Menambahkan data kredensial baru yang sah ke tabel `VaultCredential`. | 1. Buka form `/vault`<br>2. Masukkan data valid<br>3. Klik tombol *Simpan Kredensial* | `{ service: "gitlab.com", category: "work", username: "gio.dev", encryptedSecret: "a1b2c3d4e5f6g7h8", isActive: true, notes: "Akun repo" }` | Data tersimpan di PostgreSQL, pesan sukses hijau muncul, halaman merevalidasi data, item muncul di daftar. | Data tersimpan dengan ID baru, pesan hijau "Kredensial baru berhasil disimpan secara persisten ke PostgreSQL" tampil. | **LULUS** |
| **2** | **CRUD - Create (Zod Validation)** | Penolakan masukan saat panjang string tidak memenuhi batas minimum skema Zod. | 1. Buka form `/vault`<br>2. Isi service="ab" (&lt; 3 karakter)<br>3. Kosongkan ciphertext<br>4. Submit form | `{ service: "ab", category: "work", username: "gio", encryptedSecret: "" }` | Server Action menolak mutasi via Zod `safeParse`, pesan galat inline muncul di bawah field terkait, mutasi DB dibatalkan. | Status sukses: false, pesan inline muncul: "Nama layanan minimal 3 karakter" & "Ciphertext minimal 8 karakter". | **LULUS** |
| **3** | **CRUD - Create (Unique P2002)** | Penolakan penambahan kredensial dengan domain/service yang sudah ada (@unique). | 1. Isi form dengan `service` yang sudah ada di DB<br>2. Isi field lain secara valid<br>3. Submit form | `{ service: "siakng.universitaspertamina.ac.id", category: "campus", username: "user.baru", encryptedSecret: "abcdef123456" }` | Prisma menangkap kode `P2002`, Server Action mengembalikan galat spesifik bahwa nama layanan sudah terdaftar. | Alert galat muncul: "Nama layanan sudah terdaftar dalam brankas. Gunakan domain yang berbeda.". | **LULUS** |
| **4** | **CRUD - Read (List & Relasi)** | Menampilkan seluruh kredensial dari PostgreSQL beserta agregasi jumlah log audit di `/vault`. | 1. Buka browser ke `/vault`<br>2. Amati daftar kartu kredensial dan counter di header | Kueri Server Component: `prisma.vaultCredential.findMany({ include: { auditLogs: true } })` | Tampil seluruh entri kredensial aktif & nonaktif, badge kategori, dan counter total log audit akurat. | Seluruh data dari PostgreSQL tampil lengkap beserta badge kategori dan jumlah rekam jejak audit terkait. | **LULUS** |
| **5** | **CRUD - Read (Detail & Prefill)** | Membuka rincian kredensial tunggal dan memuat data awal ke form pembaruan di `/vault/[id]`. | 1. Klik tautan *Kelola & Log Audit* pada kredensial #1 di `/vault`<br>2. Amati prefill form | Kueri Server Component: `prisma.vaultCredential.findUnique({ where: { id: 1 }, include: { auditLogs: true } })` | Halaman `/vault/1` merender formulir dengan nilai awal sesuai database dan memuat seluruh riwayat audit anak. | Data prefilled tampil tepat, field form terisi otomatis dari record PostgreSQL ID 1. | **LULUS** |
| **6** | **CRUD - Read (404 Not Found)** | Penanganan akses URL kredensial dengan ID non-eksisten atau format ilegal. | 1. Buka URL `/vault/99999` atau `/vault/abc`<br>2. Amati respons antarmuka | `id = 99999` (tidak ada di tabel) | Sistem memanggil `notFound()`, merender halaman fallback ramah pengguna (`not-found.tsx`) tanpa crash 500. | Halaman `VaultNotFound` tampil elegan dengan pesan "Kredensial Tidak Ditemukan" dan tombol kembali. | **LULUS** |
| **7** | **CRUD - Update (Valid)** | Memperbarui data kredensial yang ada (mengubah username dan status aktif). | 1. Buka `/vault/1`<br>2. Ganti username<br>3. Ubah status aktif<br>4. Klik *Simpan Perubahan* | `{ id: 1, username: "105220001@universitaspertamina.ac.id", isActive: false }` | Record ter-update di PostgreSQL, kolom `updatedAt` otomatis terbarui, pesan sukses hijau tampil, cache direvalidasi. | Data ter-update persisten di DB, pesan sukses muncul, status aktif berubah sesuai pilihan. | **LULUS** |
| **8** | **CRUD - Update (Conflict P2002)** | Penolakan saat mengubah nama layanan agar sama dengan layanan milik akun lain. | 1. Buka `/vault/2`<br>2. Ganti `service` menjadi nama milik akun 1<br>3. Klik Simpan Perubahan | `{ id: 2, service: "siakng.universitaspertamina.ac.id" }` | Prisma mendeteksi bentrok @unique (P2002), Server Action membatalkan update dan menampilkan pesan peringatan. | Alert galat tampil: "Nama layanan (service) ini bentrok dengan akun lain.". Record di DB tetap aman. | **LULUS** |
| **9** | **Relasi - Create Relasi (1:N)** | Menambahkan entri log audit keamanan baru (`AuditLog`) pada kredensial terpilih. | 1. Buka `/vault/1`<br>2. Isi form *Catat Log Audit Keamanan* di kolom kanan<br>3. Klik *Tambahkan Log Audit* | `{ credentialId: 1, deviceId: "LAPTOP-DEV-02", action: "KEY_ROTATION", securityRate: 5, details: "Rotasi sandi berkala." }` | Data tersimpan di tabel `AuditLog` dengan foreign key `credentialId = 1`, daftar riwayat bertambah secara realtime. | Record audit baru tampil seketika di kolom kanan, badge rating bintang ⭐⭐⭐⭐⭐ dan counter log bertambah 1. | **LULUS** |
| **10** | **Relasi - Delete Relasi (Cascade/Atomic)** | Menghapus kredensial yang memiliki log audit terikat menggunakan transaksi berantai. | 1. Buka `/vault/[id]` yang memiliki log audit<br>2. Pada Zona Bahaya, klik *Hapus Kredensial & Seluruh Log Terkait* | Server Action: `hapusCredential(id)` mengeksekusi `prisma.$transaction([deleteMany auditLogs, delete credential])` | Log anak dihapus terlebih dahulu lalu kredensial induk dihapus secara atomik (mematuhi `onDelete: Restrict`), lalu redirect ke `/vault`. | Transaksi sukses dieksekusi di PostgreSQL tanpa error foreign key restriction, browser redirect ke `/vault`, item terhapus. | **LULUS** |

---

## 3. Bukti Validasi Masukan Sisi Server (Server-Side Zod Validation)

Sesuai kriteria Rubrik R2 (K2 - Validasi Masukan $\ge 3$ bukti penolakan masukan tidak sah):

### Bukti 1: Penolakan String di Bawah Panjang Minimum
- **Masukan:** `service = "go"` (panjang 2 karakter)
- **Skema Zod:** `.min(3, "Nama layanan minimal 3 karakter")`
- **Respons Server:**
  ```json
  {
    "sukses": false,
    "pesan": "Gagal memvalidasi masukan kredensial.",
    "galat": {
      "service": ["Nama layanan minimal 3 karakter"]
    }
  }
  ```
- **Tampilan UI:** Input berbingkai merah dengan ikon peringatan dan pesan kesalahan tepat di bawah field.

### Bukti 2: Penolakan Ciphertext Kosong / Terlalu Pendek
- **Masukan:** `encryptedSecret = "abc"` (panjang 3 karakter)
- **Skema Zod:** `.min(8, "Ciphertext minimal 8 karakter")`
- **Respons Server:**
  ```json
  {
    "sukses": false,
    "pesan": "Gagal memvalidasi masukan kredensial.",
    "galat": {
      "encryptedSecret": ["Ciphertext minimal 8 karakter"]
    }
  }
  ```
- **Tampilan UI:** Form tidak memproses mutasi ke basis data, pesan kesalahan ditampilkan di bawah kolom ciphertext.

### Bukti 3: Penolakan Duplikasi Constraint Unik (@unique P2002)
- **Masukan:** `service = "siakng.universitaspertamina.ac.id"` (sudah terdaftar di tabel `VaultCredential`)
- **Penanganan:** Prisma `P2002` ditangkap pada blok `catch` Server Action.
- **Respons Server:**
  ```json
  {
    "sukses": false,
    "pesan": "Nama layanan sudah terdaftar dalam brankas.",
    "galat": {
      "service": ["Nama layanan (service) ini sudah digunakan. Gunakan domain yang berbeda."]
    }
  }
  ```
- **Tampilan UI:** Alert kotak merah interaktif menginformasikan konflik domain kepada pengguna.

### Bukti 4: Penolakan Masukan Skor Rating di Luar Rentang (1–5)
- **Masukan:** `securityRate = 9`
- **Skema Zod:** `.min(1, "Skor minimal 1").max(5, "Skor maksimal 5")`
- **Respons Server:**
  ```json
  {
    "sukses": false,
    "pesan": "Gagal memvalidasi masukan log audit.",
    "galat": {
      "securityRate": ["Skor maksimal 5 (sangat kuat)"]
    }
  }
  ```
- **Tampilan UI:** Form audit menolak pengiriman dan meminta skor valid dalam rentang 1 s.d 5.

---

## 4. Analisis Keputusan Teknis: Penanganan Integritas Referensial
Dalam skema Prisma produk:
```prisma
model AuditLog {
  id           Int             @id @default(autoincrement())
  credentialId Int
  credential   VaultCredential @relation(fields: [credentialId], references: [id], onDelete: Restrict)
  ...
}
```
Aturan `onDelete: Restrict` dipilih secara sadar demi prinsip audit keamanan (*audit trail non-repudiation*), sehingga basis data secara bawaan menolak penghapusan entitas induk secara tidak sengaja (*accidental orphan records*).

Untuk memungkinkan pengguna menghapus akun secara sengaja dan terencana pada antarmuka admin, Server Action menerapkan **transaksi sekuensial atomik** (`prisma.$transaction`):
```typescript
await prisma.$transaction([
  prisma.auditLog.deleteMany({ where: { credentialId: id } }),
  prisma.vaultCredential.delete({ where: { id } }),
]);
```
Dengan mekanisme ini:
1. Seluruh rekam jejak audit anak dihapus terlebih dahulu dalam transaksi yang sama.
2. Record induk kredensial kemudian dihapus.
3. Apabila salah satu langkah mengalami kegagalan, basis data secara otomatis melakukan *rollback* penuh sehingga konsistensi data tetap terjamin (*ACID compliant*).
4. `redirect("/vault")` dieksekusi secara aman di luar blok `try-catch` guna mencegah tertelannya eksepsi internal `NEXT_REDIRECT`.
