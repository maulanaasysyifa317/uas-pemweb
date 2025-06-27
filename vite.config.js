// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/uas-frontend/',
  server: {
    proxy: {
      // String shorthand: `/api` akan di-proxy ke target
      '/api': {
        target: 'https://api.football-data.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})