import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'
import { MdOutlineClose } from 'react-icons/md'

import Button from './Button'

interface MobileMenuProps {
  toggleMobileMenu: () => void
  toggleCourierModal: () => void
  mobileMenuOpen: boolean
}
const MobileMenu: React.FC<MobileMenuProps> = ({
  toggleMobileMenu,
  toggleCourierModal,
  mobileMenuOpen,
}) => {
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const onBackdropCloseMobileMenu = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        toggleMobileMenu()
      }
    },
    [toggleMobileMenu],
  )

  const handleEscKeyPressMenu = useCallback(
    (event: { code: string }) => {
      if (event.code === 'Escape') {
        toggleMobileMenu()
      }
    },
    [toggleMobileMenu],
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleEscKeyPressMenu)

    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleEscKeyPressMenu)
    }
  }, [handleEscKeyPressMenu])

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 1, transition: { duration: 0.3 } }}
          ref={mobileMenuRef}
          onClick={onBackdropCloseMobileMenu}
          className='absolute left-0 top-0 z-10 h-[100vh] w-full overflow-y-auto bg-modal-overlay'
        >
          <motion.div
            initial={{ x: 500 }}
            animate={{ x: 0, transition: { duration: 0.5 } }}
            exit={{ x: 500, transition: { duration: 0.5 } }}
            className='fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between overflow-y-auto bg-[#09338F] px-4 pb-[10px] pt-10 sm:max-w-[400px] sm:ring-1'
          >
            <div className='flex flex-col'>
              <div className='flex items-center justify-between'>
                <Link
                  href='/'
                  onClick={toggleMobileMenu}
                  className=' flex gap-3'
                >
                  <Image
                    className='h-auto w-[85px]'
                    src='/logo/logo.svg'
                    alt='FixLab logo'
                    width='0'
                    height='0'
                    priority
                  />
                </Link>
                <button
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
              <ul className='space-y-2 py-6'>
                <li>
                  <Link
                    href='/repair'
                    onClick={toggleMobileMenu}
                    className='text-base font-semibold text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
                  >
                    Ремонт
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contacts'
                    onClick={toggleMobileMenu}
                    className='text-base font-semibold text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
                  >
                    Контакти
                  </Link>
                </li>
                <li>
                  <Link
                    href='/blog'
                    onClick={toggleMobileMenu}
                    className='text-base font-semibold text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
                  >
                    Блог
                  </Link>
                </li>
                <li>
                  <Link
                    href='/corporate'
                    onClick={toggleMobileMenu}
                    className='text-base font-semibold capitalize text-white-dis  transition-opacity hover:opacity-80 focus:opacity-80 '
                  >
                    Для бізнесу
                  </Link>
                </li>
              </ul>
            </div>
            <Button
              toggleModal={() => {
                toggleCourierModal()
                toggleMobileMenu()
              }}
              textButton='Викликати курʼєра'
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
