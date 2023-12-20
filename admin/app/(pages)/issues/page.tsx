import { serverClient } from 'admin/app/(utils)/trpc/serverClient'
import Link from 'next/link'
import AddIssueInfoSection from './(components)/AddIssueInfoSection'
import AddIssueSection from './(components)/AddIssueSection'
import RemoveIssue from './(components)/RemoveIssue'

export const dynamic = 'force-dynamic'

const IssuesPage = async () => {
  const issuesData = (await serverClient.issues.getAll()) as Issue[]

  return (
    <main className='flex flex-auto'>
      <section className='flex h-full w-full  overflow-hidden overflow-y-auto bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container relative flex flex-col gap-8 px-8'>
          <AddIssueSection />
          <AddIssueInfoSection />
          <ul>
            {issuesData.map((item: { id: string; title: string }) => (
              <li key={item.id}>
                <Link
                  className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl'
                  href={`/issues/${item.id}`}
                >
                  {item.title}
                </Link>
                <RemoveIssue item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default IssuesPage
