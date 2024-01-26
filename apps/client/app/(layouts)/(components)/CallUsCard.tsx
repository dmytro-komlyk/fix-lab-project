import type { serverClient } from '@client/app/(utils)/trpc/serverClient'
import { TbPhone } from 'react-icons/tb'

const CallUsCard = ({
  contactsDataInit,
}: {
  contactsDataInit: Awaited<
    ReturnType<(typeof serverClient)['contacts']['getAllPublishedContacts']>
  >
}) => {
  return (
    <div className='flex w-[302px] flex-col items-center justify-center rounded-[15px] bg-white-dis px-[38px] py-8 opacity-80 shadow-brand max-lg:hidden'>
      <p className='relative mb-3 font-exo_2 text-xl font-semibold text-dark-blue'>
        <TbPhone className=' absolute left-[-26px] top-[7px]' size={24} />
        Подзвонити нам
      </p>
      <ul className='flex flex-col items-center gap-[15px]'>
        {contactsDataInit.map((item: any) => (
          <li key={item.id} className='flex flex-col items-center'>
            <p className='font-[400] text-black-dis'>{item.area} р-н</p>
            {item.phones.map((phone: string) => (
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
