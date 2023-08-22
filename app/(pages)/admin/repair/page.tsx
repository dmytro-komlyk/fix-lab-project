import React from 'react'

import getData from '@/app/(server)/api/service/getData'

import CategoryServicesList from './(components)/CategoryServicesList'

const AdminPage = async () => {
  const categoriesUrl = `/api/categories?populate=*`
  const categoryData = await getData(categoriesUrl)
  return (
    <main className='flex-auto'>
      <CategoryServicesList categoryData={categoryData} />
    </main>
  )
}

export default AdminPage
