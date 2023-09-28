import React from 'react'

import {
  AddressSection,
  CallCourierSection,
  ColaborationSection,
} from '@/app/(layouts)'
import getData from '@/app/(server)/api/service/getData'

import CategorySection from '../(components)/CategorySection'

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
  )}&sort=id:asc`
  const subcategoriesData = await getData(subcategoryUrl)

  return (
    <main className='flex-auto'>
      <CategorySection
        subcategoriesData={subcategoriesData}
        categoryData={categoryData}
      />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection />
    </main>
  )
}

export default Index
