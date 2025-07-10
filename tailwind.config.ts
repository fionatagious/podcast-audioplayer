import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./src/components/*.{ts,tsx,js,jsx}",
    "./src/pages/*.{ts,tsx,js,jsx}",
  ],
  plugins: [],
};

export default config;
