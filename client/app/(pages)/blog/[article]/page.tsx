import { getSinglePost } from '@/app/(server)/api/service/modules/articlesService'
import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'

import SingleArticlePage from '../(components)/SingleArticlePage'

export const runtime = 'edge' // 'nodejs' (default) | 'edge'
interface BlogProps {
  params: {
    article: string
  }
}

const Blog: React.FC<BlogProps> = async ({ params }) => {
  const contactsData = await getAllContactsData()
  const articleData = await getSinglePost(params.article)
  return (
    <main className='flex-auto'>
      <SingleArticlePage
        contactsData={contactsData}
        articleData={articleData}
      />
    </main>
  )
}

export default Blog
