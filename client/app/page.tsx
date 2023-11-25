import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'

import {
  AddressSection,
  BrokenSection,
  CallCourierSection,
  ColaborationSection,
  HeroSection,
} from './(layouts)'
import { getAllGadgetsData } from './(server)/api/service/modules/gadgetService'

// export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 60

export default async function Home() {
  // const gadgetsData = (await trpc.getGadgetsQuery.query()) as IGadget[]
  // const contactsData = (await trpc.getContactsQuery.query()) as IContact[]
  const gadgetsData = await getAllGadgetsData()
  const contactsData = await getAllContactsData()

  return (
    <main className='relative flex-auto'>
      <HeroSection />
      <BrokenSection gadgetsData={gadgetsData} />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}
