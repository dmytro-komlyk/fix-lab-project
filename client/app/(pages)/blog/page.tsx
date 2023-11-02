import { getAllPosts } from '@/app/(server)/api/service/modules/articlesService'

import MainBlogSection from './(components)/MainBlogSection'

export default async function Blog() {
  const postsData = await getAllPosts()
  return (
    <main className='flex-auto'>
      <MainBlogSection postsData={postsData} />
    </main>
  )
}
