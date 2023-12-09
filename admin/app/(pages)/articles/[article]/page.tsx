'use client'

import getData from '@admin/app/(server)/api/service/admin/getData'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import PreviewArticlePage from '../(components)/PreviewArticlePage'

interface IArticleAdminProps {
  params: {
    article: string
  }
}

const ArticlePage: React.FC<IArticleAdminProps> = ({ params }) => {
  const [articleData, setArticleData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleUrl = `/articles/${params.article}`

        const data = await getData(articleUrl)
        setArticleData(data)
      } catch (error) {
        throw new Error(`Error in getData: ${(error as Error).message}`)
      }
    }

    fetchData()
  }, [params.article])

  // const articleUrl = `/articles/${params.article}`
  // const articleData = await getData(articleUrl)
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
              {articleData?.title}
            </p>
          </div>
          {articleData ? (
            <PreviewArticlePage articleData={articleData} />
          ) : (
            <p>No Article</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default ArticlePage
