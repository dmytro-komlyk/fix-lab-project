import React from 'react'

import getData from '@/app/(server)/api/service/getData'

import SubcategorySection from '../../components/SubcategorySection'

interface IndexProps {
  params: {
    subcategory: string
  }
}
/* @ts-expect-error Async Server Component */
const Index: React.FC<IndexProps> = async ({ params }) => {
  const subcategorySlug = params.subcategory
  const categoriesUrl = `/api/subcategories?populate=*&[filters][slug]=${encodeURIComponent(
    subcategorySlug,
  )}`
  const subcategoryData = await getData(categoriesUrl)

  return <SubcategorySection subcategoryData={subcategoryData} />
}
export default Index
