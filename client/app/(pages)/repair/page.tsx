import type { Metadata } from 'next'

import { AddressSection, ColaborationSection } from '@/app/(layouts)'
import { serverClient } from 'client/app/(utils)/trpc/serverClient'

import GadgetsSection from './(components)/GadgetsSection'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title:
    "Ремонт різних гаджетів: ноутбуки, телефони, планшети, комп'ютери, колонки, навушники, смарт-годинники, читалки, електронні книги, павербанки, джойстики в сервісному центрі FixLab",
  description:
    "FixLab - ваш надійний сервісний центр для ремонту різних гаджетів. Ми надаємо професійні послуги з відновлення електроніки, швидкий експрес-ремонт та технічну підтримку для ноутбуків, телефонів, планшетів, комп'ютерів, колонок, навушників, смарт-годинників, читалок, електронних книг, павербанків, джойстиків та інших гаджетів. Довірте свої гаджети експертам FixLab!",
  keywords: [
    'Ремонт гаджетів в FixLab',
    'Сервісний центр FixLab',
    'Професійний ремонт гаджетів',
    'Технічний сервіс для гаджетів',
    'Відновлення електроніки у FixLab',
    "Ремонт гаджетів: ноутбуків, телефонів, планшетів, комп'ютерів, колонок, навушників, смарт-годинників, читалок, електронних книг, павербанків, джойстиків",
    'FixLab: експрес-ремонт гаджетів',
    'Технічна підтримка для різних гаджетів',
    'Спеціалізований сервіс з ремонту різних гаджетів',
    'Ремонт та обслуговування різних гаджетів в FixLab',
  ],
}

const Repair = async () => {
  const gadgetsDataInit = await serverClient.gadgets.getAllPublished()
  const contactsDataInit = await serverClient.contacts.getAllPublished()

  return (
    <main className='flex-auto'>
      <GadgetsSection gadgetsDataInit={gadgetsDataInit} />
      <ColaborationSection />
      <AddressSection contactsDataInit={contactsDataInit} />
    </main>
  )
}

export default Repair
