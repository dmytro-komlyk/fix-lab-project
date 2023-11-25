/* eslint-disable import/no-extraneous-dependencies */
import { trpc } from 'client/app/trpc'

import { AddressSection, ColaborationSection } from '@/app/(layouts)'
import type { IContact } from '@/app/(server)/api/service/modules/contactService'
import type { IGadget } from '@/app/(server)/api/service/modules/gadgetService'

import BrandsSection from '../../(components)/BrandsSection'

interface IndexProps {
  params: {
    gadget: string
  }
  searchParams: any
}

export const dynamic = 'force-dynamic'
export const revalidate = 60

const Index: React.FC<IndexProps> = async ({ params }) => {
  const singleGadgetData = (await trpc.getGadgetBySlugQuery.query({
    slug: params.gadget,
  })) as IGadget
  const contactsData = (await trpc.getContactsQuery.query()) as IContact[]
  return (
    <main className='h-full flex-auto'>
      <BrandsSection
        contactsData={contactsData}
        gadgetData={singleGadgetData}
      />
      <ColaborationSection />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}
export default Index
