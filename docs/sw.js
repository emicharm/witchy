const cacheName = self.location.pathname
const pages = [

  "/witchy/",
  "/witchy/posts/creating-a-new-theme/",
  "/witchy/posts/migrate-from-jekyll/",
  "/witchy/note/%D0%9A%D0%B0%D1%80%D1%82%D1%8B-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%D0%BE%D0%B2/MiCarrefour/",
  "/witchy/posts/goisforlovers/",
  "/witchy/categories/",
  "/witchy/categories/Development/",
  "/witchy/tags/development/",
  "/witchy/posts/hugoisforlovers/",
  "/witchy/tags/go/",
  "/witchy/categories/golang/",
  "/witchy/tags/golang/",
  "/witchy/tags/hugo/",
  "/witchy/tags/",
  "/witchy/tags/templates/",
  "/witchy/tags/themes/",
  "/witchy/note/",
  "/witchy/note/%D0%9A%D0%B0%D0%BA-%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C-CUIL/",
  "/witchy/note/%D0%9A%D0%B0%D0%BA-%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C-%D0%BA%D0%B0%D1%80%D1%82%D1%83-Prex/",
  "/witchy/note/%D0%9A%D0%B0%D1%80%D1%82%D1%8B-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%D0%BE%D0%B2/",
  "/witchy/note/%D0%A1%D0%B4%D0%B0%D1%82%D1%8C-%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D0%B7%D1%8B/",
  "/witchy/posts/",
  "/witchy/book.min.8be08ee19c78fece5778ccbad7b7920c47943153ee0c9e856094873c56dca415.css",
  "/witchy/en.search-data.min.55f867c9db4ffe96e9331069bac29238ff68d70dc83ee075aad23e68d9c7dc42.json",
  "/witchy/en.search.min.4cea9365053a032b4cc9c8be75f173892bc7844d36204f316b7453bd11c05275.js",
  
];

self.addEventListener("install", function (event) {
  self.skipWaiting();

  caches.open(cacheName).then((cache) => {
    return cache.addAll(pages);
  });
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  /**
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  function saveToCache(response) {
    if (cacheable(response)) {
      return caches
        .open(cacheName)
        .then((cache) => cache.put(request, response.clone()))
        .then(() => response);
    } else {
      return response;
    }
  }

  /**
   * @param {Error} error
   */
  function serveFromCache(error) {
    return caches.open(cacheName).then((cache) => cache.match(request.url));
  }

  /**
   * @param {Response} response
   * @returns {Boolean}
   */
  function cacheable(response) {
    return response.type === "basic" && response.ok && !response.headers.has("Content-Disposition")
  }

  event.respondWith(fetch(request).then(saveToCache).catch(serveFromCache));
});
