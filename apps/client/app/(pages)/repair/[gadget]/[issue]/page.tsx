import { AddressSection } from '@client/app/(layouts)'
import { serverClient } from '@client/app/(utils)/trpc/serverClient'
import type { outputContactSchema } from '@server/domain/contacts/schemas/contact.schema'
import type { outputGadgetSchema } from '@server/domain/gadgets/schemas/gadget.schema'
import type { outputIssueSchema } from '@server/domain/issues/schemas/issue.schema'
import type { Metadata } from 'next'

import IssueSection from '../../(components)/IssueSection'

interface IndexProps {
  params: {
    issue: string
    gadget: string
  }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: IndexProps): Promise<Metadata> {
  const { issue } = params
  const singleIssueData = (await serverClient.issues.getBySlugIssue({
    slug: issue,
  })) as outputIssueSchema

  return {
    title: singleIssueData.metadata.title,
    description: singleIssueData.metadata.description,
    keywords: singleIssueData.metadata.keywords.split(', '),
  }
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  const singleIssueData = (await serverClient.issues.getBySlugIssue({
    slug: params.issue,
  })) as outputIssueSchema
  const contactsData =
    (await serverClient.contacts.getAllPublishedContacts()) as outputContactSchema[]
  const singleGadgetData = (await serverClient.gadgets.getBySlugGadget({
    slug: params.gadget,
  })) as outputGadgetSchema

  return (
    <main className='h-full flex-auto'>
      <IssueSection
        contactsDataInit={contactsData}
        singleIssueDataInit={singleIssueData}
        singleGadgetDataInit={singleGadgetData}
      />
      <AddressSection contactsDataInit={contactsData} />
    </main>
  )
}
export default Index
