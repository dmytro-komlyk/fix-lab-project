'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const Dashboard = () => {
  const session = useSession()

  return (
    <div className='fixed left-0 flex h-[100vh] w-[400px] shrink flex-col justify-between  bg-[#09338F] pt-12'>
      <div className='relative ml-8 flex flex-col'>
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
        {session.data && (
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
                  href='/gadgets'
                  className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
                >
                  Гаджети
                </Link>
              </li>
              <li>
                <Link
                  href='/issues'
                  className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
                >
                  Послуги
                </Link>
              </li>
              <li>
                <Link
                  href='/benefits'
                  className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
                >
                  Послуги сервісного обслуговування
                </Link>
              </li>
              <li>
                <Link
                  href='/brands'
                  className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
                >
                  Бренди
                </Link>
              </li>
              <li>
                <Link
                  href='/articles'
                  className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
                >
                  Блог
                </Link>
              </li>
              <li>
                <Link
                  href='/contacts'
                  className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
                >
                  Контакти
                </Link>
              </li>
              <li>
                <Link
                  href='/media'
                  className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
                >
                  Медіа
                </Link>
              </li>
            </motion.ul>
          </AnimatePresence>
        )}
      </div>
      {!session.data && (
        <Link
          href='/signin'
          className='m m-4 justify-center rounded-2xl bg-mid-green p-2 text-center font-exo_2 text-2xl font-bold text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
        >
          Логін
        </Link>
      )}
      {session.data && (
        <button
          type='submit'
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
