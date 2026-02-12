const cacheName = "DefaultCompany-LeRu-v.01.12.02.2026.23:00";
const contentToCache = [
    "Build/e2824c871ef418552c2f7ad1b3e732d8.loader.js",
    "Build/478ecd4ea8c438fde32ed1c2b0090080.framework.js",
    "Build/316a487ddc3f000599be0c064afb3750.data",
    "Build/647617d99b5666d2c2a72e4264c81c7c.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
