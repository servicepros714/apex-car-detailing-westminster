import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'
import { BookingProvider } from './context/BookingContext'

export { ROUTES, pageMeta, headTags } from './lib/seo.js'
export { SITE_URL } from './lib/business.js'

// Build-time only: renders a route to HTML for scripts/prerender.js.
// Same provider tree as src/main.jsx, so hydration matches.
export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <BookingProvider>
          <App />
        </BookingProvider>
      </StaticRouter>
    </React.StrictMode>
  )
}
