// import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'

import fetchDataSSR from '@/app/(server)/api/service/helpers/fetchDataSSR'

import ContactsSection from './(components)/ContactsSection'

export default async function Contacts() {
  const contactsData = await fetchDataSSR('/contacts')
  // const contactsData = await getAllContactsData()
  return (
    <main className=' flex-auto'>
      <ContactsSection contactsData={contactsData} />
    </main>
  )
}
