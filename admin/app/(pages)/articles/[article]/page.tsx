import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { serverClient } from 'admin/app/(utils)/trpc/serverClient'
import PreviewArticlePage from '../(components)/PreviewArticlePage'

interface IArticleAdminProps {
  params: {
    article: string
  }
}

export const dynamic = 'force-dynamic'

const ArticlePage: React.FC<IArticleAdminProps> = async ({ params }) => {
  const articleData = (await serverClient.articles.getBySlug(
    params.article,
  )) as Article

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
          <PreviewArticlePage articleData={articleData} />
        </div>
      </section>
    </main>
  )
}

export default ArticlePage
