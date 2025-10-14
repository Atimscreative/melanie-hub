/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
        },
        background: "var(--color-background)",
        card: "var(--color-card)",
        title: "var(--color-title)",
        body: "var(--color-body)",
        border: "var(--color-border)",
        input: {
          bg: "var(--color-input-bg)",
          placeholder: "var(--color-placeholder)",
        },
      },
    },
  },
  plugins: [],
};
