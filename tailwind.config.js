/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F9EBE0"
        },
        secondary: {
          100: "#C492B1"
        },
        secondaryBtn: {
          100: '#FDD8BA'
        }
      },
      fontFamily: {
        header: ["Dancing Script", "serif"],
        text: ["Fauna One", "serif"]
      }
    },
  },
  plugins: [],
}