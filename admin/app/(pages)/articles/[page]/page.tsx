import getData from '@admin/app/(server)/api/service/admin/getData'

import AddArticleSection from '../(components)/AddArticleSection'
import ArticlesList from '../(components)/ArticlesList'

export default async function ArticlesPage({
  params,
}: {
  params: { page: string }
}) {
  const currentPage = typeof params.page === 'string' ? Number(params.page) : 1
  const articlesDataUrl = `/articles/all?sort=desc&page=${currentPage}&limit=9`
  const articlesData = await getData(articlesDataUrl)
  return (
    <section className='bg-footer-gradient-linear-blue flex h-[100vh] w-full overflow-hidden overflow-y-auto py-[60px]'>
      <div className='container relative flex flex-col gap-8 px-8'>
        <AddArticleSection />
        <ArticlesList articlesData={articlesData} currentPage={currentPage} />
      </div>
    </section>
  )
}
