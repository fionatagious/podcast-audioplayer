import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Vite's default dev server port
    setupNodeEvents() {
      // implement node event listeners here
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false, // Disable video recording for faster runs
    screenshotOnRunFailure: true,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
