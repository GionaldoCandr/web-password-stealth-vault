# Spesifikasi Kebutuhan Produk (`docs/kebutuhan.md`)

**Produk:** Stealth Password Vault (`web-password-stealth-vault`)  
**Mata Kuliah:** Pengembangan Aplikasi Web (052355) & Praktikum Pengembangan Aplikasi Web (052356)  
**Basis Keterlacakan:** Selaras dengan `MATRIKS_KETERLACAKAN.md` (v1.0.0)

---

## Daftar Kebutuhan Sistem & Antarmuka Web/API

| ID Kebutuhan | Deskripsi Kebutuhan | Komponen / Fitur Terkait | Endpoint API / Modul Web |
| :---: | :--- | :--- | :--- |
| **K-01** | Pengguna dapat menyimpan, melihat, memperbarui, dan menghapus kredensial akun secara terenkripsi (`VaultCredential`) tanpa menyimpan plain-text password di disk maupun log. | Manajemen Brankas Persisten PostgreSQL (`/vault`, `/vault/[id]`) & RESTful API | `GET /api/v1/credentials`, `POST /api/v1/credentials`, `GET /api/v1/credentials/{id}`, `PATCH /api/v1/credentials/{id}`, `DELETE /api/v1/credentials/{id}` |
| **K-02** | Sistem hanya menerima akses yang valid dan menolak masukan cacat (*malformed*), tipe tidak sah, serta menegakkan otentikasi Master Key sebelum dekripsi di memori. | Skema Zod 4 (`skemaMasterPass`, `skemaCredentialBaru`), Problem Details RFC 9457 | Seluruh handler `/api/v1/**` & Lab Interaktif (`Master Key Sandbox`) |
| **K-03** | Aplikasi desktop mendukung peluncuran tersembunyi via alias registry `Win + R` (`mypass`) tanpa meninggalkan pintasan di Start Menu/Desktop. | Simulasi Launcher `Win + R` & Registry Visualizer (`DocsView`, `LabView`) | Panduan `/docs/pc-install` & Lab 02 |
| **K-04** | Installer perangkat lunak memasang payload dan membersihkan jejak installer secara otomatis (*self-deletion*). | Arsitektur Installer & Panduan Deployment | Tab Guidebook & Architecture (`PC Core`) |
| **K-05** | Perangkat klien (PC & Android) dapat melakukan sinkronisasi dan mencatat status *pairing* / aktivitas perangkat ke catatan audit (`AuditLog`) berelasi 1:N tanpa kehilangan riwayat secara diam-diam. | Relasi `VaultCredential` ↔ `AuditLog` (`onDelete: Restrict`) & P2P Sync (Port 14202) | `GET /api/v1/credentials/{id}/audit-logs`, `POST /api/v1/credentials/{id}/audit-logs`, `DELETE /api/v1/credentials/{id}` (proteksi `409 Conflict`) |
| **K-06** | Browser Extension MV3 & skrip integrasi dapat mengambil daftar/detail kredensial tersaring secara terstruktur serta menyinkronkan entri baru melalui kontrak JSON terstandar. | Extension DOM IPC & Kueri Paginasi/Kategori (`?halaman=&batas=&kategori=`) | `GET /api/v1/credentials`, `POST /api/v1/credentials`, `PATCH /api/v1/credentials/{id}` |
| **K-07** | Pengguna dan modul pemantauan keamanan dapat memantau kesehatan sandi (*securityRate* 1–5), status aktif (`isActive`), dan riwayat inspeksi kredensial per perangkat. | Skor `securityRate` pada `AuditLog`, Password Health Monitoring & Status `isActive` | `GET /api/v1/credentials/{id}/audit-logs`, `POST /api/v1/credentials/{id}/audit-logs`, `PATCH /api/v1/credentials/{id}` |
| **K-08** | Aplikasi mobile Android (`MobilePMSV`) berjalan responsif lintas orientasi serta memindai QR Code sinkronisasi lokal. | Panduan & Ilustrasi P2P Android | Tab Guidebook (`android`) & `/docs/android-install` |
| **K-09** | Hub Web menyediakan dokumentasi interaktif, kontrak OpenAPI 3.1 tervalidasi, validasi Zod 4 sisi server, dan respons galat standar RFC 9457 (`application/problem+json`). | Route Handlers Next.js 16 (`/api/v1`), OpenAPI `docs/api/openapi.yaml`, `lib/api/problem.ts` | Seluruh endpoint `/api/v1/**` & `/vault` |
| **K-10** | Sistem menangani galat darurat, anomali server, dan pembersihan memori secara aman tanpa membocorkan *stack trace*, kueri SQL, atau galat internal Prisma kepada klien. | Pembungkus galat `denganPenangananGalat()`, *Panic Zeroize* Simulator | Handler 500 RFC 9457 di `/api/v1/**` & Playbook PB-01 |
