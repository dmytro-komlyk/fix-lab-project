'use client'

import { AddressSection, ColaborationSection } from '@/app/(layouts)'
import { getAllGadgetsData } from '@/app/(server)/api/service/modules/gadgetService'

import GadgetsSection from './(components)/GadgetsSection'

export default async function Repair() {
  const gadgetsData = await getAllGadgetsData()
  return (
    <main className='flex-auto lg:pt-[56px]'>
      <GadgetsSection gadgetsData={gadgetsData} />
      <ColaborationSection />
      <AddressSection />
    </main>
  )
}
