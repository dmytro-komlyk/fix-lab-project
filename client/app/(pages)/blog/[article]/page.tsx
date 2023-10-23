import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'

import SingleArticlePage from '../(components)/SingleArticlePage'

export default async function Blog() {
  const contactsData = await getAllContactsData()
  return (
    <main className='flex-auto relative'>
      <SingleArticlePage contactsData={contactsData} />
    </main>
  )
}
