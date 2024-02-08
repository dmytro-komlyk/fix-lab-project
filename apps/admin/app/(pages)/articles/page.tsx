import { auth } from '@admin/app/(utils)/next-auth/auth'
import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputArticleSchema as IArticle } from '@server/domain/articles/schemas/article.schema'
import type { imageSchema as IImage } from '@server/domain/images/schemas/image.schema'

import EmptySection from '../(components)/EmptySection'
import AddArticleSection from './(components)/AddArticleSection'
import ArticlesList from './(components)/ArticlesList'

export const dynamic = 'force-dynamic'

export default async function ArticlesPage() {
  const session = await auth()
  const user = session?.user ? session.user : null

  const articlesData = (await serverClient({
    user,
  }).articles.getAllArticles()) as IArticle[]
  const allImagesData = (await serverClient({
    user,
  }).images.getAllBlogPictures()) as IImage[]

  return (
    <main>
      <section className='flex min-h-[100vh] w-full bg-footer-gradient-linear-blue py-[60px]'>
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
