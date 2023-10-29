import Link from 'next/link'

import getData from '@/app/(server)/api/service/admin/getData'

const ContactsPage = async () => {
  const url = '/contacts/all'
  const contactsData = await getData(url)

  return (
    <main className='flex flex-auto'>
      <section className='flex h-[100vh] w-full  bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container relative flex flex-col items-center justify-center px-8'>
          <ul>
            {contactsData.map((item: { _id: string; area: string }) => (
              <li key={item._id}>
                <Link
                  className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl'
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
