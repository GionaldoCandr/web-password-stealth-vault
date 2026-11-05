// Definisi Tipe Data Produk: Stealth Password Vault (PostgreSQL & Prisma 7)

export type VaultCategory = "campus" | "finance" | "work" | "social";
export type Kategori = VaultCategory; // Alias kompatibilitas

export type VaultCredential = {
  id: number;
  service: string;
  category: VaultCategory;
  username: string;
  encryptedSecret: string;
  isActive: boolean;
  notes: string | null;
  createdAt?: Date;
  auditLogs?: AuditLog[];
};
export type Item = VaultCredential; // Alias kompatibilitas

export type AuditLog = {
  id: number;
  deviceId: string;
  action: string;
  securityRate: number;
  details: string;
  createdAt?: Date;
  credentialId: number;
};
export type Ulasan = AuditLog; // Alias kompatibilitas
