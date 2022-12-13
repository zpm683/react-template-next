/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";
import progress from "vite-plugin-progress";
import eslint from "vite-plugin-eslint";
import colors from "picocolors";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    progress({
      format: `${colors.green(colors.bold("Building"))} ${colors.cyan(
        "[:bar]",
      )} :percent`,
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    eslint({
      include: ["src/**/*.js", "src/**/*.jsx", "src/**/*.tsx", "src/**/*.ts"],
      exclude: ["./node_modules/**"],
      cache: false,
    }),
  ],
  envPrefix: "REACT_APP_",
  server: {
    port: 3000,
    host: true,
    cors: true,
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./src/test/setup.ts",
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
