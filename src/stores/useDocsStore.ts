import { create } from 'zustand';

interface DocsState {
  searchQuery: string;
  activeSection: string;
  setSearchQuery: (query: string) => void;
  setActiveSection: (section: string) => void;
}

export const useDocsStore = create<DocsState>((set) => ({
  searchQuery: '',
  activeSection: 'overview',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setActiveSection: (activeSection) => set({ activeSection }),
}));