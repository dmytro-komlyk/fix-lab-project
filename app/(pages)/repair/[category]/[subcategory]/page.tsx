import React from 'react'

import { AddressSection } from '@/app/(layouts)'
import getData from '@/app/(server)/api/service/getData'

import SubcategorySection from '../../(components)/SubcategorySection'

interface IndexProps {
  params: {
    category: string
    subcategory: string
  }
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  const subcategorySlug = params.subcategory
  const categorySlug = params.category

  const subcategoryUrl = `/api/subcategories?populate=*&[filters][slug]=${encodeURIComponent(
    subcategorySlug,
  )}`
  const categoriesUrl = `/api/categories?populate=*&[filters][slug]=${encodeURIComponent(
    categorySlug,
  )}`
  const subcategoriesUrl = `/api/subcategories?populate=*&[filters][category][slug]=${encodeURIComponent(
    categorySlug,
  )}&sort=id:asc`

  const categoryData = await getData(categoriesUrl)
  const subcategoriesData = await getData(subcategoriesUrl)
  const subcategoryDiagnosticData = await getData(subcategoryUrl)

  return (
    <main className='h-full flex-auto'>
      <SubcategorySection
        categoryData={categoryData}
        subcategoriesData={subcategoriesData}
        subcategoryDiagnosticData={subcategoryDiagnosticData}
      />
      <AddressSection />
    </main>
  )
}
export default Index
