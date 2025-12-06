const cacheName = self.location.pathname
const pages = [

  "/witchy/docs/example/",
  "/witchy/docs/example/table-of-contents/with-toc/",
  "/witchy/docs/example/table-of-contents/without-toc/",
  "/witchy/posts/creating-a-new-theme/",
  "/witchy/posts/migrate-from-jekyll/",
  "/witchy/docs/example/table-of-contents/",
  "/witchy/docs/example/collapsed/",
  "/witchy/",
  "/witchy/docs/",
  "/witchy/posts/",
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
  "/witchy/docs/example/collapsed/3rd-level/4th-level/",
  "/witchy/docs/example/collapsed/3rd-level/",
  "/witchy/docs/example/hidden/",
  "/witchy/docs/shortcodes/",
  "/witchy/docs/shortcodes/buttons/",
  "/witchy/docs/shortcodes/columns/",
  "/witchy/docs/shortcodes/details/",
  "/witchy/docs/shortcodes/experimental/",
  "/witchy/docs/shortcodes/experimental/asciinema/",
  "/witchy/docs/shortcodes/experimental/badges/",
  "/witchy/docs/shortcodes/experimental/cards/",
  "/witchy/docs/shortcodes/experimental/images/",
  "/witchy/docs/shortcodes/hints/",
  "/witchy/docs/shortcodes/mermaid/",
  "/witchy/docs/shortcodes/section/",
  "/witchy/docs/shortcodes/section/first-page/",
  "/witchy/docs/shortcodes/section/second-page/",
  "/witchy/docs/shortcodes/steps/",
  "/witchy/docs/shortcodes/tabs/",
  "/witchy/docs/shortcodes/katex/",
  "/witchy/showcases/",
  "/witchy/book.min.cc2c524ed250aac81b23d1f4af87344917b325208841feca0968fe450f570575.css",
  "/witchy/en.search-data.min.eef5c1b0b36458425a18b004d7e526cce42d4df37fef4ef33f956793e040a2d7.json",
  "/witchy/en.search.min.3b5103f73930a1791b2c954e968280275d9773b0b91c24d65d87a2726468619e.js",
  
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
