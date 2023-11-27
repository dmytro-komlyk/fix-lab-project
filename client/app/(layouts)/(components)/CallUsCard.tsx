import { TbPhone } from 'react-icons/tb'

import type { IContactsProps } from './AddressLocationCard'

const CallUsCard: React.FC<IContactsProps> = ({ contactsData }) => {
  return (
    <div className='bg-white-dis shadow-brand flex w-[302px] flex-col items-center justify-center rounded-[15px] px-[38px] py-8 opacity-80 max-lg:hidden'>
      <p className='font-exo_2 text-dark-blue relative mb-3 text-xl font-semibold'>
        <TbPhone className=' absolute left-[-26px] top-[7px]' size={24} />
        Подзвонити нам
      </p>
      <ul className='flex flex-col items-center gap-[15px]'>
        {contactsData.map(item => (
          <li key={item._id} className='flex flex-col items-center'>
            <p className='text-black-dis font-[400]'>{item.area} р-н</p>
            {item.phones.map(phone => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, '')}`}
                className=' text-dark-blue font-[500] leading-7 tracking-[0.96px]  transition-opacity hover:opacity-70  focus:opacity-70'
              >
                {phone}
              </a>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CallUsCard
