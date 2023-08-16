'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'

interface GadgetServicesListProps {
  toggleCostRepairModal: () => void
  categoryData: {
    data: {
      attributes: {
        recommend_brands: {
          data: {
            id: number
            attributes: {
              url: string
              width: number
              height: number
              name: string
            }
          }[]
        }
      }
    }[]
  }
  subcategoriesData: {
    data: {
      id: number
      attributes: {
        category: {
          data: {
            attributes: {
              slug: string
            }
          }
        }
        slug: string
        title: string
        price: string
      }
    }[]
  }
}

const GadgetServicesList: React.FC<GadgetServicesListProps> = ({
  categoryData,
  subcategoriesData,
  toggleCostRepairModal,
}) => {
  return (
    <>
      <div className='mb-14'>
        <p className='mb-8 font-exo_2 text-xl font-semibold text-white-dis'>
          Бренди, які ремонтуємо
        </p>
        <ul className='flex flex-wrap gap-8 max-md:gap-4'>
          {categoryData.data.map(categoryItem => {
            return categoryItem.attributes.recommend_brands.data.map(item => {
              const img = item.attributes.url
              const { width } = item.attributes
              const { height } = item.attributes
              const { name } = item.attributes
              return (
                <li
                  className='flex h-[77px] w-[77px]  items-center justify-center rounded-[50%] bg-white-dis'
                  key={item.id}
                >
                  <Image src={img} width={width} height={height} alt={name} />
                </li>
              )
            })
          })}
        </ul>
      </div>
      <p className='mb-8 font-exo_2 text-xl font-semibold text-white-dis md:hidden'>
        Поломки
      </p>
      <ul className='mb-14 flex  flex-col'>
        {subcategoriesData.data.map(item => {
          const categoryPath = item.attributes.category.data.attributes.slug
          const subcategoryPath = item.attributes.slug
          return (
            <li
              className=' hover:op border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 transition-opacity duration-300 first:rounded-t-xl last:rounded-b-xl hover:opacity-100 focus:opacity-100'
              key={item.id}
            >
              <Link
                className='flex  items-center justify-between  px-6 py-[20px] max-md:flex-col max-md:items-start  max-md:gap-2  max-md:py-[8px] '
                href={`/repair/${categoryPath}/${subcategoryPath}`}
              >
                <h2 className='font-exo_2 text-xl font-semibold text-dark-blue max-lg:text-lg '>
                  {item.attributes.title}
                </h2>
                <p className=' text-[18px] font-[400] text-black-dis '>
                  {item.attributes.price}
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
      <button
        type='button'
        onClick={toggleCostRepairModal}
        className='group relative w-full rounded-xl bg-mid-blue'
      >
        <p className=' flex justify-between px-6 py-4 text-start font-exo_2 text-lg font-bold  text-dark-blue  transition-transform  duration-300 group-hover:translate-x-3  group-hover:scale-[1.05] max-md:font-inter max-md:text-base max-md:font-semibold max-[380px]:text-sm'>
          Розрахувати вартість ремонту
        </p>
        <span className='absolute right-6 top-[50%] translate-y-[-50%] transition-transform  duration-300 group-hover:scale-[1.4]  max-[380px]:right-2'>
          <FiArrowUpRight size={42} color='#1B37AA' />
        </span>
      </button>
    </>
  )
}

export default GadgetServicesList
