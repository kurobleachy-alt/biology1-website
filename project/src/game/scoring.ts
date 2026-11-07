import type { Difficulty } from '@/game/types';

export const DIFFICULTY_XP: Record<Difficulty, number> = { easy: 10, medium: 20, hard: 30 };

const STREAK_BONUS: Record<number, number> = { 3: 5, 5: 10, 10: 20 };

export function streakBonus(streak: number): number {
  return STREAK_BONUS[streak] ?? 0;
}

const RANKS = [
  { minXp: 0, title: 'Cell Rookie' },
  { minXp: 100, title: 'Lab Assistant' },
  { minXp: 300, title: 'Junior Scientist' },
  { minXp: 600, title: 'Master Biologist' },
];

export function rankFor(xp: number) {
  let index = 0;
  for (let i = 1; i < RANKS.length; i++) {
    if (xp >= RANKS[i].minXp) index = i;
  }
  const next = RANKS[index + 1];
  return {
    title: RANKS[index].title,
    floorXp: RANKS[index].minXp,
    nextXp: next ? next.minXp : null,
  };
}
