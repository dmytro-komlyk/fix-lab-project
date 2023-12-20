import { AnimatePresence, motion } from 'framer-motion'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { IBrand } from '@/app/(server)/api/service/modules/brandService'
import { SERVER_URL } from 'client/app/(lib)/constants'
import { trpc } from 'client/app/(utils)/trpc/client'
import { serverClient } from 'client/app/(utils)/trpc/serverClient'

export interface BrandsSliderProps {
  gadgetData: {
    slug: string
    brands: IBrand[]
  }
}
// : React.FC<BrandsSliderProps>
export const GadgetBrandsSlider = ({
  gadgetDataInit,
}: {
  gadgetDataInit: Awaited<
    ReturnType<(typeof serverClient)['gadgets']['getBySlug']>
  >
}) => {
  // Keen Slider
  const { data: gadgetData } = trpc.gadgets.getBySlug.useQuery(
    gadgetDataInit.slug,
    {
      initialData: gadgetDataInit,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLElement>({
    initial: 0,
    breakpoints: {
      '(min-width: 300px)': {
        slides: { perView: 2 },
        mode: 'free',
      },
      '(min-width: 390px)': {
        slides: { perView: 3 },
        mode: 'free',
      },
      '(min-width: 768px)': {
        slides: { perView: 7 },
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

  return gadgetData?.brands.length > 0 && isLoading ? (
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
          className='keen-slider flex '
        >
          {gadgetData.brands.map(item => {
            return (
              <div
                key={item.id}
                className='keen-slider__slide max-w-[77px] p-[14px]'
              >
                <Link
                  className='flex h-[77px] max-w-[77px] items-center  justify-center rounded-[50%] bg-white-dis transition-all hover:shadow-brandLight focus:shadow-brandLight  xl:min-w-[77px]'
                  href={`/repair/${gadgetData?.slug}/brands/${item.slug}`}
                >
                  {item.icon && (
                    <Image
                      src={`${SERVER_URL}/${item.icon.file.path}`}
                      alt={item.icon.alt}
                      width={0}
                      height={0}
                      className='h-[40px] w-[32px]'
                    />
                  )}
                </Link>
              </div>
            )
          })}
        </motion.div>
      </AnimatePresence>
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
  ) : (
    <div className='flex h-[137px] items-center justify-center' />
  )
}
