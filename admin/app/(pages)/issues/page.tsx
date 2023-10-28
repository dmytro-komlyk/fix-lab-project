import Link from 'next/link'

import getData from '@/app/(server)/api/service/admin/getData'

const IssuesPage = async () => {
  const url = '/issues/all'
  const issuesData = await getData(url)

  return (
    <main className='flex flex-auto'>
      <section className='flex h-[100vh] w-full items-center overflow-hidden  bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container relative flex flex-col px-8 '>
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
