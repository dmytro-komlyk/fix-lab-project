import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { CategoriesSectionProps, CategoryItem } from './CategoriesSection'

export const CategoriesList: React.FC<CategoriesSectionProps> = ({
  categoryData,
}) => {
  return (
    <ul className='z-10 flex w-[954px] flex-wrap gap-2 xl:gap-6'>
      {categoryData?.data.map((item: CategoryItem) => {
        const categoryPath = item.attributes.slug
        const img = item.attributes.img.data.attributes.url
        const { width, height } = item.attributes.img.data.attributes
        return (
          <li
            key={item.id}
            className='hover-gadget-link h-[180px] rounded-2xl bg-card-repair-gradient md:w-[calc((100%-32px)/3)] xl:h-[261px] xl:w-[calc((100%-48px)/3)]'
          >
            <Link
              href={`/repair/${categoryPath}`}
              className='flex w-full flex-col justify-between rounded-2xl p-8 hover:bg-dark-blue md:h-full xl:h-[261px]'
            >
              <Image
                className='ml-auto w-auto md:h-[40%] xl:h-[70px]'
                src={img}
                width={width}
                height={height}
                alt={item.attributes.title}
              />
              <div className='text-white-dis'>
                <h3 className='mr-auto font-semibold leading-tight md:text-base xl:text-xl'>
                  {item.attributes.title}
                </h3>
                <p className='hidden font-inter text-[12px] xl:text-sm'>
                  Подивитися поломки
                </p>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
