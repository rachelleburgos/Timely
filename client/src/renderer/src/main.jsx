import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import { GoogleOAuthProvider } from '@react-oauth/google'

import App from './App'

// Sentry initialization for error tracking and performance monitoring
Sentry.init({
  dsn: import.meta.env.RENDERER_VITE_SENTRY_DSN,
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

// TODO: Remove StrictMode in production
root.render(
  <GoogleOAuthProvider clientId={import.meta.env.RENDERER_VITE_GOOGLE_CLIENT_ID}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
)
