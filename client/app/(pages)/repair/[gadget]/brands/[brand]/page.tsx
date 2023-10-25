import { AddressSection, ColaborationSection } from '@/app/(layouts)'
import {
  // getAllBrandsData,
  getSingleBrandData,
} from '@/app/(server)/api/service/modules/brandService'
import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'
import { getSingleGadgetData } from '@/app/(server)/api/service/modules/gadgetService'

import BrandsSection from '../../../(components)/BrandsSection'

export const revalidate = 60

interface IndexProps {
  params: {
    gadget: string
    brand: string
  }
  searchParams: any
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  const gadgetData = await getSingleGadgetData(params.gadget)
  const contactsData = await getAllContactsData()
  const brandData = await getSingleBrandData(params.brand)
  return (
    <main className='h-full flex-auto'>
      <BrandsSection
        contactsData={contactsData}
        gadgetData={gadgetData}
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
//   const brands = await getAllBrandsData()
//   const gadget = await getSingleGadgetData(params.gadget)

//   return brands.map(item => ({
//     gadget: gadget.slug,
//     brand: item.slug,
//   }))
// }
