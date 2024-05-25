import { defineConfig } from "vitest/config";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: "app/helpers/setupTests.ts",
    environment: "jsdom",
    coverage: {
      include: ["components/**/*.{ts,tsx}", "helpers/**/*.{ts,tsx}"],
      exclude: [],
      reporter: ["html", "text-summary"],
      // Umbral de cobetura 
      thresholds: {
        functions: 50,
        lines: 50,
        branches: 50,
        statements: 50,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
    },
  },
});
