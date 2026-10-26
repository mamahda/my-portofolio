/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Libre Baskerville", "ui-serif", "Georgia", "serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        ink: {
          950: "#1e1e22",
          900: "#26262b",
          850: "#2a2a2f",
          800: "#2f2f35",
          700: "#3a3a41",
        },
        // Stock zinc-500 only reaches 3.4:1 on ink-950; this keeps small meta text at WCAG AA.
        zinc: {
          500: "#8a8a93",
        },
        backdrop: "#161619",
        line: {
          DEFAULT: "#303036",
          strong: "#3d3d45",
        },
        accent: {
          DEFAULT: "#b5e46e",
          hover: "#c7ee8d",
        },
      },
      boxShadow: {
        float: "0 24px 64px -16px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        flash: {
          "0%, 35%": { backgroundColor: "rgba(181, 228, 110, 0.07)" },
          "100%": { backgroundColor: "transparent" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        blink: "blink 1.1s steps(1) infinite",
        breathe: "breathe 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        flash: "flash 2.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};
