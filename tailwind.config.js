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
        primary: {
          50: '#F0F7F9',
          100: '#D9E8ED',
          200: '#B8D4DC',
          300: '#86B0BD',
          400: '#6B9AAB',
          500: '#86B0BD', // Muted Blue/Teal - main accent
          600: '#6B8F9A',
          700: '#5A7A84',
          800: '#4A656E',
          900: '#3D5259',
          DEFAULT: '#86B0BD',
          light: '#A8C8D2',
          dark: '#6B8F9A',
        },
        secondary: {
          50: '#FDF5ED',
          100: '#FAE8D4',
          200: '#F5D0B0',
          300: '#E2A16F', // Orange/Terracotta - secondary accent
          400: '#D8905A',
          500: '#E2A16F',
          600: '#C88A4F',
          700: '#A8703F',
          800: '#8A5A34',
          900: '#6F4829',
          DEFAULT: '#E2A16F',
          light: '#F0B890',
          dark: '#C88A4F',
        },
        cream: {
          50: '#FFFEFB',
          100: '#FFF8F0',
          200: '#FFF0DD', // Cream/Off-white - background
          300: '#FFE8C4',
          400: '#FFE0AB',
          500: '#FFF0DD',
          600: '#FFD89C',
          700: '#FFC973',
          800: '#FFBA4A',
          900: '#FFAB21',
          DEFAULT: '#FFF0DD',
          light: '#FFF8F0',
          dark: '#FFE8C4',
        },
        gray: {
          50: '#F5F5F6',
          100: '#E8E9EA',
          200: '#D1D3D4', // Light Grey - borders
          300: '#B5B7B8',
          400: '#9A9C9D',
          500: '#D1D3D4',
          600: '#7E8081',
          700: '#626465',
          800: '#464849',
          900: '#2A2C2D',
          DEFAULT: '#D1D3D4',
          light: '#E8E9EA',
          dark: '#B5B7B8',
        },
        text: {
          DEFAULT: '#2C3E50', // Dark text
          light: '#5A6C7D',
          muted: '#7F8C9A',
        },
      },
    },
  },
  plugins: [],
}

