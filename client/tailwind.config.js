 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6b21a8',   // Tailwind's purple-900
        'secondary': '#fafafa', // Tailwind's zinc-50
        'accent': '#27272a' 
      }
    },
  },
  plugins: [],
}
