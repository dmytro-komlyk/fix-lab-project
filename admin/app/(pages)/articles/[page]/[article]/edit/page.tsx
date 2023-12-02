import getData from '@admin/app/(server)/api/service/admin/getData'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import EditArticleSection from '../../../(components)/EditArticleSection'

interface IArticleAdminProps {
  params: {
    article: string
  }
}

export const runtime = 'edge'
export const revalidate = 3600

const ArticlePage: React.FC<IArticleAdminProps> = async ({ params }) => {
  const articleUrl = `/articles/${params.article}`
  const articleData = await getData(articleUrl)
  return (
    <main className=' flex flex-auto'>
      <section className=' w-full overflow-hidden  bg-footer-gradient-linear-blue  py-[60px] '>
        <div className='container  relative flex flex-col items-center px-8 '>
          <div className='z-[1] mb-8 flex items-center gap-1 self-start  px-4'>
            <Link
              className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
              href='/articles'
            >
              <p>Блог</p> <MdKeyboardArrowRight size={30} />
            </Link>

            <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
              {articleData.title}
            </p>
          </div>
          <h2 className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '>
            {articleData.title}
          </h2>
          <EditArticleSection articleData={articleData} />
        </div>
      </section>
    </main>
  )
}

export default ArticlePage
