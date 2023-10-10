'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import type {
  IBrand,
  IGadget,
} from '@/app/(server)/api/service/modules/gadgetService'

import { BrandsSlider } from './BrandsSlider'

export interface BrandsProps {
  brandData?: IBrand[]
  gadgetData?: IGadget
}

const BrandsSection: React.FC<BrandsProps> = ({ brandData, gadgetData }) => {
  return (
    <section className='overflow-hidden'>
      <div className='container flex flex-col gap-[27px] pb-[140px] pt-[158px] max-lg:pb-[50px] lg:px-0'>
        <div className='flex flex-wrap items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
            href='/'
          >
            <p> Головна</p> <MdKeyboardArrowRight size={30} />
          </Link>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
            href='/repair'
          >
            <p> Ремонт</p> <MdKeyboardArrowRight size={30} />
          </Link>
          {gadgetData && (
            <Link
              className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
              href={`/repair/${gadgetData.slug}`}
            >
              <p> {gadgetData.title}</p>
              <MdKeyboardArrowRight size={30} />
            </Link>
          )}
          <p className='text-base font-[300] text-[#3EB9F0] opacity-70'>
            Бренди які ми ремонтуємо
          </p>
        </div>
        <div className='flex flex-col items-start mb-8'>
          {gadgetData && (
            <div className='relative h-[80px] flex mb-8'>
              <Image
                src={`http://95.217.34.212:30000${gadgetData.icon}`}
                width={0}
                height={80}
                style={{
                  width: '100%',
                  height: 'auto',
                  filter:
                    'brightness(0) saturate(100%) invert(13%) sepia(26%) saturate(7352%) hue-rotate(220deg) brightness(109%) contrast(113%)',
                }}
                alt={gadgetData.title}
              />
            </div>
          )}
          <h1 className='font-exo_2 text-2xl font-bold leading-[1.2] tracking-[0.060em] text-black-dis mb-[10px]'>
            Бренди телефонів, які ремонтуємо у сервісному центрі FixLab
          </h1>
          <BrandsSlider brandData={brandData} gadgetData={gadgetData} />
        </div>
      </div>
    </section>
  )
}

export default BrandsSection
