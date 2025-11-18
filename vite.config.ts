/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";
// import react from "@vitejs/plugin-react-swc"; in the future, use swc when react-compiler is supported
import colors from "picocolors";
import { visualizer } from "rollup-plugin-visualizer";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import progress from "vite-plugin-progress";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const ENV_PREFIX = "ENV_";

const getDistFolderName = (mode: string) => {
  if (mode === "production") return "dist";
  return `dist-${mode}`;
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), ENV_PREFIX);

  return {
    plugins: [
      react({
        babel: {
          plugins: ["babel-plugin-react-compiler"],
        },
      }),
      tsconfigPaths(),
      svgr({
        include: "**/*.svg",
      }),
      {
        ...visualizer(),
        apply: "build",
      },
      progress({
        format: `${colors.green(colors.bold("Building"))} ${colors.cyan(
          "[:bar]",
        )} :percent`,
      }),
      nodePolyfills(),
    ],
    envPrefix: ENV_PREFIX,
    optimizeDeps: {
      exclude: ["react-scan"],
    },
    server: {
      open: true,
      port: 3000,
      host: true,
      cors: true,
      // proxy: {
      //   "/api": {
      //     target: "http://localhost:8080",
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ""),
      //     configure: (proxy, options) => {
      //       proxy.on("proxyReq", (proxyReq, req, res) => {
      //         proxyReq.removeHeader("Referer");
      //         proxyReq.removeHeader("origin");
      //       });
      //     },
      //   },
      // },
    },
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: "./src/test/setup.ts",
    },
    base: env.ENV_APP_BASE_URL,
    build: {
      outDir: getDistFolderName(mode),
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
  };
});
