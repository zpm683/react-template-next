import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    specPattern: "src/e2e/**/*.cy.{js,jsx,ts,tsx}",
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
