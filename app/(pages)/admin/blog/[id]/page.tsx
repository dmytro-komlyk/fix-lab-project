import getData from '@/app/(server)/api/service/getData'

import EditArticle from '../(components)/EditArticle'

interface EditArticleProps {
  params: {
    id: string
  }
}
const EditArticlePage: React.FC<EditArticleProps> = async ({ params }) => {
  const blogUrl = `/api/blogs/${params.id}?populate=*`
  const blogData = await getData(blogUrl)
  return (
    <main className='flex-auto'>
      <EditArticle blogData={blogData} />
    </main>
  )
}

export default EditArticlePage
