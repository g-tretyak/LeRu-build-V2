const cacheName = "DefaultCompany-LeRu-v.01.13.02.2026.00:52";
const contentToCache = [
    "Build/36bd8e4e1972efa26ffb976c585335ba.loader.js",
    "Build/478ecd4ea8c438fde32ed1c2b0090080.framework.js",
    "Build/7d0af68c1eff92de26563fb71731877b.data",
    "Build/d7e2978ae09ab5a3644de936a3180557.wasm",
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
