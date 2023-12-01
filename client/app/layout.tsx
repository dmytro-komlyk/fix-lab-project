import './globals.css'

import type { Metadata } from 'next'
import { Exo_2, Gugi, Inter, Manrope } from 'next/font/google'

import TawkChat from './(components)/TawkChat'
import { Footer, Header } from './(layouts)'
import type { IContact } from './(server)/api/service/modules/contactService'
import { trpc } from './(utils)/trpc'

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
  keywords: [
    'Ремонт техніки в FixLab',
    'Сервісний центр FixLab',
    'Експертний ремонт гаджетів',
    'Швидкий ремонт техніки',
    'Професійна допомога FixLab',
    'Технічний сервіс FixLab',
    'Ремонт смартфонів у FixLab',
    'Надійний ремонт гаджетів',
    'Спеціалізований сервіс FixLab',
    'Технічна підтримка FixLab',
    'Ремонт планшетів та ноутбуків в FixLab',
    'Відновлення електроніки FixLab',
    'Ефективний ремонт техніки',
    'FixLab: майстри ремонту',
    'Інноваційні рішення в ремонті техніки',
    'Технічні експерти FixLab',
    'Ремонт електроніки з гарантією',
    'FixLab: найкращий сервіс ремонту',
    'Швидкісний відновлення техніки',
    'Професійна допомога від FixLab',
    'Ремонт та обслуговування техніки',
    'FixLab: досвідчений сервісний центр',
    'Якісний ремонт за доступною ціною',
    'FixLab: технічний сервіс на висоті',
    'Ремонт електронних пристроїв у FixLab',
  ],
}

export const runtime = 'edge'
export const revalidate = 60

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
