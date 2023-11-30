import './globals.css'

import type { Metadata } from 'next'
import { Exo_2, Gugi, Inter, Manrope } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import Dashboard from './(layouts)/Dashboard'
import Providers from './(providers)/Providers'

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
const exo2 = Exo_2({
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

export const runtime = 'edge'
export const revalidate = 3600

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='uk'
      className={`${inter.variable} ${manrope.variable} ${exo2.variable} ${gugi.variable} h-full`}
    >
      <body className='h-[100vh]'>
        <Toaster />
        <Providers>
          <div className='flex'>
            <Dashboard />
            <div className='h-[100vh] w-full pl-[400px]'>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
