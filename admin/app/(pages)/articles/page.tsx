import { serverClient } from 'admin/app/(utils)/trpc/serverClient'
import EmptySection from '../(components)/EmptySection'
import AddArticleSection from './(components)/AddArticleSection'
import ArticlesList from './(components)/ArticlesList'

export const dynamic = 'force-dynamic'

export default async function ArticlesPage() {
  const articlesData = (await serverClient.articles.getAll()) as Article[]
  const allImagesData = (await serverClient.images.getAll()) as Image[]

  return (
    <main>
      <section className='bg-footer-gradient-linear-blue flex w-full min-h-[100vh] py-[60px]'>
        <div className='container relative flex flex-col gap-8 px-8'>
          <AddArticleSection allImagesData={allImagesData} />
          {articlesData.length ? (
            <ArticlesList articlesData={articlesData} />
          ) : (
            <EmptySection />
          )}
        </div>
      </section>
    </main>
  )
}
