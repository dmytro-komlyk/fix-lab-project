'use client'

import getData from '@admin/app/(server)/api/service/admin/getData'
import React, { useEffect, useState } from 'react'

import AddArticleSection from './(components)/AddArticleSection'
import ArticlesList from './(components)/ArticlesList'

interface ArticlesPageProps {
  params: { page: string }
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ params }) => {
  const [articlesData, setArticlesData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentPage =
          typeof params.page === 'string' ? Number(params.page) : 1
        const articlesDataUrl = `/articles/all?sort=desc&page=${currentPage}&limit=9`
        const data = await getData(articlesDataUrl)
        setArticlesData(data)
      } catch (error) {
        throw new Error(`Error in getData: ${(error as Error).message}`)
      }
    }

    fetchData()
  }, [params.page])

  return (
    <section className='flex h-full w-full overflow-hidden overflow-y-auto bg-footer-gradient-linear-blue py-[60px]'>
      <div className='container relative flex flex-col gap-8 px-8'>
        <AddArticleSection />
        {articlesData ? (
          <ArticlesList articlesData={articlesData} />
        ) : (
          <p>No Article</p>
        )}
      </div>
    </section>
  )
}

export default ArticlesPage
// import getData from '@admin/app/(server)/api/service/admin/getData'

// import AddArticleSection from './(components)/AddArticleSection'
// import ArticlesList from './(components)/ArticlesList'

// export default async function ArticlesPage({
//   params,
// }: {
//   params: { page: string }
// }) {
//   const currentPage = typeof params.page === 'string' ? Number(params.page) : 1
//   const articlesDataUrl = `/articles/all?sort=desc&page=${currentPage}&limit=9`
//   const articlesData = await getData(articlesDataUrl)
//   // const articlesData = (await trpc.getArticlesQuery.query({
//   //   page: currentPage,
//   //   sort: 'desc',
//   //   limit: 6,
//   // })) as IBlog

//   return (
//     <section className='bg-footer-gradient-linear-blue flex h-full  w-full overflow-hidden overflow-y-auto py-[60px]'>
//       <div className='container relative flex flex-col gap-8 px-8'>
//         <AddArticleSection />
//         <ArticlesList articlesData={articlesData} />
//       </div>
//     </section>
//   )
// }
