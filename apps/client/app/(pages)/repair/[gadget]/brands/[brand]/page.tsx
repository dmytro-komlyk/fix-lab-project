import { AddressSection, ColaborationSection } from '@client/app/(layouts)'
import { serverClient } from '@client/app/(utils)/trpc/serverClient'
import type { outputBrandSchema } from '@server/domain/brands/schemas/brand.schema'
import type { outputContactSchema } from '@server/domain/contacts/schemas/contact.schema'
import type { outputGadgetSchema } from '@server/domain/gadgets/schemas/gadget.schema'
import type { Metadata } from 'next'

import BrandsSection from '../../../(components)/BrandsSection'

interface IndexProps {
  params: {
    gadget: string
    brand: string
  }
  searchParams: any
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: IndexProps): Promise<Metadata> {
  const { brand } = params
  const brandData = (await serverClient.brands.getBySlug(
    brand,
  )) as outputBrandSchema

  return {
    title: brandData.metadata.title,
    description: brandData.metadata.description,
    keywords: brandData.metadata.keywords.split(', '),
  }
}
const Index: React.FC<IndexProps> = async ({ params }) => {
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
        contactsDataInit={contactsData}
        gadgetDataInit={singleGadgetData}
        brandDataInit={brandData}
      />
      <ColaborationSection />
      <AddressSection contactsDataInit={contactsData} />
    </main>
  )
}
export default Index
