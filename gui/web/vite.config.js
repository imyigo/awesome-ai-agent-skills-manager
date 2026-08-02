import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Web dashboard build'i. Kaynak App.jsx tek dosya (../src/App.jsx) —
// hiç değiştirilmeden import edilir; main.jsx global React/ReactDOM'u kurar.
export default defineConfig({
  plugins: [react()],
  root: __dirname,
  base: './',                        // gui_server dist'i relatif servis eder
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    // Dev'de API + eski /src yollarını backend'e proxy'le.
    proxy: {
      '/api': 'http://localhost:3777',
      '/src': 'http://localhost:3777',
    },
  },
  resolve: {
    alias: { '@app': path.resolve(__dirname, '..', 'src') },
  },
});
