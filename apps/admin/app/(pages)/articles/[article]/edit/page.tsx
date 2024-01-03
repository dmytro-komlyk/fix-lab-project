import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import { outputArticleSchema } from '@server/domain/articles/schemas/article.schema'
import { imageSchema } from '@server/domain/images/schemas/image.schema'
import EditArticleSection from '../../(components)/EditArticleSection'

interface IArticleAdminProps {
  params: {
    article: string
  }
}

export const dynamic = 'force-dynamic'

const ArticlePage: React.FC<IArticleAdminProps> = async ({ params }) => {
  const articleData = (await serverClient.articles.getBySlug(
    params.article,
  )) as outputArticleSchema
  const allImagesData = (await serverClient.images.getAll()) as imageSchema[]

  return (
    <main>
      <section className='bg-footer-gradient-linear-blue flex w-full min-h-[100vh] py-[60px]'>
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
          <h2 className='font-exo_2 text-white-dis mb-6  text-2xl font-bold max-lg:text-xl '>
            {articleData?.title}
          </h2>
          {articleData ? (
            <EditArticleSection
              articleData={articleData}
              allImagesData={allImagesData}
            />
          ) : (
            <p>No article</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default ArticlePage
