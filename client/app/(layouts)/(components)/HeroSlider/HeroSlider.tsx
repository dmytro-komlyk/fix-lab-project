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
    mode: 'free',
    breakpoints: {
      '(min-width: 390px)': {
        slides: { perView: 3, spacing: 16 },
        mode: 'free',
      },
      '(min-width: 600px)': {
        slides: { perView: 4, spacing: 16 },
        mode: 'free',
      },
      '(min-width: 767px)': {
        slides: { perView: 3, spacing: 25 },
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
        link={item.link}
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
            className={`mr-[4px] h-[5px] w-[36px] rounded-full last:mr-0 ${
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
        className='keen-slider ml-4 overflow-hidden pb-[28px] pt-[15px] md:ml-0 md:pb-[20px] md:pt-[24px]'
      >
        {renderSlides()}
      </ul>
      {loaded && instanceRef && (
        <>
          <div className='block w-full px-4 md:hidden md:px-0'>
            <SliderProgressBar
              progress={currentSlide}
              max={
                instanceRef?.current &&
                instanceRef?.current.track.details.slides.length
              }
            />
          </div>

          <div className='hidden items-center justify-center md:flex '>
            {renderSteps()}
          </div>
        </>
      )}
    </>
  )
}

export default HeroSlider
