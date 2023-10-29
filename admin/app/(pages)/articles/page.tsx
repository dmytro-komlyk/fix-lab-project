import ArticlesList from './(components)/ArticlesList'

const ArticlesPage = async () => {
  return (
    <section className='flex h-full w-full  overflow-hidden overflow-y-auto bg-footer-gradient-linear-blue py-[60px]'>
      <div className='container relative flex flex-col px-8'>
        <ArticlesList />
      </div>
    </section>
  )
}

export default ArticlesPage
