import { create } from 'zustand';
import { RAMVaultItem } from '@/types/vault';
import { LabScenario } from '@/types/lab';
import { LAB_SCENARIOS } from '@/data/labScenarios';
import { PlatformType } from '@/types/guide';

export type TabType = 'home' | 'intro' | 'docs' | 'lab' | 'architecture' | 'curriculum';
export type ThemeMode = 'dark' | 'light' | 'system';

interface SandboxStore {
  // Navigation & Theme
  activeTab: TabType;
  themeMode: ThemeMode;
  setActiveTab: (tab: TabType) => void;
  setThemeMode: (mode: ThemeMode) => void;

  // Lab State
  selectedLab: LabScenario;
  completedTasks: Record<string, boolean>;
  setSelectedLab: (lab: LabScenario) => void;
  markTaskComplete: (taskId: string) => void;

  // Guidebook Platform State
  activePlatformGuide: PlatformType;
  activeGuideStep: number;
  winRunInput: string;
  runLaunched: boolean;
  setPlatformGuide: (platform: PlatformType) => void;
  setGuideStep: (step: number) => void;
  setWinRunInput: (val: string) => void;
  handleRunSubmit: () => void;

  // Master Key Authentication Simulator
  isLocked: boolean;
  masterInput: string;
  formError: string;
  setMasterInput: (val: string) => void;
  handleMasterPassUnlock: () => boolean;

  // RAM Vault
  ramVault: RAMVaultItem[];
  purgeRAM: () => void;
  resetRAM: () => void;

  // Threat Simulation
  simulatedAttackStep: number;
  nextAttackStep: () => void;
  setAttackStep: (step: number) => void;

  // Interactive Terminal
  terminalLogs: string[];
  cmdInput: string;
  setCmdInput: (val: string) => void;
  handleCommandSubmit: (cmd?: string) => void;
}

const INITIAL_RAM_ITEMS: RAMVaultItem[] = [
  {
    id: '1',
    service: 'Github Main',
    username: 'gio-stealth',
    encryptedSecret: '0x8F9A...4B2C',
    memoryAddress: '0x7FFF0001',
  },
  {
    id: '2',
    service: 'ProtonMail',
    username: 'gio@stealth.vault',
    encryptedSecret: '0x3D1E...9A8F',
    memoryAddress: '0x7FFF0040',
  },
];

const INITIAL_LOGS = [
  'Stealth Vault Interactive Shell [v1.0.0-PROD]',
  'Ketik "help" untuk melihat daftar perintah yang tersedia.\n',
];

