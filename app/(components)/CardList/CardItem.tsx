import { phoneParse } from '@/app/(utils)/phoneParse'
import React from 'react'
import { Location } from '@/app/(utils)/types'
import Link from 'next/link'
import Image from 'next/image'

export const CardItem: React.FC<Location> = (item) => {
  return (
   <li key={item.id} className='flex mb-8 justify-between text-base w-full bg-card-gradient-blue rounded-xl overflow-hidden h-[286px] lg:mb-0 lg:h-[240px] xl:h-[265px]'>
          <div className='flex flex-col justify-between w-full text-white-dis pt-10 pb-9 pl-8 pr-3'>
     <h3 className='font-exo_2 text-xl font-semibold'>{item.title}</h3>
        <div className='max-w-[210px]'>
              <p className='font-medium leading-7 tracking-wider text-[#f8fcffe0] mb-2'>{item.address}</p>
              <a href={`tel:${item.phone}`} className='text-[#01CC74] font-medium leading-7 tracking-wider cursor-pointer'>{phoneParse(item.phone)}</a>
              </div>
        <a href={item.mapLink} className='cursor-pointer font-semibold tracking-wider border-b-[2px] w-fit border-b-white-dis lg:hidden'>Подивитися на мапі</a>
      </div>
      <Link className='hidden md:block cursor-pointer rounded-xl w-full overflow-hidden' href={item.mapLink} target='_blank'>
        <Image className='bg-cover bg-center aspect-square lg:aspect-[1/1.05]' src={item.imageLink} alt={item.title} width={600} height={546} /></Link>
      </li>
  )
}
