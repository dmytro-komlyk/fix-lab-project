import getData from '@admin/app/(server)/api/service/admin/getData'
import Link from 'next/link'

export const runtime = 'edge'
export const revalidate = 3600

const IssuesPage = async () => {
  const url = '/issues/all'
  const issuesData = await getData(url)

  return (
    <main className='flex flex-auto'>
      <section className='bg-footer-gradient-linear-blue flex h-[100vh] w-full items-center  overflow-hidden py-[60px]'>
        <div className='container relative flex flex-col px-8 '>
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
