import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  server: {
    host: '0.0.0.0', // or a specific IP like '192.168.1.10'
    port: 3000,
  },
  define: {'process.env.MY_VAR': JSON.stringify(process.env.MY_VAR)}
})
