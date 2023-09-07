import Image from 'next/image'
import React from 'react'

import { useWindowSize } from '@/app/(hooks)/useWindowResize'

export interface IGadgetItem {
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

interface IGadgetsListProps {
  items: IGadgetItem[]
}

export const GadgetsList: React.FC<IGadgetsListProps> = ({ items }) => {
  const windowSize = useWindowSize()

  const sortedItems =
    windowSize.width > 768
      ? items.sort((a, b) => {
          if (a.id % 2 === 0 && b.id % 2 !== 0) {
            return 1
          }
          if (a.id % 2 !== 0 && b.id % 2 === 0) {
            return -1
          }
          return a.id - b.id
        })
      : items
  return (
    <div className='flex flex-wrap gap-6'>
      {sortedItems?.map((item: IGadgetItem) => {
        return (
          <div
            key={item.id}
            className='flex w-full max-w-[270px] shrink grow items-center gap-5'
          >
            <div className='w-full'>
              <Image
                className='mx-auto my-0'
                src={item.icon.src}
                width={item.icon.width}
                height={item.icon.height}
                alt={item.alt}
              />
            </div>
            <p className='min-w-[205px] hyphens-auto font-exo_2 text-xl text-[#F8FCFF]'>
              {item.title}
            </p>
          </div>
        )
      })}
    </div>
  )
}
