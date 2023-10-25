import { AddressSection, ColaborationSection } from '@/app/(layouts)'
// import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'
// import { getSingleGadgetData } from '@/app/(server)/api/service/modules/gadgetService'
import fetchDataSSR from '@/app/(server)/api/service/helpers/fetchDataSSR'

import BrandsSection from '../../(components)/BrandsSection'

interface IndexProps {
  params: {
    gadget: string
  }
  searchParams: any
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  const gadgetData = await fetchDataSSR(
    `/gadgets/find-by-slug/${params.gadget}`,
  )
  const contactsData = await fetchDataSSR('/contacts')
  // const gadgetData = await getSingleGadgetData(params.gadget)
  // const contactsData = await getAllContactsData()
  return (
    <main className='h-full flex-auto'>
      <BrandsSection contactsData={contactsData} gadgetData={gadgetData} />
      <ColaborationSection />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}
export default Index
