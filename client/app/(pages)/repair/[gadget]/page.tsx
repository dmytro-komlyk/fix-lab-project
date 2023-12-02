import type { IContact } from 'client/app/(server)/api/service/modules/contactService'
import type { IGadget } from 'client/app/(server)/api/service/modules/gadgetService'
import type { Metadata } from 'next'
import React from 'react'

import {
  AddressSection,
  CallCourierSection,
  ColaborationSection,
} from '@/app/(layouts)'
import { trpc } from '@/app/(utils)/trpc'

import SingleGadgetSection from '../(components)/SingleGadgetSection'

interface IndexProps {
  params: {
    gadget: string
  }
}

export const runtime = 'edge'
export const revalidate = 3600

export async function generateMetadata({
  params,
}: IndexProps): Promise<Metadata> {
  const { gadget } = params

  const singleGadgetData = (await trpc.getGadgetBySlugQuery.query({
    slug: gadget,
  })) as IGadget

  return {
    title: singleGadgetData.metadata.title,
    description: singleGadgetData.metadata.description,
    keywords: singleGadgetData.metadata.keywords.split(', '),
  }
}

const Index: React.FC<IndexProps> = async ({ params }) => {
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
