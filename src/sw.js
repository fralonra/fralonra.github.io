importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js')

workbox.routing.registerRoute(
  /\.js$/,
  new workbox.strategies.StaleWhileRevalidate()
)
