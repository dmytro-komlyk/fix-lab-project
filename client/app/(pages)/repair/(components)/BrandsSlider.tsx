import { AnimatePresence, motion } from 'framer-motion'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { IBrand } from '@/app/(server)/api/service/modules/brandService'

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
  function compareBySlug(item: { slug: string | undefined }) {
    return item.slug === brandData?.slug
  }
  const initialSlideIndex = gadgetData.brands.findIndex(compareBySlug)

  // Keen Slider
  const [currentSlide, setCurrentSlide] = useState(initialSlideIndex)
  const [loaded, setLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLElement>({
    initial: currentSlide,
    breakpoints: {
      '(min-width: 300px)': {
        slides: { perView: 1 },
        mode: 'free',
      },
      '(min-width: 365px)': {
        slides: { perView: 2 },
        mode: 'free',
      },
      '(min-width: 768px)': {
        slides: { perView: 4 },
        mode: 'free',
      },
      '(min-width: 1100px)': {
        slides: { perView: 5 },
        mode: 'free-snap',
      },
      '(min-width: 1440px)': {
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
  useEffect(() => {
    if (instanceRef) {
      setIsLoading(true)
    }
  }, [instanceRef])
  return gadgetData.brands.length > 0 && isLoading ? (
    <>
      <AnimatePresence>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { duration: 0.3 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3 },
          }}
          ref={sliderRef}
          className='keen-slider flex overflow-x-hidden '
        >
          {gadgetData.brands.map(item => {
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
                  {item.icon && (
                    <Image
                      src={item.icon.src}
                      alt={item.icon.alt}
                      width={0}
                      height={0}
                      className='h-[92px] w-[75px]'
                    />
                  )}
                </Link>
              </div>
            )
          })}
        </motion.div>
      </AnimatePresence>

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
  ) : (
    <div className='flex h-[178px] items-center justify-center' />
  )
}
