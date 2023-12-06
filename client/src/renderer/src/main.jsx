import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'

import App from './App'

// Sentry initialization for error tracking and performance monitoring
Sentry.init({
  dsn: 'https://4fc52bc722c372978bb1875850d211d2@o4506294371287040.ingest.sentry.io/4506294374891520',
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/]
    }),
    new Sentry.Replay()
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 1.0, // Sample rate for session replay
  replaysOnErrorSampleRate: 1.0 // Sample rate for sessions where errors occur
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  // TODO: Remove StrictMode in production
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
