import { useCallback, useEffect, useState } from 'react';
import type { SectionId } from '@/data/course';
import { WEEK_COUNT } from '@/data/course';

const STORAGE_KEY = 'biology1-progress-v1';

export interface WeekProgress {
  completed: Record<SectionId, boolean>;
  lastSlide: number;
}

export interface ProgressState {
  weeks: Record<number, WeekProgress>;
}

export function emptyWeekProgress(): WeekProgress {
  return {
    completed: { pretest: false, lesson: false, activities: false, quizzes: false, posttest: false },
    lastSlide: 0,
  };
}

function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as ProgressState;
    return { weeks: { ...defaultState().weeks, ...parsed.weeks } };
  } catch {
    return defaultState();
  }
}

function defaultState(): ProgressState {
  const weeks: Record<number, WeekProgress> = {};
  for (let i = 1; i <= WEEK_COUNT; i++) weeks[i] = emptyWeekProgress();
  return { weeks };
}

function saveState(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota errors */
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const getWeek = useCallback(
    (n: number): WeekProgress => state.weeks[n] ?? emptyWeekProgress(),
    [state],
  );

  const isCompleted = useCallback(
    (n: number, id: SectionId) => getWeek(n).completed[id],
    [getWeek],
  );

  const isUnlocked = useCallback(
    (n: number, id: SectionId) => {
      const order: SectionId[] = ['pretest', 'lesson', 'activities', 'quizzes', 'posttest'];
      const idx = order.indexOf(id);
      if (idx <= 0) return true;
      const prevId = order[idx - 1];
      return getWeek(n).completed[prevId];
    },
    [getWeek],
  );

  const completeSection = useCallback((n: number, id: SectionId) => {
    setState((prev) => {
      const weeks = { ...prev.weeks };
      const w = weeks[n] ?? emptyWeekProgress();
      weeks[n] = { ...w, completed: { ...w.completed, [id]: true } };
      return { weeks };
    });
  }, []);

  const setLastSlide = useCallback((n: number, slide: number) => {
    setState((prev) => {
      const weeks = { ...prev.weeks };
      const w = weeks[n] ?? emptyWeekProgress();
      weeks[n] = { ...w, lastSlide: slide };
      return { weeks };
    });
  }, []);

  const resetWeek = useCallback((n: number) => {
    setState((prev) => ({ weeks: { ...prev.weeks, [n]: emptyWeekProgress() } }));
  }, []);

  return { state, getWeek, isCompleted, isUnlocked, completeSection, setLastSlide, resetWeek };
}

// Aggregate dashboard stats
export function lessonsCompleted(state: ProgressState): number {
  return Object.values(state.weeks).filter((w) => w.completed.lesson).length;
}
export function activitiesCompleted(state: ProgressState): number {
  return Object.values(state.weeks).filter((w) => w.completed.activities).length;
}
export function quizzesCompleted(state: ProgressState): number {
  return Object.values(state.weeks).filter((w) => w.completed.quizzes).length;
}
export function weekPercent(state: ProgressState, n: number): number {
  const w = state.weeks[n] ?? emptyWeekProgress();
  const total = 5;
  const done = Object.values(w.completed).filter(Boolean).length;
  return Math.round((done / total) * 100);
}
