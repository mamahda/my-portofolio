import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /* Sizes read CSS variables so phones get their own scale; values live in global.css. */
      fontSize: Object.fromEntries(
        ["2xs", "xs", "sm", "body", "base", "lg", "xl", "2xl", "3xl", "4xl"].map((step) => [
          step,
          [`var(--text-${step})`, { lineHeight: `var(--leading-${step})` }],
        ]),
      ),
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Plus Jakarta Sans Fallback", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Libre Baskerville", "Libre Baskerville Fallback", "ui-serif", "Georgia", "serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      /* Every color reads a CSS variable (RGB channels) so the whole palette flips with the theme;
         the dark and light values live in global.css. */
      colors: {
        ink: {
          950: "rgb(var(--ink-950) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          850: "rgb(var(--ink-850) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
        },
        zinc: {
          50: "rgb(var(--zinc-50) / <alpha-value>)",
          100: "rgb(var(--zinc-100) / <alpha-value>)",
          200: "rgb(var(--zinc-200) / <alpha-value>)",
          300: "rgb(var(--zinc-300) / <alpha-value>)",
          400: "rgb(var(--zinc-400) / <alpha-value>)",
          500: "rgb(var(--zinc-500) / <alpha-value>)",
          600: "rgb(var(--zinc-600) / <alpha-value>)",
          700: "rgb(var(--zinc-700) / <alpha-value>)",
        },
        // Translucent overlays (hover fills, hairline rings): white on dark, near-black on light.
        tint: "rgb(var(--tint) / <alpha-value>)",
        backdrop: "rgb(var(--backdrop) / <alpha-value>)",
        line: {
          DEFAULT: "rgb(var(--line) / <alpha-value>)",
          strong: "rgb(var(--line-strong) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          hover: "rgb(var(--accent-hover) / <alpha-value>)",
        },
      },
      boxShadow: {
        float: "var(--shadow-float)",
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
          "0%, 35%": { backgroundColor: "rgb(var(--accent) / 0.07)" },
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
  plugins: [
    // `light:` for the few colors that need a different shade rather than a different variable.
    plugin(({ addVariant }) => addVariant("light", "html.light &")),
  ],
};
