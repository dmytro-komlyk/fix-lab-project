'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'

import { AOSInit } from '../(components)/AOSInit'
import type { IContactsProps } from './(components)/AddressLocationCard'
import Button from './(components)/Button'
import CourierModal from './(components)/CourierModal'
import MobileMenu from './(components)/MobileMenu'
import SuccessSubmitBanner from './(components)/SuccessSubmitBanner'

const blogIdRegex = /^\/blog\/([^/]+)\/?$/
const brandsSinglePageRegex = /^\/repair\/([^/]+)\/brands\/([^/]+)\/?$/
const brandsPageRegex = /^\/repair\/([^/]+)\/brands\/?$/

export const Header: React.FC<IContactsProps> = ({ contactsData }) => {
  const pathname = usePathname()
  const toggleDropdownRegionRef = useRef<HTMLDivElement>(null)
  const toggleDropdownPhoneRef = useRef<HTMLUListElement>(null)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [isOpenItem, setIsOpenItem] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [selectedRegionItem, setSelectedRegionItem] = useState<string>(
    `${contactsData[0]?.area}`,
  )

  const toggleSuccessSubmitModal = useCallback(() => {
    setSubmitSuccess(prev => !prev)
  }, [])

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
    <>
      <AOSInit />
      <header
        className={`padding-lock max-md fixed left-0 top-0 z-50 flex w-full items-center transition-colors ${
          isScrolled ||
          pathname === '/repair' ||
          pathname === '/contacts' ||
          blogIdRegex.test(pathname) ||
          brandsPageRegex.test(pathname) ||
          brandsSinglePageRegex.test(pathname)
            ? ' bg-[#04268B]'
            : ''
        }`}
      >
        <nav
          data-aos='fade-down'
          className='container mx-auto flex w-full items-center  justify-between py-6 max-md:justify-between max-md:pb-[15px] max-md:pt-[30px] lg:px-0'
          aria-label='Global'
        >
          <Link
            href='/'
            className='flex gap-1 transition-opacity hover:opacity-80 focus:opacity-80 max-md:m-0  xl:mr-9'
          >
            <Image
              className='h-auto w-[88px] max-md:w-[65px]'
              src='/logo.svg'
              alt='FixLab logo'
              width='0'
              height='0'
              priority
            />
          </Link>

          <div className='hidden items-center md:flex '>
            {/* Phone Toggle Desktop */}
            <div
              ref={toggleDropdownRegionRef}
              onClick={toggleDropDown}
              className={` select-text-none relative mr-[63px] flex h-[48px] min-w-[196px]  cursor-pointer items-center justify-center border-[2px] border-mid-green  ${
                isOpenItem ? 'rounded-t-2xl' : 'rounded-2xl'
              } `}
            >
              <button
                type='button'
                className='relative text-base font-semibold text-white-dis'
              >
                {selectedRegionItem}
              </button>
              <FiMapPin
                className='absolute left-[12px] top-[11px]'
                aria-hidden='true'
                color='#F8F8F8'
                size={20}
              />
              {isOpenItem ? (
                <TiArrowSortedUp
                  className='absolute right-[12px] top-[15px]'
                  aria-hidden='true'
                  color='#F8F8F8'
                  width={24}
                  height={14}
                />
              ) : (
                <TiArrowSortedDown
                  className='z-2 absolute right-[12px] top-[15px]'
                  aria-hidden='true'
                  color='#F8F8F8'
                  width={24}
                  height={14}
                />
              )}
              <AnimatePresence>
                {isOpenItem &&
                  contactsData.map(
                    item =>
                      selectedRegionItem !== item.area && (
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
                          key={item._id}
                          onClick={() => {
                            handleItemClick(item.area)
                            toggleDropDown()
                          }}
                          className='absolute bottom-[-48px] left-[-2px] flex w-[196px] flex-col items-center  justify-center gap-2 rounded-b-xl  bg-mid-green  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
                        >
                          <button
                            type='button'
                            onClick={toggleDropDown}
                            key={item.area}
                            className='select-none py-3 text-base font-semibold text-dark-blue'
                          >
                            {item.area}
                          </button>
                        </motion.div>
                      ),
                  )}
              </AnimatePresence>
            </div>

            {/* Nav List */}
            <ul className='mr-[55px] hidden gap-6 max-md:m-0 xl:flex'>
              <li>
                <Link
                  href='/repair'
                  className='text-base font-semibold  text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
                >
                  Ремонт
                </Link>
              </li>
              <li>
                <Link
                  href='/contacts'
                  className='text-base font-semibold  text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
                >
                  Контакти
                </Link>
              </li>
              <li>
                <Link
                  href='/blog'
                  className='text-base font-semibold  text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
                >
                  Блог
                </Link>
              </li>
              <li>
                <Link
                  href='/corporate'
                  className='text-base font-semibold  text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
                >
                  Для бізнесу
                </Link>
              </li>
            </ul>
            {/* Phone Box */}

            <div className='mr-[31px] flex flex-col items-center max-md:m-0'>
              <p className='flex flex-row items-center  gap-1'>
                <span className='whitespace-nowrap text-sm leading-6  text-[rgba(248,_252,_255,_0.56)]'>
                  {contactsData[0]?.workingTime}
                </span>
                <span className='whitespace-nowrap text-sm  leading-6 text-[rgba(248,_252,_255,_0.56)]'>
                  |
                </span>
                <span className='w-1/2 whitespace-nowrap  text-sm text-[rgba(248,_252,_255,_0.56)]'>
                  {contactsData[0]?.workingDate}
                </span>
              </p>
              <a
                href={`tel:${
                  selectedRegionItem === contactsData[0]?.area
                    ? contactsData[0]?.phones.join('').replace(/\s/g, '')
                    : contactsData[1]?.phones.join('').replace(/\s/g, '')
                }`}
                className='whitespace-nowrap text-md leading-none tracking-[2px] text-white-dis transition-opacity hover:opacity-80  focus:opacity-80'
              >
                {selectedRegionItem === contactsData[0]?.area
                  ? contactsData[0]?.phones.join('')
                  : contactsData[1]?.phones.join('')}
              </a>
            </div>

            {/* Modal Open Button */}

            <Button
              text='Викликати курʼєра'
              toggleModal={toggleCourierModal}
              styles='group relative max-lg:hidden flex min-w-[256px] py-4 items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
              textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
            />
          </div>

          {/* Phone Toggle Mobile */}

          <div className='flex items-center xl:hidden'>
            <ul
              ref={toggleDropdownPhoneRef}
              className={` select-text-none relative mr-[33px] hidden cursor-pointer max-md:flex `}
            >
              {isOpenItem ? (
                <TiArrowSortedUp
                  onClick={toggleDropDown}
                  className='absolute right-[-19px] top-[4px]'
                  aria-hidden='true'
                  color='#F8F8F8'
                  width={24}
                  height={14}
                />
              ) : (
                <TiArrowSortedDown
                  onClick={toggleDropDown}
                  className='absolute right-[-19px] top-[4px]'
                  aria-hidden='true'
                  color='#F8F8F8'
                  width={24}
                  height={14}
                />
              )}
              <li>
                <a
                  href={`tel:${contactsData[0]?.phones
                    .join('')
                    .replace(/\s/g, '')}`}
                  className='text-base font-normal leading-none  tracking-[0.45px] text-white-dis transition-opacity hover:opacity-80 focus:opacity-80  max-[330px]:text-[12px]'
                >
                  {contactsData[0]?.phones}
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
                      href={`tel:${contactsData[1]?.phones
                        .join('')
                        .replace(/\s/g, '')}`}
                      className='whitespace-nowrap text-base font-normal leading-tight tracking-[0.45px]  text-white-dis transition-opacity hover:opacity-80 focus:opacity-80  max-[330px]:text-[12px] '
                    >
                      {contactsData[1]?.phones}
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
        <AnimatePresence>
          {showModal && (
            <CourierModal
              toggleCourierModal={toggleCourierModal}
              setSubmitSuccess={setSubmitSuccess}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenu
              toggleCourierModal={toggleCourierModal}
              toggleMobileMenu={toggleMobileMenu}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {submitSuccess && (
            <SuccessSubmitBanner
              toggleSuccessSubmitModal={toggleSuccessSubmitModal}
            />
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
