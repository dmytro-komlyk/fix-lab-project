import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MdKeyboardArrowRight } from 'react-icons/md'

interface CategorySectionProps {
  categoryData: {
    data: {
      id: string
      attributes: {
        img: {
          data: {
            attributes: {
              url: string
            }
          }
        }
        title: string
        description: string
      }
    }[]
  }
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
        price: string
      }
    }[]
  }
}

const CategorySection: React.FC<CategorySectionProps> = ({
  categoryData,
  subcategoriesData,
}) => {
  return (
    <div className=' bg-dark-blue'>
      <div className=' container flex flex-col  pt-[151px]'>
        {categoryData.data.map(item => {
          const categoryTitle = item.attributes.title
          return (
            <div className='flex gap-1 items-center' key={item.id}>
              <Link
                className='flex gap-1 items-center text-base text-[#3EB9F0] font-[400]'
                href={'/'}
              >
                <p> Головна</p> <MdKeyboardArrowRight size={30} />
              </Link>
              <Link
                className='flex gap-1 items-center text-base text-[#3EB9F0] font-[400]'
                href={'/repair'}
              >
                <p> Ремонт</p> <MdKeyboardArrowRight size={30} />
              </Link>

              <p className='text-base text-[#3EB9F0] font-[400] opacity-70'>
                {categoryTitle}
              </p>
            </div>
          )
        })}
        <div className='flex justify-between gap-[141px] pt-[26px] pb-[153px]'>
          <div className='w-[522px]'>
            {categoryData.data.map(item => {
              const img = item.attributes.img.data.attributes.url
              return (
                <div key={item.id}>
                  <Image
                    src={img}
                    width={50}
                    height={50}
                    alt={item.attributes.title}
                  />
                  <h2>{item.attributes.title}</h2>
                  <p>{item.attributes.description}</p>
                  <button>Заявка на ремонт</button>
                </div>
              )
            })}
          </div>
          <div className='w-[628px]'>
            <ul className='flex flex-col gap-6 '>
              {subcategoriesData.data.map(item => {
                const categoryPath =
                  item.attributes.category.data.attributes.slug
                const subcategoryPath = item.attributes.slug
                return (
                  <li key={item.id}>
                    <Link
                      className='flex justify-between items-center border-b-[1px] border-[#fff] border-opacity-50'
                      href={`/repair/${categoryPath}/${subcategoryPath}`}
                    >
                      <h2 className='text-lg font-[700] text-white-dis '>
                        {item.attributes.title}
                      </h2>
                      <p className='text-base font-[700] text-mid-blue '>
                        {item.attributes.price}
                      </p>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <button className='mt-[156px] w-full bg-mid-green rounded-xl'>
              <p className='text-start text-lg font-exo_2 font-[700] text-dark-blue px-6 py-4'>
                Розрахувати вартість ремонту
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategorySection
