import Link from 'next/link'

import getData from '@/app/(server)/api/service/admin/getData'

import AddIssueInfoSection from './(components)/AddIssueInfoSection'
import AddIssueSection from './(components)/AddIssueSection'

const IssuesPage = async () => {
  const url = '/issues/all'
  const issuesData = await getData(url)

  return (
    <main className='flex flex-auto'>
      <section className='flex h-full w-full  overflow-hidden overflow-y-auto bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container relative flex flex-col gap-8 px-8'>
          <AddIssueSection />
          <AddIssueInfoSection />
          <ul>
            {issuesData.map((item: { _id: string; title: string }) => (
              <li key={item._id}>
                <Link
                  className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl'
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
