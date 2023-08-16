import Image from 'next/image'

import type { ISliderItem } from '../types'

const SliderItem = ({ src, alt, title, id = 0 }: ISliderItem) => (
  <li
    className={`keen-slider__slide number-slide${id} flex h-[148px] w-full max-w-[120px] flex-col items-center justify-between rounded-2xl bg-white-dis px-5 py-[18px]`}
    key={alt}
  >
    <Image src={src} height={60} className='w-auto' alt={alt} />
    <h4 className='text-center font-inter text-base leading-5 text-dark-blue'>
      {title}
    </h4>
  </li>
)

export default SliderItem
