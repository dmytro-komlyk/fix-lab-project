import React from 'react'

import getData from '@/app/(server)/api/service/getData'

import GadgetServicesList from '../(components)/GadgetServicesList'

interface RepairAdminPageProps {
  params: {
    slug: string
  }
}
const RepairAdminPage: React.FC<RepairAdminPageProps> = async ({ params }) => {
  const categorySlug = params.slug
  const subcategoryUrl = `/api/subcategories?populate=*&[filters][category][slug]=${encodeURIComponent(
    categorySlug,
  )}&sort=id:asc`
  const subcategoriesData = await getData(subcategoryUrl)

  return (
    <main className='flex-auto'>
      <GadgetServicesList subcategoriesData={subcategoriesData} />
    </main>
  )
}

export default RepairAdminPage
