/* eslint-disable import/no-extraneous-dependencies */
import { trpc } from 'admin/app/(utils)/trpc'
import type { IGadget } from 'admin/types/trpc'

import { GadgetsList } from './(components)/GadgetsList'

export const runtime = 'edge'
export const revalidate = 3600

const GadgetsPage = async () => {
  // const url = '/gadgets/all'
  // const gadgetsData = await getData(url)
  const gadgetsData = (await trpc.getGadgetsQuery.query()) as IGadget[]
  return (
    <main className='flex flex-auto'>
      <section className=' flex w-full justify-center bg-footer-gradient-linear-blue py-[60px]'>
        <div className='relative flex flex-col items-center justify-center'>
          <GadgetsList gadgetsData={gadgetsData} />
        </div>
      </section>
    </main>
  )
}

export default GadgetsPage
