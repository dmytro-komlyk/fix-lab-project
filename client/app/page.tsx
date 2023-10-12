import {
  AddressSection,
  BrokenSection,
  CallCourierSection,
  ColaborationSection,
  HeroSection,
} from './(layouts)'
import { getAllGadgetsData } from './(server)/api/service/modules/gadgetService'

export default async function Home() {
  const gadgetsData = await getAllGadgetsData()
  return (
    <main className='flex-auto'>
      <HeroSection />
      <BrokenSection gadgetsData={gadgetsData} />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection />
    </main>
  )
}
