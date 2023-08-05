import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineClose } from 'react-icons/md'
interface MobileMenuProps {
  toggleMobileMenu: () => void
  toggleCourierModal: () => void
}
const MobileMenu: React.FC<MobileMenuProps> = ({
  toggleMobileMenu,
  toggleCourierModal,
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
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
      className='bg-modal-overlay w-full h-[100vh] z-10 absolute top-0 left-0'
    >
      <div className='fixed overflow-y-auto flex flex-col justify-between inset-y-0 right-0 z-10 w-full bg-[#09338F] pt-10 pb-[10px] px-4 sm:max-w-[400px] sm:ring-1 sm:ring-gray-900/10'>
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
              className='text-center white-dis-700'
              onClick={toggleMobileMenu}
            >
              <MdOutlineClose
                className='h-8 w-8 hover:opacity-80  focus:opacity-80 fill-white-dis'
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
                className='text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80 capitalize '
              >
                Для бізнесу
              </Link>
            </li>
          </ul>
        </div>
        <button
          onClick={() => {
            toggleMobileMenu()
            toggleCourierModal()
          }}
          onMouseEnter={() => setIsHovering(false)}
          onMouseLeave={() => setIsHovering(true)}
          className='group bg-[#00cc73] flex justify-center items-center rounded-lg m-4 hover:bg-mid-blue focus:bg-mid-blue'
        >
          <p
            className={`whitespace-nowrap  font-semibold tracking-[0.64] text-[#04268b] px-[48px] py-[23px] ${
              isHovering ? 'animate-hoverBtnOut' : ''
            } group-hover:animate-hoverBtnIn`}
          >
            Викликати курʼєра
          </p>
        </button>
      </div>
    </div>
  )
}

export default MobileMenu
