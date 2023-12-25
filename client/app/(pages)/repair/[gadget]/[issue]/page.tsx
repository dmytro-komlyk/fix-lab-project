import { serverClient } from '@client/app/(utils)/trpc/serverClient'
import type { outputIssueSchema } from '@server/domain/issues/schemas/issue.schema'
import type { Metadata } from 'next'

import { AddressSection } from '@/app/(layouts)'

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
  const singleIssueData = (await serverClient.issues.getBySlug(
    issue,
  )) as outputIssueSchema

  return {
    title: singleIssueData.metadata.title,
    description: singleIssueData.metadata.description,
    keywords: singleIssueData.metadata.keywords.split(', '),
  }
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  const singleIssueData = (await serverClient.issues.getBySlug(
    params.issue,
  )) as outputIssueSchema
  const contactsData = await serverClient.contacts.getAllPublished()
  const singleGadgetData = await serverClient.gadgets.getBySlug(params.gadget)

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
