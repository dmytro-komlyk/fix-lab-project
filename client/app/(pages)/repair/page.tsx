/* eslint-disable import/no-extraneous-dependencies */
import { getAllContactsData } from 'client/app/(server)/api/service/modules/contactService'
import { getAllGadgetsData } from 'client/app/(server)/api/service/modules/gadgetService'

import { AddressSection, ColaborationSection } from '@/app/(layouts)'

import GadgetsSection from './(components)/GadgetsSection'

export const dynamic = 'force-dynamic'
export const revalidate = 60

const Repair = async () => {
  const gadgetsData = await getAllGadgetsData()
  const contactsData = await getAllContactsData()
  // const gadgetsData = (await trpc.getGadgetsQuery.query()) as IGadget[]
  // const contactsData = (await trpc.getContactsQuery.query()) as IContact[]
  return (
    <main className='flex-auto'>
      <GadgetsSection gadgetsData={gadgetsData} />
      <ColaborationSection />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}

export default Repair
