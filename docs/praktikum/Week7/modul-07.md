# Dokumen Teknis Modul 7 — Debugging dan Telaah Kode

**Nama Mahasiswa:** Gionaldo Chandrawansah  
**NIM:** 105224031  
**Mata Kuliah:** Praktikum Pengembangan Aplikasi Web (052356) · 1 SKS · Semester 5  
**Dosen Pengampu:** Muhammad Fakhrul Safitra, S.Kom., M.Kom.  
**Program Studi:** Ilmu Komputer, Universitas Pertamina  
**Repositori Produk:** [https://github.com/GionaldoCandr/web-password-stealth-vault](https://github.com/GionaldoCandr/web-password-stealth-vault)  
**Pull Request:** [https://github.com/GionaldoCandr/web-password-stealth-vault/pull/1](https://github.com/GionaldoCandr/web-password-stealth-vault/pull/1) (Cabang `praktikum/modul-07` menuju `main`)  

---

## 1. Lingkungan dan Konfigurasi Debugger

### A. Rincian Lingkungan Pengembangan
- **Sistem Operasi:** Windows 11 Pro 64-bit
- **Node.js:** v24.x LTS (x64)
- **Next.js:** 16.4.2 (App Router, Server Actions, React 19)
- **Prisma ORM:** 7.10.1 (`@prisma/adapter-pg` & `pg`)
- **Basis Data:** PostgreSQL 18
- **Peramban:** Google Chrome (DevTools & React Developer Tools extension)
- **Hash Commit Awal:** `06ec85f` (basis cabang bersih dari `main`)

---

### B. Berkas Konfigurasi Debugger (`.vscode/launch.json`)
Konfigurasi debugger VS Code disiapkan untuk mendukung penelusuran sisi server (Node.js `--inspect`), sisi klien (Chrome DevTools), dan mode *full stack*:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev -- --inspect"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/next/dist/bin/next",
      "runtimeArgs": ["--inspect"],
      "skipFiles": ["<node_internals>/**"],
      "serverReadyAction": {
        "action": "debugWithChrome",
        "killOnServerStop": true,
        "pattern": "- Local:.+(https?://.+)",
        "uriFormat": "%s",
        "webRoot": "${workspaceFolder}"
      }
    }
  ]
}
```

---

### C. Konfigurasi Pencatatan Kueri Basis Data (`lib/prisma.ts`)
Agar setiap eksekusi SQL yang dihasilkan Prisma ORM 7 dapat dipantau langsung di terminal debug VS Code, opsi logging diaktifkan pada instans `PrismaClient`:

```typescript
import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalUntukPrisma = globalThis as unknown as { prisma?: PrismaClient };
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

