import type { IBrand } from 'client/app/(server)/api/service/modules/brandService'
import type { Metadata } from 'next'

import { AddressSection, ColaborationSection } from '@/app/(layouts)'
import type { IContact } from '@/app/(server)/api/service/modules/contactService'
import type { IGadget } from '@/app/(server)/api/service/modules/gadgetService'
import { trpc } from '@/app/(utils)/trpc'

import BrandsSection from '../../../(components)/BrandsSection'

interface IndexProps {
  params: {
    gadget: string
    brand: string
  }
  searchParams: any
}

export const runtime = 'edge'
export const revalidate = 60
export async function generateMetadata({
  params,
}: IndexProps): Promise<Metadata> {
  const { brand } = params
  const brandData = (await trpc.getBrandBySlugQuery.query({
    slug: brand,
  })) as IBrand

  return {
    title: brandData.metadata.title,
    description: brandData.metadata.description,
    keywords: brandData.metadata.keywords.split(', '),
  }
}
const Index: React.FC<IndexProps> = async ({ params }) => {
  const singleGadgetData = (await trpc.getGadgetBySlugQuery.query({
    slug: params.gadget,
  })) as IGadget
  const contactsData = (await trpc.getContactsQuery.query()) as IContact[]
  const brandData = (await trpc.getBrandBySlugQuery.query({
    slug: params.brand,
  })) as IBrand
  return (
    <main className='h-full flex-auto'>
      <BrandsSection
        contactsData={contactsData}
        gadgetData={singleGadgetData}
        brandData={brandData}
      />
      <ColaborationSection />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}
export default Index

// export async function generateStaticParams({
//   params,
// }: {
//   params: { gadget: string }
// }) {
//   const gadgetData = (await trpc.getGadgetBySlugQuery.query({
//     slug: params.gadget,
//   })) as IGadget
//   return gadgetData.brands.map((item: { slug: string }) => ({
//     gadget: gadgetData.slug,
//     brand: item.slug,
//   }))
// }
