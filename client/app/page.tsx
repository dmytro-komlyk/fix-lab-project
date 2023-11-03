import {
  AddressSection,
  BrokenSection,
  CallCourierSection,
  ColaborationSection,
  HeroSection,
} from './(layouts)'
import { trpc } from './trpc'

export default async function Home() {
  // const gadgetsData = await getAllGadgetsData()
  // const contactsData = await getAllContactsData()
  const gadgetsData = await trpc.getGadgetsQuery.query()
  const contactsData = await trpc.getContactsQuery.query()

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
