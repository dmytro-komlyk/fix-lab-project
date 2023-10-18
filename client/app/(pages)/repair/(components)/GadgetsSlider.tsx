/* eslint-disable no-underscore-dangle */
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useWindowSize } from '@/app/(hooks)/useWindowResize'
import type { IGadgetsProps } from '@/app/(layouts)'
import type { IGadget } from '@/app/(server)/api/service/modules/gadgetService'

import { GadgetsList } from './GadgetsList'

export const GadgetsSlider: React.FC<IGadgetsProps> = ({ gadgetsData }) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1.15, spacing: 16 },
  })
  const size = useWindowSize()
  return size.width > 767 ? (
    <GadgetsList gadgetsData={gadgetsData} />
  ) : (
    <div className='relative z-10 mr-[-16px] md:mr-0'>
      <div ref={ref} className='keen-slider'>
        {gadgetsData.map((item: IGadget) => {
          return (
            <Link
              key={item._id}
              href={`/repair/${item.slug}`}
              className='keen-slider__slide hover-gadget-link flex h-[261px] flex-col justify-between rounded-2xl bg-card-repair-gradient p-8'
            >
              <div className='relative ml-auto h-[80px] w-full max-w-[104px]'>
                {item.icon && (
                  <Image src={item.icon.src} fill alt={item.icon.alt} />
                )}
              </div>
              <div className='text-white-dis'>
                <h3 className='mr-auto text-xl font-semibold leading-7'>
                  {item.title}
                </h3>
                <p className='hidden font-inter text-xs xl:text-sm'>
                  Подивитися поломки
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
