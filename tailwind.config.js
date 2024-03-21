/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      width: {
        '90': '90%',
      },
      transitionDuration: {
        'slow': '200ms', 
      }
    },
  },
  plugins: [],
}

