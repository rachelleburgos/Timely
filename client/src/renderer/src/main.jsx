/**
 * @file main.jsx
 * @brief Entry point for the React application.
 *
 * This file is the starting point of the React application. It initializes Sentry for error tracking
 * and performance monitoring. The Sentry DSN is retrieved from environment variables for security.
 * Sentry's BrowserTracing integration is set up for distributed tracing, and Replay is also initialized.
 * The application is wrapped in React.StrictMode for development. StrictMode is a tool for highlighting
 * potential problems in an application and does not impact the production build.
 *
 * @requires react
 * @requires react-dom
 * @requires @sentry/react
 * @requires ./App - The root component of the application.
 *
 * @example
 * Sentry.init({
 *   dsn: process.env.REACT_APP_SENTRY_DSN,
 *   // other configurations...
 * });
 *
 * ReactDOM.createRoot(document.getElementById('root')).render(<App />);
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'

import App from './App'

Sentry.init({
  dsn: 'process.env.REACT_APP_SENTRY_DSN',
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/]
    }),
    new Sentry.Replay()
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  // TODO: Remove StrictMode in production
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
