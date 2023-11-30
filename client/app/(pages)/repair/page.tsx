import type { IContact } from 'client/app/(server)/api/service/modules/contactService'
import type { IGadget } from 'client/app/(server)/api/service/modules/gadgetService'

import { AddressSection, ColaborationSection } from '@/app/(layouts)'
import { trpc } from '@/app/(utils)/trpc'

import GadgetsSection from './(components)/GadgetsSection'

export const runtime = 'edge'
export const revalidate = 3600

const Repair = async () => {
  const gadgetsData = (await trpc.getGadgetsQuery.query()) as IGadget[]
  const contactsData = (await trpc.getContactsQuery.query()) as IContact[]
  return (
    <main className='flex-auto'>
      <GadgetsSection gadgetsData={gadgetsData} />
      <ColaborationSection />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}

export default Repair
