import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

import type { IBrand } from '@/app/(server)/api/service/modules/gadgetService'

export interface BrandsSliderProps {
  gadgetData: {
    slug: string
    brands: IBrand[]
  }
  brandData?: IBrand
}

export const BrandsSlider: React.FC<BrandsSliderProps> = ({
  gadgetData,
  brandData,
}) => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/')
  const isBrandsPage = pathSegments[pathSegments.length - 1]

  // Keen Slider
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLElement>({
    initial: 0,
    breakpoints: {
      '(min-width: 390px)': {
        slides: { perView: 2 },
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
    gadgetData.brands.length > 0 && (
      <>
        <div ref={sliderRef} className='keen-slider flex '>
          {gadgetData.brands.map(item => {
            const { alt, src } = item.icon
            const selectedTabClass =
              brandData?.slug === item.slug || isBrandsPage === 'brands'
                ? ' bg-dark-grey flex  h-[128px]  max-w-[128px]  items-center justify-center rounded-[50%] shadow-brand'
                : ' flex h-[128px] min-w-[128px] max-w-[128px]  items-center justify-center rounded-[50%] transition-all hover:shadow-brand  focus:shadow-brand'

            return (
              <div
                key={item._id}
                className='keen-slider__slide max-w-[128px] p-[25px]'
              >
                <Link
                  key={item._id}
                  className={selectedTabClass}
                  href={`/repair/${gadgetData?.slug}/brands/${item.slug}`}
                >
                  {src && (
                    <Image
                      src={src}
                      alt={alt}
                      width={0}
                      height={0}
                      className='h-[92px] w-[75px]'
                    />
                  )}
                </Link>
              </div>
            )
          })}
        </div>

        {loaded && instanceRef && (
          <div className='relative w-full'>
            <div
              className='absolute left-0 top-[-2px] z-10 h-[4px] rounded-full bg-mid-grey transition-width'
              style={{
                width: `${(100 / filled) * currentSlide}%`,
              }}
            />
            <div className='absolute left-0 top-[-2px] h-[4px] w-full rounded-full bg-[#92999C63]' />
          </div>
        )}
      </>
    )
  )
}
