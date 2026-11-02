export interface RAMVaultItem {
  id: string;
  service: string;
  username: string;
  encryptedSecret: string;
  memoryAddress: string;
}

export interface MemoryBlock {
  id: string;
  address: string;
  label: string;
  size: string;
  encryptedData: string;
  status: 'allocated' | 'encrypted' | 'zeroized';
}

