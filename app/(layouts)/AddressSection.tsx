import React from 'react'

import { CardList } from '../(components)/CardList/CardList'

export const AddressSection = () => {
  return (
    <section className='section'>
      <div className='container'>
        <h2 className='mb-8 font-exo_2 text-xl font-bold text-dark-blue md:text-2xl'>
          Як нас знайти
        </h2>

        <CardList />
      </div>
    </section>
  )
}
