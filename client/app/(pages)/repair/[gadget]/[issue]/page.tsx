/* eslint-disable import/no-extraneous-dependencies */
import type { IIssue } from 'client/app/(server)/api/service/modules/issueService'
import { trpc } from 'client/app/trpc'

import { AddressSection } from '@/app/(layouts)'
import type { IContact } from '@/app/(server)/api/service/modules/contactService'
import type { IGadget } from '@/app/(server)/api/service/modules/gadgetService'

import IssueSection from '../../(components)/IssueSection'

interface IndexProps {
  params: {
    issue: string
    gadget: string
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 60

const Index: React.FC<IndexProps> = async ({ params }) => {
  const singleIssueData = (await trpc.getIssueBySlugQuery.query({
    slug: params.issue,
  })) as IIssue
  const contactsData = (await trpc.getContactsQuery.query()) as IContact[]
  const singleGadgetData = (await trpc.getGadgetBySlugQuery.query({
    slug: params.gadget,
  })) as IGadget

  return (
    <main className='h-full flex-auto'>
      <IssueSection
        contactsData={contactsData}
        singleIssueData={singleIssueData}
        singleGadgetData={singleGadgetData}
      />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}
export default Index

// export async function generateStaticParams({
//   params,
// }: {
//   params: { gadget: string }
// }) {
//   const gadgetData = (await trpc.getGadgetBySlugQuery.query({
//     slug: params.gadget,
//   })) as IGadget
//   return gadgetData.issues.map((item: { slug: string }) => ({
//     gadget: gadgetData.slug,
//     issue: item.slug,
//   }))
// }
