import { AddressSection, ColaborationSection } from '@/app/(layouts)'
// import {
//   getSingleBrandData,
// } from '@/app/(server)/api/service/modules/brandService'
// import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'
// import { getSingleGadgetData } from '@/app/(server)/api/service/modules/gadgetService'
import fetchDataSSR from '@/app/(server)/api/service/helpers/fetchDataSSR'

import BrandsSection from '../../../(components)/BrandsSection'

interface IndexProps {
  params: {
    gadget: string
    brand: string
  }
  searchParams: any
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  const gadgetData = await fetchDataSSR(
    `/gadgets/find-by-slug/${params.gadget}`,
  )
  const contactsData = await fetchDataSSR('/contacts')
  const brandData = await fetchDataSSR(`/brands/find-by-slug/${params.brand}`)

  // const gadgetData = await getSingleGadgetData(params.gadget)
  // const contactsData = await getAllContactsData()
  // const brandData = await getSingleBrandData(params.brand)
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

// !!!!!!!!!!!!!!!!!!!!!!!!! Протрібно для SSG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// export async function generateStaticParams({
//   params,
// }: {
//   params: { gadget: string }
// }) {
//   // const gadget = await getSingleGadgetData(params.gadget)
//   const gadget = await fetchDataSSR(`/gadgets/find-by-slug/${params.gadget}`)
//   return gadget.brands.map((item: { slug: string }) => ({
//     gadget: gadget.slug,
//     brand: item.slug,
//   }))
// }
