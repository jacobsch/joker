importScripts('/cache-polyfill.js');

const version = "0.1";
const cacheName = `jokerSW-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/styles.css`,
        `/app.js`,
        `/sw.js`,
        `/cache-polyfill.js`,
        `/img/site.webmanifest`,
        `/img/browserconfig.xml`,
        `/img/android-chrome-192x192.png`,
        `/img/android-chrome-512x512.png`,
        `/img/apple-touch-icon.png`,
        `/img/favicon-16x16.png`,
        `/img/favicon-32x32.png`,
        `/img/favicon.ico`,
        `/img/mstile-150x150.png`,
        `/img/safari-pinned-tab.svg`
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
