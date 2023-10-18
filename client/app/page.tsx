import {
  AddressSection,
  BrokenSection,
  CallCourierSection,
  ColaborationSection,
  HeroSection,
} from './(layouts)'
import { getAllContactsData } from './(server)/api/service/modules/contactService'
import { getAllGadgetsData } from './(server)/api/service/modules/gadgetService'

export default async function Home() {
  const gadgetsData = await getAllGadgetsData()
  const contactsData = await getAllContactsData()
  return (
    <main className='flex-auto'>
      <HeroSection />
      <BrokenSection gadgetsData={gadgetsData} />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}
