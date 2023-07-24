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

    fontSize: {
      sm: '0.875rem' /* 14px */,
      base: '1rem' /* 16px */,
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
      fontFamily: {
        inter: ['var(--font-inter)'],
        manrope: ['var(--font-manrope)'],
        exo_2: ['var(--font-exo-2)'],
        gugi: ['var(--font-gugi)'],
      },
      backgroundImage: {
        'gradient-radial-blue':
          'radial-gradient(240.65% 83.67% at 48.21% 48.61%, #37122B 0%, #04248B 55.98%, #264CC7 100%)',
        'gradient-linear-green':
          'linear-gradient(99deg, #20B9F4 0%, #00CC73 100%)',
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
