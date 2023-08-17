'use client'

import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'
import type { ReactNode } from 'react'
import { useState } from 'react'

import { SliderItem } from './SliderItem'
import { SliderProgressBar } from './SliderProgressBar'
import type { IHeroSlider } from './types'

const HeroSlider = ({ data }: IHeroSlider): ReactNode => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLUListElement>({
    initial: 0,
    slides: { perView: 3, spacing: 15 },
    mode: 'free',
    breakpoints: {
      '(min-width: 390px)': {
        slides: { perView: 3, spacing: 15 },
        mode: 'free',
      },
      '(min-width: 1440px)': {
        slides: { perView: 3, spacing: 15 },
        drag: false,
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const renderSlides = () =>
    data.map((item, index) => (
      <SliderItem
        key={item.alt}
        src={item.src}
        alt={item.alt}
        title={item.title}
        id={index}
      />
    ))

  const renderSteps = (): JSX.Element | JSX.Element[] | undefined | null => {
    if (instanceRef?.current) {
      const steps = [
        ...Array(instanceRef.current.track.details.slides.length).keys(),
      ]

      const dots = steps.filter((_value, index) => index % 3 === 0)

      const ElementHTML = dots.map(index => {
        return (
          <button
            key={index}
            type='button'
            onClick={() => {
              instanceRef.current?.moveToIdx(index)
            }}
            className={`mr-[3px] h-[5px] w-[32px] rounded-full ${
              currentSlide === index ? 'bg-mid-green' : 'bg-pros-bg'
            }`}
            aria-label='label'
          />
        )
      })

      return ElementHTML
    }

    return null
  }

  return (
    <>
      <ul
        ref={sliderRef}
        className='keen-slider ml-4 overflow-hidden pb-[20px] pt-8 md:ml-0'
      >
        {renderSlides()}
      </ul>
      {loaded && instanceRef && (
        <>
          <div className='block w-full px-4 md:px-0 lg:hidden'>
            <SliderProgressBar
              progress={currentSlide}
              max={
                instanceRef?.current &&
                instanceRef?.current.track.details.slides.length
              }
            />
          </div>

          <div className='hidden items-center justify-center lg:flex '>
            {renderSteps()}
          </div>
        </>
      )}
    </>
  )
}

export default HeroSlider
