import getData from '@admin/app/(server)/api/service/admin/getData'
import Link from 'next/link'

export const runtime = 'edge'
export const revalidate = 3600

const ContactsPage = async () => {
  const url = '/contacts/all'
  const contactsData = await getData(url)

  return (
    <main className='flex flex-auto'>
      <section className='bg-footer-gradient-linear-blue flex h-[100vh]  w-full py-[60px]'>
        <div className='container relative flex flex-col items-center justify-center px-8'>
          <ul>
            {contactsData.map((item: { _id: string; area: string }) => (
              <li key={item._id}>
                <Link
                  className='font-exo_2 text-white-dis mb-6  text-2xl font-bold max-lg:text-xl'
                  href={`/contacts/${item._id}`}
                >
                  {item.area}
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
