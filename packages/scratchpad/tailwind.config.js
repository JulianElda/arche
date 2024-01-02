/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {},
    fontFamily: {
      serif: "'Heliotrope 3'",
      heading: "'Heliotrope 4'",
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms")],
};
