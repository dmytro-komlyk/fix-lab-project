/* eslint-disable import/no-extraneous-dependencies */

import getData from 'admin/app/(server)/api/service/admin/getData'

import AddArticleSection from './(components)/AddArticleSection'
import ArticlesList from './(components)/ArticlesList'

// export const runtime = 'edge'

export default async function ArticlesPage({
  params,
}: {
  params: { page: string }
}) {
  const currentPage = typeof params.page === 'string' ? Number(params.page) : 1
  const articlesDataUrl = `/articles/all?sort=desc&page=${currentPage}&limit=9`
  const articlesData = await getData(articlesDataUrl)
  // const articlesData = (await trpc.getArticlesQuery.query({
  //   page: currentPage,
  //   sort: 'desc',
  //   limit: 6,
  // })) as IBlog

  return (
    <section className='flex h-full w-full  overflow-hidden overflow-y-auto bg-footer-gradient-linear-blue py-[60px]'>
      <div className='container relative flex flex-col gap-8 px-8'>
        <AddArticleSection />
        <ArticlesList articlesData={articlesData} />
      </div>
    </section>
  )
}
