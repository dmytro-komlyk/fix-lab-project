import { AddressSection, ColaborationSection } from '@client/app/(layouts)'
import { serverClient } from '@client/app/(utils)/trpc/serverClient'
import type { outputBrandSchema } from '@server/domain/brands/schemas/brand.schema'
import type { outputContactSchema } from '@server/domain/contacts/schemas/contact.schema'
import type { outputGadgetSchema } from '@server/domain/gadgets/schemas/gadget.schema'
import type { Metadata } from 'next'

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
  const singleGadgetData = (await serverClient.gadgets.getBySlugGadget({
    slug: params.gadget,
  })) as outputGadgetSchema
  const contactsData =
    (await serverClient.contacts.getAllPublishedContacts()) as outputContactSchema[]
  const brandData = (await serverClient.brands.getBySlugBrand({
    slug: params.brand,
  })) as outputBrandSchema
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
