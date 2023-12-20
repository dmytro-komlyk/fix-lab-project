/* eslint-disable import/no-extraneous-dependencies */

import { serverClient } from 'admin/app/(utils)/trpc/serverClient'
import { GadgetsList } from './(components)/GadgetsList'

// export const runtime = 'edge'
// export const revalidate = 3600
export const dynamic = 'force-dynamic'

const GadgetsPage = async () => {
  // const url = '/gadgets/all'
  // const gadgetsData = await getData(url)
  const gadgetsData = (await serverClient.gadgets.getAll()) as Gadget[]
  return (
    <main className='flex flex-auto'>
      <section className=' bg-footer-gradient-linear-blue flex w-full justify-center py-[60px]'>
        <div className='relative flex flex-col items-center justify-center'>
          <GadgetsList gadgetsData={gadgetsData} />
        </div>
      </section>
    </main>
  )
}

export default GadgetsPage
