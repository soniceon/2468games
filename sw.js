const CACHE_NAME = '2468-cache-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/favicon.svg',
  '/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

// Network falling back to cache, with offline fallback for navigation
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/offline.html'))
    );
    return;
  }
  event.respondWith(
    caches.match(request).then(cached => {
      const fetchPromise = fetch(request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});


