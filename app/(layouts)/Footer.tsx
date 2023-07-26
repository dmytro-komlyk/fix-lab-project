import Image from 'next/image'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className=' bg-dark-blue max-md:bg-bg-footer-img-sm w-full md:bg-bg-footer-img-lg bg-no-repeat bg-cover'>
      <div className='lg:px-0 container pt-14 pb-[92px] md:flex  md:gap-[80px] items-start md:justify-between md:flex-row-reverse lg:flex-row'>
        <Link
          href='/'
          className='mr-12 max-md:m-0 flex gap-3 lg:m-0 lg:flex md:hidden hover:opacity-80  focus:opacity-80'
        >
          <Image
            className='h-auto w-[81px]'
            src='logo/fix.svg'
            alt='Next.js Logo'
            width='0'
            height='0'
            priority
          />
          <Image
            className='h-auto w-[81px]'
            src='logo/lab.svg'
            alt='Next.js Logo'
            width='0'
            height='0'
            priority
          />
        </Link>
        <div className='flex justify-between mt-14 md:m-0    '>
          <ul className='flex flex-col gap-6'>
            <li>
              <Link
                className='text-center text-white-dis text-base font-semibold uppercase tracking-wide hover:opacity-80  focus:opacity-80'
                href={'#'}
              >
                Ремонт iphone
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-white-dis text-base font-semibold uppercase tracking-wide hover:opacity-80  focus:opacity-80'
                href={'#'}
              >
                Ремонт xiaomi
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-white-dis text-base font-semibold uppercase tracking-wide hover:opacity-80  focus:opacity-80'
                href={'#'}
              >
                Ремонт huawei
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-white-dis text-base font-semibold uppercase tracking-wide hover:opacity-80  focus:opacity-80'
                href={'#'}
              >
                Ремонт samsung
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-white-dis text-base font-semibold uppercase tracking-wide hover:opacity-80  focus:opacity-80'
                href={'#'}
              >
                Ремонт ноутбуків
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-white-dis text-base font-semibold uppercase tracking-wide hover:opacity-80  focus:opacity-80'
                href={'#'}
              >
                Ремонт dualsense
              </Link>
            </li>
          </ul>
          <ul className='flex flex-col justify-between md:hidden'>
            <Link
              className='flex justify-center items-center uppercase bg-white-dis rounded-[50%] w-12 h-12 '
              href={'#'}
            >
              <Image
                src={'/icons/skill-icons_instagram.svg'}
                width={25}
                height={25}
                alt='Instagram icon'
              />
            </Link>
            <Link
              className='flex justify-center items-center  uppercase bg-white-dis rounded-[50%] w-12 h-12 '
              href={'#'}
            >
              <Image
                src={'/icons/logos_telegram.svg'}
                width={25}
                height={25}
                alt='Telegram icon'
              />
            </Link>
            <Link
              className='flex justify-center items-center  uppercase bg-white-dis rounded-[50%] w-12 h-12 '
              href={'#'}
            >
              <Image
                src={'/icons/Viber_logo_2018.png'}
                width={25}
                height={25}
                alt='Viber icon'
              />
            </Link>
          </ul>
        </div>
        <div className='flex justify-between mt-14 md:m-0 md:flex-row-reverse lg:flex-row md:gap-[120px] xl:gap-[200px] '>
          <ul className='flex flex-col gap-6'>
            <li>
              <Link
                href='#'
                className='text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Ремонт
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Контакти
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Блог
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='capitalize text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Для бізнесу
              </Link>
            </li>
          </ul>
          <div className='flex flex-col md:gap-[30px] lg:gap-[50px] items-end md:items-start lg:items-end justify-between md:flex-col lg:flex'>
            <Link
              href='/'
              className=' flex gap-3  max-md:hidden lg:hidden hover:opacity-80  focus:opacity-80'
            >
              <Image
                className='h-auto w-[95px]'
                src='logo/fix.svg'
                alt='Next.js Logo'
                width='0'
                height='0'
                priority
              />
              <Image
                className='h-auto w-[95px]'
                src='logo/lab.svg'
                alt='Next.js Logo'
                width='0'
                height='0'
                priority
              />
            </Link>
            <ul>
              <li>
                <Link
                  href='tel:380632272730'
                  className='text-mid-green text-base font-medium leading-7 tracking-wide hover:text-white-dis  focus:text-white-dis'
                >
                  +38 063 227 27 30
                </Link>
              </li>
              <li>
                <Link
                  href='tel:380632272728'
                  className='text-mid-green text-base font-medium leading-7 tracking-wide hover:text-white-dis  focus:text-white-dis'
                >
                  +38 063 227 27 28
                </Link>
              </li>
            </ul>

            <p className='flex flex-col gap-1 items-start '>
              <span className='text-sm  text-white-dis'>10:00 - 19:30</span>

              <span className='text-sm  text-white-dis '>нд - вихідний</span>
            </p>
            <ul className='flex  md:flex md:gap-3 max-md:hidden'>
              <Link
                className='flex justify-center items-center uppercase bg-white-dis rounded-[50%] w-12 h-12 hover:opacity-80  focus:opacity-80 '
                href={'#'}
              >
                <Image
                  src={'/icons/skill-icons_instagram.svg'}
                  width={25}
                  height={25}
                  alt='Instagram icon'
                />
              </Link>
              <Link
                className='flex justify-center items-center  uppercase bg-white-dis rounded-[50%] w-12 h-12 hover:opacity-80  focus:opacity-80 '
                href={'#'}
              >
                <Image
                  src={'/icons/logos_telegram.svg'}
                  width={25}
                  height={25}
                  alt='Telegram icon'
                />
              </Link>
              <Link
                className='flex justify-center items-center  uppercase bg-white-dis rounded-[50%] w-12 h-12 hover:opacity-80  focus:opacity-80 '
                href={'#'}
              >
                <Image
                  src={'/icons/Viber_logo_2018.png'}
                  width={25}
                  height={25}
                  alt='Viber icon'
                />
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
