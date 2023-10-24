import type { IContactsProps } from './(components)/AddressLocationCard'
import { AddressLocationCard } from './(components)/AddressLocationCard'

export const AddressSection: React.FC<IContactsProps> = async ({
  contactsData,
}) => {
  return (
    <section className='py-[102px] max-md:py-[56px]'>
      <div className='container lg:p-0'>
        <h2 className='mb-5 font-exo_2 text-xl font-semibold text-dark-blue md:text-2xl md:font-bold lg:mb-[22px]'>
          Як нас знайти
        </h2>
        <ul className='flex w-full gap-8 max-lg:flex-col lg:gap-6'>
          <AddressLocationCard contactsData={contactsData} />
        </ul>
      </div>
    </section>
  )
}
