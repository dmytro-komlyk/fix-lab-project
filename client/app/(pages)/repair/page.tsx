import type { IContact } from 'client/app/(server)/api/service/modules/contactService'
import type { IGadget } from 'client/app/(server)/api/service/modules/gadgetService'
import type { Metadata } from 'next'

import { AddressSection, ColaborationSection } from '@/app/(layouts)'
import { trpc } from '@/app/(utils)/trpc'

import GadgetsSection from './(components)/GadgetsSection'

export const runtime = 'edge'
export const revalidate = 60
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
  const gadgetsData = (await trpc.getGadgetsQuery.query()) as IGadget[]
  const contactsData = (await trpc.getContactsQuery.query()) as IContact[]
  return (
    <main className='flex-auto'>
      <GadgetsSection gadgetsData={gadgetsData} />
      <ColaborationSection />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}

export default Repair
