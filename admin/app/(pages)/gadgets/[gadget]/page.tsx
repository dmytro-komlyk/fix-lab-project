import getData from '@/app/(server)/api/service/admin/getData'

import EditGadgetForm from '../(components)/EditGadgetForm '

interface IContactAdminProps {
  params: {
    gadget: string
  }
}

export const runtime = 'edge'
export const revalidate = 3600

const GadgetPage: React.FC<IContactAdminProps> = async ({ params }) => {
  const gadgetUrl = `/gadgets/${params.gadget}`
  const issuesUrl = `/issues/all`
  const brandsUrl = `/brands/all`

  const issuesData = await getData(issuesUrl)
  const gadgetData = await getData(gadgetUrl)
  const brandsData = await getData(brandsUrl)
  return (
    <main className=' flex flex-auto'>
      <section className=' bg-footer-gradient-linear-blue w-full  overflow-hidden  py-[60px]'>
        <div className='relative flex flex-col px-8'>
          <h2 className='font-exo_2 text-white-dis mb-6  text-2xl font-bold max-lg:text-xl '>
            {gadgetData.title}
          </h2>
          <EditGadgetForm
            gadgetData={gadgetData}
            issuesData={issuesData}
            brandsData={brandsData}
          />
        </div>
      </section>
    </main>
  )
}

export default GadgetPage
