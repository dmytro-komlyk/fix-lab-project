import React from 'react'

import {
  AddressSection,
  CallCourierSection,
  ColaborationSection,
} from '@/app/(layouts)'
import { getSingleGadgetData } from '@/app/(server)/api/service/modules/gadgetService'

import SingleGadgetSection from '../(components)/SingleGadgetSection'

interface IndexProps {
  params: {
    gadget: string
  }
}
const Index: React.FC<IndexProps> = async ({ params }) => {
  const singleGadgetData = await getSingleGadgetData(params.gadget)
  return (
    <main className='flex-auto'>
      <SingleGadgetSection singleGadgetData={singleGadgetData} />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection />
    </main>
  )
}

export default Index
