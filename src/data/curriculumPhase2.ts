import { Course } from '@/types/curriculum';

export const COURSES_PHASE_2: Course[] = [
  {
    id: 'kks',
    name: 'Keamanan Komputasi dan Siber',
    code: '052353',
    sks: 3,
    badgeColor: 'rose',
    description:
      'Pekan 5–8: Hardening OS berbasis CIS Benchmark, keamanan container (NIST SP 800-190), software supply chain (SBOM), taksonomi malware, serta pemetaan MITRE ATT&CK Enterprise v19.',
    modules: [
      {
        week: 5,
        title: 'Hardening Sistem Operasi: CIS Benchmark, SSH, dan Audit Lynis',
        subCpmk: 'Sub-CPMK 3 (C3): Menerapkan kontrol akses berprinsip least privilege dan hardening sistem operasi sesuai CIS Benchmark.',
        concepts: [
          'Pengurangan Attack Surface (Attack Surface Reduction): menonaktifkan paket, daemon, dan port yang tidak diperlukan',
          'CIS Benchmark (Center for Internet Security) sebagai acuan konfigurasi keamanan industri',
          'Hardening SSH: PermitRootLogin no, PasswordAuthentication no, kunci kriptografi Ed25519, drop-in config /etc/ssh/sshd_config.d/00-hardening.conf',
          'Studi Kasus regreSSHion (CVE-2024-6387): Kerentanan race condition signal handler pada sshd',
          'Audit Otomatis Lynis (CISOfy): lynis audit system untuk mengukur baseline dan hardening index',
        ],
        vaultImplementation:
          'Stealth Vault meminimalkan attack surface dengan prinsip zero background daemon (tidak mendaftarkan Windows Service yang terus aktif di latar belakang). Engine IPC Rust bebas dari race condition signal handler karena berbasis asynchronous reactor Tokio.',
        interactiveProof:
          'Audit status attack surface dan checklist kepatuhan CIS Benchmark pada tab Kurikulum Tahap 2.',
      },
      {
        week: 6,
        title: 'Keamanan Container dan Software Supply Chain (SBOM & Trivy)',
        subCpmk: 'Sub-CPMK 3 (C3): Mengamankan build image container, menerapkan multi-stage build non-root, dan mendeteksi kerentanan supply chain.',
        concepts: [
          'Isolasi Container vs VM: Berbagi Linux kernel, bukan batas keamanan absolut (risiko kernel privilege escalation)',
          'Hardening Dockerfile: Multi-stage build, unprivileged user (USER nextjs UID 1001), read-only root filesystem, drop capabilities (cap_drop: ALL)',
          'Software Bill of Materials (SBOM): Standar CycloneDX & SPDX untuk katalog dependensi formal',
          'Vulnerability Scanning Image: Trivy & Grype untuk mendeteksi CVE sebelum deployment',
          'Serangan Software Supply Chain: Worm Shai-Hulud di registry npm, dependency confusion, malicious typosquatting packages',
        ],
        vaultImplementation:
          'Aplikasi web dikemas dengan multi-stage Docker build tanpa hak root. Repositori mengunci integritas dependensi menggunakan checksum lockfile (package-lock.json dan Cargo.lock) serta audit otomatis npm audit & cargo audit.',
        interactiveProof:
          'Checklist keamanan container multi-stage build dan visualisasi integritas rantai pasok perangkat lunak.',
      },
      {
        week: 7,
        title: 'Malware, Serangan Siber Umum, dan MITRE ATT&CK Enterprise v19',
        subCpmk: 'Sub-CPMK 2 (C4): Menganalisis taksonomi malware, memetakan taktik & teknik MITRE ATT&CK, dan merancang kontrol mitigasi pencurian kredensial.',
        concepts: [
          'Taksonomi Malware: Virus, Worm, Trojan Horse, Ransomware (Double Extortion), Rootkit, Fileless Malware (in-memory execution)',
          'MITRE ATT&CK Enterprise Framework (15 Taktik): Initial Access, Execution, Persistence, Defense Evasion, Credential Access, Lateral Movement, dll.',
          'Pencurian Kredensial: T1003 (OS Credential Dumping), T1110 (Brute Force), T1552 (Unsecured Credentials), Adversary-in-the-Middle, MFA/OTP bypass phishing',
          'Studi Kasus Serangan Nyata: Ransomware PDNS 2 dan Worm Shai-Hulud pada laptop pengembang',
        ],
        vaultImplementation:
          'Stealth Vault dirancang spesifik untuk menggagalkan T1003 (OS Credential Dumping): malware infostealer (RedLine, Lumma) tidak menemukan berkas kredensial apa pun di disk (%APPDATA% browser) karena kredensial hanya ada di RAM terenkripsi dan langsung di-zeroize saat ditutup.',
        interactiveProof:
          'Matriks mitigasi interaktif teknik MITRE ATT&CK Enterprise v19 pada tab Kurikulum Tahap 2.',
      },
      {
        week: 8,
        title: 'Pengarahan & Evaluasi Ujian Tengah Semester (UTS)',
        subCpmk: 'Sub-CPMK 1, 2, dan 3: Evaluasi komprehensif konsep dasar, threat modeling, taksonomi malware, least privilege, dan hardening sistem.',
        concepts: [
          'Konsolidasi Sub-CPMK 1 (Pekan 1–3): CIA Triad, Batasan Hukum, Threat Modeling STRIDE, dan Analisis Risiko',
          'Konsolidasi Sub-CPMK 2 (Pekan 7): Taksonomi Malware, Teknik Pencurian Kredensial, dan Pemetaan MITRE ATT&CK',
          'Konsolidasi Sub-CPMK 3 (Pekan 4–6): Autentikasi, Least Privilege, OS Hardening, dan Keamanan Container',
        ],
        vaultImplementation:
          'Verifikasi menyeluruh arsitektur keamanan produk: lulus audit zero disk footprint, lolos verifikasi least privilege, dan integritas memori terjamin.',
        interactiveProof:
          'Dashboard evaluasi kesiapan UTS & verifikasi compliance scorecard untuk 3 Sub-CPMK.',
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
      'Pekan 5–8: Enkripsi terautentikasi (AEAD), fungsi hash (SHA-256), HMAC, prinsip fail-closed & normalisasi, aritmetika modular & Extended Euclidean Algorithm (EEA), serta evaluasi UTS.',
    modules: [
      {
        week: 5,
        title: 'Enkripsi Terautentikasi (AEAD), Fungsi Hash, dan HMAC',
        subCpmk: 'Sub-CPMK 1 (C3): Menerapkan fungsi hash satu arah, menganalisis efek longsoran, dan menghitung HMAC untuk integritas pesan.',
        concepts: [
          'Tiga sifat keamanan fungsi hash: Preimage resistance (one-way), Second preimage resistance, Collision resistance',
          'Paradoks Ulang Tahun (Birthday Paradox): Tabrakan probabilitas 50% terjadi pada 2^(n/2) operasi (SHA-256 membutuhkan 2^128)',
          'Avalanche Effect (Efek Longsoran): Perubahan 1 bit masukan menghasilkan perubahan minimal 50% bit hash keluaran',
          'Keusangan MD5 & SHA-1 karena collision attack; standarisasi SHA-2 (SHA-256) & SHA-3 (Keccak)',
          'Konstruksi HMAC: HMAC(K, m) = H((K ⊕ opad) || H((K ⊕ ipad) || m)) untuk mencegah Length Extension Attack',
          'AEAD (Authenticated Encryption with Associated Data): Menggabungkan privasi ciphertext dan keaslian authentication tag',
        ],
        vaultImplementation:
          'Master Password diverifikasi menggunakan KDF berbasis hash teruji. Komunikasi sinkronisasi P2P lokal memanfaatkan HMAC-SHA256 untuk memvalidasi keaslian paket, sedangkan item vault di RAM diproteksi dengan AES-256-GCM (AEAD).',
        interactiveProof:
          'Simulator interaktif Efek Longsoran (Avalanche Effect) & kalkulator HMAC-SHA256 pada tab Kurikulum.',
      },
      {
        week: 6,
        title: 'Integrasi Komponen Kriptografi: Trust Boundaries, Normalisasi, dan Fail-Closed',
        subCpmk: 'Sub-CPMK 3 (C3): Mengintegrasikan komponen kriptografi ke dalam alur aplikasi, menegakkan batas kepercayaan, dan prinsip gagal tertutup.',
        concepts: [
          'Batas Kepercayaan (Trust Boundary): Data dari luar sistem (jaringan, file eksternal, IPC peramban) adalah masukan tidak tepercaya',
          'Tiga Pola Integrasi: Kunci mengalir (key flowing), Dekripsi lalu proses, Pipeline terautentikasi',
          'Normalisasi Masukan Kanonik: Makna sama, byte berbeda, tag berbeda (menghindari varian representasi Unicode/spasi)',
          'Prinsip Gagal Tertutup (Fail-Closed): Jika tag HMAC atau MAC AEAD corrupt/tamper, sistem menolak seketika tanpa crash atau bypass',
        ],
        vaultImplementation:
          'Handler IPC ekstensi (port 14201) dan handler sinkronisasi P2P (port 14202) menerapkan validasi skema ketat. Jika token atau tag enkripsi salah, koneksi langsung diputus (Fail-Closed) tanpa membocorkan isi RAM.',
        interactiveProof:
          'Lab simulasi pengujian Fail-Closed: manipulasi 1 bit tag autentikasi dan lihat respons penolakan seketika.',
      },
      {
        week: 7,
        title: 'Penguatan Konsep, Perhitungan Matematika Kriptografi, dan Algoritma Euclid',
        subCpmk: 'Sub-CPMK 1 (C3) & Sub-CPMK 2 (C4): Menghitung operasi aritmetika modular, mencari invers modular dengan Extended Euclidean Algorithm, dan analisis sandi affine/Vigenère.',
        concepts: [
          'Aritmetika Modulo: Sisa pembagian positif, kongruensi a ≡ b (mod n)',
          'Algoritma Euclidean untuk mencari Faktor Persekutuan Terbesar (FPB / gcd(a, b))',
          'Extended Euclidean Algorithm (EEA): Menghitung invers modular a^(-1) mod n di mana a·x + n·y = 1',
          'Penyelesaian Persamaan Linear Modular: a·x ≡ b (mod n) ⟹ x ≡ a^(-1)·b (mod n)',
          'Sandi Affine: E(x) = (a·x + b) mod 26 dengan syarat gcd(a, 26) = 1, dan dekripsi D(y) = a^(-1)(y - b) mod 26',
          'Analisis Known-Plaintext Attack (KPA) pada sandi klasik',
        ],
        vaultImplementation:
          'Aritmetika modular dan invers modular merupakan fondasi matematis bagi komputasi kurva eliptik / Diffie-Hellman yang mendasari pembentukan sesi P2P aman antar peranti Stealth Vault.',
        interactiveProof:
          'Kalkulator interaktif Extended Euclidean Algorithm (EEA) & Invers Modular langkah-demi-langkah.',
      },
      {
        week: 8,
        title: 'Ujian Tengah Semester (UTS) Kriptografi',
        subCpmk: 'Sub-CPMK 1 & Sub-CPMK 2: Ujian pemahaman komprehensif teori matematika, block cipher, AEAD, dan fungsi hash.',
        concepts: [
          'Evaluasi CPMK-1: Sandi klasik, aritmetika modulo, Extended Euclidean Algorithm, prinsip Kerckhoffs, dan ruang kunci',
          'Evaluasi CPMK-2: Block cipher AES, S-Box non-linear, mode CBC/GCM, fungsi hash SHA-256, HMAC, dan integrasi produk',
        ],
        vaultImplementation:
          'Pengujian verifikasi end-to-end seluruh pipeline kriptografi: Master Pass -> Argon2id Key -> AES-256-GCM Vault -> HMAC P2P -> Zeroize Buffer.',
        interactiveProof:
          'Simulasi kuis latihan komprehensif persiapan UTS Kriptografi dengan verifikasi jawaban instan.',
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
      'Pekan 5–8: Next.js Server Actions, validasi skema Zod 4, cookie session aman, basis data PostgreSQL & Prisma ORM 7, telaah kritis kode buatan AI (AI Code Review), dan kisi-kisi UTS.',
    modules: [
      {
        week: 5,
        title: 'Formulir, Server Actions, Validasi Zod 4, dan Sesi Berbasis Cookie',
        subCpmk: 'Sub-CPMK 3 (C3, P4): Mengembangkan formulir terautentikasi menggunakan Next.js Server Actions, validasi skema Zod, dan manajemen sesi berbasis cookie aman.',
        concepts: [
          'Next.js Server Actions: Fungsi server async ("use server") dipanggil langsung dari atribut action formulir HTML tanpa endpoint API manual',
          'Alur Kerja Server Action: Serialisasi FormData, mutasi data aman di server, revalidasi cache (revalidatePath), dan pengalihan (redirect)',
          'Server Action adalah Endpoint RPC Publik: Asumsikan masukan dapat ditembak langsung oleh penyerang tanpa antarmuka browser',
          'Validasi Dua Sisi: Validasi HTML di sisi klien untuk UX responsif + Validasi skema Zod 4 di sisi server untuk integritas absolut (safeParse)',
          'Manajemen Sesi Aman: Cookie HttpOnly (anti-XSS), SameSite=Strict (anti-CSRF), dan Secure flag (hanya HTTPS)',
        ],
        vaultImplementation:
          'Web guidebook mengimplementasikan validasi Zod 4 untuk semua parameter formulir (Master Password, token otorisasi, port IPC). Sesi otentikasi diisolasi dengan ketat tanpa menyimpan token di localStorage yang rentan serangan XSS.',
        interactiveProof:
          'Form validator interaktif dengan skema Zod 4 dan visualisasi parsing galat safeParse.',
      },
      {
        week: 6,
        title: 'Basis Data Relasional, PostgreSQL, dan Prisma ORM 7',
        subCpmk: 'Sub-CPMK 3 (C3, P4): Merancang skema data relasional, mengonfigurasi Prisma ORM 7, dan mengimplementasikan operasi CRUD tipe-aman.',
        concepts: [
          'Pemodelan Data Relasional: Entitas, Primary Key, Foreign Key, Relasi 1:1, 1:N, N:M, dan batasan integritas referensial',
          'PostgreSQL: Connection string pooling (DATABASE_URL), SSL connection parameters',
          'Prisma ORM 7: Berkas schema.prisma, perintah prisma migrate dev, dan pembuatan query bertipe melalui Prisma Client',
          'Penanganan Galat Basis Data: Menangkap PrismaClientKnownRequestError (kode P2002 untuk unique constraint violation, P2025 record not found)',
        ],
        vaultImplementation:
          'Menyajikan perbandingan arsitektural: Sistem penyimpanan tradisional berbasis PostgreSQL + Prisma ORM (disk persistence) dibandingkan dengan arsitektur Stealth Vault berbasis RAM Mutex CRDT (zero-disk volatile).',
        interactiveProof:
          'Visualisasi komparasi skema data Prisma ORM vs In-Memory Struct CRDT Rust.',
      },
      {
        week: 7,
        title: 'Ulasan Materi dan Telaah Kritis Kode Hasil AI (AI Code Review)',
        subCpmk: 'Sub-CPMK 1, 2, dan 3: Mengevaluasi kode secara kritis, mendeteksi kerentanan pada kode buatan AI, dan menyusun laporan audit AI_LOG.md.',
        concepts: [
          'Urgensi Telaah Kritis Kode AI: Kode yang dihasilkan AI sering kali tampak benar secara sintaksis tetapi mengandung celah logika, dependensi usang, atau kerentanan keamanan',
          'Kerangka Telaah 6 Aspek: Fungsionalitas, Keamanan (OWASP/CWE), Kinerja (re-render & resource leak), Arsitektur & Modularitas, Aksesibilitas (WCAG 2.2), dan Keterbacaan',
          'Format Dokumentasi AI_LOG.md: Mencatat prompt awal, kode buatan AI, temuan telaah kritis manusia, dan revisi kode yang dilakukan',
        ],
        vaultImplementation:
          'Proyek ini menerapkan modularisasi ketat dari berkas monolitik awal 1.200 baris Demo Desain Web guide Password.tsx, memverifikasi tidak ada any TypeScript, mengeliminasi re-render tak perlu, dan memastikan kepatuhan aksesibilitas.',
        interactiveProof:
          'Checklist interaktif 6 Aspek Telaah Kode AI pada tab Kurikulum Tahap 2.',
      },
      {
        week: 8,
        title: 'Ujian Tengah Semester (UTS) Teori PAW: Tata Tertib dan Kisi-Kisi',
        subCpmk: 'Sub-CPMK 1, 2, dan 3: Ujian penguasaan materi dari arsitektur HTTP, HTML/CSS responsif, React/TypeScript, hingga Next.js Server Actions & Database.',
        concepts: [
          'Konsolidasi Sub-CPMK 1: Arsitektur Web, Request-Response cycle, HTTP semantik, status codes',
          'Konsolidasi Sub-CPMK 2: HTML semantik, CSS responsif, aksesibilitas WCAG, formulir React, TypeScript typing',
          'Konsolidasi Sub-CPMK 3: Next.js App Router, Server Actions, validasi Zod 4, basis data PostgreSQL, dan Prisma ORM',
        ],
        vaultImplementation:
          'Kepatuhan menyeluruh arsitektur frontend web guidebook terhadap standar kurikulum perkuliahan PAW.',
        interactiveProof:
          'Simulasi kisi-kisi dan evaluasi kesiapan UTS Teori PAW.',
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
      'Modul 5–8: Praktikum Server Actions & validasi Zod 4, PostgreSQL & migrasi Prisma ORM 7, debugging Next.js server-side & error digest, serta REST API Route Handlers RFC 9457.',
    modules: [
      {
        week: 5,
        title: 'Modul 5: Formulir Terautentikasi, Server Actions, dan Validasi Zod 4',
        subCpmk: 'Sub-CPMK 3 (P4): Mengimplementasikan Server Actions form submission dengan validasi skema Zod 4 dan penanganan galat terstruktur per-input.',
        concepts: [
          'Direktif "use server" pada berkas terpisah (action handler)',
          'Skema validasi Zod 4 dengan aturan spesifik: z.string().min(8), z.string().email(), regex pola karakter',
          'safeParse: Menghindari unhandled throw dan mengembalikan objek terstruktur { success, errors }',
          'Umpan balik aksesibel di UI: aria-invalid dan aria-describedby yang menghubungkan input dengan elemen pesan galat',
        ],
        vaultImplementation:
          'Form Master Password unlock dan modal input kredensial baru pada web simulator menggunakan validasi skema Zod dengan feedback pesan galat inline.',
        interactiveProof:
          'Lab formulir interaktif Modul 5 dengan verifikasi real-time validasi skema Zod.',
      },
      {
        week: 6,
        title: 'Modul 6: Basis Data PostgreSQL, Migrasi Skema Prisma ORM 7, dan CRUD',
        subCpmk: 'Sub-CPMK 3 (P4): Menyiapkan container PostgreSQL, menulis skema Prisma, mengeksekusi migrasi, dan mengimplementasikan operasi CRUD tipe-aman.',
        concepts: [
          'Pengaturan PostgreSQL via Docker Compose dengan volume data persisten',
          'Penulisan model entitas prisma/schema.prisma: relasi, anotasi @id @default(cuid()), @unique, @relation',
          'Perintah Prisma CLI: npx prisma migrate dev untuk sinkronisasi skema SQL',
          'Implementasi CRUD lengkap: prisma.vaultItem.findMany(), create(), update(), delete()',
          'Penanganan error code Prisma: Menangkap P2002 untuk duplikasi kunci unik dan merespons dengan pesan ramah pengguna',
        ],
        vaultImplementation:
          'Menyediakan representasi model skema Prisma ORM untuk entitas Vault Credential lengkap dengan penanganan error code P2002.',
        interactiveProof:
          'Schema viewer interaktif Prisma ORM 7 untuk model entitas Vault Item.',
      },
      {
        week: 7,
        title: 'Modul 7: Debugging Server-Side Next.js, VS Code Inspector, dan Error Digest',
        subCpmk: 'Sub-CPMK 3 (P4): Melakukan debugging server-side dengan Node inspector flag --inspect, konfigurasi .vscode/launch.json, dan proteksi Error Digest.',
        concepts: [
          'Debugging berbasis bukti: observasi, hipotesis, dan breakpoint verification (bukan trial-and-error menebak)',
          'Menjalankan Next.js server dengan flag inspector: npm run dev -- --inspect',
          'Konfigurasi .vscode/launch.json jenis node-terminal untuk auto-attach debugger VS Code',
          'Proteksi Galat Produksi: Next.js menyamarkan pesan server menjadi pesan generik dan menghasilkan error.digest (hash unik) agar informasi sensitif tidak bocor ke peramban klien',
          'Implementasi berkas error.tsx dengan props error dan fungsi reset() untuk pemulihan graceful antarmuka',
        ],
        vaultImplementation:
          'Website memiliki penanganan berkas khusus error.tsx dan global-error.tsx yang menangkap unhandled exception, menampilkan Error Digest ID, dan menyediakan tombol pemulihan antarmuka.',
        interactiveProof:
          'Simulasi pemicu Error Boundary dan demonstrasi penyamaran stack trace via Error Digest ID.',
      },
      {
        week: 8,
        title: 'Modul 8: Route Handlers Next.js 16 (REST API), Status Semantik, dan RFC 9457',
        subCpmk: 'Sub-CPMK 3 (P4): Membangun Route Handler route.ts, menerapkan status code HTTP semantik, dan format galat RFC 9457 Problem Details.',
        concepts: [
          'Route Handlers pada App Router: Berkas route.ts yang mengekspor fungsi bernama GET, POST, PUT, DELETE, dsb.',
          'Larangan anti-pattern 200 OK untuk galat: Status code HTTP wajib semantik (200, 201, 400, 401, 403, 404, 422)',
          'Format Galat Terstandarisasi RFC 9457: Header content-type: application/problem+json dengan objek { type, title, status, detail, instance, invalidParams }',
          'Validasi payload masukan request body dengan skema Zod dan respons 422 Unprocessable Content jika tidak valid',
        ],
        vaultImplementation:
          'Endpoint IPC lokal peramban (/sync-pass) dan endpoint P2P (/api/sync) merespons dengan header standar REST dan format galat RFC 9457 Problem Details jika token atau payload invalid.',
        interactiveProof:
          'Konsol REST API simulator yang memvalidasi respons status HTTP semantik dan format galat RFC 9457.',
      },
    ],
  },
];

