import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react-swc";
import colors from "picocolors";
import { visualizer } from "rollup-plugin-visualizer";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import progress from "vite-plugin-progress";
import tsconfigPaths from "vite-tsconfig-paths";

const ENV_PREFIX = "ENV_";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), ENV_PREFIX);

  return {
    plugins: [
      react(),
      tsconfigPaths(),
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
  };
});
