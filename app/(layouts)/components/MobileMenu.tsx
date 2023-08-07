import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'
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
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const onBackdropCloseMobileMenu = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        toggleMobileMenu()
      }
    },
    [],
  )

  const handleEscKeyPressMenu = useCallback((event: { code: string }) => {
    if (event.code === 'Escape') {
      toggleMobileMenu()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleEscKeyPressMenu)

    return () => {
      window.removeEventListener('keydown', handleEscKeyPressMenu)
    }
  }, [handleEscKeyPressMenu])
  return (
    <div
      ref={mobileMenuRef}
      onClick={onBackdropCloseMobileMenu}
      className='absolute left-0 top-0 z-10 h-[100vh] w-full bg-modal-overlay'
    >
      <div className='sm:ring-gray-900/10 fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between overflow-y-auto bg-[#09338F] px-4 pb-[10px] pt-10 sm:max-w-[400px] sm:ring-1'>
        <div className='flex flex-col'>
          <div className='flex items-center justify-between'>
            <Link href='/' onClick={toggleMobileMenu} className=' flex gap-3'>
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
                className='h-8 w-8 fill-white-dis  hover:opacity-80 focus:opacity-80'
                aria-hidden='true'
              />
            </button>
          </div>
          <ul className='space-y-2 py-6'>
            <li>
              <Link
                href='/repair'
                onClick={toggleMobileMenu}
                className='text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Ремонт
              </Link>
            </li>
            <li>
              <Link
                href='/contacts'
                onClick={toggleMobileMenu}
                className='text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Контакти
              </Link>
            </li>
            <li>
              <Link
                href='/blog'
                onClick={toggleMobileMenu}
                className='text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Блог
              </Link>
            </li>
            <li>
              <Link
                href='/corporate'
                onClick={toggleMobileMenu}
                className='text-base font-semibold capitalize text-white-dis  hover:opacity-80 focus:opacity-80 '
              >
                Для бізнесу
              </Link>
            </li>
          </ul>
        </div>
        <Button
          toggleCourierModal={toggleCourierModal}
          textButton='Викликати курʼєра'
        />
      </div>
    </div>
  )
}

export default MobileMenu
