import { getPosts } from '@/app/(server)/api/service/modules/articlesService'

import MainBlogSection from '../(components)/MainBlogSection'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export default async function Blog({ params }: { params: { page: string } }) {
  const currentPage = typeof params.page === 'string' ? Number(params.page) : 1
  const postsData = await getPosts({ currentPage })
  return (
    <main className='flex-auto'>
      <MainBlogSection postsData={postsData} currentPage={currentPage} />
    </main>
  )
}
