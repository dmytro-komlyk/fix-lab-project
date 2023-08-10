import React from 'react'

import ColabSlider from '../(components)/ColabSlider/slider'

export const ColaborationSection = () => {
  return (
    <section className='section bg-gradient-radial-blue'>
      <div className='container'>
        <h2 className='mb-8 font-exo_2 font-bold text-white-dis'>
          Співпраця з нами це
        </h2>
        <ColabSlider />
      </div>
    </section>
  )
}
