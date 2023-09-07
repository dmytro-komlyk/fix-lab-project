import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useWindowSize } from '@/app/(hooks)/useWindowResize'

import { CategoriesList } from './CategoriesList'
import type { CategoriesSectionProps, CategoryItem } from './CategoriesSection'

export const CategoriesSlider: React.FC<CategoriesSectionProps> = ({
  categoryData,
}) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1.15, spacing: 16 },
  })
  const size = useWindowSize()

  return size.width > 767 ? (
    <CategoriesList categoryData={categoryData} />
  ) : (
    <div className='navigation-wrapper relative z-10 mr-[-16px] md:mr-auto'>
      <div ref={ref} className='keen-slider'>
        {categoryData.data.map((item: CategoryItem) => {
          const categoryPath = item.attributes.slug
          const img = item.attributes.img.data.attributes.url
          const { width, height } = item.attributes.img.data.attributes
          return (
            <Link
              key={item.id}
              href={`/repair/${categoryPath}`}
              className='keen-slider__slide hover-gadget-link flex h-[261px] flex-col justify-between rounded-2xl bg-card-repair-gradient p-8'
            >
              <Image
                className='ml-auto'
                src={img}
                width={width}
                height={height}
                alt={item.attributes.title}
              />
              <div className='text-white-dis'>
                <h3 className='mr-auto text-xl font-semibold leading-7'>
                  {item.attributes.title}
                </h3>
                <p className='hidden font-inter text-xs xl:text-sm'>
                  Подивитися поломки
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
