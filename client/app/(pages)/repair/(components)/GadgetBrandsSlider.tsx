/* eslint-disable no-underscore-dangle */

import { AnimatePresence } from 'framer-motion'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useState } from 'react'

import InstantAdviceModal from '@/app/(layouts)/(components)/InstantAdviceModal'
import SuccessSubmitBanner from '@/app/(layouts)/(components)/SuccessSubmitBanner'
import type { IContact } from '@/app/(server)/api/service/modules/contactService'
import type { IBrand } from '@/app/(server)/api/service/modules/gadgetService'

export interface BrandsSliderProps {
  gadgetData: {
    slug: string
    brands: IBrand[]
  }
  contactsData: IContact[]
}

export const GadgetBrandsSlider: React.FC<BrandsSliderProps> = ({
  gadgetData,
  contactsData,
}) => {
  const pathname = usePathname()
  const brandPath = pathname.split('/').pop()

  // Modal window
  const [submitSuccessInstantAdviceModal, setSubmitSuccessInstantAdviceModal] =
    useState<boolean>(false)

  const [showInstantAdviceModal, setShowInstantAdviceModal] =
    useState<boolean>(false)

  const toggleSuccessSubmitInstantAdviceModal = useCallback(() => {
    setSubmitSuccessInstantAdviceModal(prev => !prev)
  }, [])

  const toggleInstantAdviceModal = useCallback(() => {
    setShowInstantAdviceModal(prev => !prev)
  }, [setShowInstantAdviceModal])

  // Tabs

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
    <>
      {gadgetData?.brands.length > 0 && (
        <div className='mb-[56px]'>
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
        </div>
      )}
      <AnimatePresence>
        {showInstantAdviceModal && (
          <InstantAdviceModal
            toggleInstantAdviceModal={toggleInstantAdviceModal}
            setSubmitSuccess={setSubmitSuccessInstantAdviceModal}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {submitSuccessInstantAdviceModal && (
          <SuccessSubmitBanner
            toggleSuccessSubmitModal={toggleSuccessSubmitInstantAdviceModal}
          />
        )}
      </AnimatePresence>
    </>
  )
}
