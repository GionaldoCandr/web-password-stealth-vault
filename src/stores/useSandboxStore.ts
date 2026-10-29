import { create } from 'zustand';
import { MemoryBlock } from '@/lib/crypto-mock';

export interface VaultItem {
  id: string;
  service: string;
  username: string;
  secret: string;
}

interface SandboxState {
  // === Vault RAM State ===
  isLocked: boolean;
  masterKey: string | null;
  ramVault: VaultItem[];
  memoryBlocks: MemoryBlock[];

  // === Terminal Console Logs ===
  terminalLogs: string[];

  // === Lab Progress Tracking ===
  completedTasks: string[];
  currentLabId: string;

  // === Actions ===
  unlockVault: (key: string) => void;
  lockVault: () => void;
  clearRAM: () => void;
  addCredential: (item: VaultItem) => void;
  deleteCredential: (id: string) => void;
  addTerminalLog: (log: string) => void;
  clearTerminalLogs: () => void;
  completeTask: (taskId: string) => void;
  setLabId: (id: string) => void;
}

const INITIAL_BLOCKS: MemoryBlock[] = [
  {
    id: '1',
    address: '0x7FFF0010',
    label: 'Master Key Derive',
    size: '256 bits',
    encryptedData: 'a8f9c1...e4b2',
    status: 'encrypted',
  },
  {
    id: '2',
    address: '0x7FFF0028',
    label: 'GitHub Token',
    size: '512 bits',
    encryptedData: 'd3e2f1...01a9',
    status: 'allocated',
  },
  {
    id: '3',
    address: '0x7FFF0040',
    label: 'Session Key Nonce',
    size: '128 bits',
    encryptedData: '00ff12...88cc',
    status: 'allocated',
  },
];

export const useSandboxStore = create<SandboxState>((set) => ({
  isLocked: true,
  masterKey: null,
  ramVault: [
    {
      id: '1',
      service: 'GitHub Main',
      username: 'gio-stealth',
      secret: 'ghp_StealthToken9981',
    },
    {
      id: '2',
      service: 'ProtonMail',
      username: 'gio@stealth.vault',
      secret: 'P@ssw0rd_Encrypted_RAM!',
    },
  ],
  memoryBlocks: INITIAL_BLOCKS,
  terminalLogs: [
    'Stealth Vault Interactive Shell [v1.0.0]',
    'Ketik "help" untuk petunjuk perintah.\n',
  ],
  completedTasks: [],
  currentLabId: 'lab-01-master-key',

  unlockVault: (key) =>
    set({
      isLocked: false,
      masterKey: key,
    }),

  lockVault: () =>
    set({
      isLocked: true,
      masterKey: null,
    }),

  clearRAM: () =>
    set((state) => ({
      ramVault: [],
      masterKey: null,
      isLocked: true,
      memoryBlocks: state.memoryBlocks.map((b) => ({
        ...b,
        status: 'zeroized',
        encryptedData: '0x0000000000000000',
      })),
    })),

  addCredential: (item) =>
    set((state) => ({
      ramVault: [...state.ramVault, item],
      memoryBlocks: [
        ...state.memoryBlocks,
        {
          id: String(Date.now()),
          address: `0x7FFF${Math.floor(1000 + Math.random() * 9000)}`,
          label: item.service,
          size: '256 bits',
          encryptedData: 'e9a1b2...4f88',
          status: 'allocated',
        },
      ],
    })),

  deleteCredential: (id) =>
    set((state) => ({
      ramVault: state.ramVault.filter((item) => item.id !== id),
    })),

  addTerminalLog: (log) =>
    set((state) => ({ terminalLogs: [...state.terminalLogs, log] })),

  clearTerminalLogs: () => set({ terminalLogs: [] }),

  completeTask: (taskId) =>
    set((state) => ({
      completedTasks: state.completedTasks.includes(taskId)
        ? state.completedTasks
        : [...state.completedTasks, taskId],
    })),

  setLabId: (id) => set({ currentLabId: id }),
}));