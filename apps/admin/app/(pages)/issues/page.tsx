import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputIssueSchema as IIssue } from '@server/domain/issues/schemas/issue.schema'

import { auth } from '@admin/app/(utils)/authOptions'
import type { outputBenefitSchema as IBenefit } from '@server/domain/benefits/schemas/benefit.schema'
import EmptySection from '../(components)/EmptySection'
import AddIssueInfoSection from './(components)/AddIssueInfoSection'
import IssuesList from './(components)/IssuesList'

export const dynamic = 'force-dynamic'

const IssuesPage = async () => {
  const session = await auth()
  const user = session?.user ? session.user : null

  const issuesData = (await serverClient({
    user,
  }).issues.getAllIssues()) as IIssue[]
  const benefitsData = (await serverClient({
    user,
  }).benefits.getAllBenefits()) as IBenefit[]

  return (
    <main>
      <section className='flex min-h-[100vh] w-full bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container relative flex flex-col gap-8 px-8'>
          <AddIssueInfoSection benefitsData={benefitsData} />
          {issuesData.length ? (
            <IssuesList issuesData={issuesData} />
          ) : (
            <EmptySection />
          )}
        </div>
      </section>
    </main>
  )
}

export default IssuesPage
