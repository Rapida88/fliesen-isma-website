/* Service Worker: App-Shell cachen, damit die App offline startet.
   Die eigentliche Analyse braucht natürlich Internet (Claude API). */
const CACHE = "seedance-analyzer-v1";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon.svg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Nur eigene GET-Requests behandeln; API-Calls gehen immer direkt ins Netz.
  if (e.request.method !== "GET" || url.origin !== location.origin) return;

  // Network-first, damit Updates sofort ankommen; Cache als Offline-Fallback.
  e.respondWith(
    fetch(e.request)
      .then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return resp;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
