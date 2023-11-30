import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import getData from '@/app/(server)/api/service/admin/getData'

import EditGadgetForm from '../(components)/EditGadgetForm '

interface IContactAdminProps {
  params: {
    gadget: string
  }
}

const GadgetPage: React.FC<IContactAdminProps> = async ({ params }) => {
  const gadgetUrl = `/gadgets/${params.gadget}`
  const issuesUrl = `/issues/all`
  const brandsUrl = `/brands/all`

  const issuesData = await getData(issuesUrl)
  const gadgetData = await getData(gadgetUrl)
  const brandsData = await getData(brandsUrl)
  return (
    <main className=' flex flex-auto'>
      <section className=' w-full overflow-hidden  bg-footer-gradient-linear-blue  py-[60px]'>
        <div className='relative flex flex-col px-8'>
          <div className=' flex items-center gap-1 self-start'>
            <Link
              className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
              href='/gadgets'
            >
              <p>Гаджети</p> <MdKeyboardArrowRight size={30} />
            </Link>

            <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
              {gadgetData.title}
            </p>
          </div>
          <h2 className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '>
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
