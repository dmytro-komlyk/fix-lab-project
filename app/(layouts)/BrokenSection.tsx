import React from 'react'

import CategoriesSlider from '../(pages)/repair/components/slider'
import getData from '../(server)/api/service/getData'

export const BrokenSection = async () => {
  const categoriesUrl = `/api/categories?populate=*&sort=id:asc`
  const categoryData = await getData(categoriesUrl)
  return (
    <section className='section'>
      <div className='container'>
        <div className='justify-between gap-8 md:flex'>
          <div className='mb-8 max-w-[270px] md:mb-0'>
            <h3 className='mb-8 font-exo_2 text-2xl font-bold leading-normal text-light-blue'>
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
              className='text-inter rounded-[12px] bg-[#00cc73] px-8 py-5 text-base font-semibold text-dark-blue hover:bg-mid-blue focus:bg-mid-blue'
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
