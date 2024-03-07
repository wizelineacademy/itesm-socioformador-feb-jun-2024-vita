/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: () => ({
        'gradient-custom': 'linear-gradient(229deg, rgba(255, 175, 175, 0.20) 19.95%, rgba(0, 0, 0, 0.04) 73.36%), linear-gradient(5deg, #346784 -16.61%, #062537 55.88%, #041B28 128.37%, #041B28 128.37%)',
      }),
      colors: {
        'custom-red': '#FF8484', 
      },
    
    },
  },
  plugins: [],
}