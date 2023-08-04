import React from 'react'
import getData from '@/app/(server)/api/service/getData'
import CategorySection from '../components/CategorySection'

interface IndexProps {
  params: {
    category: string
  }
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  const categorySlug = params.category
  const categoriesUrl = `/api/categories?populate=*&[filters][slug]=${encodeURIComponent(
    categorySlug,
  )}`
  const categoryData = await getData(categoriesUrl)
  const subcategoryUrl = `/api/subcategories?populate=*&[filters][category][slug]=${encodeURIComponent(
    categorySlug,
  )}`
  const subcategoriesData = await getData(subcategoryUrl)

  return (
    <>
      <CategorySection
        subcategoriesData={subcategoriesData}
        categoryData={categoryData}
      />
    </>
  )
}

export default Index
