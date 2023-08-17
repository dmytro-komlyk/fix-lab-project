import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import type {
  CategoriesSectionProps,
  CategoryItem,
} from '../../../repair/(components)/CategoriesSection'

const CategoryServicesList: React.FC<CategoriesSectionProps> = ({
  categoryData,
}) => {
  return (
    <section className='overflow-hidden bg-gradient-linear-blue  pb-[102px] pt-[171px] max-md:pb-14 max-md:pt-[138px]'>
      <div className='container relative flex flex-col  xl:p-0'>
        <div className='z-[1] flex items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/admin'
          >
            <p>Адмін</p> <MdKeyboardArrowRight size={30} />
          </Link>
          <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
            Ремонт
          </p>
        </div>
        <ul className='mt-14 flex flex-wrap gap-2 xl:gap-6'>
          {categoryData?.data.map((item: CategoryItem) => {
            const categoryPath = item.attributes.slug
            const img = item.attributes.img.data.attributes.url
            const { width } = item.attributes.img.data.attributes
            const { height } = item.attributes.img.data.attributes
            return (
              <li
                key={item.id}
                className='md:w-[calc((100%-32px)/3)] xl:w-[calc((100%-48px)/3)]'
              >
                <Link
                  href={`/admin/repair/${categoryPath}`}
                  className='flex w-full flex-col justify-between rounded-2xl bg-dark-blue md:h-full md:p-4 xl:h-[261px] xl:p-8'
                >
                  <Image
                    className='ml-auto w-auto md:h-[40%] xl:h-[79px]'
                    src={img}
                    width={width}
                    height={height}
                    alt={item.attributes.title}
                  />
                  <h3 className='mr-auto font-semibold text-white-dis md:text-base xl:text-xl'>
                    {item.attributes.title}
                  </h3>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
export default CategoryServicesList
