import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputGadgetSchema as IGadget } from '@server/domain/gadgets/schemas/gadget.schema'

import { auth } from '@admin/app/(utils)/authOptions'
import { GadgetsList } from './(components)/GadgetsList'

export const dynamic = 'force-dynamic'

const GadgetsPage = async () => {
  const session = await auth()
  const user = session?.user ? session.user : null

  const gadgetsData = (await serverClient({
    user,
  }).gadgets.getAllGadgets()) as IGadget[]

  return (
    <main className='flex flex-auto h-full'>
      <section className=' flex w-full justify-center bg-footer-gradient-linear-blue py-[60px]'>
        <div className='relative flex flex-col items-center justify-center'>
          <GadgetsList gadgetsData={gadgetsData} />
        </div>
      </section>
    </main>
  )
}

export default GadgetsPage
