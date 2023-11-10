import fetchDataFromServer from '@/app/(server)/api/service/helpers/fetchDataFromServer'
import { getSinglePost } from '@/app/(server)/api/service/modules/articlesService'
import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'

import SingleArticlePage from '../(components)/SingleArticlePage'

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

export async function generateStaticParams() {
  const url = `/articles`
  const articlesData = await fetchDataFromServer(url)

  return articlesData.items.map((item: { slug: string }) => ({
    article: item.slug,
  }))
}
