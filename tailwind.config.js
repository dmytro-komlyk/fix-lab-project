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
    backgroundSize: {
      banner: '150%',
      desktop: '52%',
    },
    backgroundPosition: {
      banner: 'center',
      desktop: 'center',
    },
    fontSize: {
      xs: '0.75rem' /* 12px */,
      sm: '0.875rem' /* 14px */,
      base: '1rem' /* 16px */,
      md: '1.125rem' /* 18px */,
      lg: '1.25rem' /* 20px */,
      xl: '1.5rem' /* 24px */,
      '2xl': '2rem' /* 32px */,
      '3xl': '2.75rem' /* 44px */,
      '4xl': '5.25rem' /* 84px */,
      title: '3.5rem' /* 56px */,
      '9xl': '6.75rem' /* 108px */,
    },
    colors: {
      'white-dis': '#F8FCFF',
      'dark-blue': '#04268B',
      'light-blue': '#1B37AA',
      'mid-blue': '#3EC9FF',
      'black-dis': '#0B122F',
      'light-green': '#4BE0AA',
      'mid-green': '#00CC73',
      'light-grey': '#F8FCFFC2',
      'mid-grey': '#92999C',
      'modal-overlay': 'rgba(0, 0, 0, 0.25)',
      'pros-bg': 'rgba(248, 252, 255, 0.76)',
    },
    extend: {
      padding: {
        lg: '102px',
      },
      dropShadow: {
        pros: '0px 4px 24px 0px rgba(0, 0, 0, 0.10)',
        banner: '0px 0px 2px #FFFFFF',
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
        'card-gradient-blue':
          'linear-gradient(123deg, #121C37 0%, #04248B 55.98%, #264CC7 100%)',
        'gradient-linear-center-blue':
          'linear-gradient(115deg, #04248b 0%, #121c37 48%, #264cc7 100%)',
        'gradient-linear-blue':
          'linear-gradient(109deg, #121C37 0%, #0D225E 8%, #04248B 16%, #264CC7 100%)',
        'footer-gradient-linear-blue':
          'linear-gradient(134deg, #121C37 0%, #04248B 55.98%, #264CC7 100%)',
        'bg-courier-img-lg': "url('/images/courier-background-pc.png')",
        'banner-img': "url('/images/microscope-main.svg')",
        'banner-conic-blue-sm':
          'conic-gradient(from 147deg at 36.21% 54.22%, #09338F 25.037785470485687deg, #093490 37.525796592235565deg, #185CA5 166.41446113586426deg, #04248B 193.932466506958deg, #05268B 245.53698778152466deg, #062B8B 359.2690873146057deg)',
        'banner-conic-blue-md':
          'conic-gradient(from 147deg at 36.21% 54.22%, #09338F 25.037785470485687deg, #093490 37.525796592235565deg, #185CA5 166.41446113586426deg, #04248B 193.932466506958deg, #05268B 245.53698778152466deg, #062B8B 359.2690873146057deg)',
        'banner-conic-blue-lg':
          'conic-gradient(from 147deg at 36.21% 54.22%, #09338F 25.037785470485687deg, #093490 37.525796592235565deg, #185CA5 166.41446113586426deg, #04248B 193.932466506958deg, #05268B 245.53698778152466deg, #062B8B 359.2690873146057deg)',
        'banner-conic-blue-xl':
          'conic-gradient(from 147deg at 46.21% 56.22%, #09338F 25.037785470485687deg, #093490 37.525796592235565deg, #185CA5 166.41446113586426deg, #04248B 193.932466506958deg, #05268B 245.53698778152466deg, #062B8B 359.2690873146057deg)',
      },
      animation: {
        hoverBtnIn: 'slide-out-top 0.2s ease-in-out both',
        hoverBtnOut: 'slide-out-bottom 0.2s ease-in-out both',
        hoverCard: 'all 0.3s ease-in-out',
      },
    },
  },

  plugins: [],
}
