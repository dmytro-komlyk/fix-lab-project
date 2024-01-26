import Image from 'next/image'
import React from 'react'

export interface IBrandsListProps {
  categoryData: {
    data: {
      id: number
      attributes: {
        img: {
          data: {
            attributes: {
              url: string
            }
          }
        }
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
        title: string
        description: string
        images: string
        top_text_content: string
        text_content: string
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
              className='flex size-[77px] items-center  justify-center rounded-[50%] bg-white-dis'
              key={item.id}
            >
              {img && (
                <Image src={img} width={width} height={height} alt={name} />
              )}
            </li>
          )
        })
      })}
    </ul>
  )
}

export default BrandsList
