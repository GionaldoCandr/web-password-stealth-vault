export interface LabTask {
  id: string;
  title: string;
  instruction: string;
  hint: string;
  commandTrigger?: string;
}

export interface LabScenario {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  tasks: LabTask[];
}

export const lab01MasterKey: LabScenario = {
  id: 'lab-01-master-key',
  title: 'Lab 1: Master Password Authentication & Memory Decryption',
  category: 'Vault Security',
  difficulty: 'Easy',
  description: 'Pelajari bagaimana Master Password diverifikasi dan digunakan untuk mendekompresi blok memori Vault terenkripsi di RAM.',
  tasks: [
    {
      id: 't1-enter-masterpass',
      title: 'Verifikasi Master Password Valid',
      instruction: 'Masukkan Master Password simulasi `Stealth@2026` di form Master Password Vault.',
      hint: 'Gunakan Master Password "Stealth@2026" (harus memiliki huruf kapital dan angka).',
    },
    {
      id: 't2-check-ram-blocks',
      title: 'Periksa Alokasi Memori Terenkripsi',
      instruction: 'Jalankan perintah `vault --status` di terminal simulasi untuk memverifikasi alamat memori 0x7FFF.',
      hint: 'Ketik "vault --status" lalu tekan Enter.',
      commandTrigger: 'vault --status',
    },
  ],
};