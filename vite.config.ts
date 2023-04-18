/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";
import progress from "vite-plugin-progress";
import eslint from "vite-plugin-eslint";
import colors from "picocolors";
import { viteSingleFile } from "vite-plugin-singlefile";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const ENV_PREFIX = "ENV_";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), ENV_PREFIX);

  const buildInSingleFile =
    command === "build" && env.ENV_BUILD_IN_SINGLEFILE === "true";

  buildInSingleFile && console.log("build in single file!");

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      eslint({ cache: true }),
      buildInSingleFile && viteSingleFile({ removeViteModuleLoader: true }),
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
        output: buildInSingleFile
          ? {}
          : {
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
