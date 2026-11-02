export type CourseId = 'kks' | 'kripto' | 'paw' | 'paw-teori' | 'paw-praktikum';

export interface CourseModule {
  week: number;
  title: string;
  subCpmk: string;
  concepts: string[];
  vaultImplementation: string;
  interactiveProof: string;
  // Unified fields for combined PAW (Materi Teori & Praktikum)
  theoryTitle?: string;
  theoryConcepts?: string[];
  labTitle?: string;
  labConcepts?: string[];
}

export interface Course {
  id: CourseId;
  name: string;
  code: string;
  sks: number;
  badgeColor: string;
  description: string;
  modules: CourseModule[];
}

export interface CurriculumPhase {
  phase: number;
  title: string;
  weeks: string;
  status: 'active' | 'upcoming';
}

