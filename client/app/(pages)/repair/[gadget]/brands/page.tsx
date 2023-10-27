import { AddressSection, ColaborationSection } from '@/app/(layouts)'
import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'
import { getSingleGadgetData } from '@/app/(server)/api/service/modules/gadgetService'

import BrandsSection from '../../(components)/BrandsSection'

interface IndexProps {
  params: {
    gadget: string
  }
  searchParams: any
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  const gadgetData = await getSingleGadgetData(params.gadget)
  const contactsData = await getAllContactsData()
  return (
    <main className='h-full flex-auto'>
      <BrandsSection contactsData={contactsData} gadgetData={gadgetData} />
      <ColaborationSection />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}
export default Index
