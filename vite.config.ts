import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const SENTRY_DSN = ""

// https://vitejs.dev/config/
export default defineConfig({
  root: './app',
  base: '/static/',
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          'babel-plugin-macros',
          '@emotion/babel-plugin'
        ]
      }
    }),
    svgr()
  ],
  define: {
    PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production'),
    SENTRY_DSN: JSON.stringify(SENTRY_DSN)
  },
  build: {
    outDir: '../dist-dev',
    emptyOutDir: true,
    manifest: true,
    watch: {},
    rollupOptions: {
      input: './app/index.tsx',
      output: {
        entryFileNames: 'app.js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
}) 