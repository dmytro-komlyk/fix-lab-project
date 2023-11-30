import getData from '@admin/app/(server)/api/service/admin/getData'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import IconsSection from '../(components)/IconsSection'

interface IContactAdminProps {
  params: {
    benefit: string
  }
}

export const runtime = 'edge'
export const revalidate = 3600

const IconsPage: React.FC<IContactAdminProps> = async () => {
  const iconsUrl = `/images/icons/all`
  const iconsData = await getData(iconsUrl)
  return (
    <main className=' flex flex-auto'>
      <section className=' bg-footer-gradient-linear-blue w-full  overflow-hidden  py-[60px]'>
        <div className='container  relative flex flex-col px-8 '>
          <div className='z-[1] mb-8 flex items-center gap-1'>
            <Link
              className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
              href='/media'
            >
              <p>Медіа</p> <MdKeyboardArrowRight size={30} />
            </Link>

            <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
              Іконки
            </p>
          </div>
          <h2 className='font-exo_2 text-white-dis mb-6  text-2xl font-bold max-lg:text-xl '>
            Іконки
          </h2>
          <IconsSection iconsData={iconsData} />
        </div>
      </section>
    </main>
  )
}

export default IconsPage
