import {
  AddressSection,
  BrokenSection,
  CallCourierSection,
  ColaborationSection,
  HeroSection,
} from './(layouts)'
import type { IContact } from './(server)/api/service/modules/contactService'
import type { IGadget } from './(server)/api/service/modules/gadgetService'
import { trpc } from './trpc'

export default async function Home() {
  const gadgetsData = (await trpc.getGadgetsQuery.query()) as IGadget[]
  const contactsData = (await trpc.getContactsQuery.query()) as IContact[]

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
