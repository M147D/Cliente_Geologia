import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:44371', // URL de tu backend
        changeOrigin: true,
        secure: false, // Si usas HTTPS con un certificado autofirmado
      },
    },
  },
})
