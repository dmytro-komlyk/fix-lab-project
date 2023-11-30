import getData from '@admin/app/(server)/api/service/admin/getData'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import EditBrandForm from '../(components)/EditBrandForm '

interface IContactAdminProps {
  params: {
    brand: string
  }
}

export const runtime = 'edge'
export const revalidate = 3600

const BrandPage: React.FC<IContactAdminProps> = async ({ params }) => {
  const brandUrl = `/brands/${params.brand}`
  const brandData = await getData(brandUrl)
  return (
    <main className=' flex flex-auto'>
      <section className=' bg-footer-gradient-linear-blue w-full  overflow-hidden  py-[60px]'>
        <div className='container  relative flex flex-col px-8 '>
          <div className='z-[1] mb-8 flex items-center gap-1'>
            <Link
              className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
              href='/brands'
            >
              <p>Бренди</p> <MdKeyboardArrowRight size={30} />
            </Link>
            <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
              {brandData.title}
            </p>
          </div>
          <h2 className='font-exo_2 text-white-dis mb-6  text-2xl font-bold max-lg:text-xl '>
            {brandData.title}
          </h2>
          <EditBrandForm brandData={brandData} />
        </div>
      </section>
    </main>
  )
}

export default BrandPage
