import { TbPhone } from 'react-icons/tb'

import type { IContactsProps } from './AddressLocationCard'

const CallUsCard: React.FC<IContactsProps> = ({ contactsData }) => {
  return (
    <div className='flex w-[302px] flex-col items-center justify-center rounded-[15px] bg-white-dis px-[38px] py-8 opacity-80 shadow-lg max-lg:hidden'>
      <p className='relative mb-3 font-exo_2 text-xl font-semibold text-dark-blue'>
        <TbPhone className=' absolute left-[-26px] top-[7px]' size={24} />
        Подзвонити нам
      </p>
      <ul className='flex flex-col items-center gap-[15px]'>
        {contactsData.map(item => (
          <li key={item._id} className='flex flex-col items-center'>
            <p className='font-[400] text-black-dis'>{item.area}р-н</p>
            {item.phones.map(phone => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, '')}`}
                className=' font-[500] leading-7 tracking-[0.96px] text-dark-blue  transition-opacity hover:opacity-70  focus:opacity-70'
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
