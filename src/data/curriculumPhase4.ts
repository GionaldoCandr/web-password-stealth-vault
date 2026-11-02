import { Course } from '@/types/curriculum';

export const COURSES_PHASE_4: Course[] = [
  {
    id: 'kks',
    name: 'Keamanan Komputasi dan Siber',
    code: '052353',
    sks: 3,
    badgeColor: 'rose',
    description:
      'Pekan 13–16: Incident Response Playbook & BCP, Asesmen Kerentanan & Uji Ulang (Retest), Kebijakan Keamanan ISO/IEC 27001:2022 & NIST CSF Govern, serta Luaran Final Project terintegrasi & Hak Cipta DJKI.',
    modules: [
      {
        week: 13,
        title: 'Security Playbook, BCP (Business Continuity), dan Tabletop Exercise',
        subCpmk: 'Sub-CPMK 6 (C5): Merancang Security Incident Playbook, menghitung parameter BCP (RTO & RPO), dan menyimulasikan penanganan insiden.',
        concepts: [
          'Anatomi Playbook Keamanan: Trigger event, triase keparahan, isolasi penahanan, investigasi forensik, remediasi, dan tinjauan pasca insiden',
          'Contoh Playbook PB-01: Prosedur tanggap darurat saat kredensial atau Master Password terkompromi',
          'Business Continuity Plan (BCP) & Disaster Recovery: Target Waktu Pemulihan (RTO) dan Titik Pemulihan Data (RPO)',
          'Simulasi Tabletop Exercise: Uji kesiapan tim menghadapi skenario infostealer dan kebocoran memori',
        ],
        vaultImplementation:
          'Stealth Vault menyediakan emergency panic action: bila terdeteksi anomali akses, sistem dapat mengeksekusi memset 0 pada seluruh heap memori secara instan tanpa menyisakan artefak data di disk.',
        interactiveProof:
          'Simulasi eksekusi Playbook Tanggap Darurat dan pemutusan sesi seketika pada tab Dokumentasi Kurikulum.',
      },
      {
        week: 14,
        title: 'Asesmen Kerentanan (Vulnerability Assessment) dan Uji Ulang (Retest)',
        subCpmk: 'Sub-CPMK 6 (C5): Menjalankan asesmen kerentanan berbasis bukti pada staging, mencatat temuan terstandardisasi, dan memverifikasi remediasi via retest.',
        concepts: [
          'Lingkup & Izin Pemeriksaan: Menetapkan batasan etis pengujian pada environment staging sebelum pengujian',
          'Perbedaan Asesmen Kerentanan vs Uji Penetrasi Terbatas: Menemukan kelemahan konfigurasi vs membuktikan dampak eksploitasi',
          'Dokumentasi Temuan Terstandardisasi: Menyimpan bukti pengujian di folder security/ dengan referensi CVE/CWE',
          'Siklus Remediasi & Uji Ulang (Retest): Memverifikasi bahwa patch penutup kerentanan benar-benar efektif dan tidak menimbulkan regresi',
        ],
        vaultImplementation:
          'Dilakukan pemindaian otomatis menggunakan Trivy, Lynis, dan cargo-audit pada build rilis Stealth Vault untuk memastikan zero high/critical vulnerabilities sebelum deployment.',
        interactiveProof:
          'Laporan scorecard hasil asesmen kerentanan dan log verifikasi uji ulang (retest).',
      },
      {
        week: 15,
        title: 'Kebijakan Keamanan, Tata Kelola (ISO/IEC 27001:2022), dan Statement of Applicability',
        subCpmk: 'Sub-CPMK 6 (C5): Menyusun hierarki kebijakan keamanan organisasi, pemetaan kontrol ISO/IEC 27001:2022 Annex A, dan fungsi Govern NIST CSF 2.0.',
        concepts: [
          'Tata Kelola Keamanan Informasi (Governance): Menyelaraskan kontrol keamanan dengan kebutuhan produk',
          'Struktur Standar ISO/IEC 27001:2022: Annex A memuat 93 kontrol keamanan yang dibagi dalam 4 tema (Organisasional, Orang, Fisik, Teknologi)',
          'Statement of Applicability (SoA): Menjustifikasi kontrol yang diterapkan dan alasan pengecualian kontrol yang tidak relevan',
          'Hierarki Dokumen: Kebijakan (Policy) -> Standar -> Prosedur Operasional Standar (SOP) -> Panduan Teknis (Guidelines)',
        ],
        vaultImplementation:
          'Dokumentasi tata kelola Stealth Vault memetakan kontrol ISO 27001 A.8.24 (Penggunaan Kriptografi) dan A.8.12 (Pencegahan Kebocoran Data) ke dalam arsitektur in-memory volatile cipher.',
        interactiveProof:
          'Matriks Statement of Applicability (SoA) ISO 27001:2022 pada widget kurikulum.',
      },
      {
        week: 16,
        title: 'Rilis Produk Final Project, Matriks Keterlacakan, dan Pencatatan Ciptaan DJKI',
        subCpmk: 'Sub-CPMK 2, 4, 5, 6: Menyelesaikan produk terintegrasi v1.0, menyusun matriks keterlacakan capaian, dan menyiapkan berkas Hak Cipta DJKI.',
        concepts: [
          'Satu Produk Tiga Dimensi Setara: Integrasi komprehensif KKS, Kriptografi, dan Pengembangan Aplikasi Web',
          'Matriks Keterlacakan (Traceability Matrix): Menghubungkan setiap Sub-CPMK perkuliahan ke baris kode implementasi nyata',
          'Persiapan Pendaftaran Hak Cipta DJKI (Kemenkumham RI): Manual Book / Buku Panduan Pengoperasian, deskripsi ciptaan perangkat lunak, dan video demo teknis',
        ],
        vaultImplementation:
          'Rilis akhir Stealth Password Vault v1.0 Finale disertai berkas manual book interaktif dan video walkthrough simulasi pertahanan siber multi-platform.',
        interactiveProof:
          'Verifikasi matriks keterlacakan 100% dan instrumen pendaftaran hak cipta perangkat lunak.',
      },
    ],
  },
  {
    id: 'kripto',
    name: 'Kriptografi',
    code: '052354',
    sks: 3,
    badgeColor: 'cyan',
    description:
      'Pekan 13–16: Pengembangan fitur kriptografi terhubung, evaluasi ketahanan anti-tamper AEAD & timing attack, pembersihan artefak rilis v1.0, serta evaluasi Final Project.',
    modules: [
      {
        week: 13,
        title: 'Pengembangan Fitur Kriptografi Terhubung dan Alur End-to-End',
        subCpmk: 'Sub-CPMK 4 & 5: Memverifikasi integrasi alur kriptografi dari pembangkitan kunci, pertukaran sesi efemeral, hingga proteksi data di memori.',
        concepts: [
          'Keterhubungan Alur Kriptografi: Input Master Password -> KDF Argon2id -> Kriptografi Hibrida (ECDH) -> Enkripsi AES-256-GCM -> Safe Zeroization',
          'Pencegahan Penggunaan Ulang Nonce (Nonce Reuse Prevention): Generator nonce 96-bit kriptografis acak per entri untuk mencegah kerentanan fatal GCM',
          'Verifikasi Batas Kepercayaan: Penolakan paket sync yang tidak memiliki tanda tangan digital sah',
        ],
        vaultImplementation:
          'Menggabungkan seluruh primitive kriptografi ke dalam engine sinkronisasi lokal teruji tanpa kebocoran data di transit maupun at-rest.',
        interactiveProof:
          'Visualizer alur pipeline kriptografi end-to-end terhubung pada tab Dokumentasi Kurikulum.',
      },
      {
        week: 14,
        title: 'Evaluasi Fungsional dan Keamanan Kriptografi (Anti-Tamper & Timing Resistance)',
        subCpmk: 'Sub-CPMK 5 (C6): Menguji ketahanan tampering pada ciphertext AEAD dan memverifikasi perbandingan string waktu-konstan.',
        concepts: [
          'Pengujian Integritas AEAD: Membuktikan bahwa pengubahan 1 bit ciphertext atau authentication tag seketika menggagalkan dekripsi',
          'Proteksi Timing Attack: Menggunakan pembandingan waktu konstan (constant_time_eq) pada pengecekan MAC dan auth tag',
          'Uji Entropi Kunci: Memastikan distribusi pseudo-random byte generator memenuhi standar FIPS 140-3',
        ],
        vaultImplementation:
          'Engine Rust memvalidasi authentication tag dengan modul constant_time_eq, mencegah penyerang mengukur delta waktu CPU untuk menebak tag.',
        interactiveProof:
          'Lab uji tampering 1-bit ciphertext dan demonstrasi respons gagal tertutup (fail-closed).',
      },
      {
        week: 15,
        title: 'Perbaikan Produk Kriptografi dan Persiapan Rilis v1.0',
        subCpmk: 'Sub-CPMK 5 (C6): Mengeliminasi artefak debug, mengoptimalkan kecepatan enkripsi SIMD, dan mengamankan alokasi memori dari swapping.',
        concepts: [
          'Pembersihan Artefak Kriptografi: Memastikan tidak ada kunci privat atau ciphertext sementara yang tertinggal di berkas log atau dump memori',
          'Optimasi Hardware Acceleration: Pemanfaatan instruksi AES-NI pada CPU modern untuk enkripsi throughput tinggi',
          'Proteksi Paging Memori: Memastikan memory page yang menampung master key tidak di-swap ke hard disk (mlock / VirtualLock)',
        ],
        vaultImplementation:
          'Stealth Vault memanfaatkan pustaka Rust zeroize yang mengeksekusi compiler memory barrier volatile write saat struct dijatuhkan (Drop).',
        interactiveProof:
          'Pemeriksaan keamanan memori volatile dan bukti eliminasi residual key artifacts.',
      },
      {
        week: 16,
        title: 'Evaluasi Final Project Kriptografi: Rilis v1.0 Produk Terpadu',
        subCpmk: 'Sub-CPMK 1–5: Evaluasi komprehensif implementasi seluruh prinsip kriptografi dari teori Shannon hingga enkripsi modern.',
        concepts: [
          'Konsolidasi CPMK-1 & CPMK-2: Sandi klasik, aritmetika modulo, AES block cipher, SHA-256 HMAC, RSA/ECC, PKI TLS 1.3, dan arsitektur hibrida',
          'Pembuktian Matematis: Verifikasi formal ketahanan ruang kunci 2^256 bit terhadap brute-force modern',
        ],
        vaultImplementation:
          'Seluruh spesifikasi kriptografi terintegrasi penuh dalam rilis v1.0 Finale dengan performa tinggi dan nol kerentanan kriptografis.',
        interactiveProof:
          'Sertifikat kepatuhan kriptografi dan pengujian konsolidasi seluruh modul.',
      },
    ],
  },
  {
    id: 'paw',
    name: 'Pengembangan Aplikasi Web (Teori & Praktikum)',
    code: '052355 / 052356',
    sks: 4,
    badgeColor: 'blue',
    description:
      'Pekan 13–16: Pengujian otomatis (Vitest), deployment CI/CD & container Docker, evaluasi Core Web Vitals, pengujian usability SUS (skor ≥ 68), dan demonstrasi rilis Final Project v1.0.',
    modules: [
      {
        week: 13,
        title: 'Pengujian Otomatis (Vitest) & Manajemen Konfigurasi Multi-Lingkungan',
        subCpmk: 'Sub-CPMK 4 & 5: Menulis unit test & integration test dengan Vitest, mengelola konfigurasi 3 lingkungan, dan menyiapkan container Docker.',
        concepts: [
          'Piramida Pengujian: Unit test logika bisnis & validasi Zod 4 -> Integration test Server Actions -> E2E testing',
          'Vitest 5.x: Setup konfigurasi, blok describe/test, asersi expect(), dan mocking modul eksternal',
          'Tiga Lingkungan Produk: Development (localhost), Staging (mirror produksi), dan Production',
          'Pengamanan Environment Variables (.env.production): Isolasi API keys dan rahasia database dari bundle publik klien',
        ],
        theoryTitle: 'Teori: Strategi Pengujian Otomatis & Pemisahan Lingkungan',
        theoryConcepts: [
          'Piramida Pengujian perangkat lunak: Unit test (banyak & cepat), Integration test, End-to-End test',
          'Prinsip pengujian logika bisnis murni tanpa rendering DOM berlebih',
          'Isolasi konfigurasi rahasia pada berkas .env.example yang aman di-commit',
        ],
        labTitle: 'Praktikum (Modul 13): Vitest Unit Test & Containerisasi Docker',
        labConcepts: [
          'Setup berkas vitest.config.ts dan penulisan test suite otomatis',
          'Docker multi-stage build: stage builder (node:24-alpine) -> stage runner (USER nextjs)',
          'Verifikasi container berjalan dengan hak non-root dan port forwarding yang benar',
        ],
        vaultImplementation:
          'Proyek dilengkapi rangkaian unit test Vitest untuk fungsi validasi Zod dan enkripsi, serta Dockerfile multi-stage build yang memproduksi container berukuran minimal dan aman.',
        interactiveProof:
          'Konsol eksekusi unit test Vitest interaktif dengan indikator kelulusan 100% dan visualizer konfigurasi Docker.',
      },
      {
        week: 14,
        title: 'Deployment Modern, Pipeline CI/CD, dan Optimasi Core Web Vitals',
        subCpmk: 'Sub-CPMK 6 (C5–C6, P5): Membangun pipeline otomatisasi CI/CD, mengoptimalkan Core Web Vitals, dan mencapai skor audit Lighthouse ≥ 85.',
        concepts: [
          'Automasi CI/CD: Pipeline GitHub Actions (linting, type checking, automated testing, container build, automated deploy)',
          'Evaluasi Kinerja Core Web Vitals: LCP (Largest Contentful Paint < 2.5s), INP (Interaction to Next Paint < 200ms), CLS (Cumulative Layout Shift < 0.1)',
          'Audit Google Lighthouse: Pengujian performa, aksesibilitas WCAG, best practices, dan SEO dengan target skor ≥ 85',
        ],
        theoryTitle: 'Teori: Pipeline CI/CD & Metrik Performa Web Modern',
        theoryConcepts: [
          'Arsitektur continuous integration: pencegahan regresi sebelum pull request di-merge',
          'Tiga pilar Core Web Vitals dari Google sebagai standar pengalaman pengguna web modern',
        ],
        labTitle: 'Praktikum (Modul 14): Audit Lighthouse & Evaluasi Web Vitals',
        labConcepts: [
          'Eksekusi audit Lighthouse via DevTools dan CLI',
          'Optimasi font loading lokal (eliminasi Google Fonts eksternal) untuk memangkas LCP',
          'Pemeriksaan rasio kontras warna dan navigasi ramah keyboard untuk kepatuhan aksesibilitas',
        ],
        vaultImplementation:
          'Website guidebook dirancang dengan font lokal sistem UI dan Tailwind CSS v4 teroptimasi Webpack, mencapai skor Lighthouse performa & aksesibilitas di atas 90 tanpa lag interaksi.',
        interactiveProof:
          'Simulator hasil audit Google Lighthouse dan metrik Core Web Vitals pada tab Dokumentasi Kurikulum.',
      },
      {
        week: 15,
        title: 'Evaluasi Produk Empat Dimensi, Pengujian Usability SUS, dan Pencatatan Hak Cipta',
        subCpmk: 'Sub-CPMK 6 (C5–C6, P5) & Sub-CPMK 1 (C4): Melakukan evaluasi 4 dimensi, mengukur skor SUS (≥ 68), dan menyusun berkas HKI DJKI.',
        concepts: [
          'Rencana Evaluasi Empat Dimensi: Fungsionalitas (Acceptance Testing), Usability (System Usability Scale), Performa (Core Web Vitals), dan Keamanan (OWASP)',
          'Kuesioner SUS Versi Indonesia: 10 pertanyaan standar psikometri dengan formula konversi skor 0–100 (target batas kelulusan ≥ 68 / Grade B)',
          'Persiapan Pencatatan Ciptaan Program Komputer: Deskripsi fungsi perangkat lunak, manual book pengguna, dan bukti orisinalitas karya',
        ],
        theoryTitle: 'Teori: Kerangka Evaluasi 4 Dimensi & Aspek Legalitas HKI',
        theoryConcepts: [
          'Metodologi System Usability Scale (SUS) untuk evaluasi objektif pengalaman pengguna',
          'Regulasi perlindungan hak cipta program komputer menurut UU No. 28 Tahun 2014 dan pendaftaran resmi ke DJKI',
        ],
        labTitle: 'Praktikum: User Acceptance Testing & Kalkulasi Skor SUS',
        labConcepts: [
          'Penyusunan test scenario untuk pengguna uji coba (end-user testing)',
          'Perhitungan matematis skor SUS: penjumlahan skor ganjil (skala - 1) dan skor genap (5 - skala) dikalikan 2.5',
        ],
        vaultImplementation:
          'Menyediakan dokumentasi pengujian penerimaan pengguna (UAT) dan kalkulator SUS interaktif yang membuktikan kegunaan intuitif antarmuka Stealth Vault.',
        interactiveProof:
          'Kalkulator interaktif skor SUS (System Usability Scale) versi bahasa Indonesia dengan visualisasi grade kelulusan.',
      },
      {
        week: 16,
        title: 'Demonstrasi Rilis Final Project v1.0 dan Pemenuhan Rubrik R4',
        subCpmk: 'Sub-CPMK 1, 4, 5, 6: Mendemonstrasikan produk terintegrasi v1.0, memenuhi 8 kriteria Rubrik R4 (F1–F8), dan memvalidasi rilis bersama.',
        concepts: [
          'Format Demonstrasi Individual: Presentasi teknis, live walkthrough skenario pertahanan, dan sesi tanya jawab',
          'Pemenuhan Rubrik R4: Delapan kriteria evaluasi (F1 Desain & Responsif, F2 Aksesibilitas, F3 Validasi Masukan, F4 Enkripsi Data, F5 Session & Auth, F6 Testing Otomatis, F7 CI/CD, F8 Dokumentasi Lengkap)',
          'Perhitungan Nilai Akhir: Pencapaian 70 poin maksimal dinormalisasi ke skala 100 dengan bobot 35% nilai akhir',
        ],
        theoryTitle: 'Teori: Kriteria Kualitas Perangkat Lunak Produksi & Rubrik R4',
        theoryConcepts: [
          'Standar rilis v1.0: Stabilitas, keandalan, zero-defect pada alur kritis, dan kelengkapan dokumentasi teknis',
        ],
        labTitle: 'Praktikum: Live Demo Multi-Platform Stealth Vault',
        labConcepts: [
          'Walkthrough sinkronisasi: eksekusi Win+R alias -> Master Key unlock -> Browser autofill -> P2P sync',
          'Uji pembuktian anti-forensik: inspeksi disk dan memori saat proses ditutup',
        ],
        vaultImplementation:
          'Aplikasi Stealth Vault dan website panduan memenuhi seluruh deskriptor 100% pada Rubrik R4, menghasilkan sistem perlindungan kredensial yang tangguh, aman, dan berkelas produksi.',
        interactiveProof:
          'Scorecard pemenuhan Rubrik R4 (Kriteria F1–F8) dengan capaian nilai maksimal 100%.',
      },
    ],
  },
];

