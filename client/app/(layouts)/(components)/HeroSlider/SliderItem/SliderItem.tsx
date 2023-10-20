import Image from 'next/image'
import Link from 'next/link'

import type { ISliderItem } from '../types'

const SliderItem: React.FC<ISliderItem> = ({
  link,
  src,
  alt,
  title,
  id = 0,
}) => (
  <li className={`keen-slider__slide number-slide${id}`} key={alt}>
    <Link
      href={link}
      className='flex h-[148px] w-full max-w-[120px] flex-col items-center justify-between rounded-2xl bg-white-dis px-5 py-[18px] transition hover:cursor-pointer hover:bg-light-grey'
    >
      {src && <Image src={src} height={60} className='w-auto' alt={alt} />}
      <h4 className='text-center font-inter text-base leading-5 text-dark-blue'>
        {title}
      </h4>
    </Link>
  </li>
)

export default SliderItem
