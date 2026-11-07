export function lessonCacheName(week: number): string {
  return `biology1-lesson-week${week}-v1`;
}

async function postToWorker(message: Record<string, unknown>): Promise<void> {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Offline storage is not supported in this browser.');
  }
  const registration = await navigator.serviceWorker.ready;
  const worker = registration.active;
  if (!worker) throw new Error('Offline service is not ready yet. Please try again.');

  return new Promise<void>((resolve, reject) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = (event: MessageEvent<{ ok?: boolean; error?: string }>) => {
      if (event.data.error) reject(new Error(event.data.error));
      else resolve();
    };
    worker.postMessage(message, [channel.port2]);
  });
}

export function cacheFiles(cacheName: string, urls: string[]): Promise<void> {
  return postToWorker({ type: 'CACHE_URLS', cacheName, urls });
}

export function deleteCache(cacheName: string): Promise<void> {
  return postToWorker({ type: 'DELETE_CACHE', cacheName });
}
