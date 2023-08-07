import React from 'react'

import { CardList } from '../(components)/CardList/CardList'

export const AddressSection = () => {
  return (
    <section className='section'>
      <div className='container'>
        <h2 className='mb-8 font-exo_2 font-bold text-dark-blue'>
          Як нас знайти
        </h2>
        {/* @ts-expect-error Async Server Component */}
        <CardList />
      </div>
    </section>
  )
}