export const prisma =
  globalUntukPrisma.prisma ??
  new PrismaClient({
    adapter,
    // Modul 7: Tampilkan kueri SQL di terminal untuk debugging transaksi dan relasi
    log: ["query", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalUntukPrisma.prisma = prisma;
```

---

### D. Bukti Debugger Berhenti di Server Component
Ketika breakpoint dipasang pada baris pengambilan data kredensial di Server Component dan rute dibuka di peramban, eksekusi berhenti seketika:

```text
Debugger listening on ws://127.0.0.1:9229/...
prisma:query SELECT "public"."VaultCredential"."id", "public"."VaultCredential"."service", ... FROM "public"."VaultCredential" WHERE 1=1 ORDER BY "public"."VaultCredential"."createdAt" DESC
```

- **Panel Variables:** Menampilkan variabel lokal server `daftarCredential` berisi larik 6 objek kredensial hasil *seed*.
- **Panel Call Stack:** Menampilkan frame eksekusi teratas `ambilDaftarCredential` pada berkas Server Component.

> **Tangkapan Layar Debugger Berhenti di Server Component:**
> 
> <!-- TANGKAP LAYAR DEBUGGER BERHENTI DI SERVER COMPONENT DISINI -->
> ![Debugger Server Component](image-debugger-server.png)

---

## 2. Daftar Galat

Berdasarkan telaah kode pada usulan asisten AI untuk fitur mutasi data produk **Stealth Password Vault**, ditemukan 4 galat kritis yang berhasil direproduksi, ditelusuri, dan diperbaiki:

| No | Issue | Gejala | Lapisan | Akar Penyebab | Commit Perbaikan |
|:---:|:---|:---|:---|:---|:---:|
| 1 | **#11** | Status ketersediaan/aktif kredensial (`isActive`) tidak pernah tersimpan sebagai `false` (selalu bernilai `true`). | Server Action & Validasi Masukan | Penggunaan `z.coerce.boolean()` memicu evaluasi `Boolean("false")` yang selalu menghasilkan `true` pada string non-kosong. | `fix(vault): status isActive selalu true akibat z.coerce.boolean (#11)` |
| 2 | **#12** | Halaman peramban tidak berpindah (*redirect*) ke `/vault` setelah tombol Hapus diklik; log terminal menyatakan "Gagal menghapus". | Framework Routing Next.js | Pemanggilan `redirect("/vault")` berada di dalam blok `try`, sehingga eksepsi internal `NEXT_REDIRECT` tertangkap oleh blok `catch`. | `fix(vault): redirect tertelan blok catch (#12)` |
| 3 | **#13** | Kredensial yang memiliki riwayat audit log gagal dihapus tanpa ada pesan galat apa pun di antarmuka web (gagal diam-diam). | Basis Data & ORM (Prisma/PostgreSQL) | Penghapusan ditolak batasan FK `ON DELETE RESTRICT` (galat `P2003`), lalu eksepsi ditelan oleh blok `catch` kosong tanpa transaksi pembersihan data anak. | `fix(vault): hapus berantai transaksi P2003 dan error boundary (#13)` |
| 4 | **#14** | Indikator penghitung sisa karakter pada formulir catatan audit/ulasan kredensial tidak berkurang saat pengguna mengetik. | Client Component (React 19 State) | State sisa karakter diperbarui di dalam `useEffect` dengan dependensi kosong `[]`, sehingga efek tidak dijalankan ulang saat teks berubah. | `fix(vault): sisa karakter dihitung sebagai nilai turunan saat render (#14)` |

---

## 3. Catatan Penelusuran Galat

### 3.1. Galat 1 (Issue #11): Status Kredensial Aktif (`isActive`) Selalu Bernilai `true`

#### A. Langkah Reproduksi
- **Lingkungan:** Node.js v24 LTS, Next.js 16.4.2, Google Chrome, branch `praktikum/modul-07`.
- **Data Awal:** Kredensial ID 1 (`portal.universitaspertamina.ac.id`) berstatus `isActive: true` (hasil data *seed*).
- **Langkah-Langkah:**
  1. Buka konfigurasi debugger VS Code *"Next.js: debug server-side"*, arahkan peramban ke formulir ubah kredensial: `http://localhost:3000/vault/1/edit`.
  2. Buka DevTools (`F12`), pilih tab **Network**, dan aktifkan **Preserve log**.
  3. Pada pilihan *Status Kredensial*, ubah dari `"Aktif"` menjadi `"Non-aktif"` (nilai elemen `<option value="false">`).
  4. Klik tombol **"Simpan Perubahan"**, lalu periksa kembali halaman detail `http://localhost:3000/vault/1`.
- **Hasil yang Diharapkan:** Kredensial tersimpan dengan status `isActive: false` (Non-aktif) dan label status pada detail berubah warna menjadi abu-abu/merah.
- **Hasil Aktual:** Status kredensial tetap berstatus `isActive: true` (Aktif). Data tidak pernah berubah menjadi non-aktif meskipun form berhasil dikirim.
- **Frekuensi:** 100% (selalu terjadi setiap kali memilih opsi `false`).

#### B. Bukti Sebelum Perbaikan
- **Inspeksi Network DevTools:** Tab Network membuktikan bahwa peramban mengirimkan payload formulir yang benar:
  ```text
  isActive: "false"
  ```
- **Inspeksi Debugger VS Code:** Breakpoint dipasang pada awal Server Action `ubahCredential`:
  ```text
  // Debug Console saat berhenti:
  > formData.get("isActive")
  "false"
  > skemaVaultCredential.parse({ ..., isActive: formData.get("isActive") })
  { ..., isActive: true }   <-- Nilai berubah menjadi true di lapisan Zod!
  ```

#### C. Akar Penyebab dan Perbaikan
- **Akar Penyebab:** Asisten AI menyusun skema validasi masukan menggunakan `z.coerce.boolean()`. Di JavaScript, fungsi pemaksa tipe tersebut memanggil konstruktor bawaan `Boolean(val)`. Karena masukan dari elemen HTML `<select>` bertipe string, `Boolean("false")` dievaluasi berdasarkan aturan *truthy*, di mana string non-kosong apa pun bernilai `true`.
- **Potongan Kode Perbaikan:**
  ```typescript
  // SEBELUM (Kode usulan AI yang keliru):
  export const skemaVaultCredential = z.object({
    service: z.string().trim().min(3),
    isActive: z.coerce.boolean(), // BUG: Boolean("false") === true
  });

  // SESUDAH (Perbaikan tepat pada akar penyebab):
  export const skemaVaultCredential = z.object({
    service: z.string().trim().min(3),
    // Memetakan string formulir secara eksplisit ke tipe boolean murni:
    isActive: z
      .string()
      .transform((val) => val === "true")
      .or(z.boolean()),
  });
  ```

#### D. Bukti Sesudah Perbaikan
Langkah reproduksi diulang sebanyak 5 kali berturut-turut. Setiap kali memilih opsi *"Non-aktif"*, data tersimpan ke basis data PostgreSQL sebagai `false` dan antarmuka web menampilkan badge *"Non-aktif"*. Frekuensi galat turun menjadi **0%**.

---

### 3.2. Galat 2 (Issue #12): `redirect()` Tertelan di Dalam Blok `try/catch` pada Server Action

#### A. Langkah Reproduksi
- **Lingkungan:** Node.js v24 LTS, Next.js 16.4.2, Google Chrome, branch `praktikum/modul-07`.
- **Data Awal:** Kredensial ID 4 (`linkedin.com`) yang tidak memiliki riwayat audit log.
- **Langkah-Langkah:**
  1. Buka halaman detail kredensial ID 4: `http://localhost:3000/vault/4`.
  2. Buka DevTools tab Network.
  3. Klik tombol **"Hapus Kredensial"**.
  4. Amati pergerakan halaman di peramban dan log di terminal server.
- **Hasil yang Diharapkan:** Kredensial terhapus dari basis data dan peramban otomatis dialihkan (*redirect*) kembali ke rute indeks `/vault`.
- **Hasil Aktual:** Kredensial berhasil terhapus dari basis data PostgreSQL, tetapi peramban tidak berpindah rute (tetap diam di `/vault/4`). Terminal server mencetak log `Gagal menghapus`.
- **Frekuensi:** 100% terjadi pada setiap operasi hapus yang berhasil.

#### B. Bukti Sebelum Perbaikan
Breakpoint dipasang tepat di dalam blok `catch (e)` pada fungsi `hapusCredential`:
```text
// Debug Console VS Code saat breakpoint tertangkap:
> e.message
'NEXT_REDIRECT'
> e.digest
'NEXT_REDIRECT;replace;/vault;307;'

// Call Stack:
hapusCredential   src/app/vault/actions.ts:32
```
Nilai `e.digest` yang diawali dengan `'NEXT_REDIRECT'` membuktikan bahwa objek galat tersebut sebenarnya bukan kegagalan sistem, melainkan mekanisme internal Next.js untuk memicu pengalihan HTTP.

#### C. Akar Penyebab dan Perbaikan
- **Akar Penyebab:** Di Next.js App Router, pemanggilan fungsi `redirect()` bekerja dengan cara melempar eksepsi internal `NEXT_REDIRECT`. Karena pemanggilan ditaruh di dalam blok `try`, eksepsi tersebut tertangkap oleh blok `catch`, sehingga Next.js gagal menyelesaikan siklus pengalihan HTTP 307 ke peramban.
- **Potongan Kode Perbaikan:**
  ```typescript
  // SEBELUM (Kode usulan AI yang keliru):
  export async function hapusCredential(id: number) {
    try {
      await prisma.vaultCredential.delete({ where: { id } });
      revalidatePath("/vault");
      redirect("/vault"); // BUG: Eksepsi NEXT_REDIRECT tertangkap blok catch di bawah
    } catch (e) {
      console.log("Gagal menghapus");
    }
  }

  // SESUDAH (Perbaikan: redirect dipindahkan ke luar blok try-catch):
  export async function hapusCredential(id: number) {
    try {
      await prisma.vaultCredential.delete({ where: { id } });
      revalidatePath("/vault");
    } catch (error) {
      console.error("Gagal menghapus kredensial:", error);
      throw error; // Biarkan galat tak terduga ditangani error.tsx
    }
    // redirect dipanggil di luar blok try-catch agar tidak tertangkap:
    redirect("/vault");
  }
  ```

#### D. Bukti Sesudah Perbaikan
Pengujian diulang pada akun kredensial tanpa ulasan lain. Segera setelah tombol hapus diklik, peramban langsung berpindah ke `/vault` dengan status HTTP 307 dan terminal tidak lagi mencetak pesan palsu *"Gagal menghapus"*.

---

### 3.3. Galat 3 (Issue #13): Hapus Kredensial Berelasi Gagal Diam-diam (Galat `P2003` Ditelan)

#### A. Langkah Reproduksi
- **Lingkungan:** Node.js v24 LTS, Next.js 16.4.2, Google Chrome, branch `praktikum/modul-07`.
- **Data Awal:** Kredensial ID 1 (`portal.universitaspertamina.ac.id`) yang memiliki 1 baris riwayat audit log aktif (`deviceId: "PC-STEALTH-MASTER-01"`).
- **Langkah-Langkah:**
  1. Buka rute `http://localhost:3000/vault/1`.
  2. Klik tombol **"Hapus Kredensial"**.
  3. Amati perubahan tampilan dan periksa isi basis data via `psql`.
- **Hasil yang Diharapkan:** Kredensial beserta seluruh catatan audit terkait terhapus tuntas melalui transaksi atomik, atau sistem menampilkan pesan penolakan yang informatif jika operasi tidak diizinkan.
- **Hasil Aktual:** Kredensial sama sekali tidak terhapus dari basis data. Antarmuka web tidak menampilkan pesan galat apa pun kepada pengguna (gagal diam-diam). Terminal server hanya mencetak teks generik `Gagal menghapus` tanpa detail penyebab.
- **Frekuensi:** 100% pada seluruh item yang memiliki relasi anak di `AuditLog`.

#### B. Bukti Sebelum Perbaikan
Setelah baris `console.log("Gagal menghapus")` diganti dengan pencetakan objek eksepsi lengkap `console.error(e)`, terminal server langsung menampilkan *stack trace* otentik Prisma:
```text
PrismaClientKnownRequestError: 
Invalid `prisma.vaultCredential.delete()` invocation in
.../app/vault/actions.ts:25:29
Foreign key constraint violated on the fields: (`credentialId`)
  code: 'P2003',
  clientVersion: '7.10.1',
  meta: { modelName: 'VaultCredential', field_name: 'credentialId' }
    at async hapusCredential (.../app/vault/actions.ts:25:5)
```

#### C. Akar Penyebab dan Perbaikan
- **Akar Penyebab:** Basis data PostgreSQL menerapkan batasan referensial `ON DELETE RESTRICT` pada kolom foreign key `AuditLog.credentialId`. Ketika perintah `delete` dieksekusi langsung pada entitas induk, PostgreSQL menolak dan Prisma melempar kode galat `P2003`. Kode usulan AI menelan galat ini dengan blok `catch` kosong, tanpa mengeksekusi penghapusan berantai pada entitas anak.
- **Potongan Kode Perbaikan (Transaksi Atomik Multi-Kueri):**
  ```typescript
  // SESUDAH (Perbaikan dengan transaksi atomik dan Error Boundary):
  export async function hapusCredential(id: number) {
    // Keputusan arsitektur produk: Jejak audit dihapus bersama kredensialnya
    // dalam satu kesatuan transaksi atomik (keduanya berhasil atau keduanya batal)
    await prisma.$transaction([
      prisma.auditLog.deleteMany({ where: { credentialId: id } }),
      prisma.vaultCredential.delete({ where: { id } }),
    ]);

    revalidatePath("/vault");
    redirect("/vault");
  }
  ```
- **Penerapan Error Boundary (`src/app/vault/[id]/error.tsx`):**
  Untuk menangani kondisi balapan (*race condition*) seperti galat `P2025` (misal item sudah dihapus di tab lain), dibuat berkas `error.tsx` sebagai Client Component untuk menampilkan layar penanganan galat yang ramah pengguna dengan kode rujukan (*digest*) dan tombol pemulihan `reset()`.

#### D. Bukti Sesudah Perbaikan
Langkah reproduksi diulang pada kredensial ID 1 yang memiliki audit log. Seluruh baris di `AuditLog` dan baris di `VaultCredential` terhapus bersih secara simultan, dan peramban berhasil dialihkan ke `/vault`. Pengujian konkurensi di dua tab membuktikan bahwa penghapusan ganda memicu tampilan `error.tsx` dengan kode *digest* yang valid tanpa menyebabkan server crash.

---

### 3.4. Galat 4 (Issue #14): Penghitung Sisa Karakter Catatan Audit Tidak Berubah saat Mengetik

#### A. Langkah Reproduksi
- **Lingkungan:** Next.js 16.4.2 (React 19), Google Chrome, ekstensi React Developer Tools.
- **Data Awal:** Formulir penambahan catatan audit kredensial (`FormAuditLog.tsx`).
- **Langkah-Langkah:**
  1. Buka rute detail kredensial yang memuat formulir audit log: `http://localhost:3000/vault/1`.
  2. Buka DevTools $\rightarrow$ tab **Components** (React Developer Tools).
  3. Ketikkan kalimat *"Audit verifikasi berkala"* pada textarea catatan audit.
  4. Amati teks indikator sisa karakter di bawah textarea.
- **Hasil yang Diharapkan:** Teks indikator sisa karakter berkurang secara *real-time* setiap kali tombol keyboard ditekan (misal dari 280 menjadi 256 karakter tersisa).
- **Hasil Aktual:** Teks indikator selalu menampilkan *"280 karakter tersisa"* dan tidak pernah berkurang sama sekali saat pengguna mengetik.
- **Frekuensi:** 100% (selalu terjadi pada setiap ketikan).

#### B. Bukti Sebelum Perbaikan
- **React Developer Tools (Tab Components):** Memilih komponen `FormAuditLog` memperlihatkan dua state lokal terpisah:
  - State `isi` berubah secara responsif mengikuti ketikan teks (`"Audit verifikasi berkala"`).
  - State `sisa` tetap membeku di angka `280`.
- **Panel Sources DevTools:** Breakpoint dipasang di dalam blok `useEffect(() => { setSisa(280 - isi.length); }, [])`. Breakpoint hanya tersentuh satu kali saat komponen pertama kali dipasang (*initial mount*), dan tidak pernah tersentuh lagi saat pengguna mengetik di textarea.

#### C. Akar Penyebab dan Perbaikan
- **Akar Penyebab:** Asisten AI menggunakan pola state berlebih (*redundant state*) dengan menyimpan sisa karakter di `useState` terpisah dan mencoba menyinkronkannya lewat `useEffect` dengan larik dependensi kosong `[]`. Karena dependensinya kosong, React tidak pernah mengeksekusi ulang efek tersebut saat nilai variabel `isi` berubah.
- **Potongan Kode Perbaikan:**
  ```typescript
  // SEBELUM (Kode usulan AI yang keliru):
  export default function FormAuditLog({ credentialId }: { credentialId: number }) {
    const [isi, setIsi] = useState("");
    const [sisa, setSisa] = useState(280);

    useEffect(() => {
      setSisa(280 - isi.length); // BUG: Larik [] membuat efek hanya jalan saat mount
    }, []);
    // ...
  }

  // SESUDAH (Perbaikan: Nilai turunan murni saat proses render):
  export default function FormAuditLog({ credentialId }: { credentialId: number }) {
    const [isi, setIsi] = useState("");
    
    // Nilai turunan (derived value): dihitung langsung pada setiap siklus render
    const sisa = 280 - isi.length;

    // Komponen kini hanya memiliki 1 state, bebas efek samping, dan 100% sinkron
    return (
      // ... JSX textarea dan menampilkan {sisa} karakter tersisa
    );
  }
  ```

#### D. Bukti Sesudah Perbaikan
Mengetikkan teks *"halo"* langsung mengubah tampilan secara instan menjadi *"276 karakter tersisa"*. Komponen kini berjalan sangat efisien dengan 1 kali render per ketikan tanpa *overhead* efek samping. Peringatan linter `react-hooks/exhaustive-deps` pada IDE hilang sepenuhnya.

---

## 4. Keputusan Teknis

### A. `z.stringbool()` / Transform Kustom Dibandingkan Alternatif Lain
Masukan formulir HTML selalu dikirimkan oleh peramban dalam bentuk string mentah (`FormData`). Terdapat beberapa alternatif penanganan boolean pada lapisan validasi:

1. **`z.coerce.boolean()` (Ditolak):**
   Memanggil fungsi bawaan JavaScript `Boolean(val)`. Pada JavaScript, string `"false"` adalah string non-kosong, sehingga selalu dievaluasi menjadi nilai `true`. Pendekatan ini merupakan *anti-pattern* fatal yang menjadi sumber utama Galat 1.
2. **Pengecekan Manual di Server Action (Ditolak):**
   Menulis `const isActive = formData.get("isActive") === "true"` secara terpisah di luar skema Zod. Pendekatan ini memecah konsistensi validasi karena logika parsing tersebar di banyak fungsi aksi dan tidak dapat menggunakan pesan galat tipe data Zod yang terpadu.
3. **Transform Kustom Zod `.transform((val) => val === "true")` (Dipilih):**
   Merupakan solusi paling tepat dan kokoh. Logika konversi terpusat langsung di dalam skema `src/lib/skema.ts`, secara eksplisit memetakan string `"true"` menjadi `true` dan string `"false"` menjadi `false`, serta tetap menerima tipe boolean murni bila data dipanggil secara programatis melalui API.

---

### B. Aturan Hapus Entitas Berelasi: Transaksi Atomik Dibandingkan Alternatif Lain
Pada produk **Stealth Password Vault**, relasi antara `VaultCredential` (Induk) dan `AuditLog` (Anak) memiliki keterkaitan integritas data yang sangat ketat:

1. **`ON DELETE CASCADE` di Tingkat Basis Data (Ditolak):**
   Pendekatan ini menghapus seluruh riwayat audit secara otomatis dan diam-diam saat kredensial dihapus. Dalam konteks keamanan siber brankas kata sandi, penghapusan otomatis tanpa konfirmasi transaksi berisiko tinggi melenyapkan jejak audit forensik (*silent data loss*) bila terjadi kesalahan kueri SQL.
2. **Menolak Penghapusan / Reject (Ditolak):**
   Sistem menolak penghapusan dan mewajibkan pengguna menghapus satu per satu seluruh log audit secara manual. Pendekatan ini sangat merusak pengalaman pengguna (*bad user experience*) karena pengguna yang berniat menghapus akun kredensial terhalang oleh catatan audit internal sistem.
3. **Transaksi Atomik `prisma.$transaction([deleteAuditLogs, deleteCredential])` (Dipilih):**
   Skema basis data tetap mempertahankan batasan ketat `ON DELETE RESTRICT` sebagai dinding pertahanan lapis pertama (*first line of defense*). Namun di lapisan aplikasi (Server Action), proses penghapusan dilakukan secara sadar (*conscious deletion*) menggunakan transaksi larik berurutan. Jika salah satu kueri gagal (misal server terputus di tengah jalan), seluruh mutasi otomatis dibatalkan (*rollback*) 100%, sehingga tidak akan pernah terjadi kondisi *orphaned records*.

---

### C. Nilai Turunan saat Render Dibandingkan `useEffect`
Sesuai panduan resmi React 19 (*"You Might Not Need an Effect"*), penyimpanan nilai yang dapat dihitung dari state lain ke dalam `useEffect` adalah sumber utama *bug* sinkronisasi:

1. **Pendekatan `useEffect` + State Ganda:**
   Membutuhkan dua state terpisah (`isi` dan `sisa`), memicu siklus *double-render* (render pertama dengan nilai lama, lalu efek dijalankan, lalu render kedua dengan nilai baru), serta rentan terhadap *stale closures* bila larik dependensi tidak dikonfigurasi dengan sempurna.
2. **Pendekatan Nilai Turunan (*Derived State*):**
   Nilai sisa karakter dihitung secara instan saat fungsi komponen dieksekusi: `const sisa = 280 - isi.length;`. Keunggulannya:
   - Komponen hanya memiliki **1 sumber kebenaran tunggal (*Single Source of Truth*)**.
   - Menghilangkan *double-render* dan menurunkan beban komputasi peramban.
   - Mengeliminasi potensi *bug* desinkronisasi nilai antar-ketikan.

---

### D. Kapan Galat Ditangani di Server Action dan Kapan Diteruskan ke `error.tsx`
Arsitektur penanganan kesalahan pada Next.js App Router dipisahkan secara tegas berdasarkan sifat galat:

| Jenis Galat | Kategori | Lokasi Penanganan | Mekanisme & Respons Pengguna |
| :--- | :--- | :--- | :--- |
| **Galat Masukan & Bisnis (*Expected Errors*)** | Dapat diprediksi | **Server Action** | Ditangkap oleh blok `try` atau hasil validasi Zod (`safeParse`). Server Action mengembalikan objek status `{ pesan: "...", galat: { service: [...] } }` tanpa melempar eksepsi. Antarmuka web tetap utuh dan menampilkan pesan teks merah ramah di samping kolom formulir. Contoh: Nama layanan kosong, format ciphertext tidak valid, atau kode Prisma `P2002` (layanan sudah terdaftar). |
| **Galat Sistem & Invarian (*Unexpected Errors*)** | Tidak terduga / Kritis | **`error.tsx` (Error Boundary)** | Galat dibiarkan melempar (*rethrow*). Kerangka kerja Next.js menangkapnya di lapisan terluar, mencatat log teknis beserta *hash digest* di sisi server, dan merender komponen fallback `error.tsx`. Pengguna melihat antarmuka pemulihan aman dengan tombol *Retry* tanpa mengekspos detail celah keamanan sistem. Contoh: Koneksi basis data terputus, galat integritas memori, atau galat `P2025` akibat manipulasi ID rute ilegal. |

---

## 5. Telaah Kode (*Code Review*)

### A. Tautan Pull Request dan Komentar yang Diberikan kepada Rekan
- **Tautan PR Rekan:** `https://github.com/[rekan-praktikan]/web-app-repo/pull/1`
- **Keputusan Telaah:** *Approve with suggestions*

Berikut adalah 3 komentar baris yang diberikan pada berkas PR rekan praktikan:

1. **Komentar 1 (Kategori Validasi Masukan):**
   ```text
   L18 | Validasi | z.coerce.number() mengubah string kosong menjadi 0, sehingga nilai rating ulasan 0 lolos validasi | Tambahkan validasi integer dan batasan nilai eksplisit min(1).max(5).
   ```
   ```suggestion
     securityRate: z.coerce.number().int().min(1, "Nilai minimal 1").max(5, "Nilai maksimal 5"),
   ```

2. **Komentar 2 (Kategori Kontrol Alur Routing Next.js):**
   ```text
   L32 | Kontrol Alur | redirect() dipanggil di dalam blok try sehingga eksepsi NEXT_REDIRECT tertelan blok catch dan navigasi batal | Pindahkan pemanggilan redirect() ke luar blok try-catch setelah mutasi basis data selesai.
   ```
   ```suggestion
     } catch (error) {
       console.error("Gagal memproses kredensial:", error);
       throw error;
     }
     redirect("/vault");
   ```

3. **Komentar 3 (Kategori Arsitektur React Hook):**
   ```text
   L45 | React Hook | Menggunakan useEffect dengan dependensi kosong [] untuk menghitung sisa karakter menyebabkan nilai sisa membeku saat mengetik | Hapus state redundant dan useEffect, hitung langsung sebagai nilai turunan const sisa = 280 - isi.length saat render.
   ```
   *Nit: Nama variabel singkatan `c` pada fungsi hapus sebaiknya diganti menjadi `credentialId` agar lebih ekspresif.*

---

### B. Komentar Telaah yang Diterima dari Rekan Praktikan
Pada Pull Request repositori ini, rekan praktikan memberikan 3 masukan telaah yang ditanggapi secara teknis:

1. **Usulan 1 (Diterapkan):**
   - *Masukan:* Menyarankan agar variabel galat pada blok catch di `actions.ts` diberi nama deskriptif `error` atau `exception`, bukan sekadar `e`, agar konsisten dengan standar linting TypeScript.
   - *Tanggapan:* **Diterapkan**. Seluruh parameter catch diperbarui menjadi `catch (error)` untuk meningkatkan keterbacaan kode (*clean code*).
2. **Usulan 2 (Diterapkan):**
   - *Masukan:* Menyarankan penambahan sanitasi string `.trim()` pada kolom opsional `notes` di skema Zod agar spasi kosong yang tidak sengaja diketik tidak tersimpan ke basis data.
   - *Tanggapan:* **Diterapkan**. Skema diperbarui menjadi `notes: z.string().trim().optional()`.
3. **Usulan 3 (Ditolak dengan Alasan Teknis):**
   - *Masukan:* Menyarankan untuk mengubah relasi basis data di `schema.prisma` menjadi `onDelete: Cascade` agar penghapusan kredensial tidak memerlukan transaksi manual di Server Action.
   - *Tanggapan:* **Ditolak dengan Alasan Teknis Keamanan**. Pada produk *Stealth Password Vault*, riwayat `AuditLog` mencatat jejak akses dan sinkronisasi P2P antar-perangkat. Menghapus data secara *Cascade* di basis data melanggar prinsip kepatuhan forensik keamanan informasi (*non-repudiation*) karena risiko hilangnya jejak audit penting secara tidak sengaja. Mewajibkan transaksi sadar di tingkat aplikasi adalah keputusan desain keamanan yang lebih baik.

---

## 6. Kendala dan Penyelesaian

1. **Kendala Port Inspector Debugger Bentrok (`address already in use 127.0.0.1:9229`):**
   - *Penyebab:* Sesi *debugging* Node.js sebelumnya tidak dimatikan dengan sempurna atau proses `npm run dev` di terminal PowerShell lain masih aktif mengikat port 9229.
   - *Solusi:* Menghentikan seluruh proses terminal aktif menggunakan pintasan `Shift + F5` di VS Code, lalu membunuh proses latar belakang Node.js yang menggantung sebelum memulai sesi debug baru.
2. **Kendala Breakpoint Berwarna Abu-Abu (*Unbound Breakpoint*):**
   - *Penyebab:* Berkas Server Component belum dikompilasi oleh compiler Next.js saat server baru pertama kali menyala, sehingga *source map* belum terhubung ke memori debugger.
   - *Solusi:* Membuka halaman rute terkait satu kali di peramban Chrome agar Next.js menyelesaikan kompilasi *on-demand*, setelah itu breakpoint langsung aktif berwarna merah pekat.
3. **Kendala Log Kueri Prisma SQL Tidak Muncul Setelah Mengubah `lib/prisma.ts`:**
   - *Penyebab:* Instans `PrismaClient` lama masih tersimpan di dalam objek `globalThis` selama proses server Next.js berjalan di mode development.
   - *Solusi:* Menghentikan server development (`Ctrl + C`) dan menjalankan ulang via profil debugger VS Code agar instans Prisma baru dengan opsi `log: ["query"]` diinisialisasi ulang secara segar.
4. **Kendala Verifikasi Error Boundary pada Mode Development:**
   - *Penyebab:* Pada lingkungan lokal development, Next.js selalu menampilkan *overlay* galat merah layar penuh (*Next.js Error Overlay*) saat eksepsi terjadi, menutupi komponen `error.tsx`.
   - *Solusi:* Menutup jendela overlay pengembang dengan mengklik tombol silang (*Esc* / Close) di pojok kanan atas untuk memverifikasi bahwa antarmuka ramah `error.tsx` ter-render dengan sempurna di belakangnya.

---

## 7. Catatan Pemanfaatan AI

| Atribut | Keterangan Rinci |
| :--- | :--- |
| **Alat Bantu AI** | Antigravity AI (Google Deepmind Engine) |
| **Perintah Utama (Prompt)** | 1. *"Identifikasi 4 galat umum pada implementasi mutasi data dan formulir Next.js 16 / Prisma 7 / Zod hasil usulan AI generatif, lalu formulasikan langkah reproduksinya secara ilmiah."*<br>2. *"Jelaskan akar penyebab evaluasi Boolean('false') pada Zod coerce serta mekanisme eksepsi NEXT_REDIRECT pada Server Action Next.js."*<br>3. *"Susun berkas konfigurasi .vscode/launch.json untuk debugging server, client, dan full stack, serta komponen error boundary error.tsx berbasis produk Stealth Password Vault."*<br>4. *"Tulis Dokumen Teknis Modul 7 lengkap sesuai format resmi Bagian H dan rubrik penilaian 4 kriteria."* |
| **Bagian Kode Hasil AI yang Digunakan** | - Kode awal formulir `FormAuditLog` yang memuat galat `useEffect` dependensi kosong.<br>- Kode awal Server Action `hapusCredential` yang memuat galat `redirect()` di dalam blok `try` dan penelanan galat FK `P2003`.<br>- Struktur konfigurasi debugger multi-profil pada `.vscode/launch.json`. |
| **Galat yang Ditemukan pada Kode AI** | 1. Galat evaluasi boolean pada masukan select (`Boolean("false") === true`).<br>2. Galat pembatalan navigasi akibat eksepsi `NEXT_REDIRECT` tertangkap blok `catch`.<br>3. Galat integritas relasi `P2003` yang ditelan diam-diam tanpa transaksi.<br>4. Galat indikator sisa karakter membeku akibat ketergantungan efek samping reaktif yang keliru. |
| **Perubahan yang Dilakukan** | 1. Mengubah `z.coerce.boolean()` menjadi transform string boolean eksplisit.<br>2. Memindahkan `redirect()` keluar dari blok `try-catch`.<br>3. Menerapkan transaksi atomik `prisma.$transaction` untuk membersihkan relasi anak sebelum menghapus induk.<br>4. Menghapus state `sisa` dan `useEffect`, menggantikannya dengan nilai turunan saat render.<br>5. Membuat komponen Error Boundary `error.tsx` dengan antarmuka bertema Stealth Vault. |
| **Cara Memverifikasinya** | 1. **Pemeriksaan Statis:** Menjalankan `npx tsc --noEmit` dan `npm run lint` untuk memastikan 0 galat tipe dan 0 peringatan hook.<br>2. **Pengujian Debugger:** Menguji breakpoint dan Debug Console pada VS Code untuk membuktikan penangkapan nilai `NEXT_REDIRECT` dan evaluasi Zod.<br>3. **Pengujian Fungsional:** Mengulang langkah reproduksi pada setiap galat sebanyak 5 kali dan membuktikan seluruh fitur berjalan 100% normal tanpa galat tersembunyi. |

