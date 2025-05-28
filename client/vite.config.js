import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://api-gateway:3000',
        changeOrigin: true
      }
    }
  }
})