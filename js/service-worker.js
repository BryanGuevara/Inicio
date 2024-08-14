const CACHE_NAME = 'image-cache-v1';

self.addEventListener('install', event => {
    console.log('[Service Worker] Instalación');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('[Service Worker] Activación');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.endsWith('.png') || event.request.url.endsWith('.jpg')) {
        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    return response; 
                }
                return fetch(event.request).then(networkResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone()); 
                        return networkResponse;
                    });
                });
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request);
            })
        );
    }
});
