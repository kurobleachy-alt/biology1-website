import { useCallback, useEffect, useState } from 'react';
import { OFFLINE_ITEMS, lessonSlidePaths, offlineItemId, type OfflineKind } from '@/data/course';
import { cacheFiles, deleteCache, lessonCacheName } from '@/lib/offlineCache';

export type DownloadStatus = 'idle' | 'downloading' | 'downloaded';

interface OfflineStore {
  status: Record<string, DownloadStatus>;
}

const STORE_KEY = 'biology1-offline-status-v1';

function loadStore(): OfflineStore {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { status: {} };
    const parsed = JSON.parse(raw) as OfflineStore;
    const status = Object.fromEntries(
      Object.entries(parsed.status).filter(([, s]) => s === 'downloaded'),
    );
    return { status };
  } catch {
    return { status: {} };
  }
}

function saveStore(store: OfflineStore) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    /* ignore */
  }
}

export function useOfflineStore() {
  const [store, setStore] = useState<OfflineStore>(() => loadStore());

  useEffect(() => {
    saveStore(store);
  }, [store]);

  const getStatus = useCallback(
    (week: number, kind: OfflineKind): DownloadStatus =>
      store.status[offlineItemId(week, kind)] ?? 'idle',
    [store],
  );

  const setItemStatus = useCallback((week: number, kind: OfflineKind, status: DownloadStatus) => {
    setStore((prev) => {
      const next = { ...prev.status };
      if (status === 'idle') delete next[offlineItemId(week, kind)];
      else next[offlineItemId(week, kind)] = status;
      return { status: next };
    });
  }, []);

  // Lessons cache their slide images; activities have no files yet, so they are marked directly.
  const download = useCallback(
    async (week: number, kind: OfflineKind) => {
      setItemStatus(week, kind, 'downloading');
      try {
        if (kind === 'lesson') {
          await cacheFiles(lessonCacheName(week), lessonSlidePaths(week));
        }
        setItemStatus(week, kind, 'downloaded');
      } catch (err) {
        setItemStatus(week, kind, 'idle');
        throw err;
      }
    },
    [setItemStatus],
  );

  const remove = useCallback(
    async (week: number, kind: OfflineKind) => {
      if (kind === 'lesson') await deleteCache(lessonCacheName(week));
      setItemStatus(week, kind, 'idle');
    },
    [setItemStatus],
  );

  const downloadAll = useCallback(async () => {
    for (const item of OFFLINE_ITEMS) {
      if (store.status[offlineItemId(item.week, item.kind)] === 'downloaded') continue;
      await download(item.week, item.kind);
    }
  }, [download, store.status]);

  const isDownloaded = useCallback(
    (week: number, kind: OfflineKind) => getStatus(week, kind) === 'downloaded',
    [getStatus],
  );

  return { store, getStatus, download, remove, downloadAll, isDownloaded };
}
