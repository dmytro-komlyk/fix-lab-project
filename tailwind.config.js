/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '390px',
      // => @media (min-width: 390px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1100px',
      // => @media (min-width: 1100px) { ... }

      xl: '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      manrope: ['Manrope', 'Inter', 'sans-serif'],
      exo_2: ['Exo_2', 'Inter', 'sans-serif'],
      gugi: ['Gugi', 'Inter', 'sans-serif'],
    },
    fontSize: {
      sm: '0.875rem' /* 14px */,
      base: '1rem' /* 16px */,
      md: '1.21rem' /* 19.36px */,
      lg: '1.25rem' /* 20px */,
      xl: '1.5rem' /* 24px */,
      '2xl': '2rem' /* 32px */,
      '3xl': '2.75rem' /* 44px */,
      '4xl': '5.25rem' /* 84px */,
    },
    colors: {
      'white-dis': '#F8FCFF',
      'dark-blue': '#04268B',
      'light-blue': '#1B37AA',
      'mid-blue': '#3EC9FF',
      'black-dis': '#0B122F',
      'light-green': '#4BE0AA',
      'mid-green': '#00CC73',
      'mid-grey': '#92999C',
      'modal-overlay': 'rgba(0, 0, 0, 0.25)',
    },
    extend: {
      padding: {
        lg: '102px',
      },
    },
    // extend: {
    //   backgroundImage: {
    //     "header-img-sm": "url('/public/images/background-mobile.jpg')",
    //     "header-img-md": "url('/public/images/background-tablet.jpg')",
    //     "header-img-lg": "url('/public/images/background-pc.jpg')",
    //   },
    // },
  },

  plugins: [],
}
