import { Course } from '@/types/curriculum';

export const COURSES_PHASE_3: Course[] = [
  {
    id: 'kks',
    name: 'Keamanan Komputasi dan Siber',
    code: '052353',
    sks: 3,
    badgeColor: 'rose',
    description:
      'Pekan 9–12: Keamanan jaringan & firewall ufw, klasifikasi data pribadi (UU PDP 27/2022 & PP 33/2026), kebijakan logging anti-CWE-532, serta penanganan insiden siber (CSF 2.0 & NIST SP 800-61).',
    modules: [
      {
        week: 9,
        title: 'Keamanan Jaringan: Firewall (ufw), Segmentasi, dan Jebakan Docker',
        subCpmk: 'Sub-CPMK 3 (C3): Menerapkan aturan paket filtering firewall, segmentasi jaringan, dan mengamankan port layanan aplikasi.',
        concepts: [
          'Ancaman Jaringan: Port scanning (Nmap), sniffing, dan Adversary-in-the-Middle (AitM)',
          'Firewall: Paket filtering stateless vs stateful inspection, konfigurasi ufw (default deny incoming)',
          'Jebakan Docker pada Firewall: Penerbitan port docker run -p memintas (bypass) aturan ufw karena manipulasi langsung tabel iptables NAT',
          'Segmentasi Jaringan: Isolasi DMZ, isolasi backend/database di subnet terproteksi',
          'Protokol TLS 1.3 pada transmisi data jaringan lokal',
        ],
        vaultImplementation:
          'Stealth Vault membatasi listener ekstensi peramban hanya pada loopback 127.0.0.1 (port 14201) sehingga tidak terpapar ke jaringan luar. Layanan P2P (port 14202) mengadopsi segmentasi port terisolasi dan wajib diautentikasi dengan token QR handshake.',
        interactiveProof:
          'Audit port binding loopback 127.0.0.1 vs 0.0.0.0 pada tab Kurikulum Tahap 3.',
      },
      {
        week: 10,
        title: 'Keamanan Data: Klasifikasi (UU PDP), Enkripsi, Secrets, dan Backup',
        subCpmk: 'Sub-CPMK 3 (C3): Mengklasifikasikan data menurut UU PDP 27/2022, mengamankan rahasia lingkungan, dan merancang skema enkripsi at-rest/in-use.',
        concepts: [
          'Klasifikasi Data Pribadi menurut UU No. 27 Tahun 2022 (UU PDP) & PP 33/2026: Umum vs Spesifik (data keuangan, data biometrik, kredensial autentikasi)',
          'Tiga Keadaan Data: Data in transit (TLS 1.3), Data at rest (AES-256), Data in use (isolasi memori & memory protection)',
          'Manajemen Rahasia (Secrets Management): Pencegahan hardcoding rahasia di Git, penggunaan berkas .env terproteksi',
          'Pengamanan PostgreSQL: Konfigurasi pg_hba.conf, penolakan koneksi eksternal tanpa SSL, backup berkala terenkripsi',
        ],
        vaultImplementation:
          'Stealth Vault memperlakukan kata sandi sebagai data "Sangat Rahasia / Spesifik": tidak pernah ditulis ke disk (Zero Persistence), dienkripsi AES-256-GCM saat berada di RAM (Data in Use), dan segera di-zeroize saat aplikasi ditutup.',
        interactiveProof:
          'Matriks klasifikasi data UU PDP dan pembuktian status proteksi Data in Use pada widget Kurikulum.',
      },
      {
        week: 11,
        title: 'Logging, Pemantauan, Deteksi Anomali, dan Proteksi Anti-CWE-532',
        subCpmk: 'Sub-CPMK 3 (C3): Merancang arsitektur logging aman, mencegah kebocoran kredensial ke log (CWE-532), dan menyelaraskan waktu via NTP.',
        concepts: [
          'Fungsi Log: Audit trail, akuntabilitas, investigasi forensik, dan deteksi intrusi',
          'Prinsip "Apa yang Dicatat vs Apa yang HARAM Dicatat": Larangan keras mencatat plaintext password, token sesi, atau PII ke log (pencegahan CWE-532)',
          'Sinkronisasi Waktu: Protokol NTP (Network Time Protocol) agar rekonstruksi timeline forensik multi-perangkat akurat',
          'Integritas Log: Log append-only, sentralisasi pencatatan, dan proteksi dari manipulasi penyerang',
        ],
        vaultImplementation:
          'Terminal engine dan server sinkronisasi Stealth Vault menerapkan audit logging yang ketat: mencatat status event dan timestamp UTC tanpa pernah menampilkan atau mencetak Master Password / plaintext credential ke output konsol atau file log.',
        interactiveProof:
          'Simulator log sanitization: verifikasi sensor penyamaran data sensitif pada output audit trail.',
      },
      {
        week: 12,
        title: 'Incident Response: Penanganan Insiden berbasis NIST CSF 2.0',
        subCpmk: 'Sub-CPMK 3 (C3): Menyusun alur penanganan insiden siber, triase tingkat keparahan, dan prosedur penahanan (containment).',
        concepts: [
          'Distingsi Event vs Incident: Event adalah anomali teramati; Incident adalah peristiwa yang mengancam kerahasiaan, integritas, atau ketersediaan sistem',
          'Kerangka NIST CSF 2.0: Identify, Protect, Detect, Respond, Recover',
          'Triase Insiden: Penilaian tingkat keparahan (severity level 1–4) dan kalkulasi dampak bisnis',
          'Strategi Penahanan (Containment): Isolasi peranti dari jaringan, revokasi token sesi, dan rotasi kredensial darurat',
        ],
        vaultImplementation:
          'Menyediakan prosedur darurat "Panic RAM Wipe" (Emergency Zeroize): jika terjadi anomali atau intrusi terdeteksi, pengguna dapat memicu penghapusan memori seketika untuk mencegah eksfiltrasi kredensial.',
        interactiveProof:
          'Simulasi alur Incident Response: aktivasi tombol darurat Zeroize Memory & revokasi token.',
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
      'Pekan 9–12: Kriptografi asimetris (RSA & ECC), kriptografi hibrida, manajemen siklus hidup kunci (NIST SP 800-57), sertifikat digital X.509 RFC 5280, serta jabat tangan TLS 1.3.',
    modules: [
      {
        week: 9,
        title: 'Kriptografi Kunci Publik dan Tanda Tangan Digital (RSA & ECC)',
        subCpmk: 'Sub-CPMK 4 (C3): Membangkitkan pasangan kunci RSA, menghitung enkripsi/dekripsi asimetris, dan memverifikasi tanda tangan digital.',
        concepts: [
          'Masalah Distribusi Kunci Simetris: Skalabilitas n(n-1)/2 kunci dan ketiadaan sifat non-repudiation',
          'Prinsip Kunci Asimetris: Pasangan kunci Publik (e, n) dan Privat (d, n)',
          'Pembangkitan Kunci RSA: Bilangan prima p dan q, modulus n = p·q, totient Euler φ(n) = (p-1)(q-1), pilih e relatif prima terhadap φ(n), dan d ≡ e^(-1) mod φ(n)',
          'Enkripsi & Dekripsi RSA: c = m^e mod n dan m = c^d mod n via metode Square-and-Multiply',
          'Tanda Tangan Digital RSA: s = H(m)^d mod n dan verifikasi H(m) = s^e mod n',
          'Kelemahan RSA Buku Teks: Wajib menggunakan skema padding teruji seperti RSA-OAEP atau RSA-PSS',
        ],
        vaultImplementation:
          'Pasangan kunci asimetris digunakan untuk otentikasi peranti dan penandatanganan payload sinkronisasi, memastikan hanya peranti pemilik sah yang dapat mengirim pembaruan vault.',
        interactiveProof:
          'Kalkulator interaktif pembangkitan kunci RSA, enkripsi, dan verifikasi tanda tangan digital.',
      },
      {
        week: 10,
        title: 'Kriptografi Hibrida dan Prototipe Terintegrasi (KEM / ECDH)',
        subCpmk: 'Sub-CPMK 4 (C3): Merancang arsitektur kriptografi hibrida yang menggabungkan efisiensi kunci simetris dan fleksibilitas asimetris.',
        concepts: [
          'Urgensi Kriptografi Hibrida: Enkripsi asimetris lambat dan memiliki batas ukuran payload; enkripsi simetris cepat tetapi sulit mendistribusikan kunci',
          'Dua Pola Hibrida: Pembungkusan Kunci (Key Transport / KEM) vs Kesepakatan Kunci (Key Agreement ECDH)',
          'Format Paket Hibrida: Enkapsulasi kunci simetris terenkripsi (epk / wrapped key) + ciphertext AES-256-GCM + authentication tag',
          'Perfect Forward Secrecy (PFS): Kebocoran kunci privat jangka panjang tidak membahayakan rekaman sesi masa lalu karena digunakannya ephemeral keys',
        ],
        vaultImplementation:
          'Protokol sinkronisasi P2P antar PC dan Android (port 14202) menerapkan kriptografi hibrida: menyepakati shared secret menggunakan pertukaran kunci efemeral (ECDH) lalu mengenkripsi payload vault dengan AES-256-GCM.',
        interactiveProof:
          'Visualisasi pipeline enkripsi hibrida end-to-end pada tab Kurikulum.',
      },
      {
        week: 11,
        title: 'Manajemen Kunci dan Siklus Hidup Kriptografi (NIST SP 800-57)',
        subCpmk: 'Sub-CPMK 5 (C6): Mengelola siklus hidup kunci kriptografi, hierarki kunci KEK/DEK, rotasi berkala, dan penanganan insiden kompromi.',
        concepts: [
          'Siklus Hidup Kunci NIST SP 800-57: Pre-activation, Active, Suspended, Deactivated, Compromised, Destroyed',
          'Hierarki Kunci Kriptografi: Key Encrypting Key (KEK / Master Key) yang membungkus Data Encryption Key (DEK / Per-Item Key)',
          'Cryptoperiod: Batas waktu pemakaian aman kunci sebelum wajib dilakukan rotasi',
          'Rotasi Kunci Rutin vs Penanganan Kebocoran: Rotasi adalah prosedur terencana dengan registri kunci berversi; kebocoran menuntut pencabutan (revocation) darurat',
        ],
        vaultImplementation:
          'Stealth Vault mengimplementasikan hierarki dua lapis: Master Password menghasilkan KEK (Key Encrypting Key) melalui Argon2id, yang membungkus DEK unik untuk setiap akun kredensial yang tersimpan.',
        interactiveProof:
          'Simulator siklus hidup kunci NIST dan visualisasi hierarki KEK membungkus DEK.',
      },
      {
        week: 12,
        title: 'Sertifikat Digital X.509 (RFC 5280), Validasi Jalur, dan TLS 1.3',
        subCpmk: 'Sub-CPMK 5 (C6): Memvalidasi rantai sertifikat X.509, memeriksa ekstensi SAN, dan menganalisis jabat tangan TLS 1.3 1-RTT.',
        concepts: [
          'Struktur Sertifikat X.509 RFC 5280: TBSCertificate, algoritma tanda tangan, kunci publik subjek, dan masa berlaku (NotBefore / NotAfter)',
          'Ekstensi Kritis: Subject Alternative Name (SAN) sebagai penentu identitas host (bukan Common Name / CN)',
          'Rantai Sertifikat (Certificate Chain): Root CA -> Intermediate CA -> Leaf / End-Entity Certificate',
          'Validasi Jalur RFC 5280 §6: Verifikasi 7 parameter integritas, masa berlaku, dan pencabutan sertifikat',
          'Jabat Tangan TLS 1.3 (RFC 8446 / RFC 9846): Handshake 1-RTT yang menghapus cipher usang dan mewajibkan cipher AEAD serta Perfect Forward Secrecy',
        ],
        vaultImplementation:
          'Koneksi sinkronisasi lokal antar PC dan perangkat mobile Android diverifikasi menggunakan sertifikat TLS terotentikasi dan pin sidik jari publik (Certificate Pinning).',
        interactiveProof:
          'Simulator verifikasi rantai sertifikat X.509 dan visualisasi alur jabat tangan TLS 1.3 1-RTT.',
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
      'Pekan 9–12: REST API & OpenAPI 3.1, strategi caching Next.js 16 (Cache Components), otentikasi JWT & RBAC, serta pengamanan aplikasi web dari OWASP Top 10:2025.',
    modules: [
      {
        week: 9,
        title: 'Arsitektur REST API, Spesifikasi OpenAPI 3.1, dan Konsumsi Layanan',
        subCpmk: 'Sub-CPMK 4 (C3): Merancang arsitektur API RESTful sesuai standar industri, mendokumentasikan dengan OpenAPI 3.1, dan mengonsumsi data dari server.',
        concepts: [
          'Prinsip Desain REST: URI berorientasi resource (/api/v1/vault-items), kata kerja HTTP semantik, representasi JSON',
          'Spesifikasi OpenAPI 3.1: Skema request body, parameter query, status codes, dan kontrak response',
          'Konsumsi API Eksternal dari Server Next.js: Fetch API server-side dengan Bearer token dan penanganan timeout',
          'Pemisahan Concerns: Pemisahan rute antarmuka pengguna dan rute layanan data (/api)',
        ],
        vaultImplementation:
          'API endpoint sinkronisasi ekstensi (port 14201) dan sinkronisasi P2P (port 14202) dirancang mengikuti standar RESTful dengan payload JSON bertipe dan respons status HTTP terdefinisi.',
        interactiveProof:
          'Konsol OpenAPI Explorer interaktif untuk endpoint Stealth Vault pada tab Kurikulum.',
      },
      {
        week: 10,
        title: 'Pengambilan Data Modern, Caching Next.js 16, dan State Management',
        subCpmk: 'Sub-CPMK 4 (C3): Mengoptimalkan pengambilan data, mengonfigurasi direktif caching ("use cache"), dan mengelola state reaktif.',
        concepts: [
          'Pola Pengambilan Data: Server-side data fetching di Server Components vs Client-side data fetching (SWR / React Query)',
          'Arsitektur Caching Next.js 16: Cache Components, direktif "use cache", dan dynamicIO',
          'Strategi Revalidasi: revalidateTag(tag) berbasis event vs revalidatePath(path) berbasis rute',
          'State Management Terdistribusi: Zustand untuk state client reaktif tanpa prop-drilling berlebihan',
        ],
        vaultImplementation:
          'Website guidebook menggunakan Zustand (useSandboxStore) untuk state management client-side yang reaktif dan cepat, mengisolasi data simulasi memori tanpa menyebabkan re-render monolitik.',
        interactiveProof:
          'Visualizer state cache dan live state inspector Zustand di antarmuka web.',
      },
      {
        week: 11,
        title: 'Autentikasi Modern, Anatomi JWT, dan Role-Based Access Control (RBAC)',
        subCpmk: 'Sub-CPMK 5 (C5, P4): Mengimplementasikan autentikasi berbasis token/session, mitigasi kerentanan JWT, dan otorisasi multi-peran (RBAC).',
        concepts: [
          'Konsep Autentikasi vs Otorisasi: Verifikasi identitas (siapa Anda) vs Penegakan hak akses (apa yang boleh Anda lakukan)',
          'Anatomi JSON Web Token (JWT): Tiga segmen base64url (Header, Payload, Signature) dan mitigasi serangan algoritma "none"',
          'Penyimpanan Token Aman: Larangan menyimpan JWT di localStorage; wajib disimpan di HttpOnly SameSite Secure Cookie untuk memitigasi XSS',
          'Role-Based Access Control (RBAC): Hierarki peran (Guest, Member, Admin) yang diperiksa secara konsisten di Data Access Layer (DAL)',
          'Pustaka Autentikasi Modern: Better Auth 1.x / Auth.js (NextAuth v5)',
        ],
        vaultImplementation:
          'Sistem otorisasi browser extension dan launcher Win+R menggunakan skema otorisasi bertingkat dengan token otorisasi dinamis yang membatasi hak akses perintah memori.',
        interactiveProof:
          'JWT Inspector interaktif: decoding segmen Header, Payload, dan Signature serta verifikasi RBAC.',
      },
      {
        week: 12,
        title: 'Keamanan Aplikasi Web Komprehensif: Mitigasi OWASP Top 10:2025',
        subCpmk: 'Sub-CPMK 5 (C5, P4): Mengidentifikasi risiko OWASP Top 10 edisi terbaru (2025/2026) dan menerapkan kontrol keamanan defensif.',
        concepts: [
          'Sepuluh Kategori OWASP Top 10:2025: A01 Broken Access Control & SSRF, A02 Cryptographic Failures, A03 Supply Chain & Insecure Dependencies, A05 Injection (SQLi & XSS), A07 Auth Failures',
          'Mitigasi SQL Injection: Parameterized queries pada Prisma ORM (mencegah manipulasi query SQL)',
          'Mitigasi Cross-Site Scripting (XSS): Sanitasi otomatis React JSX dan konfigurasi Content Security Policy (CSP)',
          'Server-Side Request Forgery (SSRF): Validasi ketat allowlist URL sebelum server melakukan HTTP outbound fetch',
        ],
        vaultImplementation:
          'Aplikasi web menerapkan sanitasi Zod 4 untuk semua masukan, proteksi CSP ketat, dan seluruh data vault diproteksi dari injeksi script maupun manipulasi DOM.',
        interactiveProof:
          'Matriks kepatuhan OWASP Top 10:2025 dengan pengujian live kontrol keamanan.',
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
      'Modul 9–12: Mengonsumsi REST API eksternal, autentikasi session & RBAC, laboratorium eksploitasi etis OWASP Top 10, serta otomatisasi pengujian dengan Vitest.',
    modules: [
      {
        week: 9,
        title: 'Modul 9: Mengonsumsi Layanan REST Eksternal dan Caching Data',
        subCpmk: 'Sub-CPMK 4 (P4): Melakukan fetching ke API eksternal dari server Next.js, menangani status galat pihak ketiga, dan menerapkan revalidasi tag.',
        concepts: [
          'Konsumsi REST API dari Server Components dengan fetch() bertipe',
          'Penanganan status galat pihak ketiga (4xx/5xx) secara elegan tanpa merusak antarmuka pengguna',
          'Penggunaan tag cache dan pemanggilan revalidateTag() saat data eksternal diperbarui',
          'Isolasi kunci rahasia API eksternal di server-side agar tidak bocor ke bundle JavaScript browser',
        ],
        vaultImplementation:
          'Modul pengiriman telemetri dan pemeriksaan versi rilis Stealth Vault mengonsumsi endpoint rilis menggunakan fetch server-side dengan isolasi kredensial.',
        interactiveProof:
          'Simulasi konsumsi REST API eksternal dengan status code handling dan cache tag invalidation.',
      },
      {
        week: 10,
        title: 'Modul 10: Autentikasi Pengguna, Password Hashing, Session, dan RBAC',
        subCpmk: 'Sub-CPMK 5 (P4): Membangun alur login lengkap, hashing password aman, pengelolaan session cookie, dan proteksi peran di Data Access Layer.',
        concepts: [
          'Hashing Password: Menggunakan algoritma fungsi derivasi kunci berkekuatan tinggi dengan garam acak (salt)',
          'Session Cookie: Mengirim session ID via cookie bertanda HttpOnly, SameSite=Lax/Strict, dan Secure',
          'Proteksi Lapisan Akses Data (Data Access Layer - DAL): Memeriksa session pengguna sebelum mengeksekusi mutasi atau pembacaan basis data',
          'Pemeriksaan Peran (RBAC): Membatasi aksi administratif hanya untuk akun dengan role ADMIN',
        ],
        vaultImplementation:
          'Gerbang masuk Master Password mengadopsi prinsip autentikasi Modul 10: memverifikasi hash kredensial di memory buffer sebelum mengizinkan pembacaan array password.',
        interactiveProof:
          'Lab simulasi otentikasi pengguna dan pembedaan hak akses RBAC (User vs Admin).',
      },
      {
        week: 11,
        title: 'Modul 11: Laboratorium Keamanan Web: Pengujian Kerentanan OWASP dan Remediasi',
        subCpmk: 'Sub-CPMK 5 (P4): Melakukan pengujian penetrasi etis terhadap risiko OWASP (IDOR, SQLi, XSS, CSRF) dan menerapkan kontrol remediasi.',
        concepts: [
          'Batas Etis Pengujian Keamanan: Pengujian hanya dilakukan pada sistem laboratorium sendiri yang diizinkan',
          'Pengujian dan Remediasi IDOR (Insecure Direct Object Reference): Memastikan pengguna hanya dapat mengakses resource miliknya sendiri',
          'Verifikasi Imunitas SQL Injection: Menguji query ORM terhadap input berbahaya seperti \' OR 1=1 --',
          'Pengujian XSS & Sanitasi Masukan: Memastikan payload <script>alert(1)</script> dinetralkan menjadi entitas teks aman',
        ],
        vaultImplementation:
          'Web guidebook dan engine vault lolos uji remediasi OWASP Modul 11: input form disanitasi ketat, tidak ada celah direct memory reference antar user, dan aman dari XSS.',
        interactiveProof:
          'Lab interaktif simulasi serangan IDOR & XSS serta demonstrasi remediasi otomatis.',
      },
      {
        week: 12,
        title: 'Modul 12: Pengujian Otomatis dengan Vitest (Unit Test & Integration Test)',
        subCpmk: 'Sub-CPMK 5 (P4): Menulis rangkaian unit test dan integration test menggunakan Vitest, mocking dependensi, dan asersi status.',
        concepts: [
          'Piramida Pengujian: Unit Test (cepat & banyak) -> Integration Test (interaksi modul) -> E2E Test',
          'Framework Vitest 5.x: Konfigurasi vitest.config.ts, blok describe, test/it, dan fungsi asersi expect()',
          'Mocking: Mengisolasi dependensi eksternal menggunakan vi.fn(), vi.mock(), dan vi.spyOn()',
          'Pengujian Otomatis Logika Kritis: Menguji fungsi hashing, validasi skema Zod, dan perhitungan kriptografi secara otomatis',
        ],
        vaultImplementation:
          'Logika kriptografi dan validasi skema Stealth Vault dirancang modular (pure functions) sehingga dapat diuji secara otomatis menggunakan unit test Vitest dengan cakupan uji tinggi.',
        interactiveProof:
          'Test Runner Vitest virtual interaktif: eksekusi pengujian otomatis modul kriptografi dengan asersi hijau (Passed).',
      },
    ],
  },
];

