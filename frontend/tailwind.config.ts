import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ivory: {
          soft: "var(--ivory-soft)",
        },
        sage: {
          light: "var(--sage-light)",
        },
        teal: {
          deep: "var(--teal-deep)",
        },
        gold: {
          soft: "var(--gold-soft)",
        },
        anthracite: {
          soft: "var(--anthracite-soft)",
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

