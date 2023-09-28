import Image from 'next/image'
import React from 'react'

export interface IBenefitItem {
  id: number
  icon: {
    src: string
    height: number
    width: number
    blurWidth: number
    blurHeight: number
  }
  alt: string
  title: string
}

interface IBenefitsListProps {
  items: IBenefitItem[]
}

export const BenefitsList: React.FC<IBenefitsListProps> = ({ items }) => {
  return (
    <div className='flex flex-wrap gap-x-3.5 gap-y-[17px] lg:gap-[18px]'>
      {items?.map((item: IBenefitItem) => {
        return (
          <div
            key={item.id}
            className='flex max-h-[104px] w-[110px] flex-col items-center justify-between gap-[14px] rounded-2xl bg-light-grey px-[13px] py-[14px]'
          >
            <Image
              className=''
              src={item.icon.src}
              width={26}
              height={30}
              alt={item.alt}
            />
            <p className='text-center text-xs text-dark-blue'>{item.title}</p>
          </div>
        )
      })}
    </div>
  )
}
