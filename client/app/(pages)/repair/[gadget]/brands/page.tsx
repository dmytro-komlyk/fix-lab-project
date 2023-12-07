import type { IGadget } from 'client/app/(server)/api/service/modules/gadgetService'
import type { Metadata } from 'next'

import { AddressSection, ColaborationSection } from '@/app/(layouts)'
import type { IContact } from '@/app/(server)/api/service/modules/contactService'
import { trpc } from '@/app/(utils)/trpc'

import BrandsSection from '../../(components)/BrandsSection'

interface IndexProps {
  params: {
    gadget: string
  }
  searchParams: any
}

export const runtime = 'edge'
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Ремонт брендової техніки в сервісному центрі FixLab',
  description:
    'FixLab - ваш надійний сервісний центр для ремонту брендової техніки. Ми надаємо професійні послуги з відновлення гаджетів, швидкий експрес-ремонт та технічну підтримку. Довірте свою техніку експертам FixLab!',
  keywords: [
    'Ремонт техніки в FixLab',
    'Сервісний центр FixLab',
    'Ремонт електроніки у FixLab',
    'Технічний сервіс гаджетів',
    'Відновлення брендової техніки',
    'Ремонт брендів: Apple, Samsung, Huawei, Lenovo, Sony, Xiaomi, Poco, телефонів, ноутбуків, планшетів',
    'FixLab: професійний ремонт',
    'Технічна підтримка для брендової техніки',
    'Експрес-ремонт у FixLab',
    'Спеціалізований сервіс з ремонту телефонів, ноутбуків, планшетів',
  ],
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  const singleGadgetData = (await trpc.getGadgetBySlugQuery.query({
    slug: params.gadget,
  })) as IGadget
  const contactsData = (await trpc.getContactsQuery.query()) as IContact[]
  return (
    <main className='h-full flex-auto'>
      <BrandsSection
        contactsData={contactsData}
        gadgetData={singleGadgetData}
      />
      <ColaborationSection />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}
export default Index
