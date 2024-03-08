'use client'

import Image from 'next/image'
import Link from 'next/link'
import { LiaViber } from 'react-icons/lia'

import { trpc } from '../(utils)/trpc/client'
import type { serverClient } from '../(utils)/trpc/serverClient'

export const Footer = ({
  contactsDataInit,
}: {
  contactsDataInit: Awaited<
    ReturnType<(typeof serverClient)['contacts']['getAllPublishedContacts']>
  >
}) => {
  const { data: contactsData } = trpc.contacts.getAllPublishedContacts.useQuery(
    undefined,
    {
      initialData: contactsDataInit,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )

  return (
    <footer className='bg-footer-gradient-linear-blue '>
      <div className='container relative flex flex-col items-start gap-[52px] py-14 md:flex-row md:justify-between md:px-0 xl:gap-[240px]'>
        <div className='z-1 absolute left-[261px] top-0 h-full md:flex'>
          <Image
            src='/background-flicker-footer-pc.svg'
            width={1008}
            height={321}
            alt='flicker'
          />
        </div>
        <div className='z-1 absolute right-0 top-0 hidden size-full max-md:flex'>
          <Image
            src='/background-flicker-footer-mobile.svg'
            width={321}
            height={637}
            alt='flicker'
          />
        </div>
        <div className='flex h-[61px] w-[95px] gap-3 transition-opacity hover:opacity-80 focus:opacity-80 md:h-[75px] md:w-[115px]'>
          <Link href='/' aria-label='Логотип'>
            <Image
              src='/logo.svg'
              alt='FixLab logo'
              width={115}
              height={75}
              priority
            />
          </Link>
        </div>
        <div className='z-10 flex gap-[130px]'>
          <ul className='flex flex-col items-start gap-[10px]'>
            <li>
              <Link
                className='text-center text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
                href='/repair/telefon/brands/apple-phone'
              >
                Ремонт iphone
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
                href='/repair/telefon/brands/xiaomi-phone'
              >
                Ремонт xiaomi
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
                href='/repair/telefon/brands/huawei-phone'
              >
                Ремонт huawei
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
                href='/repair/telefon/brands/samsung-phone'
              >
                Ремонт samsung
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
                href='/repair/noutbuk'
              >
                Ремонт ноутбуків
              </Link>
            </li>
            <li>
              <Link
                className='text-center text-base font-semibold uppercase tracking-wide text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
                href='/repair/dzhojstik'
              >
                Ремонт dualsense
              </Link>
            </li>
          </ul>
          <ul className='flex flex-col gap-[29px] md:hidden'>
            <li>
              <Link
                className='flex size-12 items-center justify-center rounded-[50%] bg-white-dis uppercase'
                href='https://www.instagram.com/fixlab.com.ua/'
              >
                <Image
                  className='size-[25px]'
                  src='/icons/skill-icons_instagram.svg'
                  width='0'
                  height='0'
                  alt='Instagram icon'
                />
              </Link>
            </li>
            <li>
              <Link
                className='flex size-12 items-center  justify-center rounded-[50%] bg-white-dis uppercase'
                href='/#'
              >
                <Image
                  className='size-[25px]'
                  src='/icons/logos_telegram.svg'
                  width='0'
                  height='0'
                  alt='Telegram icon'
                />
              </Link>
            </li>
            <li>
              <Link
                className='flex size-12 items-center  justify-center rounded-[50%] bg-white-dis uppercase'
                href='/#'
              >
                <LiaViber size={28} fill='#8c5da7' />
              </Link>
            </li>
          </ul>
        </div>
        <div className='z-10 flex gap-28 md:flex-row-reverse lg:flex-row lg:gap-[235px]'>
          <ul className='flex flex-col gap-2'>
            <li>
              <Link
                href='/repair'
                className='text-base font-semibold text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Ремонт
              </Link>
            </li>
            <li>
              <Link
                href='/contacts'
                className='text-base font-semibold text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Контакти
              </Link>
            </li>
            <li>
              <Link
                href='/novosti'
                className='text-base font-semibold text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Блог
              </Link>
            </li>
            <li>
              <Link
                href='/corporate'
                className='text-base font-semibold capitalize text-white-dis  transition-opacity hover:opacity-80  focus:opacity-80'
              >
                Для бізнесу
              </Link>
            </li>
          </ul>
          <div className='flex flex-col items-end gap-4 md:flex-col md:items-start md:gap-[30px] lg:flex lg:items-end lg:gap-[25px]'>
            <ul className='flex flex-col gap-1'>
              {contactsData.map(item => (
                <li key={item.id}>
                  {item.phones.map(phoneNumber => (
                    <a
                      key={phoneNumber}
                      href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                      className='text-base font-medium leading-7 tracking-wide text-mid-green transition-colors hover:text-white-dis focus:text-white-dis'
                    >
                      {phoneNumber}
                    </a>
                  ))}
                </li>
              ))}
            </ul>
            <div className='flex flex-col items-start gap-1 '>
              <span className='text-base  text-white-dis'>
                {contactsData[0]?.workingTime}
              </span>
              <span className='text-base  text-white-dis '>
                {contactsData[0]?.workingDate}
              </span>
            </div>
            <ul className='flex  max-md:hidden md:flex md:gap-3'>
              <li>
                <Link
                  className='flex size-12 items-center justify-center rounded-[50%] bg-white-dis transition-opacity visited:no-underline  hover:opacity-80 focus:opacity-80'
                  href='https://www.instagram.com/fixlab.com.ua/'
                  aria-label='Соціальні мережі'
                  target='_blank'
                >
                  <Image
                    className='size-[25px]'
                    src='/icons/skill-icons_instagram.svg'
                    width='0'
                    height='0'
                    alt='Instagram icon'
                  />
                </Link>
              </li>
              <li>
                <Link
                  className='flex size-12 items-center justify-center rounded-[50%] bg-white-dis transition-opacity visited:no-underline  hover:opacity-80 focus:opacity-80'
                  href='https://t.me/fixlab_saperka'
                  target='_blank'
                  aria-label='Соціальні мережі'
                >
                  <Image
                    className='size-[25px]'
                    src='/icons/logos_telegram.svg'
                    width='0'
                    height='0'
                    alt='Telegram icon'
                  />
                </Link>
              </li>
              <li>
                <Link
                  className='flex size-12 items-center justify-center rounded-[50%] bg-white-dis transition-opacity visited:no-underline  hover:opacity-80 focus:opacity-80'
                  href='viber://chat?number=%2B380632272728'
                  aria-label='Соціальні мережі'
                  target='_blank'
                >
                  <LiaViber size={28} fill='#8c5da7' />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
