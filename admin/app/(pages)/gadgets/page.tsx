import getData from '@admin/app/(server)/api/service/admin/getData'

import { GadgetsList } from './(components)/GadgetsList'

export const runtime = 'edge'
export const revalidate = 3600

const GadgetsPage = async () => {
  const url = '/gadgets/all'
  const gadgetsData = await getData(url)

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
