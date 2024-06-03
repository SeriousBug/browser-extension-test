/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    extend: {
      spacing: {
        DEFAULT: "1rem",
      },
    },
    colors: {
      primary: "#d4af37",
      "primary-contrast": "#000",
      accent: "#bcb88a",
      "accent-contrast": "#fff",
      highlight: "#db0082",
      "highlight-contrast": "#000",
      text: "#000",
      background: "#fff",
    },
    borderRadius: {
      DEFAULT: ".5rem",
    },
    borderWidth: {
      DEFAULT: "2px",
      thick: "4px",
    },
  },
  plugins: [],
};
