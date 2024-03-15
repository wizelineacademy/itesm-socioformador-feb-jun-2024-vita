import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    
    extend: {
      backgroundImage: () => ({
        'gradient-custom': 'linear-gradient(229deg, rgba(255, 175, 175, 0.20) 19.95%, rgba(0, 0, 0, 0.04) 73.36%), linear-gradient(5deg, #346784 -16.61%, #062537 55.88%, #041B28 128.37%, #041B28 128.37%)',
      }),
      
      colors: {
        'custom-red': '#FF8484', 
        'custom-blue':'#0B1F2E',
        'custom-green': '#86FFA8',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
      
      
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config