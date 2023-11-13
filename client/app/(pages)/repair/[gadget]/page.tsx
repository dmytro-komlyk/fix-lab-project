import type { IContact } from 'client/app/(server)/api/service/modules/contactService'
import type { IGadget } from 'client/app/(server)/api/service/modules/gadgetService'
import React from 'react'

import {
  AddressSection,
  CallCourierSection,
  ColaborationSection,
} from '@/app/(layouts)'
import { trpc } from '@/app/trpc'

import SingleGadgetSection from '../(components)/SingleGadgetSection'

interface IndexProps {
  params: {
    gadget: string
  }
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  // const singleGadgetData = await getSingleGadgetData(params.gadget)
  // const contactsData = await getAllContactsData()

  const singleGadgetData = (await trpc.getGadgetBySlugQuery.query({
    slug: params.gadget,
  })) as IGadget
  const contactsData = (await trpc.getContactsQuery.query()) as IContact[]
  return (
    <main className='flex-auto'>
      <SingleGadgetSection
        singleGadgetData={singleGadgetData}
        contactsData={contactsData}
      />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}

export default Index
