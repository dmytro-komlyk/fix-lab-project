import React from 'react'
import { CardList } from '../(components)/CardList/CardList'

export const AddressSection = () => {
  return (
    <section className='section'>
      <div className='container'>
        <h2 className='text-dark-blue font-exo_2 font-bold mb-8'>Як нас знайти</h2>
        <CardList />
      </div>
      </section>
  )
}
