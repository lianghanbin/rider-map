var CACHE = 'map-notes-v2';
var FILES = [
  './index.html',
  './leaflet.js',
  './leaflet.css',
  './manifest.json',
  './config.js',
  './reward.jpg'
];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(FILES); }));
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) { return r || fetch(e.request); })
  );
});
