export type SectionId = 'pretest' | 'lesson' | 'activities' | 'quizzes' | 'posttest';

export interface SectionMeta {
  id: SectionId;
  label: string;
  path: string; // relative to /week/:n
}

export const SECTION_ORDER: SectionMeta[] = [
  { id: 'pretest', label: 'Pre-Test', path: 'pretest' },
  { id: 'lesson', label: 'Lesson', path: 'lesson' },
  { id: 'activities', label: 'Activities', path: 'activities' },
  { id: 'quizzes', label: 'Quizzes', path: 'quizzes' },
  { id: 'posttest', label: 'Post-Test', path: 'posttest' },
];

export const WEEK_COUNT = 13;

export interface WeekMeta {
  number: number;
  title: string;
  subtitle: string;
}

export const WEEKS: WeekMeta[] = Array.from({ length: WEEK_COUNT }, (_, i) => {
  const n = i + 1;
  return {
    number: n,
    title: `Week ${n}`,
    subtitle: `Biology 1 · Week ${n}`,
  };
});

export function sectionMeta(id: SectionId): SectionMeta {
  const s = SECTION_ORDER.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown section: ${id}`);
  return s;
}

export function nextSection(id: SectionId): SectionMeta | null {
  const i = SECTION_ORDER.findIndex((s) => s.id === id);
  if (i === -1 || i === SECTION_ORDER.length - 1) return null;
  return SECTION_ORDER[i + 1];
}

export function prevSection(id: SectionId): SectionMeta | null {
  const i = SECTION_ORDER.findIndex((s) => s.id === id);
  if (i <= 0) return null;
  return SECTION_ORDER[i - 1];
}

// Offline-downloadable content kinds live in Week sections
export type OfflineKind = 'lesson' | 'activities';

export interface OfflineItem {
  week: number;
  kind: OfflineKind;
  label: string;
  href: string; // route to view
}

export const OFFLINE_ITEMS: OfflineItem[] = WEEKS.flatMap((w) => [
  {
    week: w.number,
    kind: 'lesson' as const,
    label: `${w.title} · Lesson`,
    href: `/week/${w.number}/lesson`,
  },
  {
    week: w.number,
    kind: 'activities' as const,
    label: `${w.title} · Activities`,
    href: `/week/${w.number}/activities`,
  },
]);

const LESSON_SLIDE_FILES: Record<number, string[]> = {
  1: Array.from({ length: 33 }, (_, i) => `/lessons/week1/_lesson-1_(${i + 1}).jpg`),
  2: Array.from({ length: 35 }, (_, i) => `/lessons/week2/slide1_(${i + 1}).jpg`),
  3: Array.from(
    { length: 18 },
    (_, i) => `/lessons/week3/3_Week_Biology_1_lesson_page-${String(i + 1).padStart(4, '0')}.jpg`,
  ),
  4: Array.from({ length: 40 }, (_, i) => `/lessons/week4/slide1_(${i + 1}).jpg`),
  5: Array.from({ length: 38 }, (_, i) => `/lessons/week5/slide1_(${i + 1}).jpg`),
  6: Array.from({ length: 40 }, (_, i) => `/lessons/week6/slide_1_(${i + 1}).jpg`),
  7: Array.from({ length: 27 }, (_, i) => `/lessons/week7/slide7_(${i + 1}).jpg`),
  8: Array.from({ length: 55 }, (_, i) => `/lessons/week8/slide1_(${i + 1}).jpg`),
};

// Public URLs of each slide image for a week's lesson. Empty until a week has slides.
export function lessonSlidePaths(week: number): string[] {
  return LESSON_SLIDE_FILES[week] ?? [];
}

export function offlineItemId(week: number, kind: OfflineKind): string {
  return `w${week}-${kind}`;
}
