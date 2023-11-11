import fetchDataFromServer from '@/app/(server)/api/service/helpers/fetchDataFromServer'
import { getPosts } from '@/app/(server)/api/service/modules/articlesService'

import MainBlogSection from '../(components)/MainBlogSection'

export default async function Blog({ params }: { params: { page: string } }) {
  const currentPage = typeof params.page === 'string' ? Number(params.page) : 1
  const postsData = await getPosts({ currentPage })
  return (
    <main className='flex-auto'>
      <MainBlogSection postsData={postsData} currentPage={currentPage} />
    </main>
  )
}

export async function generateStaticParams() {
  const url = `/articles`
  const articlesData = await fetchDataFromServer(url)
  const currentPage = Array.from(
    { length: articlesData.totalPages },
    (_, index) => (index + 1).toString(),
  )
  return currentPage.map(item => ({
    page: item,
  }))
}
