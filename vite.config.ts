import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/MREDeliveryRoadmap/',
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'app.html')
    },
    outDir: 'dist'
  }
})
