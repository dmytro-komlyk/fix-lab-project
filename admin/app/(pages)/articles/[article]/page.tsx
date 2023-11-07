import getData from '@/app/(server)/api/service/admin/getData'

import PreviewArticlePage from '../(components)/PreviewArticlePage'

interface IArticleAdminProps {
  params: {
    article: string
  }
}

const ArticlePage: React.FC<IArticleAdminProps> = async ({ params }) => {
  const articleUrl = `/articles/${params.article}`
  const articleData = await getData(articleUrl)
  return (
    <main className=' flex flex-auto'>
      <section className=' w-full overflow-hidden  bg-footer-gradient-linear-blue  py-[60px] '>
        <div className='container  relative flex flex-col items-center px-8 '>
          <PreviewArticlePage articleData={articleData} />
        </div>
      </section>
    </main>
  )
}

export default ArticlePage
