import type { Plugin } from 'vite'

/**
 * Slidev markdown files live in presentations/ and reference images as
 * ../public/filename.png. During build Vite resolves these at compile-time,
 * but in dev the browser resolves the relative URL to /public/filename.png.
 * Vite serves public/ contents at root (/) not at /public/, so requests 404.
 *
 * This plugin rewrites /public/* requests to /* so they hit Vite's static
 * file server correctly.
 */
function servePublicPrefix(): Plugin {
  return {
    name: 'serve-public-prefix',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url?.startsWith('/public/')) {
          req.url = req.url.slice('/public'.length)
        }
        next()
      })
    },
  }
}

export default {
  plugins: [servePublicPrefix()],
}
