import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputArticleSchema as IArticle } from '@server/domain/articles/schemas/article.schema'
import type { imageSchema as IImage } from '@server/domain/images/schemas/image.schema'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { auth } from '@admin/app/(utils)/authOptions'
import EditArticleSection from '../../(components)/EditArticleSection'

interface IArticleAdminProps {
  params: {
    article: string
  }
}

export const dynamic = 'force-dynamic'

const ArticlePage: React.FC<IArticleAdminProps> = async ({ params }) => {
  const session = await auth()
  const user = session?.user ? session.user : null

  const articleData = (await serverClient({ user }).articles.getBySlugArticle({
    slug: params.article,
  })) as IArticle
  const allImagesData = (await serverClient({
    user,
  }).images.getAllImages()) as IImage[]

  return (
    <main>
      <section className='flex min-h-[100vh] w-full bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container  relative flex flex-col items-center px-8 '>
          <div className='z-[1] mb-8 flex items-center gap-1 self-start  px-4'>
            <Link
              className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
              href='/articles'
            >
              <p>Блог</p> <MdKeyboardArrowRight size={30} />
            </Link>

            <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
              {articleData?.title}
            </p>
          </div>
          <h2 className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '>
            {articleData?.title}
          </h2>
          {articleData ? (
            <EditArticleSection articleData={articleData} />
          ) : (
            <p>No article</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default ArticlePage
