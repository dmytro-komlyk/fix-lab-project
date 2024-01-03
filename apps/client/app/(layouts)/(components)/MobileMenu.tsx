import useCustomScrollbarLock from '@client/app/(hooks)/useCustomScrollbarLock'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useRef } from 'react'
import { MdOutlineClose } from 'react-icons/md'

import Button from './Button'

interface MobileMenuProps {
  toggleMobileMenu: () => void
  toggleCourierModal: () => void
}
const MobileMenu: React.FC<MobileMenuProps> = ({
  toggleMobileMenu,
  toggleCourierModal,
}) => {
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const onBackdropCloseMobileMenu = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        toggleMobileMenu()
      }
    },
    [toggleMobileMenu],
  )

  const handleEscKeyPressContent = useCallback(
    (event: { code: string }) => {
      if (event.code === 'Escape') {
        toggleMobileMenu()
      }
    },
    [toggleMobileMenu],
  )

  useCustomScrollbarLock({ handleEscKeyPressContent })
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ transition: { duration: 0.1 } }}
      ref={mobileMenuRef}
      onClick={onBackdropCloseMobileMenu}
      className='absolute left-0 top-0 z-10 h-[100vh] w-full overflow-y-auto overflow-x-hidden bg-modal-overlay backdrop-blur-[6px]'
    >
      <motion.div
        initial={{ x: 500 }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: 500, transition: { duration: 0.3 } }}
        className=' fixed right-0 top-0 z-10 m-[30px] flex w-[365px] flex-col justify-between rounded-2xl bg-dark-blue p-[24px] backdrop-blur-[12.5px] max-md:m-[20px] max-md:w-[320px] max-sm:w-[280px] max-sm:p-[14px]'
      >
        <div className='flex h-[80dvh] flex-col overflow-auto'>
          <div className='flex items-center justify-between'>
            <Link href='/' onClick={toggleMobileMenu} className=' flex gap-3'>
              <Image
                className='h-auto w-[65px]'
                src='/logo.svg'
                alt='FixLab logo'
                width='0'
                height='0'
                priority
              />
            </Link>
            <button
              aria-label='Відкрити мобільне меню'
              type='button'
              className='white-dis-700 text-center'
              onClick={toggleMobileMenu}
            >
              <MdOutlineClose
                className='h-8 w-8 fill-white-dis  transition-opacity hover:opacity-80 focus:opacity-80'
                aria-hidden='true'
              />
            </button>
          </div>
          <ul className='mt-8 flex flex-col items-center gap-4 max-md:justify-center md:items-start'>
            <li>
              <Link
                href='/repair'
                onClick={toggleMobileMenu}
                className={`font-exo_2 ${
                  pathname === '/repair'
                    ? ' text-light-green'
                    : 'text-white-dis'
                } text-xl font-semibold  transition-opacity hover:opacity-80  focus:opacity-80`}
              >
                Ремонт
              </Link>
            </li>
            <li>
              <Link
                href='/contacts'
                onClick={toggleMobileMenu}
                className={`font-exo_2 ${
                  pathname === '/contacts'
                    ? ' text-light-green'
                    : 'text-white-dis'
                } text-xl font-semibold  transition-opacity hover:opacity-80  focus:opacity-80`}
              >
                Контакти
              </Link>
            </li>
            <li>
              <Link
                href='/blog'
                onClick={toggleMobileMenu}
                className={`font-exo_2 ${
                  pathname === '/blog' ? ' text-light-green' : 'text-white-dis'
                } text-xl font-semibold  transition-opacity hover:opacity-80  focus:opacity-80`}
              >
                Блог
              </Link>
            </li>
            <li>
              <Link
                href='/corporate'
                onClick={toggleMobileMenu}
                className={`font-exo_2 ${
                  pathname === '/corporate'
                    ? ' text-light-green'
                    : 'text-white-dis'
                } text-xl font-semibold capitalize  transition-opacity hover:opacity-80  focus:opacity-80`}
              >
                Для бізнесу
              </Link>
            </li>
          </ul>
        </div>
        <Button
          styles='group relative flex min-w-[256px] py-4 items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
          textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
          toggleModal={toggleCourierModal}
          text='Викликати курʼєра'
        />
      </motion.div>
    </motion.div>
  )
}

export default MobileMenu
