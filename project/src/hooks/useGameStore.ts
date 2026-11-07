import { useCallback, useEffect, useState } from 'react';
import type { Difficulty } from '@/game/types';

const STORAGE_KEY = 'biology1-game-v1';

export interface LevelRecord {
  bestCorrect: number;
  total: number;
  bestStreak: number;
  attempts: number;
}

export interface GameState {
  xp: number;
  currentStreak: number;
  bestStreak: number;
  levels: Record<string, Partial<Record<Difficulty, LevelRecord>>>;
}

export interface LevelResult {
  correct: number;
  total: number;
  bestStreak: number;
}

const EMPTY_STATE: GameState = { xp: 0, currentStreak: 0, bestStreak: 0, levels: {} };

function toCount(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<GameState>;
    return {
      xp: toCount(parsed.xp),
      currentStreak: toCount(parsed.currentStreak),
      bestStreak: toCount(parsed.bestStreak),
      levels: parsed.levels && typeof parsed.levels === 'object' ? parsed.levels : {},
    };
  } catch {
    return EMPTY_STATE;
  }
}

function saveState(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota errors */
  }
}

export function activityCompleted(game: GameState, activityId: string): boolean {
  return Object.values(game.levels[activityId] ?? {}).some((r) => r !== undefined && r.attempts > 0);
}

export function useGameStore() {
  const [state, setState] = useState<GameState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const recordCorrect = useCallback((xp: number, streak: number) => {
    setState((prev) => ({
      ...prev,
      xp: prev.xp + xp,
      currentStreak: streak,
      bestStreak: Math.max(prev.bestStreak, streak),
    }));
  }, []);

  const recordWrong = useCallback(() => {
    setState((prev) => ({ ...prev, currentStreak: 0 }));
  }, []);

  const finishLevel = useCallback((activityId: string, difficulty: Difficulty, result: LevelResult) => {
    setState((prev) => {
      const activity = prev.levels[activityId] ?? {};
      const old = activity[difficulty];
      const record: LevelRecord = {
        bestCorrect: Math.max(old?.bestCorrect ?? 0, result.correct),
        total: result.total,
        bestStreak: Math.max(old?.bestStreak ?? 0, result.bestStreak),
        attempts: (old?.attempts ?? 0) + 1,
      };
      return {
        ...prev,
        levels: { ...prev.levels, [activityId]: { ...activity, [difficulty]: record } },
      };
    });
  }, []);

  return { game: state, recordCorrect, recordWrong, finishLevel };
}
