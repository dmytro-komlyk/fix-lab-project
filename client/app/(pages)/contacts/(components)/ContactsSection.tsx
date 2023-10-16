import Image from 'next/image'
import Link from 'next/link'
import { BiMap } from 'react-icons/bi'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { TbClockHour9 } from 'react-icons/tb'

import type { IContactsProps } from '@/app/(layouts)/(components)/AddressLocationCard'

const ContactsSection: React.FC<IContactsProps> = ({ contactsData }) => {
  return (
    <section className=' overflow-hidden  bg-white-dis  pb-[102px] pt-[163px] max-md:pb-14 max-md:pt-[120px]'>
      <div className='container relative flex flex-col xl:p-0 '>
        <div className='z-[1] mb-[21px] flex items-center '>
          <Link
            className='flex items-center text-base font-[400] text-dark-blue transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/'
          >
            <p> Головна</p> <MdKeyboardArrowRight size={25} />
          </Link>

          <p className='text-base font-[400]  text-dark-blue opacity-70'>
            Контакти
          </p>
        </div>
        <h2 className='mb-[39px] font-exo_2 text-2xl font-bold text-dark-blue max-lg:text-xl max-lg:font-semibold max-md:mb-[47px]  xl:leading-[57px]'>
          Контакти
        </h2>
        <div className='flex items-start justify-between max-lg:flex-wrap max-lg:gap-[61px]'>
          <div className='flex max-w-[342px] flex-col'>
            <div className='mb-[45px] flex items-center gap-2 max-lg:mb-[26px]'>
              <BiMap color='#04268B' size={24} />
              <p className='font-exo_2 text-xl font-semibold tracking-[0.45px] text-dark-blue  max-lg:text-lg '>
                Приїхати до нас
              </p>
            </div>
            {contactsData.map(item => {
              return (
                <div
                  key={item._id}
                  className='mb-14 flex flex-col gap-[20px] max-lg:mb-6'
                >
                  <div>
                    <p className='font-semibold text-black-dis '>
                      {item.address}
                    </p>
                    {item.comment && (
                      <p className='tracking-[0.45px]'>{item.comment}</p>
                    )}
                  </div>
                  <div className='flex items-center gap-4'>
                    {item.subways.length > 1 ? (
                      <ul className=' flex flex-col gap-[8px]'>
                        {item.subways.map(subway => (
                          <li
                            key={subway}
                            className='flex items-center gap-[17px]'
                          >
                            <Image
                              src='/icons/kyiv_metro_logo_2015.svg'
                              width={24}
                              height={18}
                              alt='Kyiv metro logo'
                            />
                            <p className='tracking-[0.45px]'>{subway}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <>
                        <Image
                          src='/icons/kyiv_metro_logo_2015.svg'
                          width={24}
                          height={16}
                          alt='Kyiv metro logo'
                        />
                        <p className='tracking-[0.45px]'>{item.subways[0]}</p>
                      </>
                    )}
                  </div>
                  {item.phones.map(phone => (
                    <a
                      key={phone}
                      className='font-medium leading-none tracking-[1.7px] text-dark-blue transition-opacity  hover:opacity-70 focus:opacity-70'
                      href={`tel:${phone.replace(/\s/g, '')}`}
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              )
            })}
          </div>
          <div className='max-w-[200px]'>
            <div className='mb-[45px] flex  items-center gap-2 max-lg:mb-8 max-md:mb-[30px]'>
              <TbClockHour9 color='#04268B' size={24} />
              <p className='font-exo_2 text-xl  font-semibold text-dark-blue max-lg:text-lg  max-md:tracking-[0.45px]'>
                Режим роботи
              </p>
            </div>
            <div className='flex flex-col gap-[18px]'>
              <p className='tracking-[0.45px]'>
                {contactsData[0]?.workingTime}
              </p>
              <p className='tracking-[0.45px]'>
                {contactsData[0]?.workingDate}
              </p>
            </div>
          </div>
          <iframe
            className='flex h-[400px] w-[628px] rounded-2xl object-cover max-xl:w-[400px] max-lg:w-full max-md:h-[228px] max-md:w-full'
            src={contactsData[0]?.googlePluginLink}
            width='628'
            height='400'
            title='FixLab maps'
          />
        </div>
      </div>
    </section>
  )
}
export default ContactsSection
