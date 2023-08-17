'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'

import CourierModal from './(components)/CourierModal'
import MobileMenu from './(components)/MobileMenu'

const blogIdRegex = /\/blog\/\d+/

export const Header: React.FC = () => {
  const pathname = usePathname()
  const toggleDropdownRegionRef = useRef<HTMLDivElement>(null)
  const toggleDropdownPhoneRef = useRef<HTMLUListElement>(null)
  const itemsRegion: Array<string> = ['Голосіївський', 'Оболонський']

  const [showModal, setShowModal] = useState<boolean>(false)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [isOpenItem, setIsOpenItem] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [selectedRegionItem, setSelectedRegionItem] =
    useState<string>('Голосіївський')

  useEffect(() => {
    const storedScrollState = window.localStorage.getItem('isScrolled')
    if (storedScrollState) {
      setIsScrolled(JSON.parse(storedScrollState))
    }

    const storedRegionItemState =
      window.localStorage.getItem('selectedRegionItem')
    if (storedRegionItemState) {
      setSelectedRegionItem(storedRegionItemState)
    }
  }, [])

  const handleItemClick = useCallback((item: string) => {
    setSelectedRegionItem(item)
    window.localStorage.setItem('selectedRegionItem', item)
  }, [])

  const toggleDropDown = useCallback(() => {
    setIsOpenItem(prev => !prev)
  }, [])

  const handleClickOutsideDropdown = useCallback((event: { target: any }) => {
    if (
      toggleDropdownRegionRef.current &&
      !toggleDropdownRegionRef.current.contains(event.target) &&
      toggleDropdownPhoneRef.current &&
      !toggleDropdownPhoneRef.current.contains(event.target) &&
      toggleDropdownRegionRef.current &&
      !toggleDropdownRegionRef.current.contains(event.target)
    ) {
      setIsOpenItem(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutsideDropdown)

    return () => {
      window.removeEventListener('mousedown', handleClickOutsideDropdown)
    }
  }, [handleClickOutsideDropdown])

  useEffect(() => {
    const handleScroll = () => {
      const isScroll = window.scrollY > 0
      setIsScrolled(isScroll)
      window.localStorage.setItem('isScrolled', JSON.stringify(isScrolled))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isScrolled])
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])
  const toggleCourierModal = useCallback(() => {
    setShowModal(prev => !prev)
  }, [])

  return (
    <header
      className={`padding-lock max-md fixed left-0 top-0 z-50 flex w-full items-center transition-colors ${
        isScrolled ||
        pathname === '/repair' ||
        pathname === '/contacts' ||
        blogIdRegex.test(pathname)
          ? ' bg-[#04268B]'
          : ''
      }`}
    >
      <nav
        className='container mx-auto flex w-full items-center  justify-between py-6 max-md:justify-between max-md:pb-[10px] max-md:pt-10 lg:px-0'
        aria-label='Global'
      >
        <Link
          href='/'
          className='flex gap-1 transition-opacity hover:opacity-80 focus:opacity-80 max-md:m-0  xl:mr-12'
        >
          <Image
            className='h-auto w-[85px]'
            src='/logo.svg'
            alt='FixLab logo'
            width='0'
            height='0'
            priority
          />
        </Link>

        <div className='hidden items-center md:flex md:gap-12'>
          {/* Phone Toggle Desktop */}

          <div
            ref={toggleDropdownRegionRef}
            onClick={toggleDropDown}
            className={` select-text-none relative flex min-w-[196px] cursor-pointer items-center justify-center border-[2px] border-mid-green py-3  ${
              isOpenItem ? 'rounded-t-xl' : 'rounded-xl'
            } `}
          >
            <button
              type='button'
              className='relative text-base font-semibold text-white-dis'
            >
              {selectedRegionItem}
            </button>
            <FiMapPin
              className='absolute left-[20px] top-[15px]'
              aria-hidden='true'
              color='#F8F8F8'
              width={19}
              height={22}
            />
            {isOpenItem ? (
              <TiArrowSortedUp
                className='absolute right-[12px] top-[17px]'
                aria-hidden='true'
                color='#F8F8F8'
                width={24}
                height={14}
              />
            ) : (
              <TiArrowSortedDown
                className='z-2 absolute right-[12px] top-[17px]'
                aria-hidden='true'
                color='#F8F8F8'
                width={24}
                height={14}
              />
            )}
            <AnimatePresence>
              {isOpenItem &&
                itemsRegion.map(
                  item =>
                    selectedRegionItem !== item && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.1 },
                        }}
                        exit={{
                          y: -5,
                          opacity: 0,
                          transition: { duration: 0.1 },
                        }}
                        key={item}
                        onClick={() => {
                          handleItemClick(item)
                          toggleDropDown()
                        }}
                        className='absolute bottom-[-48px] left-[-2px] flex w-[196px] flex-col items-center  justify-center gap-2 rounded-b-xl  bg-mid-green  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
                      >
                        <button
                          type='button'
                          onClick={toggleDropDown}
                          key={item}
                          className='select-none py-3 text-base font-semibold text-dark-blue'
                        >
                          {item}
                        </button>
                      </motion.div>
                    ),
                )}
            </AnimatePresence>
          </div>

          {/* Nav List */}

          <ul className='hidden gap-6 max-md:m-0  xl:flex'>
            <li>
              <Link
                href='/repair'
                className='text-base font-semibold tracking-[0.64px] text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Ремонт
              </Link>
            </li>
            <li>
              <Link
                href='/contacts'
                className='text-base font-semibold tracking-[0.64px] text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Контакти
              </Link>
            </li>
            <li>
              <Link
                href='/blog'
                className='text-base font-semibold tracking-[0.64px] text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Блог
              </Link>
            </li>
            <li>
              <Link
                href='/corporate'
                className='text-base font-semibold tracking-[0.64px] text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Для бізнесу
              </Link>
            </li>
          </ul>

          {/* Phone Box */}

          <div className='flex flex-col items-center  gap-2 max-md:m-0'>
            <p className='flex flex-row items-end gap-1'>
              <span className='whitespace-nowrap text-sm  text-[rgba(248,_252,_255,_0.56)]'>
                10:00 - 19:30
              </span>
              <span className='whitespace-nowrap text-sm  text-[rgba(248,_252,_255,_0.56)]'>
                |
              </span>
              <span className='w-1/2 whitespace-nowrap  text-sm text-[rgba(248,_252,_255,_0.56)]'>
                нд - вихідний
              </span>
            </p>
            <a
              href={`tel:${
                selectedRegionItem === 'Голосіївський'
                  ? '380632272728'
                  : '380632272730'
              }`}
              className='whitespace-nowrap text-lg text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
            >
              {selectedRegionItem === 'Голосіївський'
                ? '+38 063 227 27 28'
                : '+38 063 227 27 30'}
            </a>
          </div>

          {/* Modal Open Button */}

          <button
            type='button'
            onClick={toggleCourierModal}
            onMouseEnter={() => setIsHovering(false)}
            onMouseLeave={() => setIsHovering(true)}
            className='group flex h-[56px] min-w-[256px] items-center justify-center rounded-[12px] bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue   max-lg:hidden'
          >
            <p
              className={`text-base  font-semibold tracking-wide text-[#04268b] ${
                isHovering ? 'animate-hoverBtnOut' : ''
              } group-hover:animate-hoverBtnIn`}
            >
              Викликати курʼєра
            </p>
          </button>
        </div>

        {/* Phone Toggle Mobile */}

        <div className='flex items-center xl:hidden'>
          <ul
            ref={toggleDropdownPhoneRef}
            className={` select-text-none relative mr-10 hidden cursor-pointer max-md:flex `}
          >
            {isOpenItem ? (
              <TiArrowSortedUp
                onClick={toggleDropDown}
                className='absolute right-[-24px] top-[5px]'
                aria-hidden='true'
                color='#F8F8F8'
                width={24}
                height={14}
              />
            ) : (
              <TiArrowSortedDown
                onClick={toggleDropDown}
                className='absolute right-[-24px] top-[5px]'
                aria-hidden='true'
                color='#F8F8F8'
                width={24}
                height={14}
              />
            )}
            <li>
              <a
                href='tel:380632272728'
                className='text-sm font-normal leading-tight tracking-wide text-white-dis transition-opacity hover:opacity-80 focus:opacity-80  max-[330px]:text-[12px]'
              >
                +38 063 227 27 28
              </a>
            </li>
            <AnimatePresence>
              {isOpenItem && (
                <motion.li
                  initial={{ opacity: 0, y: -5 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.1 },
                  }}
                  exit={{
                    y: -5,
                    opacity: 0,
                    transition: { duration: 0.1 },
                  }}
                  className='absolute left-[0px] top-[27px]'
                >
                  <a
                    href='tel:380632272730'
                    className='whitespace-nowrap text-sm font-normal leading-tight tracking-wide text-white-dis transition-opacity hover:opacity-80 focus:opacity-80  max-[330px]:text-[12px] '
                  >
                    +38 063 227 27 30
                  </a>
                </motion.li>
              )}
            </AnimatePresence>
          </ul>
          <div
            className=' text-gray-700 -m-2.5 cursor-pointer items-center justify-center rounded-md p-2.5 transition-opacity hover:opacity-80 focus:opacity-80  md:pl-8'
            onClick={toggleMobileMenu}
          >
            <FaBars className='h-8 w-8' aria-hidden='true' color='#F8F8F8' />
          </div>
        </div>
      </nav>
      {mobileMenuOpen && (
        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          toggleCourierModal={toggleCourierModal}
          toggleMobileMenu={toggleMobileMenu}
        />
      )}
      {showModal && <CourierModal toggleCourierModal={toggleCourierModal} />}
    </header>
  )
}
