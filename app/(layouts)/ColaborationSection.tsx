import { Image } from 'next/dist/client/image-component'
import React from 'react'

import ColabSlider from '../(components)/ColabSlider/slider'

export const ColaborationSection = () => {
  return (
    <section className='section bg-gradient-radial-blue'>
      <div className='container relative'>
        <div className='hover-laptop absolute right-[-40px] top-[-200px] transition duration-300 ease-in-out hover:rotate-12'>
          <Image
            src='/images/laptop-img.png'
            alt='laptop'
            width={350}
            height={255}
            className='transition duration-300 ease-in-out'
          />

          <Image
            src='/icons/glass-left.svg'
            alt='laptop'
            width={83}
            height={72}
            className='absolute left-[100px] top-[130px] transition duration-300 ease-in-out'
          />
          <Image
            src='/icons/glass-center.svg'
            alt='laptop'
            width={81}
            height={98}
            className='absolute left-[155px] top-[115px] transition duration-300 ease-in-out'
          />
          <Image
            src='/icons/glass-right.svg'
            alt='laptop'
            width={75}
            height={105}
            className='absolute right-[75px] top-[105px] transition duration-300 ease-in-out'
          />
        </div>
        <h2 className='mb-8 font-exo_2 text-xl font-bold text-white-dis md:text-2xl'>
          Співпраця з нами це
        </h2>
        <ColabSlider />
      </div>
    </section>
  )
}
