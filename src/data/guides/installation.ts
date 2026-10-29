export interface GuideStep {
  step: number;
  title: string;
  description: string;
  command?: string;
  note?: string;
}

export interface GuideSection {
  id: string;
  platform: 'pc' | 'android' | 'extension';
  title: string;
  subtitle: string;
  badge: string;
  steps: GuideStep[];
}

export const installationGuide: GuideSection[] = [
  {
    id: 'pc-install',
    platform: 'pc',
    title: 'Instalasi & Setup PC Desktop (Windows/Linux)',
    subtitle: 'Alur dari pembungkusan binary Tauri Rust hingga Registry Alias Execution.',
    badge: 'Desktop App',
    steps: [
      {
        step: 1,
        title: 'Download & Ekstrak Release Binary',
        description: 'Unduh berkas rilis installer `StealthVault-Setup.exe` dari repositori resmi.',
      },
      {
        step: 2,
        title: 'Registrasi Windows Registry Alias (MyPass)',
        description: 'Sistem otomatis mendaftarkan registry key agar aplikasi dapat dipanggil cepat via Win + R.',
        command: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\mypass.exe" /ve /t REG_SZ /d "C:\\Program Files\\StealthVault\\app.exe" /f',
      },
      {
        step: 3,
        title: 'Eksekusi Cepat via Windows Run',
        description: 'Tekan tombol `Win + R`, ketik `mypass`, lalu tekan Enter untuk membuka Vault langsung di RAM.',
        command: 'mypass',
      },
    ],
  },
  {
    id: 'android-install',
    platform: 'android',
    title: 'Instalasi & P2P Pairing Android APK',
    subtitle: 'Memasang APK terverifikasi dan menghubungkan node seluler secara lokal.',
    badge: 'Mobile App',
    steps: [
      {
        step: 1,
        title: 'Pasang Signed Release APK',
        description: 'Install berkas `app-universal-release-signed.apk` pada perangkat Android.',
        command: 'adb install -r app-universal-release-signed.apk',
      },
      {
        step: 2,
        title: 'Pairing P2P via QR Code',
        description: 'Buka scanner QR di aplikasi HP, lalu pindai Pair Code dari PC untuk menyinkronkan memori Vault tanpa server cloud.',
      },
    ],
  },
  {
    id: 'extension-install',
    platform: 'extension',
    title: 'Pemasangan Chrome Web Extension',
    subtitle: 'Mengintegrasikan autofill dan DOM parser di peramban.',
    badge: 'Browser Ext',
    steps: [
      {
        step: 1,
        title: 'Load Unpacked Extension',
        description: 'Buka `chrome://extensions`, aktifkan Developer Mode, lalu pilih folder `browser-extension/dist`.',
      },
      {
        step: 2,
        title: 'Deteksi DOM & Autofill Instant',
        description: 'Extension content-script akan mendeteksi elemen input login secara otomatis dan menampilkan badge pengisian aman.',
      },
    ],
  },
];