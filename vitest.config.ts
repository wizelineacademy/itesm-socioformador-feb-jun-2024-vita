import { defineConfig } from 'vitest/config'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: 'src/helpers/setupTests.ts',
    environment: 'jsdom',
    coverage: {
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/helpers/**/*.{ts,tsx}',
        'src/lib/**/*.{ts,tsx}',
      ],
      exclude: [],
      reporter: ['html', 'text-summary'],
      // Umbral de cobetura
      thresholds: {
        functions: 10,
        lines: 10,
        branches: 10,
        statements: 10,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app'),
    },
  },
})
