import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'

import ContactsSection from './(components)/ContactsSection'

export default async function Contacts() {
  const contactsData = await getAllContactsData()
  return (
    <main className=' flex-auto'>
      <ContactsSection contactsData={contactsData} />
    </main>
  )
}
