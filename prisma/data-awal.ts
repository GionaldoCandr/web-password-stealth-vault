import type { Kategori } from "../src/lib/tipe";

export type DataAwal = {
  judul: string;
  kategori: Kategori;
  deskripsi: string;
  tersedia: boolean;
};

export const dataAwal: DataAwal[] = [
  {
    judul: "Panel surya atap",
    kategori: "energi",
    deskripsi: "Pemantauan produksi listrik harian.",
    tersedia: true,
  },
  {
    judul: "Sensor kualitas udara",
    kategori: "lingkungan",
    deskripsi: "Pemantauan indeks polusi udara realtime.",
    tersedia: true,
  },
  {
    judul: "Smart water meter",
    kategori: "kampus",
    deskripsi: "Pemantauan debit dan volume air otomatis.",
    tersedia: true,
  },
  {
    judul: "Lampu LED hemat daya",
    kategori: "energi",
    deskripsi: "Sistem penerangan cerdas terintegrasi.",
    tersedia: true,
  },
  {
    judul: "Pengukur kelembaban tanah",
    kategori: "lingkungan",
    deskripsi: "Sensor kelembaban untuk taman kampus.",
    tersedia: true,
  },
  {
    judul: "Stasiun cuaca otomatis",
    kategori: "kampus",
    deskripsi: "Pencatatan suhu, angin, dan curah hujan.",
    tersedia: true,
  },
];
