const cacheName = "DefaultCompany-LeRu-v.01.09.02.2026.03:26";
const contentToCache = [
    "Build/b07da7bd1e5308102d60b46b34a8376c.loader.js",
    "Build/df00ad00516d9af2e2fa4fd8fe373d66.framework.js",
    "Build/7c60501b1f34938cd70a89522cd1ebde.data",
    "Build/a9a595aa0ed16da4f517fb5e7d155896.wasm",
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
