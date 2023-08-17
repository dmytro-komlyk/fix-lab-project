'use client'

import MarkdownIt from 'markdown-it'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { MdKeyboardArrowRight } from 'react-icons/md'

import type { IBrandsListProps } from '@/app/(layouts)/(components)/BrandsList'
import BrandsList from '@/app/(layouts)/(components)/BrandsList'
import Button from '@/app/(layouts)/(components)/Button'
import CallUsCard from '@/app/(layouts)/(components)/CallUsCard'
import CostRepairModal from '@/app/(layouts)/(components)/CostRepairModal'
import InstantAdviceModal from '@/app/(layouts)/(components)/InstantAdviceModal'
import type { IServicesListProps } from '@/app/(layouts)/(components)/ServicesList'
import ServicesList from '@/app/(layouts)/(components)/ServicesList'

interface SubcategoryItem {
  id: string
  attributes: {
    img_content: {
      data: {
        attributes: {
          url: string
        }
      }
    }
    category: {
      data: {
        attributes: {
          title: string
          slug: string
        }
      }
    }
    title: string
    description: string
    guarantee?: string
    repair_time: string
    top_text_content: string
    text_content: string
  }
}

interface SubcategorySectionProps extends IServicesListProps, IBrandsListProps {
  subcategoryDiagnosticData: {
    data: SubcategoryItem[]
  }
}

const SubcategorySection: React.FC<SubcategorySectionProps> = ({
  subcategoryDiagnosticData,
  categoryData,
  subcategoriesData,
}) => {
  const markdown = new MarkdownIt({
    html: true,
  })
  const [showCostRepair, setShowCostRepair] = useState<boolean>(false)
  const [showInstantAdviceModal, setShowInstantAdviceModal] =
    useState<boolean>(false)

  const toggleInstantAdviceModal = useCallback(() => {
    setShowInstantAdviceModal(prev => !prev)
  }, [setShowInstantAdviceModal])

  const toggleCostRepairModal = useCallback(() => {
    setShowCostRepair(prev => !prev)
  }, [])

  return (
    <section className='overflow-hidden bg-gradient-linear-blue'>
      <div className='container relative pb-[39px] pt-[151px]'>
        <div className=' absolute left-[335px] top-[175px] hidden lg:block'>
          <Image
            src='/background-flicker-center.svg'
            width={327}
            height={1008}
            alt='flicker'
          />
        </div>
        <div className='absolute left-[0] top-[468px] hidden lg:block'>
          <Image
            src='/background-flicker-left.svg'
            width={328}
            height={1008}
            alt='flicker'
          />
        </div>
        {subcategoryDiagnosticData.data.map(item => {
          const categoryTitle = item.attributes.category.data.attributes.title
          const categorySlug = item.attributes.category.data.attributes.slug
          return (
            <div className='flex flex-wrap items-center gap-1' key={item.id}>
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
              <Link
                className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
                href={`/repair/${categorySlug}`}
              >
                <p> {categoryTitle}</p> <MdKeyboardArrowRight size={30} />
              </Link>
              <p className='text-base font-[300] text-[#3EB9F0] opacity-70'>
                {' '}
                {item.attributes.title}
              </p>
            </div>
          )
        })}
        <div className='flex flex-col pb-[14px] pt-[28px]'>
          <div>
            {subcategoryDiagnosticData.data.map(item => {
              const img = item.attributes.img_content.data.attributes.url
              return (
                <div
                  className='flex flex-col items-start justify-between gap-14 lg:flex-row lg:gap-32'
                  key={item.id}
                >
                  <div className='flex flex-col gap-8 lg:w-[411px] lg:gap-14'>
                    <div className='flex flex-col items-start gap-8 lg:gap-14'>
                      <h2 className='font-exo_2 text-xl font-semibold leading-7 text-white-dis lg:text-2xl lg:font-bold lg:leading-10'>
                        {item.attributes.title}
                      </h2>
                      <div
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html: markdown.render(item.attributes.description),
                        }}
                        className='text-base font-[400] text-white-dis'
                      />
                      <Button
                        textButton='Миттєва консультація'
                        toggleModal={toggleInstantAdviceModal}
                      />
                    </div>
                    <CallUsCard />
                  </div>
                  <div className='flex flex-col gap-8 lg:w-[737px] lg:gap-14'>
                    <div>
                      <Image
                        className='min-h-[245px] w-full rounded-2xl object-cover md:max-h-[340px]'
                        src={img}
                        width={358}
                        height={245}
                        alt={item.attributes.title}
                        priority
                      />
                    </div>
                    <div className='flex flex-col gap-8'>
                      <h3 className='font-exo_2 text-xl font-semibold text-white-dis'>
                        {item.attributes.top_text_content}
                      </h3>
                      <div
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html: markdown.render(item.attributes.text_content),
                        }}
                        className='gap-6 text-base font-[400] text-white-dis'
                      />
                    </div>
                    <div className='flex flex-col gap-14'>
                      <div>
                        <p className='mb-8 font-exo_2 text-xl font-semibold text-white-dis'>
                          Бренди, які ремонтуємо
                        </p>
                        <BrandsList categoryData={categoryData} />
                      </div>
                      <div>
                        <p className='mb-8 font-exo_2 text-xl font-semibold text-white-dis'>
                          Поломки
                        </p>
                        <ServicesList subcategoriesData={subcategoriesData} />
                      </div>
                      <button
                        type='button'
                        onClick={toggleCostRepairModal}
                        className='group relative w-full rounded-xl bg-mid-green'
                      >
                        <p className='flex justify-between px-6 py-4 text-start font-exo_2 text-lg font-bold  text-dark-blue  transition-transform  duration-300 group-hover:translate-x-3  group-hover:scale-[1.05] max-md:font-inter max-md:text-base max-md:font-semibold max-[380px]:text-sm'>
                          Розрахувати вартість ремонту
                        </p>
                        <span className='absolute right-6 top-[50%] translate-y-[-50%] transition-transform  duration-300 group-hover:scale-[1.4]  max-[380px]:right-2'>
                          <FiArrowUpRight
                            size={42}
                            className='text-dark-blue'
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {showCostRepair && (
        <CostRepairModal toggleCostRepairModal={toggleCostRepairModal} />
      )}
      {showInstantAdviceModal && (
        <InstantAdviceModal
          toggleInstantAdviceModal={toggleInstantAdviceModal}
        />
      )}
    </section>
  )
}

export default SubcategorySection
