import { outputContactSchema } from '@server/domain/contacts/schemas/contact.schema'
import { outputGadgetSchema } from '@server/domain/gadgets/schemas/gadget.schema'
import { AOSInit } from './(components)/AOSInit'
import {
  AddressSection,
  BrokenSection,
  CallCourierSection,
  ColaborationSection,
  HeroSection,
} from './(layouts)'
import { serverClient } from './(utils)/trpc/serverClient'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const gadgetsDataInit =
    (await serverClient.gadgets.getAllPublishedGadgets()) as outputGadgetSchema[]
  const contactsDataInit =
    (await serverClient.contacts.getAllPublishedContacts()) as outputContactSchema[]

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
