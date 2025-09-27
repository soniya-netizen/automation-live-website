/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Add this 'safelist' property
  safelist: [
    {
      pattern: /bg-(blue|purple|green|indigo)-(100)/,
    },
    {
      pattern: /text-(blue|purple|green|indigo)-(600)/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
