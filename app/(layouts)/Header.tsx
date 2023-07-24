'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  number: Yup.string().required('Number is required'),
  address: Yup.string().required('Address is required'),
})

import Image from 'next/image'
import Link from 'next/link'
import { FaBars } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'
import { MdOutlineClose } from 'react-icons/md'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'

export const Header: React.FC = () => {
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const toggleDropdownRegionRef = useRef<HTMLDivElement>(null)
  const toggleDropdownPhoneRef = useRef<HTMLUListElement>(null)
  const itemsRegion: Array<string> = ['Голосіївський', 'Оболонський']

  const [showModal, setShowModal] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [isOpenItem, setIsOpenItem] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [selectedRegionItem, setSelectedRegionItem] =
    useState<string>('Голосіївський')

  // Save to LocalStorage
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
  //

  // DropDown
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
  //

  // Mobile Menu
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const onBackdropCloseMobileMenu = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        setMobileMenuOpen(false)
      }
    },
    [],
  )

  const handleEscKeyPressMenu = useCallback((event: { code: string }) => {
    if (event.code === 'Escape') {
      setMobileMenuOpen(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleEscKeyPressMenu)

    return () => {
      window.removeEventListener('keydown', handleEscKeyPressMenu)
    }
  }, [handleEscKeyPressMenu])
  //

  // Modal
  const toggleModal = useCallback(() => {
    setShowModal(prev => !prev)
  }, [])

  const handleEscKeyPressModal = useCallback((event: { code: string }) => {
    if (event.code === 'Escape') {
      setShowModal(false)
    }
  }, [])

  const onBackdropCloseModal = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        setShowModal(false)
      }
    },
    [],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleEscKeyPressModal)

    return () => {
      window.removeEventListener('keydown', handleEscKeyPressModal)
    }
  }, [handleEscKeyPressModal])
  //

  // Scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0
      setIsScrolled(isScrolled)
      window.localStorage.setItem('isScrolled', JSON.stringify(isScrolled))
    }

    // Add the scroll event listener directly on the window
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup: Remove the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  //

  const handleSubmit = (event: { target: any; currentTarget: any }) => {}

  return (
    <header
      className={`fixed left-0 top-0 flex w-full items-center max-md z-10 transition-colors ${
        isScrolled ? ' bg-[#04268B]' : ''
      }`}
    >
      {/* Navigation */}

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
          {/* Phone Toggle Desktop */}

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

          {/* Modal Open Button */}

          <button
            onClick={toggleModal}
            className='hidden lg:flex bg-[#00cc73] justify-center items-center min-w-[256px] rounded-[12px] hover:bg-mid-blue focus:bg-mid-blue'
          >
            <p className='font-semibold text-base text-[#04268b]  pt-[23px] pb-[20px] tracking-wide'>
              Викликати курʼєра
            </p>
          </button>
        </div>

        {/* Phone Toggle Mobile */}

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

      {/* Mobile Menu */}

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
              onClick={() => {
                toggleMobileMenu()
                toggleModal()
              }}
              className='bg-[#00cc73] flex justify-center items-center rounded-lg m-4 hover:bg-mid-blue focus:bg-mid-blue'
            >
              <p className='whitespace-nowrap  font-semibold tracking-[0.64] text-[#04268b] px-[48px] py-[23px] '>
                Викликати курʼєра
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Modal */}

      {showModal && (
        <div
          ref={modalRef}
          onClick={onBackdropCloseModal}
          className='fixed top-0 left-0  z-50 w-full flex justify-center items-center bg-modal-overlay  h-full'
        >
          <div className='relative max-w-[414px]  bg-[#00cc73] rounded-2xl flex-col justify-start items-center p-14 max-sm:px-4'>
            <button
              type='button'
              className=' absolute top-4 right-4 text-center white-dis-700'
              onClick={toggleModal}
            >
              <MdOutlineClose
                className='h-8 w-8 hover:opacity-80  focus:opacity-80 fill-white-dis'
                aria-hidden='true'
              />
            </button>
            <h3 className='font-semibold text-white-dis text-center mb-8 text-xl '>
              Потрібен курʼєр!
            </h3>
            <Formik
              initialValues={{
                name: '',
                number: '',
                address: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className='flex flex-col justify-center items-center gap-4'>
                <div className=''>
                  <Field
                    type='text'
                    id='name'
                    name='name'
                    className='w-[302px] max-md:w-[280px] h-[58px] rounded-xl px-6 py-2'
                    autoComplete='off'
                    placeholder='Імʼя'
                  />
                </div>

                <div className=''>
                  <Field
                    type='text'
                    id='number'
                    name='number'
                    className='w-[302px] max-md:w-[280px] h-[58px] rounded-xl px-6 py-2'
                    autoComplete='off'
                    placeholder='Номер телефону'
                  />
                </div>

                <div className=''>
                  <Field
                    as='textarea'
                    id='address'
                    name='address'
                    className='w-[302px] max-md:w-[280px] h-[144px] rounded-xl px-6 py-2'
                    autoComplete='off'
                    placeholder='Адреса'
                  />
                  {/* <ErrorMessage
                        name='address'
                        component='div'
                        className='text-red-600 text-sm'
                      /> */}
                </div>

                <button
                  type='submit'
                  onClick={() => {
                    toggleModal()
                  }}
                  className=' bg-dark-blue flex justify-center items-center rounded-lg  hover:bg-[#0B122F] focus:bg-[#0B122F]  w-full mt-4'
                >
                  <p className='whitespace-nowrap text-base  font-semibold tracking-[0.64] text-white-dis  pt-[23px] pb-[20px]'>
                    Потрібен курʼєр
                  </p>
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </header>
  )
}
