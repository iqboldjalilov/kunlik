// Кунлик Хисобот — офлайн кэш.
// ҲАР ЯНГИ НАШРДА CACHE номини оширинг (масалан kunlik-v3), акс ҳолда эски файллар қолиши мумкин.
const CACHE = "kunlik-v7";

// Дастур ишлаши учун керак бўлган ҳамма маҳаллий файллар
const CORE = [
  "./",
  "./index.html",
  "./js/core/utils.js",
  "./js/calc/credit.js",
  "./js/core/numtext.js",
  "./manifest.json",
  "./icon-192.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  // Эски кэшларни ўчирамиз (ҳажм ва эски файллар қолмаслиги учун)
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  // Фақат шу сайтнинг GET сўровлари кэшланади; Firebase ва CDN'ларга тегилмайди
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;

  // Аввал кэшдан (тез ва офлайн), фонда янгисини олиб кэшни янгилаймиз
  event.respondWith(
    caches.match(event.request).then(cached => {
      const network = fetch(event.request)
        .then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(cache => cache.put(event.request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
