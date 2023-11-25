import { getPosts } from '@/app/(server)/api/service/modules/articlesService'

import MainBlogSection from './(components)/MainBlogSection'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export default async function Blog() {
  const postsData = await getPosts({ currentPage: 1 })
  return (
    <main className='flex-auto'>
      <MainBlogSection postsData={postsData} currentPage={1} />
    </main>
  )
}
