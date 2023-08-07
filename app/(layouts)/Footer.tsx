import Image from 'next/image'
import Link from 'next/link'
import { LiaViber } from 'react-icons/lia'

export const Footer = () => {
  return (
    <footer className=' w-full bg-dark-blue bg-cover bg-no-repeat max-md:bg-bg-footer-img-sm md:bg-bg-footer-img-lg'>
      <div className='container items-start pb-[92px] pt-14 md:flex  md:flex-row-reverse md:justify-between md:gap-[80px] lg:flex-row lg:px-0'>
        <Link
          href='/'
          className='mr-12 flex gap-3 hover:opacity-80 focus:opacity-80 max-md:m-0 md:hidden lg:m-0  lg:flex'
        >
          <Image
            className='h-auto w-[167px] max-md:w-[129px]'
            src='/logo/logo.svg'
            alt='FixLab logo'
            width='0'
            height='0'
            priority
          />
        </Link>
        <div className='mt-14 flex justify-between md:m-0    '>
          <ul className='flex flex-col gap-6'>
            <li>
              <Link
                className='text-center text-base font-semibold uppercase tracking-wide text-white-dis hover:opacity-80  focus:opacity-80'
                href='/#'
              >
                Ремонт iphone
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-base font-semibold uppercase tracking-wide text-white-dis hover:opacity-80  focus:opacity-80'
                href='/#'
              >
                Ремонт xiaomi
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-base font-semibold uppercase tracking-wide text-white-dis hover:opacity-80  focus:opacity-80'
                href='/#'
              >
                Ремонт huawei
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-base font-semibold uppercase tracking-wide text-white-dis hover:opacity-80  focus:opacity-80'
                href='/#'
              >
                Ремонт samsung
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-base font-semibold uppercase tracking-wide text-white-dis hover:opacity-80  focus:opacity-80'
                href='/#'
              >
                Ремонт ноутбуків
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-base font-semibold uppercase tracking-wide text-white-dis hover:opacity-80  focus:opacity-80'
                href='/#'
              >
                Ремонт dualsense
              </Link>
            </li>
          </ul>
          <ul className='flex flex-col justify-between md:hidden'>
            <Link
              className='flex h-12 w-12 items-center justify-center rounded-[50%] bg-white-dis uppercase '
              href='/#'
            >
              <Image
                className='h-[25px] w-[25px]'
                src='/icons/skill-icons_instagram.svg'
                width='0'
                height='0'
                alt='Instagram icon'
              />
            </Link>
            <Link
              className='flex h-12 w-12  items-center justify-center rounded-[50%] bg-white-dis uppercase '
              href='/#'
            >
              <Image
                className='h-[25px] w-[25px]'
                src='/icons/logos_telegram.svg'
                width='0'
                height='0'
                alt='Telegram icon'
              />
            </Link>
            <Link
              className='flex h-12 w-12  items-center justify-center rounded-[50%] bg-white-dis uppercase '
              href='/#'
            >
              <LiaViber size={28} fill='#8c5da7' />
            </Link>
          </ul>
        </div>
        <div className='mt-14 flex justify-between md:m-0 md:flex-row-reverse md:gap-[120px] lg:flex-row xl:gap-[200px] '>
          <ul className='flex flex-col gap-6'>
            <li>
              <Link
                href='/repair'
                className='text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Ремонт
              </Link>
            </li>
            <li>
              <Link
                href='/contacts'
                className='text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Контакти
              </Link>
            </li>
            <li>
              <Link
                href='/blog'
                className='text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Блог
              </Link>
            </li>
            <li>
              <Link
                href='/corporate'
                className='text-base font-semibold capitalize text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Для бізнесу
              </Link>
            </li>
          </ul>
          <div className='flex flex-col items-end justify-between md:flex-col md:items-start md:gap-[30px] lg:flex lg:items-end lg:gap-[50px]'>
            <Link
              href='/'
              className=' flex gap-3  hover:opacity-80 focus:opacity-80 max-md:hidden  lg:hidden'
            >
              <Image
                className='h-auto w-[129px]'
                src='/logo/logo.svg'
                alt='FixLab logo'
                width='0'
                height='0'
                priority
              />
            </Link>
            <ul>
              <li>
                <Link
                  href='tel:380632272730'
                  className='text-base font-medium leading-7 tracking-wide text-mid-green hover:text-white-dis  focus:text-white-dis'
                >
                  +38 063 227 27 30
                </Link>
              </li>
              <li>
                <Link
                  href='tel:380632272728'
                  className='text-base font-medium leading-7 tracking-wide text-mid-green hover:text-white-dis  focus:text-white-dis'
                >
                  +38 063 227 27 28
                </Link>
              </li>
            </ul>

            <p className='flex flex-col items-start gap-1 '>
              <span className='text-sm  text-white-dis'>10:00 - 19:30</span>

              <span className='text-sm  text-white-dis '>нд - вихідний</span>
            </p>
            <ul className='flex  max-md:hidden md:flex md:gap-3'>
              <Link
                className='flex h-12 w-12 items-center justify-center rounded-[50%] bg-white-dis uppercase hover:opacity-80  focus:opacity-80 '
                href='/#'
              >
                <Image
                  className='h-[25px] w-[25px]'
                  src='/icons/skill-icons_instagram.svg'
                  width='0'
                  height='0'
                  alt='Instagram icon'
                />
              </Link>
              <Link
                className='flex h-12 w-12  items-center justify-center rounded-[50%] bg-white-dis uppercase hover:opacity-80  focus:opacity-80 '
                href='/#'
              >
                <Image
                  className='h-[25px] w-[25px]'
                  src='/icons/logos_telegram.svg'
                  width='0'
                  height='0'
                  alt='Telegram icon'
                />
              </Link>
              <Link
                className='flex h-12 w-12  items-center justify-center rounded-[50%] bg-white-dis uppercase hover:opacity-80  focus:opacity-80 '
                href='/#'
              >
                <LiaViber size={28} fill='#8c5da7' />
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
