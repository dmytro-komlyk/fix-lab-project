import getData from '@/app/(server)/api/service/admin/getData'

import EditArticleSection from '../../(components)/EditArticleSection'

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
          <h2 className='font-exo_2 text-white-dis mb-6  text-2xl font-bold max-lg:text-xl '>
            {articleData.title}
          </h2>
          <EditArticleSection articleData={articleData} />
        </div>
      </section>
    </main>
  )
}

export default ArticlePage
