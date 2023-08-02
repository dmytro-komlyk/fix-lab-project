import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CategoryItem,CategoriesSectionProps } from './CategoriesSection'

export const CategoriesList:React.FC<CategoriesSectionProps> = ({categoryData}) => {
  return (
   <ul className='flex flex-wrap gap-2 xl:gap-6'>
          {categoryData?.data.map((item :CategoryItem )=> {
            const categoryPath = item.attributes.slug
            const img = item.attributes.img.data.attributes.url
            const width = item.attributes.img.data.attributes.width
            const height = item.attributes.img.data.attributes.height
            return (
              <li key={item.id} className='md:w-[calc((100%-32px)/3)] xl:w-[calc((100%-48px)/3)]'>
                <Link href={`/repair/${categoryPath}`} className='w-full md:p-4 xl:p-8 bg-dark-blue flex flex-col justify-between rounded-2xl md:h-full xl:h-[261px]'>
                    <Image
                      className='ml-auto md:h-[40%] w-auto xl:h-[79px]'
                      src={img}
                      width={width}
                      height={height}
                      alt={item.attributes.title}
                    />
                    <h3 className='mr-auto text-white-dis font-semibold md:text-base xl:text-xl'>
                      {item.attributes.title}
                    </h3>
                
                </Link>
              </li>
            )
          })}
        </ul>
  )
}
