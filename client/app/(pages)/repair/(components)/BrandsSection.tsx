'use client'

import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import RenderMarkdown from '@/app/(components)/RenderMarkdown'
import Button from '@/app/(layouts)/(components)/Button'
import CallUsCard from '@/app/(layouts)/(components)/CallUsCard'
import InstantAdviceModal from '@/app/(layouts)/(components)/InstantAdviceModal'
import SuccessSubmitBanner from '@/app/(layouts)/(components)/SuccessSubmitBanner'
import type { IContact } from '@/app/(server)/api/service/modules/contactService'
import type { IBrand } from '@/app/(server)/api/service/modules/gadgetService'

import { BrandsSlider } from './BrandsSlider'

export interface BrandsProps {
  contactsData: IContact[]
  gadgetData: {
    title: string
    slug: string
    icon: {
      alt: string
      src: string
    }
    brands: IBrand[]
  }
  brandData?: IBrand
}

const BrandsSection: React.FC<BrandsProps> = ({
  gadgetData,
  contactsData,
  brandData,
}) => {
  const pathname = usePathname()
  const brandPath = pathname.split('/').pop()
  const pathSegments = pathname.split('/')
  const isBrandPage = pathSegments[pathSegments.length - 1]
  const gadgetTitleArr = brandData?.title?.split(' ')
  const gadgetText = gadgetTitleArr?.[gadgetTitleArr.length - 2] ?? ''

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
      <div className='container flex flex-col gap-[27px] pb-[140px] pt-[159px] max-lg:pb-[50px] max-md:pt-[117px]  lg:px-0'>
        <div className='flex flex-wrap items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-dark-blue'
            href='/'
          >
            <p> Головна</p> <MdKeyboardArrowRight size={30} />
          </Link>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-dark-blue'
            href='/repair'
          >
            <p> Ремонт</p> <MdKeyboardArrowRight size={30} />
          </Link>
          {gadgetData && (
            <Link
              className='flex items-center gap-1 text-base font-[400] text-dark-blue'
              href={`/repair/${gadgetData.slug}`}
            >
              <p> {gadgetData.title}</p>
              <MdKeyboardArrowRight size={30} />
            </Link>
          )}
          <p className='text-base font-[300] text-dark-blue/50'>
            {brandData?.title}
          </p>
        </div>
        <div className='mb-8 flex flex-col items-start'>
          {gadgetData && (
            <div className='mb-[50px] h-[80px]'>
              {brandData?.icon && (
                <Image
                  src={gadgetData.icon.src}
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
          <h1 className='mb-[29px] font-exo_2 text-2xl font-bold text-black-dis lg:leading-[1.2px]'>
            Бренди {gadgetText}, які ремонтуємо у сервісному центрі FixLab
          </h1>
          <div className='container mb-[56px] p-0'>
            <BrandsSlider gadgetData={gadgetData} brandData={brandData} />
          </div>
          <div className='flex w-full justify-between gap-16  max-lg:flex-col lg:gap-32'>
            <div className='flex max-xl:w-[600px] max-lg:w-full xl:w-[852px]'>
              {gadgetData.brands?.map(item => (
                <div
                  key={item._id}
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
              <CallUsCard contactsData={contactsData} />
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
