import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { CategoriesSectionProps, CategoryItem } from './CategoriesSection'

export const CategoriesList: React.FC<CategoriesSectionProps> = ({
  categoryData,
}) => {
  return (
    <ul className='relative z-10 flex flex-wrap gap-2 xl:gap-6'>
      {categoryData?.data.map((item: CategoryItem) => {
        const categoryPath = item.attributes.slug
        const img = item.attributes.img.data.attributes.url
        const { width } = item.attributes.img.data.attributes
        const { height } = item.attributes.img.data.attributes
        return (
          <li
            key={item.id}
            className='h-[150px] md:w-[calc((100%-32px)/3)] xl:h-[261px] xl:w-[calc((100%-48px)/3)]'
          >
            <Link
              href={`/repair/${categoryPath}`}
              className='hover-gadget-link flex w-full flex-col justify-between rounded-2xl bg-dark-blue transition-all md:h-full md:p-4 xl:h-[261px] xl:p-8'
            >
              <Image
                className='ml-auto w-auto md:h-[40%] xl:h-[79px]'
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
