import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'

import ContactsSection from './(components)/ContactsSection'

export interface IContact {
  _id: string
  isActive: boolean
  area: string
  address: string
  comment: string
  subways: string[]
  phones: string[]
  workingTime: string
  workingDate: string
  coords: {
    lat: number
    lang: number
  }
}
export default async function Contacts() {
  const contactsData = await getAllContactsData()
  return (
    <main className=' flex-auto'>
      <ContactsSection contactsData={contactsData} />
    </main>
  )
}
