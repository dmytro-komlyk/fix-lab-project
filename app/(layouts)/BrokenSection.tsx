import React from 'react'
import getData from '../(server)/api/service/getData'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { CategoriesList } from '../(pages)/repair/components/CategoriesList'
import { useWindowSize } from '../(hooks)/useWindowResize'
import CategoriesSlider from '../(pages)/repair/components/slider'

export const BrokenSection = async () => {
  const categoriesUrl = `/api/categories?populate=*&sort=id:asc`
  const categoryData = await getData(categoriesUrl)
  return (
    <section className='section'>
      <div className='container'>
        <div className='md:flex justify-between gap-8'>
          <div className='mb-8 md:mb-0 max-w-[270px]'>
            <h3 className='font-exo_2 text-2xl text-light-blue font-bold leading-normal mb-8'>
              Що зламалося?
            </h3>
            <p className='mb-4'>
              У нас особистий підхід до ремонту кожного гаджета.
            </p>
            <p className='mb-8'>
              Ми приділяємо максимум уваги діагностиці, для того, щоб ефективно
              пофіксити будь-яку поломку, та дати гаджету життя.
            </p>
            <button
              type='button'
              className='bg-[#00cc73] px-8 py-5 rounded-[12px] hover:bg-mid-blue focus:bg-mid-blue text-inter text-base font-semibold text-dark-blue'
            >
              Миттєва консультація
            </button>
          </div>

          <CategoriesSlider categoryData={categoryData} />
        </div>
      </div>
    </section>
  )
}
