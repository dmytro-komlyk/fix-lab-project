import { auth } from '@admin/app/(utils)/next-auth/auth'
import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputContactSchema as IContact } from '@server/domain/contacts/schemas/contact.schema'
import { ContactsList } from './(components)/ContactsList'

export const dynamic = 'force-dynamic'

const ContactsPage = async () => {
  const session = await auth()
  const user = session?.user ? session.user : null
  const contactsData = (await serverClient({
    user,
  }).contacts.getAllContacts()) as IContact[]

  return (
    <main className='flex h-full flex-auto'>
      <section className='flex w-full justify-center bg-footer-gradient-linear-blue py-[60px]'>
        <div className='relative flex flex-col items-center justify-center'>
          <ContactsList contactsData={contactsData} />
        </div>
      </section>
    </main>
  )
}

export default ContactsPage
