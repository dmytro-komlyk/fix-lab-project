'use client'

import Link from 'next/link'
import { useCallback, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import Button from '@/app/(layouts)/(components)/Button'
import InstantAdviceModal from '@/app/(layouts)/(components)/InstantAdviceModal'

import { CategoriesSlider } from './CategoriesSlider'

export interface CategoriesSectionProps {
  categoryData: {
    data: CategoryItem[]
  }
}
export interface CategoryItem {
  id: number
  attributes: {
    slug: string
    title: string
    img: {
      data: {
        attributes: {
          url: string
          height: number
          width: number
        }
      }
    }
  }
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categoryData,
}) => {
  const [showInstantAdviceModal, setShowInstantAdviceModal] =
    useState<boolean>(false)

  const toggleInstantAdviceModal = useCallback(() => {
    setShowInstantAdviceModal(prev => !prev)
  }, [setShowInstantAdviceModal])
  return (
    <section className='section py-[163px]'>
      <div className='container flex flex-col gap-8 md:px-0'>
        <div className='flex items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
            href='/'
          >
            <p> Головна</p>
            <MdKeyboardArrowRight size={30} />
          </Link>

          <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
            Ремонт
          </p>
        </div>
        <div className='flex justify-between gap-8 max-md:flex-col'>
          <div className='flex w-[300px] flex-col gap-8 md:mb-0'>
            <h3 className='font-exo_2 text-xl font-bold leading-normal text-light-blue md:text-2xl'>
              Що зламалося?
            </h3>
            <p className='text-base font-normal'>
              У нас є багато варіантів, як подарувати друге життя вашому
              гаджету.
            </p>
            <p className='text-base font-normal'>
              Обирайте потрібний пристрій, що зламався, та дізнавайтесь ціни на
              ремонт.
            </p>
            <p className='text-base font-normal'>
              Або ж, економте час, залишайте заявку на консультацію.
            </p>
            <Button
              text='Миттєва консультація'
              toggleModal={toggleInstantAdviceModal}
              styles='group relative flex w-[256px] py-4 items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
              textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
            />
          </div>

          <CategoriesSlider categoryData={categoryData} />
        </div>
      </div>
      {showInstantAdviceModal && (
        <InstantAdviceModal
          toggleInstantAdviceModal={toggleInstantAdviceModal}
        />
      )}
    </section>
  )
}

export default CategoriesSection
