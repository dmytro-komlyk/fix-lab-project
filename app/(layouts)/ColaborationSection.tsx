import { Image } from 'next/dist/client/image-component'
import React from 'react'

import ColabSlider from '../(components)/ColabSlider/slider'

export const ColaborationSection = () => {
  return (
    <section className='section bg-gradient-linear-center-blue py-24'>
      <div className='container relative'>
        <h2 className='mb-10 font-exo_2 text-xl font-bold text-white-dis md:text-2xl'>
          Співпраця з нами це
        </h2>
        <div className='absolute right-[130px] top-[-130px] hidden h-[150px] w-[150px] rotate-[-10deg] rounded-full shadow-[-8px_29px_76px_30px_rgba(0,144,255,0.44)] lg:flex' />
        <div className='hover-laptop absolute right-[-40px] top-[-240px] hidden transition duration-300 ease-in-out hover:rotate-12 lg:flex'>
          <Image
            src='/images/laptop-img.png'
            alt='laptop'
            width={440}
            height={308}
            className='transition duration-300 ease-in-out '
          />

          <Image
            src='/icons/glass-left.svg'
            alt='laptop'
            width={83}
            height={72}
            className='absolute left-[140px] top-[185px] transition duration-300 ease-in-out'
          />
          <Image
            src='/icons/glass-center.svg'
            alt='laptop'
            width={81}
            height={98}
            className='absolute left-[200px] top-[165px] transition duration-300 ease-in-out'
          />
          <Image
            src='/icons/glass-right.svg'
            alt='laptop'
            width={75}
            height={105}
            className='absolute right-[110px] top-[155px] transition duration-300 ease-in-out'
          />
        </div>
        <ColabSlider />
      </div>
    </section>
  )
}
