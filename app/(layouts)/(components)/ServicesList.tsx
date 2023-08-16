import Link from 'next/link'
import React from 'react'

export interface IServicesListProps {
  subcategoriesData: {
    data: {
      id: string
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
        price: number
      }
    }[]
  }
}

const ServicesList: React.FC<IServicesListProps> = ({ subcategoriesData }) => {
  return (
    <ul>
      {subcategoriesData.data.map(item => {
        const categoryPath = item.attributes.category.data.attributes.slug
        const subcategoryPath = item.attributes.slug
        return (
          <li
            className='hover:op border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 transition-opacity duration-300 first:rounded-t-xl last:rounded-b-xl hover:opacity-100 focus:opacity-100'
            key={item.id}
          >
            <Link
              className='flex items-center justify-between px-6 py-[20px] max-md:flex-col max-md:items-start  max-md:gap-2  max-md:py-[8px] '
              href={`/repair/${categoryPath}/${subcategoryPath}`}
            >
              <h2 className='font-exo_2 text-lg font-semibold text-dark-blue max-lg:text-lg '>
                {item.attributes.title}
              </h2>
              <p className='text-md font-[400] text-black-dis'>
                {item.attributes.price}
              </p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default ServicesList
