import { auth } from '@admin/app/(utils)/authOptions'
import Image from 'next/image'
// import Link from 'next/link'
import { Link } from '@nextui-org/react'
import { HiLockClosed } from 'react-icons/hi'

import ExitButton from './ExitButton'

const Dashboard = async () => {
  const session = await auth()

  return (
    <div className='fixed left-0 flex h-[100vh] w-[400px] shrink flex-col justify-between  bg-[#09338F] pt-12'>
      <div className='relative ml-8 mr-2 flex flex-col'>
        <Link
          href='/'
          className='mb-8 flex transition-opacity hover:opacity-80  focus:opacity-80'
        >
          <Image
            className='mb-5 h-auto w-[88px] max-md:w-[65px]'
            src='/logo.svg'
            alt='FixLab logo'
            width='0'
            height='0'
            priority
          />
        </Link>
        {session?.user && (
          <div>
            <ul className='flex flex-col gap-4'>
              <li className='flex items-center justify-between gap-2'>
                <Link
                  href='/articles'
                  isDisabled
                  className='font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
                >
                  Блог
                </Link>
                <HiLockClosed size={30} color='#fff' />
              </li>
              <li className='flex items-center justify-between gap-2'>
                <Link
                  href='/gadgets'
                  isDisabled
                  className='font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
                >
                  Гаджети
                </Link>
                <HiLockClosed size={30} color='#fff' />
              </li>
              <li className='flex items-center justify-between gap-2'>
                <Link
                  href='/issues'
                  isDisabled
                  className='font-exo_2 text-2xl font-bold text-white-dis max-lg:text-xl '
                >
                  Послуги
                </Link>
                <HiLockClosed size={30} color='#fff' />
              </li>
              <li className='flex items-center justify-between gap-2'>
                <Link
                  href='/benefits'
                  className='font-exo_2 text-2xl font-bold text-white-dis max-lg:text-xl '
                >
                  Послуги сер/обс
                </Link>
              </li>
              <li className='flex items-center justify-between gap-2'>
                <Link
                  href='/brands'
                  isDisabled
                  className='font-exo_2 text-2xl font-bold text-white-dis max-lg:text-xl '
                >
                  Бренди
                </Link>
                <HiLockClosed size={30} color='#fff' />
              </li>

              <li className='flex items-center justify-between gap-2'>
                <Link
                  href='/contacts'
                  isDisabled
                  className='font-exo_2 text-2xl font-bold text-white-dis max-lg:text-xl '
                >
                  Контакти
                </Link>
                <HiLockClosed size={30} color='#fff' />
              </li>
              <li className='flex items-center justify-between gap-2 opacity-70'>
                <Link
                  href='/#'
                  isDisabled
                  className='font-exo_2 text-2xl font-bold text-white-dis max-lg:text-xl '
                >
                  Медіа
                </Link>
                <HiLockClosed size={30} color='#fff' />
              </li>
            </ul>
          </div>
        )}
      </div>
      {!session?.user ? (
        <div className='m-4 flex flex-col gap-4'>
          <Link
            href='/authentication/signin'
            className='m  justify-center rounded-2xl bg-mid-green p-2 text-center font-exo_2 text-2xl font-bold text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
          >
            Логін
          </Link>
          <Link
            href='/authentication/signup'
            className='m  justify-center rounded-2xl bg-mid-green p-2 text-center font-exo_2 text-2xl font-bold text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
          >
            Реєстрація
          </Link>
        </div>
      ) : (
        <ExitButton />
      )}
    </div>
  )
}

export default Dashboard
