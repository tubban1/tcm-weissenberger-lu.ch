/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 瑞士本地化审美：自然疗愈风格
        primary: {
          50: '#f0f7f0',
          100: '#d9ead9',
          200: '#b3d5b3',
          300: '#8dc08d',
          400: '#67ab67',
          500: '#4a7c2a', // 松木绿主色
          600: '#3d6b23',
          700: '#2d5016',
          800: '#1e350f',
          900: '#0f1a08',
        },
        accent: {
          50: '#faf8f5',
          100: '#f5f1e8',
          200: '#ebe3d1',
          300: '#e8e0d1',
          400: '#d4c9b8',
          500: '#c0b39f',
        },
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Lato', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

