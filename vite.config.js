import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',  // ✅ Fixes legacy JS API warning
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  server: {
    port: 3002,
    open: true,
  },
  build: {
    outDir: 'build',
  },
})