export const useSandboxStore = create<SandboxStore>((set, get) => ({
  // Navigation & Theme
  activeTab: 'home',
  themeMode: 'dark',
  setActiveTab: (tab) => set({ activeTab: tab }),
  setThemeMode: (mode) => set({ themeMode: mode }),

  // Lab State
  selectedLab: LAB_SCENARIOS[0],
  completedTasks: {},
  setSelectedLab: (lab) => set({ selectedLab: lab }),
  markTaskComplete: (taskId) => {
    const { selectedLab } = get();
    set((state) => ({
      completedTasks: {
        ...state.completedTasks,
        [`${selectedLab.id}_${taskId}`]: true,
      },
    }));
  },

  // Guidebook Platform State
  activePlatformGuide: 'pc',
  activeGuideStep: 1,
  winRunInput: '',
  runLaunched: false,
  setPlatformGuide: (platform) =>
    set({
      activePlatformGuide: platform,
      activeGuideStep: 1,
    }),
  setGuideStep: (step) => set({ activeGuideStep: step }),
  setWinRunInput: (val) => set({ winRunInput: val }),
  handleRunSubmit: () => {
    const { winRunInput } = get();
    if (winRunInput.trim().toLowerCase() === 'mypass' || winRunInput.trim().toLowerCase() === 'runpass') {
      set({ runLaunched: true, activeGuideStep: 2 });
    }
  },

  // Master Key Authentication Simulator
  isLocked: true,
  masterInput: '',
  formError: '',
  setMasterInput: (val) => set({ masterInput: val, formError: '' }),
  handleMasterPassUnlock: () => {
    const { masterInput, markTaskComplete } = get();
    if (masterInput.length < 8) {
      set({ formError: 'Zod Validation Error: Master Password minimal 8 karakter' });
      return false;
    }
    if (!/[A-Z]/.test(masterInput) || !/[0-9]/.test(masterInput)) {
      set({ formError: 'Zod Validation Error: Harus mengandung minimal 1 huruf kapital & 1 angka' });
      return false;
    }

    if (masterInput === 'Stealth@2026' || masterInput === 'admin123') {
      set({ isLocked: false, formError: '' });
      markTaskComplete('task-1');
      return true;
    } else {
      set({ formError: 'Master Password Salah! Akses dekripsi RAM ditolak.' });
      return false;
    }
  },

  // RAM Vault
  ramVault: INITIAL_RAM_ITEMS,
  purgeRAM: () => set({ ramVault: [] }),
  resetRAM: () => set({ ramVault: INITIAL_RAM_ITEMS }),

  // Threat Simulation
  simulatedAttackStep: 0,
  nextAttackStep: () =>
    set((state) => ({
      simulatedAttackStep: (state.simulatedAttackStep + 1) % 3,
    })),
  setAttackStep: (step) => set({ simulatedAttackStep: step }),

  // Interactive Terminal
  terminalLogs: INITIAL_LOGS,
  cmdInput: '',
  setCmdInput: (val) => set({ cmdInput: val }),
  handleCommandSubmit: (customCmd) => {
    const { cmdInput, terminalLogs, ramVault, markTaskComplete } = get();
    const input = (customCmd ?? cmdInput).trim();
    if (!input) return;

    const newLogs = [...terminalLogs, `PS C:\\StealthSystem> ${input}`];

    switch (input.toLowerCase()) {
      case 'help':
        newLogs.push(
          'Daftar Perintah Shell Stealth Vault:',
          '  mypass               - Jalankan Stealth Vault via Registry Alias',
          '  extension --parse-dom - Simulasikan deteksi elemen DOM di Web Browser',
          '  extension --autofill - Lakukan isi otomatis kredensial dari RAM',
          '  p2p --pair 192.168.1.100 - Pasangkan Android dengan PC Lokal',
          '  p2p --sync           - Jalankan sinkronisasi CRDT dua arah',
          '  mypass --purge       - Bersihkan seluruh memori RAM secara instan (Zeroize)',
          '  vault --status       - Periksa alokasi RAM dan P2P Node Status',
          '  clear                - Bersihkan layar console'
        );
        break;
      case 'clear':
        set({ terminalLogs: [], cmdInput: '' });
        return;
      case 'mypass':
      case 'runpass':
        newLogs.push(
          '[SUCCESS] Registry Alias matched: "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\mypass.exe"',
          '[PROCESS] Stealth Vault process launched into RAM (PID: 8842).'
        );
        markTaskComplete('task-1');
        break;
      case 'extension --parse-dom':
        newLogs.push(
          '[DOM PARSER] Scanning page inputs...',
          '[MATCH FOUND] Form target: <input id="login-password"> on github.com',
          '[SECURITY] Input detected without plain text logging.'
        );
        markTaskComplete('task-1');
        break;
      case 'extension --autofill':
        newLogs.push(
          '[AUTOFILL] Injecting encrypted credential from RAM Vault to DOM...',
          '[STATUS] Success. Credentials filled cleanly via extension API.'
        );
        markTaskComplete('task-2');
        break;
      case 'p2p --pair 192.168.1.100':
        newLogs.push(
          '[P2P NETWORK] Connecting to peer 192.168.1.100:14202...',
          '[HANDSHAKE] TLS 1.3 Handshake completed with Android Client.'
        );
        markTaskComplete('task-1');
        break;
      case 'p2p --sync':
        newLogs.push(
          '[CRDT MERGE] Comparing timestamps...',
          '[SYNC COMPLETE] 2 items merged cleanly between Mobile & PC.'
        );
        markTaskComplete('task-2');
        break;
      case 'vault --status':
        newLogs.push(
          `[MEMORY STATUS] Active Credentials in RAM: ${ramVault.length} items`,
          '[STORAGE TRACE] Disk Persistence: 0 bytes (Volatile Mode Active)',
          '[P2P NETWORK] Local Sync Node: Ready (Port 14202)'
        );
        markTaskComplete('task-2');
        break;
      case 'mypass --purge':
        set({ ramVault: [] });
        newLogs.push('[CRITICAL] EMERGENCY PURGE: Entire Volatile RAM zeroized! 0 items remain.');
        markTaskComplete('task-1');
        break;
      default:
        newLogs.push(`Command '${input}' not recognized. Ketik 'help' untuk daftar perintah.`);
        break;
    }

    set({ terminalLogs: newLogs, cmdInput: '' });
  },
}));
