import React from 'react'
import getData from '@/app/(server)/api/service/getData'
import CategoriesSection from './components/CategoriesSection'

export default async function Repair() {
  const categoriesUrl = `/api/categories?populate=*`
  const categoryData = await getData(categoriesUrl)

  return (
    <>
      <CategoriesSection categoryData={categoryData} />
    </>
  )
}
