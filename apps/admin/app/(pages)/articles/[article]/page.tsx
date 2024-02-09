import { auth } from '@admin/app/(utils)/next-auth/auth'
import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputArticleSchema as IArticle } from '@server/domain/articles/schemas/article.schema'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

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
          {/* <PreviewArticlePage articleData={articleData} /> */}
        </div>
      </section>
    </main>
  )
}

export default ArticlePage
