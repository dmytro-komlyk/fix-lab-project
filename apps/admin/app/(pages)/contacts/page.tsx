import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import { outputContactSchema } from '@server/domain/contacts/schemas/contact.schema'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const ContactsPage = async () => {
  const contactsData =
    (await serverClient.contacts.getAll()) as outputContactSchema[]

  return (
    <main className='flex flex-auto'>
      <section className='flex h-[100vh] w-full  bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container relative flex flex-col items-center justify-center px-8'>
          <ul className='flex gap-6 justify-center items-center '>
            {contactsData.map(item => (
              <li key={item.id} className=' shadow-2xl p-4 rounded-2xl'>
                <Link href={`/contacts/${item.id}`}>
                  <Image
                    className='h-[140px] w-[220px] object-contain  object-center'
                    src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/public/pictures/${item.image.file.filename}`}
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
