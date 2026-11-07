// Biology 1 E-Learning service worker.
// Caches the app shell so the site loads offline, and stores each week's lesson
// slides in their own cache when the student taps Download.
const SHELL_PREFIX = 'biology1-shell-';
const CACHE_NAME = `${SHELL_PREFIX}v2`;
const LESSON_CACHE_PREFIX = 'biology1-lesson-';
const SHELL = ['/', '/index.html', '/manifest.webmanifest', '/icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL).catch(() => undefined)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith(SHELL_PREFIX) && k !== CACHE_NAME)
          .map((k) => caches.delete(k)),
      ),
    ),
  );
  self.clients.claim();
});

// The page asks for a lesson's slides to be cached (or a lesson cache removed).
// Each request carries a MessageChannel port that receives { ok } or { error }.
self.addEventListener('message', (event) => {
  const port = event.ports[0];
  if (!port) return;
  const { type, cacheName, urls } = event.data || {};
  const reply = (payload) => port.postMessage(payload);

  if (typeof cacheName !== 'string' || !cacheName.startsWith(LESSON_CACHE_PREFIX)) {
    reply({ error: 'Invalid cache name.' });
    return;
  }

  if (type === 'CACHE_URLS') {
    if (!Array.isArray(urls) || !urls.every((u) => typeof u === 'string')) {
      reply({ error: 'Invalid file list.' });
      return;
    }
    const sameOrigin = urls.every(
      (u) => new URL(u, self.location.origin).origin === self.location.origin,
    );
    if (!sameOrigin) {
      reply({ error: 'Only files from this site can be stored offline.' });
      return;
    }
    event.waitUntil(
      caches
        .open(cacheName)
        .then((cache) => cache.addAll(urls))
        .then(() => reply({ ok: true }))
        .catch(() => reply({ error: 'Download failed. Check your connection and try again.' })),
    );
    return;
  }

  if (type === 'DELETE_CACHE') {
    event.waitUntil(caches.delete(cacheName).then(() => reply({ ok: true })));
    return;
  }

  reply({ error: 'Unknown request.' });
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Navigation requests: serve cached index.html when offline (app shell).
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put('/index.html', copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match('/index.html').then((r) => r || caches.match('/'))),
    );
    return;
  }

  // Same-origin assets (including downloaded slides in any cache): cache-first.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
            return res;
          }),
      ),
    );
    return;
  }

  // Default: try network, fall back to cache.
  event.respondWith(
    fetch(req).catch(() => caches.match(req).then((r) => r || Response.error())),
  );
});
