import {
  AddressSection,
  CallCourierSection,
  ColaborationSection,
} from '@client/app/(layouts)'
import { serverClient } from '@client/app/(utils)/trpc/serverClient'
import type { outputContactSchema } from '@server/domain/contacts/schemas/contact.schema'
import type { outputGadgetSchema } from '@server/domain/gadgets/schemas/gadget.schema'
import type { Metadata } from 'next'

import SingleGadgetSection from '../(components)/SingleGadgetSection'

interface IndexProps {
  params: {
    gadget: string
  }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: IndexProps): Promise<Metadata> {
  const { gadget } = params

  const singleGadgetData = (await serverClient.gadgets.getBySlugGadget({
    slug: gadget,
  })) as outputGadgetSchema

  return {
    title: singleGadgetData.metadata.title,
    description: singleGadgetData.metadata.description,
    keywords: singleGadgetData.metadata.keywords.split(', '),
  }
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  const singleGadgetDataInit = (await serverClient.gadgets.getBySlugGadget({
    slug: params.gadget,
  })) as outputGadgetSchema
  const contactsDataInit =
    (await serverClient.contacts.getAllPublishedContacts()) as outputContactSchema[]

  return (
    <main className='flex-auto'>
      <SingleGadgetSection
        singleGadgetDataInit={singleGadgetDataInit}
        contactsDataInit={contactsDataInit}
      />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection contactsDataInit={contactsDataInit} />
    </main>
  )
}

export default Index
