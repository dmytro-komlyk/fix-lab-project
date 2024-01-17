import type { serverClient } from '@client/app/(utils)/trpc/serverClient'
import type { outputContactSchema } from '@server/domain/contacts/schemas/contact.schema'
import Image from 'next/image'
import Link from 'next/link'
import { BiMap } from 'react-icons/bi'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { TbClockHour9 } from 'react-icons/tb'

const ContactsSection = ({
  contactsData,
}: {
  contactsData: Awaited<
    ReturnType<(typeof serverClient)['contacts']['getAllPublishedContacts']>
  >
}) => {
  return (
    <section className=' bg-white-dis  overflow-hidden  pb-[102px] pt-[163px] max-md:pb-14 max-md:pt-[120px]'>
      <div className='container relative flex flex-col xl:p-0 '>
        <div className='z-[1] mb-[21px] flex items-center '>
          <Link
            className='text-dark-blue flex items-center text-base font-[400] transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/'
          >
            <p> Головна</p> <MdKeyboardArrowRight size={25} />
          </Link>

          <p className='text-dark-blue text-base  font-[400] opacity-70'>
            Контакти
          </p>
        </div>
        <h2 className='font-exo_2 text-dark-blue mb-[39px] text-2xl font-bold max-lg:text-xl max-lg:font-semibold max-md:mb-[47px]  xl:leading-[57px]'>
          Контакти
        </h2>
        <div className='flex items-start justify-between max-lg:flex-wrap max-lg:gap-[61px]'>
          <div className='flex max-w-[342px] flex-col'>
            <div className='mb-[45px] flex items-center gap-2 max-lg:mb-[26px]'>
              <BiMap color='#04268B' size={24} />
              <p className='font-exo_2 text-dark-blue text-xl font-semibold tracking-[0.45px]  max-lg:text-lg '>
                Приїхати до нас
              </p>
            </div>
            <div className='flex flex-col gap-14 max-lg:gap-6'>
              {contactsData.map((item: outputContactSchema) => {
                return (
                  <div key={item.id} className='flex flex-col gap-[20px] '>
                    <div className=''>
                      <p className='text-black-dis font-semibold '>
                        {item.address}
                      </p>
                      {item.comment && (
                        <p className='tracking-[0.45px]'>{item.comment}</p>
                      )}
                    </div>
                    <div className='flex items-center gap-4'>
                      {item.subways.length > 1 ? (
                        <ul className=' flex flex-col gap-[8px]'>
                          {item.subways.map((subway: string) => (
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
                    {item.phones.map((phone: string) => (
                      <a
                        key={phone}
                        className='text-dark-blue font-medium leading-none tracking-[1.7px] transition-opacity  hover:opacity-70 focus:opacity-70'
                        href={`tel:${phone.replace(/\s/g, '')}`}
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
          <div className='max-w-[200px]'>
            <div className='mb-[45px] flex  items-center gap-2 max-lg:mb-8 max-md:mb-[30px]'>
              <TbClockHour9 color='#04268B' size={24} />
              <p className='font-exo_2 text-dark-blue  text-xl font-semibold max-lg:text-lg  max-md:tracking-[0.45px]'>
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
