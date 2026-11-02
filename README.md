# STEALTH PASSWORD VAULT — WEB HUB & INTERACTIVE LAB
## Portal Dokumentasi Kurikulum Terpadu & Laboratorium Keamanan

Modul web berbasis Next.js 16 App Router yang menyajikan dokumentasi interaktif, simulasi skenario ancaman, dan pemetaan kurikulum 16 pekan untuk:
- **Pengembangan Aplikasi Web (052355 / 052356)**
- **Kriptografi (052357)**
- **Keamanan Komputasi dan Siber (052353)**

### Fitur Utama Web Hub:
1. **Interactive Curriculum Roadmap:**
   - Navigasi 16 pekan untuk 3 mata kuliah terpadu (Fase 1 s.d Fase 4).
   - Pemetaan Sub-CPMK, konsep teoretis, dan bukti implementasi konkret pada vault.
2. **Interactive Security Lab (Lab 01 – Lab 03):**
   - *Lab 01: Master Key Derivation & Salting* (Simulasi KDF PBKDF2/Argon2id).
   - *Lab 02: Stealth Execution & Zero-Disk Footprint* (Simulasi Win+R dan deteksi forensik).
   - *Lab 03: RAM Memory Zeroization & Anti-Dumping* (Simulasi mitigasi cold-boot attack).
3. **Step-by-Step Installation Guides:**
   - Panduan visual langkah demi langkah untuk PC (`PcPMSV`), Android (`MobilePMSV`), dan Browser Extension.
4. **Keamanan & Standar Web Modern:**
   - Server Actions dengan validasi skema Zod 4.
   - Sesi berbasis Cookie `HttpOnly`, `SameSite=Lax`, dan isolasi `server-only`.
   - UI adaptif dengan tema gelap / terang (*Cyber Stealth Theme*).

### Menjalankan Aplikasi Secara Lokal:
```bash
npm install
npm run build
npm run start
```
Buka [http://localhost:3000](http://localhost:3000) pada peramban Anda.
