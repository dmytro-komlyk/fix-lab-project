'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaBars } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'
import { MdOutlineClose } from 'react-icons/md'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'

export const Header: React.FC = () => {
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const toggleDropdownRegionRef = useRef<HTMLDivElement>(null)
  const toggleDropdownPhoneRef = useRef<HTMLUListElement>(null)
  const itemsRegion = ['Голосіївський', 'Оболонський']

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

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const handleEscKeyPress = useCallback((event: { code: string }) => {
    if (event.code === 'Escape') {
      setMobileMenuOpen(false)
    }
  }, [])

  const onBackdropCloseMobileMenu = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        setMobileMenuOpen(false)
      }
    },
    [],
  )

  const handleClickOutsideDropdown = useCallback((event: { target: any }) => {
    if (
      toggleDropdownRegionRef.current &&
      !toggleDropdownRegionRef.current.contains(event.target) &&
      toggleDropdownPhoneRef.current &&
      !toggleDropdownPhoneRef.current.contains(event.target)
    ) {
      setIsOpenItem(false)
    }
  }, [])

  useEffect(() => {
    const options = { passive: true }

    const scroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    document.addEventListener('scroll', scroll, options)

    return () => document.removeEventListener('scroll', scroll)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('isScrolled', JSON.stringify(isScrolled))
  }, [isScrolled])

  useEffect(() => {
    window.addEventListener('keydown', handleEscKeyPress)

    return () => {
      window.removeEventListener('keydown', handleEscKeyPress)
    }
  }, [handleEscKeyPress])

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutsideDropdown)

    return () => {
      window.removeEventListener('mousedown', handleClickOutsideDropdown)
    }
  }, [handleClickOutsideDropdown])

  return (
    <header
      className={`fixed left-0 top-0 flex w-full items-center max-md z-10 transition-colors ${
        isScrolled ? ' bg-[#04268B]' : ''
      }`}
    >
      <nav
        className='container lg:px-0 mx-auto justify-between max-md:justify-between  max-md:pt-10 max-md:pb-[10px] flex w-full items-center py-6'
        aria-label='Global'
      >
        <Link
          href='/'
          className='xl:mr-12 max-md:m-0 flex gap-1 hover:opacity-80  focus:opacity-80'
        >
          <Image
            className='h-auto w-[40px]'
            src='logo/fix.svg'
            alt='Next.js Logo'
            width='0'
            height='0'
            priority
          />
          <Image
            className='h-auto w-[40px]'
            src='logo/lab.svg'
            alt='Next.js Logo'
            width='0'
            height='0'
            priority
          />
        </Link>

        <div className='hidden items-center md:flex md:gap-12'>
          {/* Toggle Desktop */}

          <div
            ref={toggleDropdownRegionRef}
            onClick={toggleDropDown}
            className={` select-text-none cursor-pointer relative min-w-[196px] py-3 border-[2px] border-mid-green flex justify-center items-center  ${
              isOpenItem ? 'rounded-tl-xl rounded-tr-xl' : 'rounded-xl'
            } `}
          >
            <button className='relative text-base font-semibold text-white-dis'>
              {selectedRegionItem}
            </button>
            <FiMapPin
              className='absolute top-[15px] left-[20px]'
              aria-hidden='true'
              color='#F8F8F8'
              width={19}
              height={22}
            />
            {isOpenItem ? (
              <TiArrowSortedUp
                className='absolute top-[17px] right-[12px]'
                aria-hidden='true'
                color='#F8F8F8'
                width={24}
                height={14}
              />
            ) : (
              <TiArrowSortedDown
                className='absolute z-2 top-[17px] right-[12px]'
                aria-hidden='true'
                color='#F8F8F8'
                width={24}
                height={14}
              />
            )}
            {isOpenItem &&
              itemsRegion.map(
                item =>
                  selectedRegionItem !== item && (
                    <div
                      key={item}
                      onClick={() => {
                        handleItemClick(item)
                        toggleDropDown()
                      }}
                      className='absolute bottom-[-48px] left-[-2px] flex justify-center flex-col items-center  rounded-bl-xl rounded-br-xl gap-2  w-[196px]  bg-mid-green  hover:bg-mid-blue focus:bg-mid-blue'
                    >
                      <button
                        onClick={toggleDropDown}
                        key={item}
                        className='select-none py-3 text-base font-semibold text-dark-blue'
                      >
                        {item}
                      </button>
                    </div>
                  ),
              )}
          </div>

          {/* Nav List */}

          <ul className='hidden xl:flex gap-6  max-md:m-0'>
            <li>
              <Link
                href='#'
                className='text-base font-semibold tracking-[0.64px] text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Ремонт
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='text-base font-semibold tracking-[0.64px] text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Контакти
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='text-base font-semibold tracking-[0.64px] text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Блог
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='text-base font-semibold tracking-[0.64px] text-white-dis hover:opacity-80  focus:opacity-80'
              >
                Для бізнесу
              </Link>
            </li>
          </ul>

          {/* Phone Box */}

          <div className='flex flex-col gap-2  max-md:m-0 items-center'>
            <p className='flex flex-row gap-1 items-end'>
              <span className='whitespace-nowrap text-sm  text-[rgba(248,_252,_255,_0.56)]'>
                10:00 - 19:30
              </span>
              <span className='whitespace-nowrap text-sm  text-[rgba(248,_252,_255,_0.56)]'>
                |
              </span>
              <span className='whitespace-nowrap text-sm  text-[rgba(248,_252,_255,_0.56)] w-1/2'>
                нд - вихідний
              </span>
            </p>
            <Link
              href={`tel:${
                selectedRegionItem === 'Голосіївський'
                  ? '380632272728'
                  : '380632272730'
              }`}
              className='whitespace-nowrap text-lg text-white-dis hover:opacity-80  focus:opacity-80'
            >
              {selectedRegionItem === 'Голосіївський'
                ? '+38 063 227 27 28'
                : '+38 063 227 27 30'}
            </Link>
          </div>

          {/* Modal Button */}

          <button className='hidden lg:flex bg-[#00cc73] justify-center items-center min-w-[256px] rounded-[12px] hover:bg-mid-blue focus:bg-mid-blue'>
            <p className='font-semibold text-base text-[#04268b]  pt-[23px] pb-[20px] tracking-wide'>
              Викликати курʼєра
            </p>
          </button>
        </div>

        {/* Menu Button */}

        <div className='flex xl:hidden items-center'>
          <ul
            ref={toggleDropdownPhoneRef}
            className={`relative hidden max-md:flex select-text-none cursor-pointer mr-10 `}
          >
            {isOpenItem ? (
              <TiArrowSortedUp
                onClick={toggleDropDown}
                className='absolute top-[5px] right-[-24px]'
                aria-hidden='true'
                color='#F8F8F8'
                width={24}
                height={14}
              />
            ) : (
              <TiArrowSortedDown
                onClick={toggleDropDown}
                className='absolute top-[5px] right-[-24px]'
                aria-hidden='true'
                color='#F8F8F8'
                width={24}
                height={14}
              />
            )}
            <li>
              <Link
                href='tel:380632272728'
                className='text-white-dis text-sm font-normal leading-tight max-[330px]:text-[12px] tracking-wide hover:opacity-80  focus:opacity-80'
              >
                +38 063 227 27 28
              </Link>
            </li>
            {isOpenItem && (
              <li className='absolute top-[17px] left-[0px]'>
                <Link
                  href='tel:380632272730'
                  className='text-white-dis text-sm font-normal whitespace-nowrap leading-tight max-[330px]:text-[12px] tracking-wide hover:opacity-80  focus:opacity-80 '
                >
                  +38 063 227 27 30
                </Link>
              </li>
            )}
          </ul>
          <button
            type='button'
            className='-m-2.5 items-center justify-center rounded-md p-2.5 text-gray-700 md:pl-8 hover:opacity-80  focus:opacity-80'
            onClick={toggleMobileMenu}
          >
            <span className='sr-only'>Open main menu</span>
            <FaBars className='h-8 w-8' aria-hidden='true' color='#F8F8F8' />
          </button>
        </div>
      </nav>

      {/* Menu */}

      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          onClick={onBackdropCloseMobileMenu}
          className='bg-modal-overlay w-full h-[100vh] z-10 absolute top-0 left-0'
        >
          <div className='fixed overflow-y-auto flex flex-col justify-between inset-y-0 right-0 z-10 w-full bg-[#09338F] pt-10 pb-[10px] px-4 sm:max-w-[400px] sm:ring-1 sm:ring-gray-900/10'>
            <div className='flex flex-col'>
              <div className='flex items-center justify-between'>
                <Link href='/' className=' flex gap-3'>
                  <Image
                    className='h-auto w-[42px]'
                    src='logo/fix.svg'
                    alt='Next.js Logo'
                    width='0'
                    height='0'
                    priority
                  />
                  <Image
                    className='h-auto w-[42px]'
                    src='logo/lab.svg'
                    alt='Next.js Logo'
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
                  <span className='sr-only'>Close menu</span>
                  <MdOutlineClose
                    className='h-8 w-8 hover:opacity-80  focus:opacity-80 fill-white-dis'
                    aria-hidden='true'
                  />
                </button>
              </div>
              <ul className='space-y-2 py-6'>
                <li>
                  <Link
                    href='#'
                    onClick={toggleMobileMenu}
                    className='text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80'
                  >
                    Ремонт
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    onClick={toggleMobileMenu}
                    className='text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80'
                  >
                    Контакти
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    onClick={toggleMobileMenu}
                    className='text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80'
                  >
                    Блог
                  </Link>
                </li>
                <li>
                  <Link
                    href='#'
                    onClick={toggleMobileMenu}
                    className='text-base font-semibold text-white-dis hover:opacity-80  focus:opacity-80 capitalize '
                  >
                    Для бізнесу
                  </Link>
                </li>
              </ul>
            </div>
            <button
              onClick={toggleMobileMenu}
              className='bg-[#00cc73] flex justify-center items-center rounded-lg m-4 hover:bg-mid-blue focus:bg-mid-blue'
            >
              <p className='whitespace-nowrap  font-semibold tracking-[0.64] text-[#04268b] px-[48px] py-[23px] '>
                Викликати курʼєра
              </p>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
