import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CategoriesSectionProps, CategoryItem } from './CategoriesSection'
import { useKeenSlider } from 'keen-slider/react'
import { useWindowSize } from '@/app/(hooks)/useWindowResize'
import { CategoriesList } from './CategoriesList'

export const CategoriesSlider: React.FC<CategoriesSectionProps> = ({
  categoryData,
}) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    
    slides: { perView: 1.13, spacing: 16 },
  })
  const size = useWindowSize()

  return size.width > 767 ? (
    <CategoriesList categoryData={categoryData} />
  ) : (
    <div className='navigation-wrapper'>
      <div ref={ref} className='keen-slider'>
        {categoryData.data.map((item: CategoryItem) => {
          const categoryPath = item.attributes.slug
          const img = item.attributes.img.data.attributes.url
          const width = item.attributes.img.data.attributes.width
          const height = item.attributes.img.data.attributes.height
          return (
            <Link
              key={item.id}
              href={`/repair/${categoryPath}`}
              className='keen-slider__slide h-[261px] p-8 bg-dark-blue flex flex-col justify-between rounded-2xl'
            >
              <Image
                className='ml-auto'
                src={img}
                width={width}
                height={height}
                alt={item.attributes.title}
              />
              <h3 className='font-exo_2 text-white-dis font-semibold text-xl mr-auto'>
                {item.attributes.title}
              </h3>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
