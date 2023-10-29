import getData from '@/app/(server)/api/service/admin/getData'

import EditArticleSection from '../(components)/EditArticleSection'

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
