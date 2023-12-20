import type { Metadata } from 'next'

import { AddressSection, ColaborationSection } from '@/app/(layouts)'

import { serverClient } from 'client/app/(utils)/trpc/serverClient'
import { outputBrandSchema } from 'server/src/domain/brands/schemas/brand.schema'
import { outputContactSchema } from 'server/src/domain/contacts/schemas/contact.schema'
import { outputGadgetSchema } from 'server/src/domain/gadgets/schemas/gadget.schema'
import BrandsSection from '../../(components)/BrandsSection'

interface IndexProps {
  params: {
    gadget: string
    brand: string
  }
}

export const dynamic = 'force-dynamic'

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

const Index = async ({ params }: IndexProps) => {
  const singleGadgetData = (await serverClient.gadgets.getBySlug(
    params.gadget,
  )) as outputGadgetSchema
  const contactsData =
    (await serverClient.contacts.getAllPublished()) as outputContactSchema[]
  const brandData = (await serverClient.brands.getBySlug(
    params.brand,
  )) as outputBrandSchema
  return (
    <main className='h-full flex-auto'>
      <BrandsSection
        brandDataInit={brandData}
        contactsDataInit={contactsData}
        gadgetDataInit={singleGadgetData}
      />
      <ColaborationSection />
      <AddressSection contactsDataInit={contactsData} />
    </main>
  )
}
export default Index
