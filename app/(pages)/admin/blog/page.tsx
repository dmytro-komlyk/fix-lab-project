import React from 'react'

import getData from '@/app/(server)/api/service/getData'

import BlogAdminPanel from './(components)/BlogAdminPanel'

const BlogAdminPage = async () => {
  const blogsUrl = `/api/blogs?populate=*&sort=id:desc&pagination[page]=1&pagination[pageSize]=9`
  const blogData = await getData(blogsUrl)
  return (
    <main className='flex-auto'>
      <BlogAdminPanel blogData={blogData} />
    </main>
  )
}

export default BlogAdminPage
