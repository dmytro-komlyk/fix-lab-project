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
            className='flex min-w-[206px] max-w-[270px] shrink grow items-center gap-4'
          >
            <Image src={item.icon.src} width={40} height={40} alt={item.alt} />
            <p className='hyphens-auto text-center font-exo_2 text-xl text-[#F8FCFF]'>
              {item.title}
            </p>
          </div>
        )
      })}
    </div>
  )
}
