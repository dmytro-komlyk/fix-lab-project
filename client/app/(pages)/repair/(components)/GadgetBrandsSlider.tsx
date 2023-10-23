/* eslint-disable no-underscore-dangle */

import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import type { IBrand } from '@/app/(server)/api/service/modules/gadgetService'

export interface BrandsSliderProps {
  gadgetData: {
    slug: string
    brands: IBrand[]
  }
}

export const GadgetBrandsSlider: React.FC<BrandsSliderProps> = ({
  gadgetData,
}) => {
  // Keen Slider
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLElement>({
    initial: 0,
    breakpoints: {
      '(min-width: 390px)': {
        slides: { perView: 3 },
        mode: 'free',
      },
      '(min-width: 768px)': {
        slides: { perView: 5 },
        mode: 'free',
      },
      '(min-width: 1100px)': {
        slides: { perView: 7 },
        mode: 'free-snap',
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const filled = instanceRef?.current?.track.details.maxIdx || 1

  return (
    gadgetData?.brands.length > 0 && (
      <>
        <div ref={sliderRef} className='keen-slider flex '>
          {gadgetData.brands.map(item => {
            const { alt, src } = item.icon

            return (
              <div
                key={item._id}
                className='keen-slider__slide max-w-[77px] p-[14px]'
              >
                <Link
                  className='flex h-[77px] min-w-[77px] max-w-[77px]  items-center justify-center rounded-[50%] bg-white-dis transition-all hover:shadow-brandLight  focus:shadow-brandLight'
                  href={`/repair/${gadgetData?.slug}/brands/${item.slug}`}
                >
                  {src && (
                    <Image
                      src={src}
                      alt={alt}
                      width={0}
                      height={0}
                      className='h-[40px] w-[32px]'
                    />
                  )}
                </Link>
              </div>
            )
          })}
        </div>
        {loaded && instanceRef && (
          <div className='relative mt-8'>
            <div
              className='absolute left-0 top-[-14px] z-10 h-[4px] rounded-full bg-white-dis transition-width'
              style={{
                width: `${(100 / filled) * currentSlide}%`,
              }}
            />
            <div className='absolute left-0 top-[-14px] h-[4px] w-full rounded-full bg-white-dis/50' />
          </div>
        )}
      </>
    )
  )
}
