'use client'

import Link from 'next/link'
import { useState } from 'react'
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
  const [isModalShown, setIsModalShown] = useState(false)
  return (
    <section className='section pt-[163px]'>
      <div className='container'>
        <div className='flex items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
            href='/'
          >
            <p> Головна</p> <MdKeyboardArrowRight size={30} />
          </Link>

          <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
            Ремонт
          </p>
        </div>
        <div className='justify-between gap-8 md:flex'>
          <div className='mb-8 max-w-[300px] md:mb-0'>
            <h3 className='mb-8 font-exo_2 text-xl font-bold leading-normal text-light-blue md:text-2xl'>
              Що зламалося?
            </h3>
            <p className='mb-4'>
              У нас є багато варіантів, як подарувати друге життя вашому
              гаджету.
            </p>
            <p className='mb-4'>
              У нас є багато варіантів, як подарувати друге життя вашому
              гаджету.
            </p>
            <p className='mb-8'>
              Або ж, економте час, залишайте заявку на консультацію.
            </p>
            <Button
              toggleModal={() => setIsModalShown(!isModalShown)}
              textButton='Миттєва консультація'
            />
          </div>

          <CategoriesSlider categoryData={categoryData} />
        </div>
      </div>
      {isModalShown && (
        <InstantAdviceModal
          toggleInstantAdviceModal={() => setIsModalShown(!isModalShown)}
        />
      )}
    </section>
  )
}

export default CategoriesSection
