import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      // This tells Vite to forward any request starting with '/api'
      '/api': 'http://localhost:5000' // Your backend server address
    }
  }
})
