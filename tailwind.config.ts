import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0B", // near-black ground
          soft: "#121214",
          raise: "#18181B",
          line: "#26262B",
        },
        bolt: {
          DEFAULT: "#FFC400", // primary electric yellow
          bright: "#FFD84D",
          deep: "#E8A600",
          glow: "#FFE68A",
        },
        chalk: {
          DEFAULT: "#F5F5F2", // warm off-white (minimal)
          dim: "#A1A1A6",
          faint: "#6E6E76",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        bolt: "0 0 0 1px rgba(255,196,0,0.35), 0 8px 30px -8px rgba(255,196,0,0.45)",
        lift: "0 20px 50px -20px rgba(0,0,0,0.8)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "42%": { opacity: "1" },
          "44%": { opacity: "0.35" },
          "46%": { opacity: "1" },
          "70%": { opacity: "0.85" },
          "72%": { opacity: "1" },
        },
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sweep": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(255,196,0,0.5)" },
          "70%": { boxShadow: "0 0 0 14px rgba(255,196,0,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255,196,0,0)" },
        },
      },
      animation: {
        flicker: "flicker 4s ease-in-out infinite",
        "rise-in": "rise-in 0.7s cubic-bezier(0.22,1,0.36,1) both",
        sweep: "sweep 2.5s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
