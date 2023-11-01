import getData from '@/app/(server)/api/service/admin/getData'

import { GadgetsList } from './(components)/GadgetsList'

const GadgetsPage = async () => {
  const url = '/gadgets/all'
  const gadgetsData = await getData(url)

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
