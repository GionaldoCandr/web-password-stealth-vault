import { LabScenario } from './lab-01-master-key';

export const lab02StealthLaunch: LabScenario = {
  id: 'lab-02-stealth-launch',
  title: 'Lab 2: Windows Run Registry Alias Execution',
  category: 'Stealth Launch',
  difficulty: 'Easy',
  description: 'Simulasikan peluncuran instan Stealth Vault dari kotak dialog Windows Run (Win + R) menggunakan alias `mypass`.',
  tasks: [
    {
      id: 't1-run-mypass',
      title: 'Jalankan Command Alias',
      instruction: 'Ketik perintah `mypass` pada terminal interaktif untuk mengeksekusi aplikasi ke RAM.',
      hint: 'Cukup ketik "mypass" lalu tekan Enter.',
      commandTrigger: 'mypass',
    },
  ],
};