/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'display': ['Poppins', 'Open Sans', 'sans-serif'],
      'body': ['Poppins', 'Open Sans', 'sans-serif'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'poppins': ['Poppins'],
    },
    extend: {
      screens: {
        'xsm': '320px',
        // => @media (min-width: 350px) {...}
        'sm': '500px',
        // => @media (min-width: 640px) { ... }
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
        'xlg': '1200px',
        // => @media (min-width: 1280px) { ... }
      },

      fontSize: {
        7: '7px',
        8: '8px',
        9: '9px',
        10: '10px',
        11: '11px',
        12: '12px',
        13: '13px',
        14: '14px',
        24: '24px',
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
        'sidebar': '#FBFBFF',
        'sidebarHover': "#F0F0FF",
      },
      textColor: {
        'spanText': '#BBBABA',
        'blackGray': '#555555',
        'blue': '#6956E5',
        'sidebarHover': "#F0F0FF",
        'sidebar': '#FBFBFF',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
    },
  },
  plugins: [],

};