const CACHE_NAME = 'furatto-stock-v2';
const urlsToCache = [
  './',
  './index.html',
  './app.js', 
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el cache si existe, sino haz fetch
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});