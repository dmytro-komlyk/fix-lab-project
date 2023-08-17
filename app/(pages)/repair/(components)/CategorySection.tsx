'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { TbPhone } from 'react-icons/tb'

import Button from '@/app/(layouts)/(components)/Button'
import CostRepairModal from '@/app/(layouts)/(components)/CostRepairModal'
import InstantAdviceModal from '@/app/(layouts)/(components)/InstantAdviceModal'

import GadgetServicesList from './GadgetServicesList'

interface CategorySectionProps {
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

const CategorySection: React.FC<CategorySectionProps> = ({
  categoryData,
  subcategoriesData,
}) => {
  const [showInstantAdviceModal, setShowInstantAdviceModal] =
    useState<boolean>(false)
  const [showCostRepair, setShowCostRepair] = useState<boolean>(false)

  const toggleInstantAdviceModal = useCallback(() => {
    setShowInstantAdviceModal(prev => !prev)
  }, [setShowInstantAdviceModal])

  const toggleCostRepairModal = useCallback(() => {
    setShowCostRepair(prev => !prev)
  }, [])

  return (
    <section className=' overflow-hidden  bg-gradient-linear-blue  pb-[102px] pt-[163px] max-md:pb-14 max-md:pt-[138px]'>
      <div className='container relative flex flex-col '>
        <div className=' absolute left-[335px] top-[175px] max-lg:hidden'>
          <Image
            src='/background-flicker-center.svg'
            width={327}
            height={1008}
            alt='flicker'
          />
        </div>
        <div className=' absolute left-[0] top-[468px] max-lg:hidden'>
          <Image
            src='/background-flicker-left.svg'
            width={328}
            height={1008}
            alt='flicker'
          />
        </div>
        {categoryData.data.map(item => {
          const categoryTitle = item.attributes.title
          return (
            <div className='z-[1] flex items-center gap-1' key={item.id}>
              <Link
                className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
                href='/'
              >
                <p> Головна</p> <MdKeyboardArrowRight size={30} />
              </Link>
              <Link
                className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
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
        <div className='z-[1] flex justify-between pt-[24px] max-xl:gap-8 max-lg:flex-col max-lg:gap-0  max-md:gap-0 '>
          <div className='max-xl:w-[350px] max-lg:w-full xl:max-w-[411px] '>
            {categoryData.data.map(item => {
              const img = item.attributes.img.data.attributes.url
              return (
                <div
                  key={item.id}
                  className='flex flex-col items-start gap-14 pb-[68px]  max-xl:gap-4 max-xl:pb-[56px]  max-md:gap-8'
                >
                  <div className='flex items-center justify-center gap-[18px]'>
                    <Image
                      src={img}
                      width={50}
                      height={50}
                      alt={item.attributes.title}
                    />
                    <h2 className='font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '>
                      {item.attributes.title}
                    </h2>
                  </div>
                  <p className='font-[400] leading-6 text-white-dis'>
                    {item.attributes.description}
                  </p>
                  <Button
                    textButton='Миттєва консультація'
                    toggleModal={toggleInstantAdviceModal}
                  />
                </div>
              )
            })}
            <div className='flex max-w-[302px] flex-col items-center justify-center rounded-[15px] bg-white-dis p-8 opacity-80 max-lg:hidden'>
              <p className='relative mb-[24px] font-exo_2 text-xl font-semibold text-dark-blue'>
                <TbPhone
                  className=' absolute left-[-26px] top-[7px]'
                  size={24}
                />
                Подзвонити нам
              </p>
              <ul className='flex flex-col items-center gap-[15px]'>
                <li className='flex flex-col items-center'>
                  <p className='font-[400] text-black-dis'>Голосіївський р-н</p>
                  <a
                    href='tel:380632272728'
                    className=' font-[500] leading-7 tracking-[0.96px] text-dark-blue  transition-opacity hover:opacity-70  focus:opacity-70'
                  >
                    +38 063 227 27 28
                  </a>
                </li>
                <li className='flex flex-col items-center'>
                  <p className='font-[400] text-black-dis'>Оболонський р-н</p>
                  <a
                    href='tel:380632272728'
                    className=' font-[500] leading-7 tracking-[0.96px] text-dark-blue  transition-opacity hover:opacity-70  focus:opacity-70'
                  >
                    +38 063 227 27 28
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='w-[737px] max-xl:w-[550px]  max-lg:w-full'>
            {/* {categoryData.data.map(item => {
              // console.log(item.attributes.images.data[0].attributes.url)
              // const img = item.attributes.images.data[0].attributes.url

              return (
                <div className='mb-14' key={item.id}>
                  <div className='flex gap-[18px] justify-center mb-[50px]'>
                    <Image
                      className='w-[537px] h-[343px] rounded-2xl object-cover'
                      src={img}
                      width={537}
                      height={343}
                      alt={item.attributes.title}
                    />
                    <ul className='flex flex-col justify-between'>
                      {item.attributes.images.data.slice(1).map(item => {
                        return (
                          <li>
                            <Image
                              className='w-[182px] h-[99px] rounded-2xl object-cover'
                              src={img}
                              width={182}
                              height={99}
                              alt={item.attributes.title}
                            />
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: markdown.render(item.attributes.text_content),
                    }}
                    className='text-base text-white-dis font-[400] '
                  ></div>
                </div>
              )
            })} */}
            <GadgetServicesList
              categoryData={categoryData}
              subcategoriesData={subcategoriesData}
              toggleCostRepairModal={toggleCostRepairModal}
            />
          </div>
        </div>
      </div>
      {showCostRepair && (
        <CostRepairModal toggleCostRepairModal={toggleCostRepairModal} />
      )}
      {showInstantAdviceModal && (
        <InstantAdviceModal
          toggleInstantAdviceModal={toggleInstantAdviceModal}
        />
      )}
    </section>
  )
}

export default CategorySection
