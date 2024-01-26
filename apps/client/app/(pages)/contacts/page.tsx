import { serverClient } from '@client/app/(utils)/trpc/serverClient'
import type { outputContactSchema } from '@server/domain/contacts/schemas/contact.schema'

import ContactsSection from './(components)/ContactsSection'

export const dynamic = 'force-dynamic'

export default async function Contacts() {
  const contactsData =
    (await serverClient.contacts.getAllPublishedContacts()) as outputContactSchema[]
  return (
    <main className=' flex-auto'>
      <ContactsSection contactsData={contactsData} />
    </main>
  )
}
