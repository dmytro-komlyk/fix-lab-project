import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputGadgetSchema } from '@server/domain/gadgets/schemas/gadget.schema'

import { GadgetsList } from './(components)/GadgetsList'

export const dynamic = 'force-dynamic'

const GadgetsPage = async () => {
  const gadgetsData =
    (await serverClient.gadgets.getAll()) as outputGadgetSchema[]
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
