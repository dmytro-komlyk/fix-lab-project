import { getAllPosts } from '@/app/(server)/api/service/modules/articlesService' // 'nodejs' (default) | 'edge'

import MainBlogSection from './(components)/MainBlogSection'

export const runtime = 'edge'

export default async function Blog({
  searchParams: { page },
}: {
  searchParams: {
    page: string
  }
}) {
  const currentPage = parseInt(page, 10) || 1
  const postsData = await getAllPosts({ currentPage })
  return (
    <main className='flex-auto'>
      <MainBlogSection postsData={postsData} />
    </main>
  )
}
