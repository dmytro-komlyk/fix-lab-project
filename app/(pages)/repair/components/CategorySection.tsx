import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
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
            <div className='flex items-center gap-1' key={item.id}>
              <Link
                className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
                href='/'
              >
                <p> Головна</p> <MdKeyboardArrowRight size={30} />
              </Link>
              <Link
                className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
                href='/repair'
              >
                <p> Ремонт</p> <MdKeyboardArrowRight size={30} />
              </Link>

              <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
                {categoryTitle}
              </p>
            </div>
          )
        })}
        <div className='flex justify-between gap-[141px] pb-[153px] pt-[26px]'>
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
                      className='flex items-center justify-between border-b-[1px] border-[#fff]/50'
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
            <button className='mt-[156px] w-full rounded-xl bg-mid-green'>
              <p className='px-6 py-4 text-start font-exo_2 text-lg font-[700] text-dark-blue'>
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
