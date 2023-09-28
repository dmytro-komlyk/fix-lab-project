import getData from '@/app/(server)/api/service/getData'

import SingleBlogSection from '../(components)/SingleBlogSection'

interface SingleBlogProps {
  params: {
    id: string
  }
}
const SingleBlogPage: React.FC<SingleBlogProps> = async ({ params }) => {
  const blogUrl = `/api/blogs/${params.id}?populate=*`
  const blogData = await getData(blogUrl)
  return (
    <main className='flex-auto'>
      <SingleBlogSection blogData={blogData} />
    </main>
  )
}

export default SingleBlogPage
