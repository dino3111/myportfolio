import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://dino3111.github.io/myportfolio/
export default defineConfig({
  plugins: [react()],
  base: '/myportfolio/',
})
