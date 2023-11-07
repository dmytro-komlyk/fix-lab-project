import getData from '@/app/(server)/api/service/admin/getData'

import AddArticleSection from './(components)/AddArticleSection'
import ArticlesList from './(components)/ArticlesList'

const ArticlesPage = async () => {
  const articlesDataUrl = `/articles/all?page=1&limit=4&sort=desc`
  const articlesData = await getData(articlesDataUrl)
  return (

    <section className='flex h-full w-full  overflow-hidden overflow-y-auto bg-footer-gradient-linear-blue py-[60px]'>
      <div className='container relative flex flex-col gap-8 px-8'>
        <AddArticleSection />
        <ArticlesList articlesData={articlesData} />
      </div>
    </section>
  )
}

export default ArticlesPage
