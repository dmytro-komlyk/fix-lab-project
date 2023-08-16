import Image from 'next/image'
import Link from 'next/link'
import { BiMap } from 'react-icons/bi'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { TbClockHour9 } from 'react-icons/tb'

const ContactsSection = () => {
  return (
    <section className=' overflow-hidden  bg-white-dis  pb-[102px] pt-[163px] max-md:pb-14 max-md:pt-[138px]'>
      <div className='container relative flex flex-col xl:p-0 '>
        <div className='z-[1] mb-8 flex items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-dark-blue transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/'
          >
            <p> Головна</p> <MdKeyboardArrowRight size={30} />
          </Link>

          <p className='text-base font-[400] text-dark-blue opacity-70'>
            Контакти
          </p>
        </div>
        <h2 className='mb-14 font-exo_2 text-2xl  font-bold text-dark-blue max-lg:text-xl  max-lg:font-semibold'>
          Контакти
        </h2>
        <div className='flex items-start justify-between max-lg:flex-wrap max-lg:gap-14'>
          <div className='flex max-w-[342px] flex-col gap-14 max-lg:gap-0'>
            <div className='flex items-center gap-2 max-lg:mb-8'>
              <BiMap color='#04268B' size={24} />
              <p className='font-exo_2 text-xl font-semibold text-dark-blue  max-lg:text-lg '>
                Приїхати до нас
              </p>
            </div>
            <div className='flex flex-col gap-[18px] max-lg:mb-6'>
              <div>
                <p className='font-semibold text-black-dis'>
                  Вул. Саперно-Слобідська 10 (Деміївка)
                </p>
                <p>Вхід через супермаркет ВЕЛМАРТ</p>
              </div>
              <div className='flex items-center gap-4'>
                <Image
                  src='/icons/kyiv_metro_logo_2015.svg'
                  width={24}
                  height={16}
                  alt='Kyiv metro logo'
                />
                <p>Деміївська</p>
              </div>
              <a
                className='font-medium  text-dark-blue'
                href='tel:+380502272728'
              >
                +38 050 227 27 28
              </a>
            </div>
            <div className='flex flex-col gap-[18px]'>
              <p className='font-semibold text-black-dis'>
                Просп. Володимира Івасюка, 27 (Оболонь)
              </p>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <Image
                    src='/icons/kyiv_metro_logo_2015.svg'
                    width={24}
                    height={18}
                    alt='Kyiv metro logo'
                  />
                  <p>Мінська</p>
                </div>
                <div className='flex items-center gap-2'>
                  <Image
                    src='/icons/kyiv_metro_logo_2015.svg'
                    width={24}
                    height={18}
                    alt='Kyiv metro logo'
                  />
                  <p>Оболонь</p>
                </div>
              </div>
              <a
                className='font-medium  text-dark-blue'
                href='tel:+380502272728'
              >
                +38 050 227 27 28
              </a>
            </div>
          </div>
          <div className='max-w-[200px]'>
            <div className='mb-14 flex items-center gap-2 max-lg:mb-8'>
              <TbClockHour9 color='#04268B' size={24} />
              <p className='font-exo_2 text-xl  font-semibold text-dark-blue  max-lg:text-lg'>
                Режим роботи
              </p>
            </div>
            <div className='flex flex-col gap-[18px]'>
              <p>10:00 - 19:30</p>
              <p>нд - вихідний</p>
            </div>
          </div>
          <iframe
            className='h-[420px] w-[628px] rounded-2xl max-xl:w-[428px] max-lg:h-[320px] max-lg:w-full'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45686.724461612605!2d30.49208527376294!3d50.3872428190653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf48c96776b7%3A0x986deb84ddb3a38c!2z0KHQtdGA0LLRltGB0L3QuNC5INGG0LXQvdGC0YAgRml4TGFiOiDRgNC10LzQvtC90YIg0YLQtdC70LXRhNC-0L3RltCyLCDQv9C70LDQvdGI0LXRgtGW0LIsINC90L7Rg9GC0LHRg9C60ZbQsg!5e0!3m2!1sru!2sua!4v1691778163725!5m2!1sru!2sua'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            title='Google Map'
          />
        </div>
      </div>
    </section>
  )
}

export default ContactsSection
