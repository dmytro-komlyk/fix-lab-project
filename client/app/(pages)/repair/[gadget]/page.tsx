import type { Metadata } from 'next'

import {
  AddressSection,
  CallCourierSection,
  ColaborationSection,
} from '@/app/(layouts)'

import { serverClient } from 'client/app/(utils)/trpc/serverClient'
import { outputGadgetSchema } from 'server/src/domain/gadgets/schemas/gadget.schema'
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

  const singleGadgetData = await serverClient.gadgets.getBySlug(gadget)

  return {
    title: singleGadgetData.metadata.title,
    description: singleGadgetData.metadata.description,
    keywords: singleGadgetData.metadata.keywords.split(', '),
  }
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  const singleGadgetDataInit = (await serverClient.gadgets.getBySlug(
    params.gadget,
  )) as outputGadgetSchema
  const contactsDataInit = await serverClient.contacts.getAllPublished()

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
