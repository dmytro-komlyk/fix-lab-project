import type { IContactsProps } from './(components)/AddressLocationCard'
import { AddressLocationCard } from './(components)/AddressLocationCard'

export const AddressSection: React.FC<IContactsProps> = async ({
  contactsData,
}) => {
  return (
    <section className='section'>
      <div className='container lg:p-0'>
        <h2 className='lg:mg-7 mb-5 font-exo_2 text-xl font-semibold text-dark-blue md:text-2xl md:font-bold lg:mb-8'>
          Як нас знайти
        </h2>
        <ul className='w-full lg:flex lg:gap-6'>
          <AddressLocationCard contactsData={contactsData} />
        </ul>
      </div>
    </section>
  )
}
