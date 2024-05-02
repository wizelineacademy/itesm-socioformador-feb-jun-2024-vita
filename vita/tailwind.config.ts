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
        'exercise-background': "#07191C",
        'custom-extralightpurple': '#95808F',
        'custom-lightpurple': ' #71566c',
        'custom-purple3': '#741B5B',
        'custom-purple4': '#9F3C7F',
        'custom-purple5': "#511D42",
        'home-title':'#154154',
        "button-blue": "#347BCE",
        "mid-blue": "#2064B3",
        "mid-red": "#C13131",
        "light-red": "#DE4C4C",
        "mid-green": "#278E7C",
        "dark-green": "#194A48",
        "input-green": "#2D3B3D",
        "dark-purple": "#121535",
        "decoration-sleep-colordark": "#2D278E",
        "decoration-sleep-colorlight": "#5044FF",
        'dark-background-purple': "#3A0A2D",
        'decoration-nutrition-colordark':'#861B68',
        'decoration-nutrition-colorlight':'#F84AC7',
        'decoration-home-colordark':'#9BD6E3',
        'decoration-home-colorlight':'#154154',
        'chat-color':'#133848',
        'chat-background':'#16052C',
        'search-background':'#ececec',
        'ask-color':'#3868AF',
        'answer-color':'#741B5B',
        'question-color':'#133848',
        'input-home': 'rgba(105, 201, 255, 0.19)',
        'button-home': '#3868AF',
        'color-home2':'#2E7390',
        'color-home3':'#BFEBFF',
        'color-home4':'#1D154A',
        'color-home5':'#2D7593',
        'color-home6':'#144154',
        'color-home7':'#94D8F3',
        'reminders-background':'#05272C',
        'reminders-color':'#41B0C0',
        'reminders-input':'#041C1F',
        'reminder-mid-gray':'#4F676B',
        'reminder-low-gray':'#577175',
        'title-profile':'#353535',
        'toggle-title':'#186476',
        'toggle-content': 'rgba(89, 157, 180, 0.38)',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config