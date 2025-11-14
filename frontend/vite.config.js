import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // THIS LINE WAS MISSING

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      // The '@' alias needs 'path' to work
      '@': path.resolve(__dirname, './src'),
    },
  },
})