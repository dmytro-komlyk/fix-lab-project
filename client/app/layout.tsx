import './globals.css'

import type { Metadata } from 'next'
import { Exo_2, Gugi, Inter, Manrope } from 'next/font/google'

import TawkChat from './(components)/TawkChat'
import { Footer, Header } from './(layouts)'
import type { IContact } from './(server)/api/service/modules/contactService'
import { trpc } from './trpc'

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

export const revalidate = 3600

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const contactsData = (await trpc.getContactsQuery.query()) as IContact[]
  return (
    <html
      lang='uk'
      className={`${inter.variable} ${manrope.variable} ${exo2.variable} ${gugi.variable} h-full`}
    >
      <body className='h-full'>
        {/* <AOSInit /> */}

        <div className='flex min-h-full flex-col'>
          <Header contactsData={contactsData} />
          {children}
          <div className='absolute bottom-8 right-8 z-50'>
            <TawkChat />
          </div>
          <Footer contactsData={contactsData} />
        </div>
      </body>
    </html>
  )
}
