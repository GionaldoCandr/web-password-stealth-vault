import { Course, CurriculumPhase } from '@/types/curriculum';

export const CURRICULUM_PHASES: CurriculumPhase[] = [
  {
    phase: 1,
    title: 'Tahap 1: Fondasi, Desain & Arsitektur',
    weeks: 'Pekan 1 – 4',
    status: 'active',
  },
  {
    phase: 2,
    title: 'Tahap 2: Penguatan, Validasi & Data Persisten',
    weeks: 'Pekan 5 – 8',
    status: 'active',
  },
  {
    phase: 3,
    title: 'Tahap 3: Keamanan Lanjutan & Integrasi Sistem',
    weeks: 'Pekan 9 – 12',
    status: 'active',
  },
  {
    phase: 4,
    title: 'Tahap 4: Pengujian, Rilis & Final Project',
    weeks: 'Pekan 13 – 16',
    status: 'active',
  },
];

export const COURSES_PHASE_1: Course[] = [
  {
    id: 'kks',
    name: 'Keamanan Komputasi dan Siber',
    code: '052353',
    sks: 3,
    badgeColor: 'rose',
    description:
      'Fokus pada prinsip keamanan sistem operasi, analisis kerentanan (CWE/CVE), pemodelan ancaman STRIDE, serta kontrol akses & zero-footprint.',
    modules: [
      {
        week: 1,
        title: 'Etika, Batasan Hukum, dan Konsep Dasar Keamanan',
        subCpmk: 'Sub-CPMK 1: Menganalisis CIA Triad, batasan hukum KUHP 2026/UU PDP, dan prinsip Saltzer-Schroeder.',
        concepts: [
          'CIA Triad: Confidentiality, Integrity, Availability',
          'Saltzer & Schroeder Principles: Economy of Mechanism, Least Privilege, Fail-safe Defaults, Complete Mediation',
          'Hukum Komputasi: UU 1/2023 (KUHP Nasional Akses Ilegal) & UU 27/2022 (Pelindungan Data Pribadi)',
        ],
        vaultImplementation:
          'Stealth Vault menerapkan Least Privilege dengan berjalan di User Space (%LOCALAPPDATA%), Fail-safe Defaults dengan keadaan awal selalu Locked di RAM, dan Complete Mediation di mana setiap request extension wajib divalidasi dengan token Win+R & Master Password.',
        interactiveProof:
          'Simulasi status vault default locked dan validasi token pada menu Guidebook & Lab 1.',
      },
      {
        week: 2,
        title: 'Threat, Vulnerability, dan Risk (CWE, CVE, CVSS)',
        subCpmk: 'Sub-CPMK 1: Memetakan ancaman malware infostealer ke kerentanan CWE dan perhitungan skor risiko.',
        concepts: [
          'Ancaman Infostealer (RedLine, Vidar, LummaC2) yang memindai browser database & file teks',
          'CWE-312: Cleartext Storage of Sensitive Information di disk',
          'CWE-316: Cleartext Storage of Sensitive Information in Memory',
          'Formula Risiko: Risk = Threat × Vulnerability × Impact',
        ],
        vaultImplementation:
          'Menghilangkan kelemahan CWE-312 dengan tidak pernah menyimpan kredensial teks di disk, serta memitigasi CWE-316 melalui teknik Zeroize memori RAM volatile seketika saat aplikasi ditutup.',
        interactiveProof:
          'Simulasi visual animasi Stickman Infostealer pada tab "Why Stealth?" yang mendeteksi file teks pass.txt dan critical breach.',
      },
      {
        week: 3,
        title: 'Threat Modeling & Risk Assessment (STRIDE & DFD)',
        subCpmk: 'Sub-CPMK 1: Menyusun dekomposisi sistem DFD, identifikasi ancaman STRIDE, dan Risk Register.',
        concepts: [
          'STRIDE: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege',
          'Data Flow Diagram (DFD) & Trust Boundaries antar-komponen',
          'Mitigasi STRIDE terstruktur',
        ],
        vaultImplementation:
          'Trust Boundary dipasang di antara Browser Extension dan Desktop Port 14201 (dijaga oleh token Win+R), serta antara HP Android dan PC Port 14202 (dijaga oleh pairing QR dan TLS lokal).',
        interactiveProof:
          'Diagram arsitektur alur data dan trust boundary pada tab "Architecture".',
      },
      {
        week: 4,
        title: 'Authentication, Access Control, dan Password Storage',
        subCpmk: 'Sub-CPMK 2: Menerapkan kontrol akses dan tata kelola penyimpanan kata sandi berbasis KDF.',
        concepts: [
          'Faktor Otentikasi: Something you know (Master Pass) & Something you have (Paired Phone)',
          'Bahaya hashing tanpa salt / MD5 / SHA-1 terhadap serangan Rainbow Table',
          'Key Derivation Function (KDF) modern: Argon2id / PBKDF2 dengan salt acak',
        ],
        vaultImplementation:
          'Master password tidak pernah disimpan polos; digunakan sebagai input KDF untuk menurunkan kunci enkripsi simetris AES-256 secara langsung ke RAM.',
        interactiveProof:
          'Simulator Master Key Unlock dengan Zod validation pada Guidebook PC Step 3.',
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
      'Membahas dasar matematis modulo, teori Shannon (Confusion-Diffusion), prinsip Kerckhoffs, struktur Rijndael AES-256, dan mode operasi AEAD.',
    modules: [
      {
        week: 1,
        title: 'Tujuan Keamanan dan Konsep Dasar Kriptografi',
        subCpmk: 'Sub-CPMK 1: Memahami Kerckhoffs Principle, plaintext, ciphertext, dan ruang kunci simetris.',
        concepts: [
          "Kerckhoffs's Principle: Keamanan hanya bertumpu pada kerahasiaan kunci, bukan algoritma",
          'Plaintext (P), Ciphertext (C), Kunci (K), Ruang Kunci 2^256 bit',
          'Kriptografi Kunci Simetris vs Asimetris',
        ],
        vaultImplementation:
          'Menggunakan algoritma standar terbuka yang teruji (AES-256 & Argon2id) tanpa algoritma kriptografi kustom buatan sendiri yang belum teruji, sesuai prinsip Kerckhoffs.',
        interactiveProof:
          'Visualizer kartu RAM terenkripsi AES-GCM-256 dengan heksadesimal ciphertext di tab "Interactive Lab".',
      },
      {
        week: 2,
        title: 'Sandi Klasik dan Dasar Matematika',
        subCpmk: 'Sub-CPMK 1: Aritmetika modulo, kelemahan sandi substitusi klasik, dan operasi XOR.',
        concepts: [
          'Aritmetika Modulo: a ≡ b (mod m)',
          'Operasi Biner XOR (⊕) sebagai adisi biner modulo 2: p ⊕ k ⊕ k = p',
          'Kelemahan sandi klasik (analisis frekuensi distribusi huruf)',
        ],
        vaultImplementation:
          'Operasi XOR digunakan dalam masking memori dan menjadi operasi dasar pada ronde AES serta komputasi counter pada mode GCM.',
        interactiveProof:
          'Widget interaktif kalkulator XOR dan visualisasi perputaran modulo di tab Kurikulum.',
      },
      {
        week: 3,
        title: 'Komponen Dasar Produk: Confusion, Diffusion & Avalanche Effect',
        subCpmk: 'Sub-CPMK 2: Prinsip Shannon (S-Box, Permutasi) dan pengujian efek longsoran (Avalanche Effect).',
        concepts: [
          'Confusion (Konfusi): Mengaburkan relasi kunci & ciphertext via S-Box non-linear',
          'Diffusion (Difusi): Menyebarkan redundansi plaintext ke seluruh blok via ShiftRows & MixColumns',
          'Avalanche Effect: Perubahan 1 bit masukan wajib mengubah minimal 50% bit keluaran',
        ],
        vaultImplementation:
          'Memanfaatkan pustaka Rust AES-256-GCM yang mengimplementasikan S-Box tahan timing-attack untuk memproteksi vault item di RAM.',
        interactiveProof:
          'Simulasi visual Avalanche Effect dengan deteksi persentase perubahan bit saat kunci diubah.',
      },
      {
        week: 4,
        title: 'Block Cipher, Struktur AES, dan Mode Operasi',
        subCpmk: 'Sub-CPMK 2: Menganalisis kelemahan ECB dan menerapkan enkripsi terautentikasi AES-GCM.',
        concepts: [
          'Struktur AES: State matrix 4×4 byte, 14 ronde (AES-256): SubBytes, ShiftRows, MixColumns, AddRoundKey',
          'Kelemahan Fatal Mode ECB: Blok identik menghasilkan ciphertext identik (kebocoran siluet gambar)',
          'Mode Operasi Modern: CBC, CTR, dan GCM (Galois/Counter Mode AEAD)',
        ],
        vaultImplementation:
          'Stealth Vault secara eksplisit menolak mode ECB dan mengadopsi AES-256-GCM (AEAD) yang menghasilkan ciphertext sekaligus 128-bit authentication tag untuk integritas data.',
        interactiveProof:
          'Komparasi visual gambar Tux ECB leakage vs GCM randomization pada widget Kurikulum.',
      },
    ],
  },
  {
    id: 'paw-teori',
    name: 'Pengembangan Aplikasi Web',
    code: '052355',
    sks: 3,
    badgeColor: 'blue',
    description:
      'Membahas arsitektur Client-Server, HTTP cycle, HTML semantik, CSS Grid/Flexbox, React component architecture, dan Next.js App Router.',
    modules: [
      {
        week: 1,
        title: 'Arsitektur Web, Siklus HTTP, dan Pola Rendering',
        subCpmk: 'Sub-CPMK 1: Menganalisis arsitektur client-server, siklus request-response, dan semantik HTTP.',
        concepts: [
          'Siklus Request–Response HTTP, komponen URL, Headers, Body',
          'Metode HTTP Safe (GET, HEAD) vs Idempotent (PUT, DELETE) vs Non-Idempotent (POST)',
          'Stateless Protocol & Kode Status: 2xx (Success), 3xx (Redirect), 4xx (Client Error), 5xx (Server Error)',
        ],
        vaultImplementation:
          'Local HTTP Server di desktop (port 14201 untuk browser extension dan 14202 untuk Android sync) merespons dengan header CORS, application/json, dan status code 200/400/401/404.',
        interactiveProof:
          'Terminal emulator interaktif yang memproses endpoint HTTP dengan respons status code di tab "Interactive Lab".',
      },
      {
        week: 2,
        title: 'HTML Semantik, CSS Responsif, dan Dasar TypeScript',
        subCpmk: 'Sub-CPMK 2: Merancang antarmuka web semantik dan responsif mobile-first menggunakan Tailwind CSS.',
        concepts: [
          'HTML Semantics & Landmark Regions: header, nav, main, section, aside, footer',
          'CSS Flexbox (1 Dimensi) & CSS Grid (2 Dimensi) pada Tailwind CSS 4',
          'Pendekatan Mobile-First dengan breakpoint Tailwind: sm (640px), md (768px), lg (1024px)',
          'TypeScript Dasar: Type Annotations, Interfaces, dan Type Aliases',
        ],
        vaultImplementation:
          'Website guidebook dibangun sepenuhnya dengan elemen semantik landmark HTML5 dan Tailwind CSS v4 yang adaptif di berbagai resolusi layar tanpa horizontal scrollbar.',
        interactiveProof:
          'Tampilan web responsif yang otomatis berubah dari 1 kolom di ponsel ke multi-kolom di desktop.',
      },
      {
        week: 3,
        title: 'Komponen React, Formulir, dan Aksesibilitas (WCAG 2.2)',
        subCpmk: 'Sub-CPMK 2: Mengembangkan komponen React bertipe, formulir terkontrol, dan kepatuhan aksesibilitas.',
        concepts: [
          'Komponen berbasis fungsi, sifat immutable Props vs mutable State (useState)',
          'Controlled Forms dengan event onChange dan validasi masukan',
          'Standar Aksesibilitas WCAG 2.2: Kontras warna 4.5:1, navigasi keyboard (Tab, Enter), ARIA attributes',
        ],
        vaultImplementation:
          'Formulir Master Key Unlock dan input Terminal Shell menggunakan controlled component React dengan label aksesibel dan outline penanda fokus (focus-visible).',
        interactiveProof:
          'Simulator form Master Password dengan pesan galat Zod dan navigasi ramah keyboard.',
      },
      {
        week: 4,
        title: 'Next.js App Router: Routing, Layout, dan Server/Client Components',
        subCpmk: 'Sub-CPMK 3: Mengimplementasikan file-based routing App Router, pembagian Server/Client Components.',
        concepts: [
          'File-based routing: app/page.tsx, layout.tsx, template.tsx',
          'Server Components (RSC Payload tanpa kirim JS ke browser) vs Client Components ("use client")',
          'Special Files: loading.tsx (Suspense), error.tsx (Error Boundary), not-found.tsx',
          'Dynamic Segments [id] dengan Promise params pada Next.js versi terbaru',
        ],
        vaultImplementation:
          'Struktur folder web-password-stealth-vault menggunakan App Router Next.js 16, dengan layout bersama, rute dinamis ber-generateStaticParams, dan pemisahan direktif "use client" yang efisien.',
        interactiveProof:
          'Rute halaman /docs, /lab, rute dinamis /docs/[slug], dan /lab/[labId] yang terkompilasi sempurna.',
      },
    ],
  },
  {
    id: 'paw-praktikum',
    name: 'Praktikum Pengembangan Aplikasi Web',
    code: '052357',
    sks: 1,
    badgeColor: 'emerald',
    description:
      'Praktik laboratorium langsung: Git workflow, Semantic Landmark Tree, Tailwind CSS styling, TypeScript strict typing, dan Next.js 16 App Router.',
    modules: [
      {
        week: 1,
        title: 'Modul 1: Lingkungan Pengembangan, Git, dan Lalu Lintas HTTP',
        subCpmk: 'Sub-CPMK 1: Menyiapkan Node.js 24 LTS, Git commit/branch/merge conflict, dan pengamatan HTTP curl.',
        concepts: [
          'Verifikasi Node.js 24 LTS dan npm',
          'Git Workflow: working tree, staging area, Conventional Commits (feat, fix, docs, chore)',
          'Branching, Merge, dan penyelesaian konflik (<<<<<<< HEAD ... >>>>>>>)',
          'Analisis HTTP dengan DevTools Network Panel dan curl -I (metode HEAD)',
        ],
        vaultImplementation:
          'Seluruh kode repositori dikelola menggunakan Git dengan branch terpisah, commit bermakna, serta berkas .gitignore yang melindungi rahasia lingkungan.',
        interactiveProof:
          'Checklist Checkpoint 1–5 dari Modul 1 terintegrasi pada matriks verifikasi praktikum.',
      },
      {
        week: 2,
        title: 'Modul 2: HTML Semantik, Tailwind CSS, dan Aksesibilitas',
        subCpmk: 'Sub-CPMK 2: Implementasi landmark tree, Tailwind mobile-first, dan audit Lighthouse skor ≥ 85.',
        concepts: [
          'Struktur Semantik: <header>, <nav aria-label>, <main id="konten">, <section aria-labelledby>, <footer>',
          'Tailwind CSS v4: flexbox layout, grid-cols-3, mobile-first breakpoints',
          'Form Aksesibel: <label htmlFor>, <fieldset>, <legend>, aria-describedby, focus-visible:outline',
          'Audit Aksesibilitas Lighthouse dengan target skor minimal 85',
        ],
        vaultImplementation:
          'Halaman web memenuhi standar WCAG 2.2 dengan rasio kontras teks tinggi, tombol ber-aria-label, dan struktur pohon landmark yang terdeteksi utuh di DevTools Accessibility.',
        interactiveProof:
          'Audit kepatuhan aksesibilitas dengan lencana skor Lighthouse terverifikasi.',
      },
      {
        week: 3,
        title: 'Modul 3: TypeScript dan Komponen React Bertipe',
        subCpmk: 'Sub-CPMK 2: Kontrak tipe data ketat, reusable components, list rendering, dan Fetch API.',
        concepts: [
          'Tipe data TypeScript: type alias, interface, union type, optional property, Record<K, V>',
          'Komponen Reusable dengan props bertipe dan children: React.ReactNode',
          'List rendering dengan stable key (key={item.id})',
          'Fetch API dengan penanganan 3 status: memuat, berhasil, gagal',
          'Verifikasi tipe: npx tsc --noEmit selesai tanpa galat',
        ],
        vaultImplementation:
          'Seluruh data vault, lab scenario, dan platform guide diketik secara ketat dalam berkas src/types/, dan lolos pemeriksaan npx tsc --noEmit dengan exit code 0.',
        interactiveProof:
          'Verifikasi tipe data langsung di terminal virtual dengan perintah vault --status.',
      },
      {
        week: 4,
        title: 'Modul 4: Next.js App Router, Rute Dinamis, dan Batas Server-Klien',
        subCpmk: 'Sub-CPMK 3: Rute statis & dinamis [id], layout vs template, error/loading boundary, server-only.',
        concepts: [
          'Rute statis (/tentang) dan rute bersarang (/katalog/layout.tsx)',
          'Rute dinamis /katalog/[id] dengan Promise params dan validasi regex ^[1-9]\\d*$',
          'Berkas khusus: loading.tsx (Suspense), error.tsx (Error Boundary), not-found.tsx',
          'Pemisahan komponen: Server Components di akar/induk, Client Component di daun terdalam',
          'Verifikasi build produksi: npm run build lolos tanpa error',
        ],
        vaultImplementation:
          'Proyek web-password-stealth-vault menerapkan App Router Next.js 16 dengan rute dinamis generateStaticParams, Suspense fallback, dan lolos build produksi Webpack/PostCSS.',
        interactiveProof:
          'Bukti build produksi 9 rute teroptimasi (○ Static, ● SSG, ƒ Dynamic).',
      },
    ],
  },
];

