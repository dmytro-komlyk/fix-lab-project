import getData from '@/app/(server)/api/service/admin/getData'

import PreviewArticlePage from '../(components)/PreviewArticlePage'

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
      <section className=' bg-footer-gradient-linear-blue w-full  overflow-hidden  py-[60px] '>
        <div className='container  relative flex flex-col items-center px-8 '>
          <PreviewArticlePage articleData={articleData} />
        </div>
      </section>
    </main>
  )
}

export default ArticlePage
