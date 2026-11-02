import { LabScenario } from '@/types/lab';

export const LAB_SCENARIOS: LabScenario[] = [
  {
    id: 'lab-01-stealth-launch',
    title: 'Lab 1: Windows Registry Alias Execution',
    category: 'Stealth Launch',
    difficulty: 'Easy',
    xpPoints: 100,
    description:
      'Pelajari bagaimana Stealth Vault dieksekusi secara instan via Windows Run (Win + R) menggunakan registry alias "mypass" tanpa membuat shortcut desktop.',
    tasks: [
      {
        id: 'task-1',
        title: 'Jalankan Registry Alias "mypass"',
        instruction: 'Ketik perintah "mypass" di terminal simulasi untuk meluncurkan vault langsung ke RAM.',
        hint: 'Cukup ketik "mypass" di terminal lalu tekan Enter.',
        commandTrigger: 'mypass',
      },
      {
        id: 'task-2',
        title: 'Periksa Status Volatile Memory',
        instruction: 'Verifikasi status proses di memori dengan menjalankan perintah "vault --status".',
        hint: 'Ketik "vault --status" untuk melihat alokasi RAM.',
        commandTrigger: 'vault --status',
      },
    ],
  },
  {
    id: 'lab-02-extension-pc',
    title: 'Lab 2: Extension DOM Parsing & PC RAM Sync',
    category: 'Browser Extension',
    difficulty: 'Medium',
    xpPoints: 200,
    description:
      'Simulasikan deteksi otomatis formulir login pada halaman web oleh Content Script Extension dan pengiriman data terenkripsi ke PC Vault.',
    tasks: [
      {
        id: 'task-1',
        title: 'Deteksi Form Login DOM',
        instruction:
          'Jalankan perintah "extension --parse-dom" untuk mensimulasikan ekstraksi bidang username/password dari web browser.',
        hint: 'Ketik "extension --parse-dom" di terminal shell.',
        commandTrigger: 'extension --parse-dom',
      },
      {
        id: 'task-2',
        title: 'Autofill Data dari RAM Vault',
        instruction: 'Ketik "extension --autofill" untuk memasukkan kredensial dari RAM ke dalam formulir secara otomatis.',
        hint: 'Gunakan flag --autofill.',
        commandTrigger: 'extension --autofill',
      },
    ],
  },
  {
    id: 'lab-03-p2p-sync',
    title: 'Lab 3: Android Mobile <> PC P2P Local Pairing',
    category: 'P2P Sync',
    difficulty: 'Medium',
    xpPoints: 250,
    description:
      'Uji mekanisme sinkronisasi dua arah tanpa cloud (CRDT Merge) antara aplikasi Android dan PC via local port 14202.',
    tasks: [
      {
        id: 'task-1',
        title: 'Inisialisasi P2P Connection',
        instruction: 'Jalankan "p2p --pair 192.168.1.100" untuk menghubungkan Android dengan PC Target.',
        hint: 'Ketik "p2p --pair 192.168.1.100" pada shell.',
        commandTrigger: 'p2p --pair 192.168.1.100',
      },
      {
        id: 'task-2',
        title: 'Eksekusi Synchronize Vault',
        instruction: 'Lakukan penggabungan data dengan mengetik "p2p --sync".',
        hint: 'Ketik "p2p --sync" di terminal.',
        commandTrigger: 'p2p --sync',
      },
    ],
  },
  {
    id: 'lab-04-ram-wipe',
    title: 'Lab 4: Instant Emergency RAM Wiping',
    category: 'Memory Security',
    difficulty: 'Hard',
    xpPoints: 300,
    description:
      'Uji ketahanan vault terhadap memory dump dengan mengeksekusi perintah zeroize untuk membersihkan memori RAM secara sempurna.',
    tasks: [
      {
        id: 'task-1',
        title: 'Eksekusi Emergency Purge RAM',
        instruction: 'Jalankan perintah "mypass --purge" untuk membuang seluruh kredensial dari RAM browser.',
        hint: 'Gunakan flag --purge untuk mengosongkan memori.',
        commandTrigger: 'mypass --purge',
      },
    ],
  },
];

