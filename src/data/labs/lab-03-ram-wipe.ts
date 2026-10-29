import { LabScenario } from './lab-01-master-key';

export const lab03RamWipe: LabScenario = {
  id: 'lab-03-ram-wipe',
  title: 'Lab 3: Volatile Memory Emergency Zeroization',
  category: 'Memory Security',
  difficulty: 'Medium',
  description: 'Uji fitur pembersihan darurat untuk menghapus seluruh kredensial dan kunci enkripsi dari memori RAM secara instan.',
  tasks: [
    {
      id: 't1-execute-purge',
      title: 'Eksekusi Purge Memory Command',
      instruction: 'Jalankan perintah `mypass --purge` untuk memicu prosedur penolakan akses dan pembersihan memori.',
      hint: 'Ketik "mypass --purge" di terminal console.',
      commandTrigger: 'mypass --purge',
    },
  ],
};