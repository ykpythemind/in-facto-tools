/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: [
          "var(--font-noto-serif)",
          '"Noto Serif JP"',
          '"Hiragino Mincho ProN"',
          '"Hiragino Mincho Pro"',
          '"Yu Mincho"',
          "YuMincho",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};
