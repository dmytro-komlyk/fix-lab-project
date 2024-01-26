import { useWindowSize } from '@client/app/(hooks)/useWindowResize'
import Image from 'next/image'
import React from 'react'

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
    <div className='flex flex-wrap gap-6 lg:gap-x-[59px] lg:gap-y-[50px]'>
      {sortedItems?.map((item: IGadgetItem) => {
        return (
          <div
            key={item.id}
            className='flex max-w-[270px] shrink grow basis-9/12 items-center gap-[20px] lg:basis-auto'
          >
            <div className='w-1/5'>
              {item.icon.src && (
                <Image
                  className='mx-auto my-0'
                  src={item.icon.src}
                  width={item.icon.width}
                  height={item.icon.height}
                  alt={item.alt}
                />
              )}
            </div>
            <p className='w-4/5 max-w-[205px] hyphens-auto font-exo_2 text-xl leading-6 text-[#F8FCFF]'>
              {item.title}
            </p>
          </div>
        )
      })}
    </div>
  )
}
