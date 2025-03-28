importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js'
);

if (workbox) {
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image' || request.destination === 'video',
    new workbox.strategies.CacheFirst({
      cacheName: 'media-cache',
      plugins: [new workbox.expiration.ExpirationPlugin({ maxEntries: 50 })]
    })
  );

  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'asset-cache'
    })
  );
}
