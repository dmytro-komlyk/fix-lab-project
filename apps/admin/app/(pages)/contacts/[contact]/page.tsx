import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputContactSchema as IContact } from '@server/domain/contacts/schemas/contact.schema'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { auth } from '@admin/app/(utils)/authOptions'
import EditContactForm from '../(components)/EditContactForm '

interface IContactAdminProps {
  params: {
    contact: string
  }
}

export const dynamic = 'force-dynamic'

const ContactPage: React.FC<IContactAdminProps> = async ({ params }) => {
  const session = await auth()
  const user = session?.user ? session.user : null
  const contactData = (await serverClient({
    user: {
      id: 'string',
      email: 'string',
      name: 'string',
      accessToken: 'string',
      accessTokenExpires: 0,
    },
  }).contacts.getByIdContact({
    id: params.contact,
  })) as IContact

  return (
    <main className='flex flex-auto h-full'>
      <section className=' w-full overflow-hidden  bg-footer-gradient-linear-blue  py-[60px]'>
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
          <h2 className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '>
            {contactData.area}
          </h2>
          <EditContactForm contactData={contactData} />
        </div>
      </section>
    </main>
  )
}

export default ContactPage
