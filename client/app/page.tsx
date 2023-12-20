import { AOSInit } from './(components)/AOSInit'
import {
  AddressSection,
  BrokenSection,
  CallCourierSection,
  ColaborationSection,
  HeroSection,
} from './(layouts)'
import { serverClient } from './(utils)/trpc/serverClient'
// import type { IContact } from './(server)/api/service/modules/contactService'
// import type { IGadget } from './(server)/api/service/modules/gadgetService'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const gadgetsDataInit = await serverClient.gadgets.getAllPublished()
  const contactsDataInit = await serverClient.contacts.getAllPublished()

  return (
    <main className='relative flex-auto'>
      <AOSInit />
      <HeroSection />
      <BrokenSection gadgetsDataInit={gadgetsDataInit} />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection contactsDataInit={contactsDataInit} />
    </main>
  )
}
