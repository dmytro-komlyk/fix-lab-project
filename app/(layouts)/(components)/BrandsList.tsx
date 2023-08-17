import Image from 'next/image'
import React from 'react'

export interface IBrandsListProps {
  categoryData: {
    data: {
      attributes: {
        recommend_brands: {
          data: {
            id: string
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
}

const BrandsList: React.FC<IBrandsListProps> = ({ categoryData }) => {
  return (
    <ul className='flex flex-wrap gap-8 max-md:gap-4'>
      {categoryData.data.map(categoryItem => {
        return categoryItem.attributes.recommend_brands.data.map(item => {
          const img = item.attributes.url
          const { width, height, name } = item.attributes
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
  )
}

export default BrandsList
