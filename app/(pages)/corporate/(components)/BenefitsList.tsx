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
    <div className='flex flex-wrap gap-3 lg:gap-5'>
      {items?.map((item: IBenefitItem) => {
        return (
          <div
            key={item.id}
            className='flex max-h-[104px] w-[110px] flex-col items-center gap-2 rounded-2xl bg-light-grey p-3'
          >
            <Image
              className=''
              src={item.icon.src}
              width={34}
              height={32}
              alt={item.alt}
            />
            <p className='text-center text-xs text-dark-blue'>{item.title}</p>
          </div>
        )
      })}
    </div>
  )
}
