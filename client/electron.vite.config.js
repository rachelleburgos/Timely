import { sentryVitePlugin } from '@sentry/vite-plugin'
import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },

  preload: {
    plugins: [externalizeDepsPlugin()]
  },

  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  },

  build: {
    sourcemap: true
  },

  plugins: [
    sentryVitePlugin({
      org: 'timely-v2',
      project: 'javascript-react'
    }),
    sentryVitePlugin({
      org: 'timely-v2',
      project: 'timely-client'
    })
  ]
})
