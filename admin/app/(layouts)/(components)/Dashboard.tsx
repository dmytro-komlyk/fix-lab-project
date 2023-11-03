'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { HiLockClosed } from 'react-icons/hi'

const Dashboard = () => {
  const session = useSession()
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
        {session.data?.user.name && (
          <AnimatePresence>
            <motion.ul
              initial={{ opacity: 0, translateX: -300 }}
              animate={{
                opacity: 1,
                translateX: 0,
                transition: { duration: 0.5 },
              }}
              exit={{
                opacity: 0,
                translateX: -300,
                transition: { duration: 0.5 },
              }}
              className='flex flex-col gap-4'
            >
              <li>
                <Link
                  href='/articles'
                  className='font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
                >
                  Блог
                </Link>
              </li>
              <li>
                <Link
                  href='/gadgets'
                  className='font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
                >
                  Гаджети
                </Link>
              </li>
              <li className='flex items-center justify-between gap-2 opacity-70'>
                <Link
                  href='/issues'
                  className='font-exo_2 text-2xl font-bold text-white-dis max-lg:text-xl '
                >
                  Послуги
                </Link>
                <HiLockClosed size={30} color='#fff' />
              </li>
              <li className='flex items-center justify-between gap-2 opacity-70'>
                <Link
                  href='/#'
                  className='font-exo_2 text-2xl font-bold text-white-dis max-lg:text-xl '
                >
                  Послуги сер/обс
                </Link>
                <HiLockClosed size={30} color='#fff' />
              </li>
              <li className='flex items-center justify-between gap-2 opacity-70'>
                <Link
                  href='/#'
                  className='font-exo_2 text-2xl font-bold text-white-dis max-lg:text-xl '
                >
                  Бренди
                </Link>
                <HiLockClosed size={30} color='#fff' />
              </li>

              <li className='flex items-center justify-between gap-2 opacity-70'>
                <Link
                  href='/#'
                  className='font-exo_2 text-2xl font-bold text-white-dis max-lg:text-xl '
                >
                  Контакти
                </Link>
                <HiLockClosed size={30} color='#fff' />
              </li>
              <li className='flex items-center justify-between gap-2 opacity-70'>
                <Link
                  href='/#'
                  className='font-exo_2 text-2xl font-bold text-white-dis max-lg:text-xl '
                >
                  Медіа
                </Link>
                <HiLockClosed size={30} color='#fff' />
              </li>
            </motion.ul>
          </AnimatePresence>
        )}
      </div>
      {!session.data?.user.name ? (
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
        <button
          type='button'
          onClick={() => signOut({ callbackUrl: '/' })}
          className='m m-4 justify-center rounded-2xl bg-mid-green p-2 text-center font-exo_2 text-2xl font-bold text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
        >
          Вийти
        </button>
      )}
    </div>
  )
}

export default Dashboard
