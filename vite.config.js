import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: true, // required for ngrok / external access
    allowedHosts: [
      "58fbfe2284bc.ngrok-free.app"  // your ngrok URL
    ]
  }
})
