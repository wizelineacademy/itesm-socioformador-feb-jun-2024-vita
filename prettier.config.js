/** @type {import("prettier").Config} */
const config = {
    singleQuote: true, // decide if you want to use single quotes
    semi: false, // decide if you want to add semicolon at the end
    plugins: ['prettier-plugin-tailwindcss'], // help us to change order automatically for Tailwind
    jsxSingleQuote: true, // decide if you want to add single quotes for JSX
  }
  
  export default config