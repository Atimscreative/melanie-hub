/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          hover: "rgb(var(--color-primary-hover) / <alpha-value>)",
        },
        background: "rgb(var(--color-background) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        title: "rgb(var(--color-title) / <alpha-value>)",
        body: "rgb(var(--color-body) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        input: {
          bg: "rgb(var(--color-input-bg) / <alpha-value>)",
          placeholder: "rgb(var(--color-placeholder) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
