import {
  getAllPosts,
  getSinglePost,
} from '@/app/(server)/api/service/modules/articlesService'
import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'

import SingleArticlePage from '../../(components)/SingleArticlePage'

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

export async function generateStaticParams({
  params,
}: {
  params: { page: string }
}) {
  const currentPage = typeof params.page === 'string' ? Number(params.page) : 1
  const articlesData = await getAllPosts({ currentPage })

  return articlesData.items.map((item: { slug: string }) => ({
    article: item.slug,
  }))
}
