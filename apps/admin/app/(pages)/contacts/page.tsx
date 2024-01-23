import { SERVER_URL } from '@admin/app/(lib)/constants'
import { auth } from '@admin/app/(utils)/authOptions'
import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputContactSchema as IContact } from '@server/domain/contacts/schemas/contact.schema'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const ContactsPage = async () => {
  const session = await auth()
  const user = session?.user ? session.user : null
  const contactsData = (await serverClient({
    user: {
      id: 'string',
      email: 'string',
      name: 'string',
      accessToken: 'string',
      accessTokenExpires: 0,
    },
  }).contacts.getAllContacts()) as IContact[]

  return (
    <main className='flex flex-auto'>
      <section className='flex h-[100vh] w-full bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container relative flex flex-col items-center justify-center px-8'>
          <ul className='flex items-center justify-center gap-6 '>
            {contactsData.map(item => (
              <li key={item.id} className=' rounded-2xl p-4 shadow-2xl'>
                <Link href={`/contacts/${item.id}`}>
                  <Image
                    className='h-[140px] w-[220px] object-contain  object-center'
                    src={`${SERVER_URL}/${item.image.file.path}`}
                    width={300}
                    height={200}
                    alt={item.image.alt}
                  />
                  <p className=' font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl'>
                    {item.area}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default ContactsPage
