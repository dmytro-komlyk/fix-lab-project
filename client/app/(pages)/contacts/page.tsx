import { serverClient } from 'client/app/(utils)/trpc/serverClient'
import { outputContactSchema } from 'server/src/domain/contacts/schemas/contact.schema'
import ContactsSection from './(components)/ContactsSection'

export const dynamic = 'force-dynamic'

export default async function Contacts() {
  const contactsData =
    (await serverClient.contacts.getAllPublished()) as outputContactSchema[]
  return (
    <main className=' flex-auto'>
      <ContactsSection contactsData={contactsData} />
    </main>
  )
}
