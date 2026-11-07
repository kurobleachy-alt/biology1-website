import { createContext, useContext, type ReactNode } from 'react';
import { useProgress, type ProgressState } from '@/hooks/useProgress';
import { useOnline } from '@/hooks/useOnline';
import { useOfflineStore, type DownloadStatus } from '@/hooks/useOfflineStore';
import { useGameStore, type GameState, type LevelResult } from '@/hooks/useGameStore';
import type { OfflineKind } from '@/data/course';
import type { Difficulty } from '@/game/types';

interface AppContextValue {
  progress: ProgressState;
  getWeekProgress: (n: number) => import('@/hooks/useProgress').WeekProgress;
  getWeekCompleted: (n: number, id: import('@/data/course').SectionId) => boolean;
  isUnlocked: (n: number, id: import('@/data/course').SectionId) => boolean;
  completeSection: (n: number, id: import('@/data/course').SectionId) => void;
  setLastSlide: (n: number, slide: number) => void;
  resetWeek: (n: number) => void;
  game: GameState;
  recordCorrect: (xp: number, streak: number) => void;
  recordWrong: () => void;
  finishLevel: (activityId: string, difficulty: Difficulty, result: LevelResult) => void;
  online: boolean;
  getDownloadStatus: (week: number, kind: OfflineKind) => DownloadStatus;
  download: (week: number, kind: OfflineKind) => Promise<void>;
  removeDownload: (week: number, kind: OfflineKind) => Promise<void>;
  downloadAll: () => Promise<void>;
  isDownloaded: (week: number, kind: OfflineKind) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const progress = useProgress();
  const online = useOnline();
  const offline = useOfflineStore();
  const game = useGameStore();

  const value: AppContextValue = {
    progress: progress.state,
    getWeekProgress: progress.getWeek,
    getWeekCompleted: progress.isCompleted,
    isUnlocked: progress.isUnlocked,
    completeSection: progress.completeSection,
    setLastSlide: progress.setLastSlide,
    resetWeek: progress.resetWeek,
    game: game.game,
    recordCorrect: game.recordCorrect,
    recordWrong: game.recordWrong,
    finishLevel: game.finishLevel,
    online,
    getDownloadStatus: offline.getStatus,
    download: offline.download,
    removeDownload: offline.remove,
    downloadAll: offline.downloadAll,
    isDownloaded: offline.isDownloaded,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
