/* eslint-disable import/no-extraneous-dependencies */
import { trpc } from 'admin/app/(utils)/trpc'
import type { IIssue } from 'admin/types/trpc'
import Link from 'next/link'

import AddIssueInfoSection from './(components)/AddIssueInfoSection'
import AddIssueSection from './(components)/AddIssueSection'

export const runtime = 'edge'
export const revalidate = 3600

const IssuesPage = async () => {
  // const url = '/issues/all'
  // const issuesData = await getData(url)
  const issuesData = (await trpc.getIssuesQuery.query()) as IIssue[]

  return (
    <main className='flex flex-auto'>
      <section className='bg-footer-gradient-linear-blue flex h-full  w-full overflow-hidden overflow-y-auto py-[60px]'>
        <div className='container relative flex flex-col gap-8 px-8'>
          <AddIssueSection />
          <AddIssueInfoSection />
          <ul>
            {issuesData.map((item: { _id: string; title: string }) => (
              <li key={item._id}>
                <Link
                  className='font-exo_2 text-white-dis mb-6  text-2xl font-bold max-lg:text-xl'
                  href={`/issues/${item._id}`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default IssuesPage
