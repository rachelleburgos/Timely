import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import { GoogleOAuthProvider } from '@react-oauth/google'

import App from './App'

const isDevelopment = process.env.NODE_ENV === 'development'

// Sentry initialization for error tracking and performance monitoring
Sentry.init({
  dsn: import.meta.env.ELECTRON_VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/]
    }),
    new Sentry.Replay()
  ],
  // Performance Monitoring
  // Adjust the rates based on the environment; in development, higher rates are used
  tracesSampleRate: isDevelopment ? 0.1 : 1.0,
  // Session Replay
  replaysSessionSampleRate: isDevelopment ? 0.1 : 1.0,
  replaysOnErrorSampleRate: isDevelopment ? 0.1 : 1.0
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  // Conditionally use React.StrictMode only in development
  // https://reactjs.org/docs/strict-mode.html
  <GoogleOAuthProvider clientId={import.meta.env.RENDERER_VITE_GOOGLE_CLIENT_ID}>
    {isDevelopment ? (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ) : (
      <App />
    )}
  </GoogleOAuthProvider>
)
