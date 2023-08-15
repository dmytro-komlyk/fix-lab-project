'use client'

import React, { useState } from 'react'

import type { CategoriesSectionProps } from '../(pages)/repair/(components)/CategoriesSection'
import CategoriesSlider from '../(pages)/repair/(components)/slider'
import Button from './(components)/Button'
import InstantAdviceModal from './(components)/InstantAdviceModal'

export const BrokenSection: React.FC<CategoriesSectionProps> = ({
  categoryData,
}) => {
  const [isModalShown, setIsModalShown] = useState(false)

  return (
    <section className='section md:mb-[-50px] lg:mb-[-100px] xl:mb-[-150px]'>
      <div className='container'>
        <div className='justify-between gap-8 md:flex'>
          <div className='mb-8 max-w-[270px] md:mb-0'>
            <h3 className='mb-8 font-exo_2 text-xl font-bold leading-normal text-light-blue md:text-2xl'>
              Що зламалося?
            </h3>
            <p className='mb-4'>
              У нас є багато варіантів, як подарувати друге життя вашому
              гаджету.
            </p>
            <p className='mb-4'>
              Обирайте потрібний пристрій, що зламався, та дізнавайтесь ціни на
              ремонт.
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
