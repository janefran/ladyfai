import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        teal: {
          bright: "#14BCBA",
          deep: "#0D7377",
          ink: "#0A3938",
          night: "#080D0D",
          surface: "#0F1A1A",
        },
        paper: "#F5FAF9",
        card: "#FFFFFF",
        inkbody: "#13302E",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
