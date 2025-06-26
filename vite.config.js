import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/CV-Kalia-Utama-Nusantara',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7000', // Redirects API calls to your backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Ensures the API path is correctly proxied
      },
    },
  },
});
