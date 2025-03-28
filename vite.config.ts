import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/JS-BandStore-react-typescript-mui',
  plugins: [react()],
})
