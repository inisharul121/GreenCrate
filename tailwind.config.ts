import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest:  { DEFAULT: "#2D6A4F", light: "#40916C", dark: "#1B4332" },
        sage:    { DEFAULT: "#52B788", light: "#74C69D", dark: "#40916C" },
        cream:   { DEFAULT: "#F9F5F0", dark: "#EEE8DF" },
        charcoal:{ DEFAULT: "#1A1A2E", light: "#2D2D44" },
        amber:   { DEFAULT: "#F2A65A", light: "#F4BA7A" },
        blush:   { DEFAULT: "#FFE8D6" },
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        card:   "0 2px 16px rgba(45,106,79,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 32px rgba(45,106,79,0.16), 0 2px 8px rgba(0,0,0,0.08)",
        glass:  "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "fade-in":    "fadeIn 0.4s ease forwards",
        "slide-in-right": "slideInRight 0.35s cubic-bezier(.22,.68,0,1.2) forwards",
        float:        "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp:         { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn:         { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideInRight:   { "0%": { opacity: "0", transform: "translateX(100%)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        float:          { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
      },
      backgroundImage: {
        "hero-gradient":    "linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #40916C 100%)",
        "card-gradient":    "linear-gradient(180deg, transparent 40%, rgba(27,67,50,0.85) 100%)",
        "sage-gradient":    "linear-gradient(135deg, #52B788 0%, #74C69D 100%)",
        "cream-gradient":   "linear-gradient(180deg, #F9F5F0 0%, #EEE8DF 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
