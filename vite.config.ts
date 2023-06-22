import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Тут прописан порт для dev-server
  server: {
    port: 3005
  }
})


