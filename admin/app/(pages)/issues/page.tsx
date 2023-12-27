/* eslint-disable import/no-extraneous-dependencies */
import { serverClient } from 'admin/app/(utils)/trpc/serverClient'

import EmptySection from '../(components)/EmptySection'
import AddIssueInfoSection from './(components)/AddIssueInfoSection'
import IssuesList from './(components)/IssuesList'

export const dynamic = 'force-dynamic'

const IssuesPage = async () => {
  const issuesData = (await serverClient.issues.getAll()) as Issue[]
  const allImagesData = (await serverClient.images.getAll()) as Image[]

  return (
    <main className='flex flex-auto'>
      <section className='bg-footer-gradient-linear-blue flex h-full  w-full overflow-hidden overflow-y-auto py-[60px]'>
        <div className='container relative flex flex-col gap-8 px-8'>
          {/* <AddIssueSection /> */}
          <AddIssueInfoSection allImagesData={allImagesData} />
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
