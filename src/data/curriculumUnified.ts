import { Course, CourseModule } from '@/types/curriculum';
import { COURSES_PHASE_1 } from './curriculumPhase1';
import { COURSES_PHASE_2 } from './curriculumPhase2';
import { COURSES_PHASE_3 } from './curriculumPhase3';
import { COURSES_PHASE_4 } from './curriculumPhase4';

export function getUnifiedCoursesForPhase(phase: number): Course[] {
  let rawCourses: Course[];
  if (phase === 1) rawCourses = COURSES_PHASE_1;
  else if (phase === 2) rawCourses = COURSES_PHASE_2;
  else if (phase === 3) rawCourses = COURSES_PHASE_3;
  else rawCourses = COURSES_PHASE_4;

  const kks = rawCourses.find((c) => c.id === 'kks');
  const kripto = rawCourses.find((c) => c.id === 'kripto');
  const existingPaw = rawCourses.find((c) => c.id === 'paw');

  if (existingPaw) {
    return [kks!, kripto!, existingPaw];
  }

  const pawTeori = rawCourses.find((c) => c.id === 'paw-teori');
  const pawPraktikum = rawCourses.find((c) => c.id === 'paw-praktikum');

  const unifiedPawModules: CourseModule[] = (pawTeori?.modules || []).map((teoriMod, idx) => {
    const prakMod = pawPraktikum?.modules[idx];
    return {
      week: teoriMod.week,
      title: `${teoriMod.title} (Teori & Praktikum)`,
      subCpmk: `${teoriMod.subCpmk} | ${prakMod?.subCpmk || ''}`,
      concepts: [...teoriMod.concepts, ...(prakMod?.concepts || [])],
      theoryTitle: `Materi Teori: ${teoriMod.title}`,
      theoryConcepts: teoriMod.concepts,
      labTitle: `Praktikum: ${prakMod?.title || 'Laboratorium Terintegrasi'}`,
      labConcepts: prakMod?.concepts || [],
      vaultImplementation: `${teoriMod.vaultImplementation} ${prakMod?.vaultImplementation || ''}`,
      interactiveProof: `${teoriMod.interactiveProof} · ${prakMod?.interactiveProof || ''}`,
    };
  });

  const unifiedPaw: Course = {
    id: 'paw',
    name: 'Pengembangan Aplikasi Web (Teori & Praktikum)',
    code: '052355 / 052356',
    sks: 4,
    badgeColor: 'blue',
    description:
      'Integrasi penuh mata kuliah Teori PAW (3 SKS) dan Praktikum PAW (1 SKS): mencakup arsitektur Next.js 16, TypeScript, Server Actions, Database ORM, Keamanan OWASP, pengujian Vitest, dan deployment produksi.',
    modules: unifiedPawModules,
  };

  return [kks!, kripto!, unifiedPaw];
}

