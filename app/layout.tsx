import './globals.css'
import type { Metadata } from 'next'
import { Inter, Manrope, Exo_2, Gugi } from 'next/font/google'
import { Header, Footer } from './(layouts)'

const inter = Inter({
  weight: ['300', '400', '700', '500', '600'],
  subsets: ['cyrillic'],
  display: 'swap',
  variable: '--font-inter',
})
const manrope = Manrope({
  weight: ['300', '400', '700', '500', '600'],
  subsets: ['cyrillic'],
  display: 'swap',
  variable: '--font-manrope',
})
const exo_2 = Exo_2({
  weight: ['300', '400', '700', '500', '600'],
  subsets: ['cyrillic'],
  display: 'swap',
  variable: '--font-exo-2',
})
const gugi = Gugi({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gugi',
})

export const metadata: Metadata = {
  title: 'FixLab - ремонт твоєї техніки',
  description: 'FixLab - мережа студій ремонту твоєї техніки',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='uk'
      className={`${inter.variable} ${manrope.variable} ${exo_2.variable} ${gugi.variable}`}
    >
      <body className='font-inter'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
