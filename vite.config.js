import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const vendorChunks = {
  react: /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|cookie|set-cookie-parser)[\\/]/,
  motion: /[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/,
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', '@phosphor-icons/react', '@emailjs/browser'],
  },
  server: {
    // Transform the app up front so the first page load in dev doesn't wait on a request waterfall.
    warmup: {
      clientFiles: ['./src/main.jsx', './src/App.jsx', './src/pages/*.jsx', './src/components/**/*.jsx'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Libraries change far less often than the content, so they stay cached across deploys.
        manualChunks(id) {
          return Object.keys(vendorChunks).find((name) => vendorChunks[name].test(id))
        },
      },
    },
  },
})
