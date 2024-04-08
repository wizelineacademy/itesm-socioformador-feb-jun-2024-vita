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
        'side-color': '#07202A',
        'home-color': '#122848',
        'nutrition-color': '#DA56B575',
        'nutrition-background':'#2C0521',
        'home-background':'#F4FDFF',
        'custom-extralightpurple': '#95808F',
        'custom-lightpurple': ' #71566c',
        'custom-purple3': '#741B5B',
        'custom-purple4': '#9F3C7F',
        'home-title':'#154154',
        "button-blue": "#347BCE",
        'decoration-nutrition-colordark':'#861B68',
        'decoration-nutrition-colorlight':'#F84AC7',
        'decoration-home-colordark':'#9BD6E3',
        'decoration-home-colorlight':'#154154',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
      
      
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config