export type VaultCategory = "campus" | "finance" | "work" | "social";

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
    service: "portal.cyber-academy.edu",
    category: "campus",
    username: "cadet.sec-4091",
    encryptedSecret: "U2FsdGVkX18mK9d5xY8L0pQz9rS7vN2wX4aB6cD8eF0=",
    isActive: true,
    notes: "Akun Portal Akademik & Simulasi Lab Keamanan Siber",
  },
  {
    service: "ebanking.ap-secure.net",
    category: "finance",
    username: "corp_treasury_ops",
    encryptedSecret: "U2FsdGVkX19aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV=",
    isActive: true,
    notes: "Kredensial Gateway Transaksi Finansial Korporat (MFA Token)",
  },
  {
    service: "gitlab.stealth-defense.internal",
    category: "work",
    username: "devops-engineer",
    encryptedSecret: "U2FsdGVkX20aX9bY8cZ7dW6eV5fU4gT3hS2iR1jQ0pP=",
    isActive: true,
    notes: "Akses Repositori CI/CD Core Cryptographic Engine",
  },
  {
    service: "matrix-chat.global-defense.org",
    category: "social",
    username: "agent-morpheus",
    encryptedSecret: "U2FsdGVkX21kL2mN3oP4qR5sT6uV7wX8yZ9aB0cD1eF=",
    isActive: true,
    notes: "Kanal Komunikasi Terenkripsi Tim Tanggap Insiden Siber",
  },
  {
    service: "aws.cloud-defense.io",
    category: "work",
    username: "cloud-sec-admin",
    encryptedSecret: "U2FsdGVkX22zY1xW2vU3tS4rQ5pP6oN7mL8kJ9iH0gG=",
    isActive: true,
    notes: "Console Cloud Server Production & Staging Vault",
  },
  {
    service: "lms.cyber-institute.org",
    category: "campus",
    username: "student.infosec-882",
    encryptedSecret: "U2FsdGVkX23pQ4oN5mL6kJ7iH8gG9fF0eE1dD2cC3bB=",
    isActive: true,
    notes: "Sistem Informasi Manajemen Riset Kriptografi & Reverse Engineering",
  },
];
