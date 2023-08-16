'use client'

import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'
import type { ReactNode } from 'react'
import { useState } from 'react'

import { SliderItem } from './SliderItem'
import type { IHeroSlider } from './types'

const HeroSlider = ({ data }: IHeroSlider): ReactNode => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLUListElement>({
    initial: 0,
    slides: {
      perView: 3,
      spacing: 15,
    },
    breakpoints: {
      '(min-width: 390px)': {
        slides: { perView: 3, spacing: 15 },
        loop: true,
        mode: 'free',
      },
      '(min-width: 768px)': {
        slides: { perView: 4, spacing: 15 },
        loop: true,
        mode: 'free',
      },
      '(min-width: 1100px)': {
        slides: { perView: 4, spacing: 15 },
        loop: true,
        mode: 'free',
      },
      '(min-width: 1440px)': {
        slides: { perView: 3, spacing: 10 },
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel)
        },
        created() {
          setLoaded(true)
        },
      },
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

  const renderSteps = (): JSX.Element | JSX.Element[] | undefined => {
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

    return <div>error</div>
  }

  return (
    <>
      <ul ref={sliderRef} className='keen-slider ml-4 pb-[20px] pt-8'>
        {renderSlides()}
      </ul>
      {loaded && instanceRef && (
        <div className='flex items-center justify-center'>{renderSteps()}</div>
      )}
    </>
  )
}

export default HeroSlider
