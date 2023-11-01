import getData from '@/app/(server)/api/service/admin/getData'

import ArticlesList from './(components)/ArticlesList'

const ArticlesPage = async () => {
  const articlesDataUrl = `/articles/all?page=1&limit=4&sort=desc`
  const articlesData = await getData(articlesDataUrl)
  return (
    <section className='flex h-full w-full  overflow-hidden overflow-y-auto bg-footer-gradient-linear-blue py-[60px]'>
      <div className='container relative flex flex-col px-8'>
        <ArticlesList articlesData={articlesData} />
      </div>
    </section>
  )
}

export default ArticlesPage
