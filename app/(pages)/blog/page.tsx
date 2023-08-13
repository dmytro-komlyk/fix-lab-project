import getData from '@/app/(server)/api/service/getData'

import BlogsSection from './(components)/BlogsSection'

export default async function Blog() {
  const blogsUrl = `/api/blogs?populate=*&sort=id:desc&pagination[page]=1&pagination[pageSize]=9`
  const blogsData = await getData(blogsUrl)

  return (
    <main className='flex-auto'>
      <BlogsSection blogsData={blogsData} />
    </main>
  )
}
