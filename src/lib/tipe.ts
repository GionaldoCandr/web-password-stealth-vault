// Definisi Tipe Data Modul 6 (PostgreSQL & Prisma 7)
export type Kategori = "energi" | "lingkungan" | "kampus";

export type Item = {
  id: number;
  judul: string;
  kategori: Kategori;
  deskripsi: string;
  tersedia: boolean;
  gambar: string | null;
  dibuatPada?: Date;
  ulasan?: Ulasan[];
};

export type Ulasan = {
  id: number;
  nama: string;
  nilai: number;
  komentar: string;
  dibuatPada?: Date;
  itemId: number;
};
