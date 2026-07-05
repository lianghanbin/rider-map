var CACHE = 'map-notes-v1';
var FILES = [
  './index.html',
  './leaflet.js',
  './leaflet.css',
  './manifest.json'
];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(FILES); }));
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) { return r || fetch(e.request); })
  );
});
