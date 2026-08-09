import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Stitch Warm Editorial Off-White Foundation
        background: "#F4F4F0",
        foreground: "#111111",
        surface: "#FFFFFF",
        "surface-muted": "#F0EEE8",
        border: "#E4E1DA",
        "border-strong": "#D1CDC4",
        secondary: "#666664",
        
        // Stitch Obsidian Dark Tokens
        dark: {
          bg: "#111111",
          surface: "#181818",
          border: "#2A2A2A",
          text: "#F5F5F5",
          secondary: "#A0A0A0",
        },

        // Editorial Accent Palette
        orange: {
          DEFAULT: "#FF6B35",
          hover: "#E85A24",
          light: "#FFF0EB",
          border: "#FFC2AC",
        },
        green: {
          DEFAULT: "#8FAF9A",
          dark: "#2D7A58",
          light: "#F0F5F2",
          border: "#C5D8CC",
        },
        yellow: {
          DEFAULT: "#E8C547",
          dark: "#B8961D",
          light: "#FDF8E7",
        },
        lavender: {
          DEFAULT: "#8B78A8",
          light: "#F1EDF7",
          border: "#D6CBE8",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        subtle: "0 2px 8px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px rgba(0, 0, 0, 0.05)",
        dark: "0 10px 30px rgba(0, 0, 0, 0.3)",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "24px",
      },
    },
  },
  plugins: [],
};
export default config;
