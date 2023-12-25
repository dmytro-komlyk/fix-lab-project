'use client'

import { SERVER_URL } from '@client/app/(lib)/constants'
import { trpc } from '@client/app/(utils)/trpc/client'
import type { serverClient } from '@client/app/(utils)/trpc/serverClient'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import RenderMarkdown from '@/app/(components)/RenderMarkdown'
import Button from '@/app/(layouts)/(components)/Button'
import CallUsCard from '@/app/(layouts)/(components)/CallUsCard'

import { BrandsSlider } from './BrandsSlider'

const InstantAdviceModal = dynamic(
  () => import('@/app/(layouts)/(components)/InstantAdviceModal'),
)
const SuccessSubmitBanner = dynamic(
  () => import('@/app/(layouts)/(components)/SuccessSubmitBanner'),
)

const BrandsSection = ({
  gadgetDataInit,
  contactsDataInit,
  brandDataInit,
}: {
  gadgetDataInit: Awaited<
    ReturnType<(typeof serverClient)['gadgets']['getBySlug']>
  >
  contactsDataInit: Awaited<
    ReturnType<(typeof serverClient)['contacts']['getAllPublished']>
  >
  brandDataInit: Awaited<
    ReturnType<(typeof serverClient)['brands']['getBySlug']>
  >
}) => {
  const { data: gadgetData } = trpc.gadgets.getBySlug.useQuery(
    gadgetDataInit.slug,
    {
      initialData: gadgetDataInit,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )
  const { data: contactsData } = trpc.contacts.getAllPublished.useQuery(
    undefined,
    {
      initialData: contactsDataInit,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )
  const { data: brandData } = trpc.brands.getBySlug.useQuery(
    brandDataInit.slug,
    {
      initialData: brandDataInit,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )
  const pathname = usePathname()
  const brandPath = pathname.split('/').pop()
  const pathSegments = pathname.split('/')
  const isBrandPage = pathSegments[pathSegments.length - 3]
  const gadgetText =
    (isBrandPage === 'telefon' && 'телефонів') ||
    (isBrandPage === 'planshet' && 'планшетів') ||
    (isBrandPage === 'noutbuk' && 'ноутбуків')

  // Modal window
  const [submitSuccessInstantAdviceModal, setSubmitSuccessInstantAdviceModal] =
    useState<boolean>(false)

  const [showInstantAdviceModal, setShowInstantAdviceModal] =
    useState<boolean>(false)

  const toggleSuccessSubmitInstantAdviceModal = useCallback(() => {
    setSubmitSuccessInstantAdviceModal(prev => !prev)
  }, [])

  const toggleInstantAdviceModal = useCallback(() => {
    setShowInstantAdviceModal(prev => !prev)
  }, [setShowInstantAdviceModal])

  return (
    <section className='overflow-hidden'>
      <div className='container flex flex-col pb-[140px] pt-[159px] max-lg:pb-[50px] max-md:pt-[117px] md:gap-[27px]  lg:px-0'>
        <div className='flex flex-wrap items-center md:gap-2 '>
          <Link
            className='flex items-center gap-1 text-md font-[400] text-dark-blue'
            href='/'
          >
            <p> Головна</p> <MdKeyboardArrowRight size={25} />
          </Link>
          <Link
            className='flex items-center gap-1 text-md font-[400] text-dark-blue'
            href='/repair'
          >
            <p> Ремонт</p> <MdKeyboardArrowRight size={25} />
          </Link>
          {gadgetData && (
            <Link
              className='flex items-center gap-1 text-md font-[400] text-dark-blue  max-md:tracking-tighter'
              href={`/repair/${gadgetData.slug}`}
            >
              {gadgetData?.title}

              <MdKeyboardArrowRight size={25} />
            </Link>
          )}
          <p className='text-md font-[300] text-dark-blue/50'>
            Бренди які ремонтуємо
          </p>
        </div>
        <div className='mb-8 flex flex-col items-start'>
          {gadgetData && (
            <div className='mb-[55px] h-[80px] max-md:hidden'>
              {brandData?.icon && (
                <Image
                  src={`${SERVER_URL}/${gadgetData.icon.file.path}`}
                  width={0}
                  height={80}
                  style={{
                    width: '100%',
                    height: 'auto',
                    filter:
                      'brightness(0) saturate(100%) invert(13%) sepia(26%) saturate(7352%) hue-rotate(220deg) brightness(109%) contrast(113%)',
                  }}
                  alt={gadgetData.icon.alt}
                />
              )}
            </div>
          )}
          <h1 className='mb-[25px] font-exo_2 text-2xl font-bold text-black-dis max-md:mb-[2px] max-md:mt-[16px] max-md:text-[23px] max-md:leading-[30px] max-md:tracking-[0.3px] lg:leading-[1.2px] xl:tracking-[1.9px]'>
            Бренди {gadgetText}, які ремонтуємо у сервісному центрі FixLab
          </h1>
          <div className='container mb-[56px] p-0'>
            <BrandsSlider
              gadgetDataInit={gadgetData}
              brandDataInit={brandData}
            />
          </div>
          <div className='flex w-full justify-between gap-16  max-lg:flex-col lg:gap-32'>
            <div className='flex max-xl:w-[600px] max-lg:w-full xl:w-[852px]'>
              {gadgetData.brands?.map(item => (
                <div
                  key={item.id}
                  className={`${
                    brandPath === item.slug
                      ? 'flex   w-[852px] max-xl:max-w-[852px]'
                      : 'hidden'
                  }`}
                >
                  <RenderMarkdown markdown={item.article} />
                </div>
              ))}
              {isBrandPage === 'brands' && (
                <div className='flex w-[852px] max-xl:max-w-[852px] '>
                  <RenderMarkdown markdown={gadgetData?.brands[0]?.article} />
                </div>
              )}
            </div>
            <div className='ml-auto flex flex-col gap-16 max-lg:hidden'>
              <CallUsCard contactsDataInit={contactsData} />
              <Button
                text='Миттєва консультація'
                toggleModal={toggleInstantAdviceModal}
                styles='group relative flex min-w-[256px] py-4 items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
                textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
              />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showInstantAdviceModal && (
          <InstantAdviceModal
            toggleInstantAdviceModal={toggleInstantAdviceModal}
            setSubmitSuccess={setSubmitSuccessInstantAdviceModal}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {submitSuccessInstantAdviceModal && (
          <SuccessSubmitBanner
            toggleSuccessSubmitModal={toggleSuccessSubmitInstantAdviceModal}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default BrandsSection
