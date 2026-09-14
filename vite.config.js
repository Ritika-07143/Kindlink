import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'live-server-compat',
      transformIndexHtml: {
        order: 'pre',
        handler(html, ctx) {
          // For both dev server and vite build, use /src/main.jsx
          return html.replace(
            '<script type="module" crossorigin src="./assets/index.js"></script>',
            '<script type="module" src="/src/main.jsx"></script>'
          ).replace(
            '<link rel="stylesheet" crossorigin href="./assets/index.css">',
            ''
          );
        }
      }
    }
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})
