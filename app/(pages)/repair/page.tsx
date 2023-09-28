import React from 'react'

import { AddressSection, ColaborationSection } from '@/app/(layouts)'
import getData from '@/app/(server)/api/service/getData'

import CategoriesSection from './(components)/CategoriesSection'

export default async function Repair() {
  const categoriesUrl = `/api/categories?populate=*&sort=id:asc`
  const categoryData = await getData(categoriesUrl)

  return (
    <main className='flex-auto lg:pt-[56px]'>
      <CategoriesSection categoryData={categoryData} />
      <ColaborationSection />
      <AddressSection />
    </main>
  )
}
