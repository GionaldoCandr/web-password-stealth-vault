import type { VaultCategory } from "../src/lib/tipe";

export type DataAwalCredential = {
  service: string;
  category: VaultCategory;
  username: string;
  encryptedSecret: string;
  isActive: boolean;
  notes?: string;
};

export const dataAwal: DataAwalCredential[] = [
  {
    service: "portal.universitaspertamina.ac.id",
    category: "campus",
    username: "105224031",
    encryptedSecret: "U2FsdGVkX18mK9d5xY8L0pQz9rS7vN2wX4aB6cD8eF0=",
    isActive: true,
    notes: "Akun SSO Akademik & Mahasiswa Universitas Pertamina",
  },
  {
    service: "bca.klikbca.com",
    category: "finance",
    username: "gionaldo_fin",
    encryptedSecret: "U2FsdGVkX19aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV=",
    isActive: true,
    notes: "Kredensial Internet Banking Finansial Utama",
  },
  {
    service: "github.com",
    category: "work",
    username: "GionaldoCandr",
    encryptedSecret: "U2FsdGVkX20aX9bY8cZ7dW6eV5fU4gT3hS2iR1jQ0pP=",
    isActive: true,
    notes: "Akses Repositori Pengembangan Produk Stealth Vault",
  },
  {
    service: "linkedin.com",
    category: "social",
    username: "gionaldo-chandrawansah",
    encryptedSecret: "U2FsdGVkX21kL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF=",
    isActive: true,
    notes: "Profil Profesional & Portofolio Karir",
  },
  {
    service: "aws.amazon.com",
    category: "work",
    username: "dev-admin-stealth",
    encryptedSecret: "U2FsdGVkX22zY1xW2vU3tS4rQ5pP6oN7mL8kJ9iH0gG=",
    isActive: true,
    notes: "Console Cloud Server Production & Staging",
  },
  {
    service: "simak.pertamina.ac.id",
    category: "campus",
    username: "gionaldo.chandrawansah",
    encryptedSecret: "U2FsdGVkX23pQ4oN5mL6kJ7iH8gG9fF0eE1dD2cC3bB=",
    isActive: true,
    notes: "Sistem Informasi Manajemen Perkuliahan & KRS",
  },
];
