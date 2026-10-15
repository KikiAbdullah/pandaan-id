// Service worker pandaan.id — path relatif terhadap scope registrasi,
// jadi bekerja di root custom domain maupun subpath GitHub Pages.
const CACHE_NAME = 'pandaan-static-v7'
const scope = self.registration.scope
const shellPaths = [
  './', 'berita/', 'info-jalan/', 'direktori/', 'event/', 'offline.html',
  'manifest.webmanifest', 'assets/logo-pandaan-dark.webp', 'assets/logo-pandaan-white.webp', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png',
  'assets/css/pandaan.css', 'assets/js/pandaan.js',
  'assets/fonts/fraunces-latin-var.woff2', 'assets/fonts/schibsted-grotesk-latin-var.woff2',
]
const APP_SHELL = shellPaths.map((p) => new URL(p, scope).toString())

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()))
})
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))).then(() => self.clients.claim()))
})
self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request)
        if (response.ok && !url.search) {
          const cache = await caches.open(CACHE_NAME)
          await cache.put(request, response.clone())
        }
        return response
      } catch {
        return (await caches.match(request)) || (await caches.match(new URL('offline.html', scope).toString()))
      }
    })())
    return
  }
  if (url.pathname.includes('/assets/') || url.pathname.endsWith('manifest.webmanifest') || url.pathname.includes('/icon')) {
    event.respondWith((async () => {
      const cached = await caches.match(request)
      if (cached) return cached
      try {
        const response = await fetch(request)
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME)
          await cache.put(request, response.clone())
        }
        return response
      } catch { return Response.error() }
    })())
  }
})
