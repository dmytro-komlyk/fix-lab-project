import getData from '@admin/app/(server)/api/service/admin/getData'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import EditContactForm from '../(components)/EditContactForm '

interface IContactAdminProps {
  params: {
    contact: string
  }
}

export const runtime = 'edge'
export const revalidate = 3600

const ContactPage: React.FC<IContactAdminProps> = async ({ params }) => {
  const url = `/contacts/${params.contact}`

  const contactData = await getData(url)
  return (
    <main className=' flex flex-auto'>
      <section className=' bg-footer-gradient-linear-blue w-full  overflow-hidden  py-[60px]'>
        <div className='container  relative flex flex-col px-8'>
          <div className='z-[1] mb-8 flex items-center gap-1'>
            <Link
              className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
              href='/contacts'
            >
              <p> Контакти</p> <MdKeyboardArrowRight size={30} />
            </Link>

            <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
              {contactData.area}
            </p>
          </div>
          <h2 className='font-exo_2 text-white-dis mb-6  text-2xl font-bold max-lg:text-xl '>
            {contactData.area}
          </h2>
          <EditContactForm contactData={contactData} />
        </div>
      </section>
    </main>
  )
}

export default ContactPage
