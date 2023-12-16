/* eslint-disable import/no-extraneous-dependencies */
import { trpc } from 'admin/app/(utils)/trpc'
import type { IBlog } from 'admin/types/trpc'

import AddArticleSection from './(components)/AddArticleSection'
import ArticlesList from './(components)/ArticlesList'

export const runtime = 'edge'
export const revalidate = 3600
// export const dynamic = 'force-dynamic'

export default async function ArticlesPage({
  params,
}: {
  params: { page: string }
}) {
  const currentPage = typeof params.page === 'string' ? Number(params.page) : 1
  // const articlesData = await serverClient.getArticlesData()
  const articlesData = (await trpc.getArticlesQuery.query({
    page: currentPage,
    sort: 'desc',
    limit: 6,
  })) as IBlog

  return (
    <section className='bg-footer-gradient-linear-blue flex h-full  w-full overflow-hidden overflow-y-auto py-[60px]'>
      <div className='container relative flex flex-col gap-8 px-8'>
        <AddArticleSection />
        <ArticlesList articlesData={articlesData} />
      </div>
    </section>
  )
}
