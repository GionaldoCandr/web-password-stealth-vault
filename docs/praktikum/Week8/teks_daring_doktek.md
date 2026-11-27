# Teks Daring Pengumpulan Dokumen Teknis Modul 8
## RESTful API dengan Route Handlers — Stealth Password Vault

Salin teks di bawah ini ke kolom teks daring pengumpulan **Dokumen Teknis Modul 8** di e-learning:

---

**Dokumen Teknis Modul 8 — RESTful API dengan Route Handlers**  
- **Nama Mahasiswa:** Gionaldo Chandrawansah  
- **NIM:** 105224031  
- **Mata Kuliah:** Praktikum Pengembangan Aplikasi Web (052356) · 1 SKS · Semester 5  
- **Dosen Pengampu:** Muhammad Fakhrul Safitra, S.Kom., M.Kom.  
- **Produk:** Stealth Password Vault (`web-password-stealth-vault`)  
- **Tautan Berkas Dokumen Teknis di GitHub:**  
  https://github.com/GionaldoCandr/web-password-stealth-vault/blob/praktikum/modul-08/docs/praktikum/modul-08.md  
- **Tautan Kontrak OpenAPI 3.1:**  
  https://github.com/GionaldoCandr/web-password-stealth-vault/blob/praktikum/modul-08/docs/api/openapi.yaml  
- **Branch Kerja & Pull Request:**  
  `praktikum/modul-08` $\rightarrow$ `main` di https://github.com/GionaldoCandr/web-password-stealth-vault  

### Ringkasan Capaian & Verifikasi Modul 8
1. **Endpoint Route Handlers (`/api/v1`) — 7 Operasi Aktif:**
   - `GET /api/v1/credentials` (paginasi `halaman`, `batas <= 50`, filter `kategori`)
   - `POST /api/v1/credentials` (`201 Created` + header `Location`, validasi Zod + cek duplikat `P2002 -> 409`)
   - `GET /api/v1/credentials/{id}` (`200`, `400`, `404`)
   - `PATCH /api/v1/credentials/{id}` (`200`, menolak `{}` dengan `422`, `P2025 -> 404`, `P2002 -> 409`)
   - `DELETE /api/v1/credentials/{id}` (`204 No Content`, menolak jika masih ada relasi `AuditLog` dengan `409 Conflict`)
   - `GET /api/v1/credentials/{id}/audit-logs` (`200`, daftar relasi 1:N)
   - `POST /api/v1/credentials/{id}/audit-logs` (`201 Created`, cek induk `404`, cek duplikat `credentialId+deviceId` `409`)
2. **Validasi Zod 4 & Problem Details RFC 9457 (`src/lib/skema.ts` & `src/lib/api/problem.ts`):**
   - Seluruh respons galat mengirim `Content-Type: application/problem+json` melalui helper `problem()`, `galatValidasi()`, `bacaJson()`, `bacaId()`, dan pembungkus pengayaan `denganPenangananGalat()`.
3. **Kontrak OpenAPI 3.1.0 & Redocly CLI:**
   - `npx @redocly/cli lint docs/api/openapi.yaml` lolos tanpa galat maupun peringatan (`Woohoo! Your API description is valid.`).
   - Dokumentasi statis dibundel ke `docs/api/index.html`.
4. **Pengujian Manual & Pemeriksaan Kualitas:**
   - 19/19 skenario `curl.exe -i` (100% lulus) serta koleksi Bruno (`docs/api/bruno/`) tersedia.
   - `npx tsc --noEmit`, `npm run lint`, dan `npm run build` lolos dengan 0 galat.
