import { headers } from 'next/headers'
import React from 'react'

import { type Location } from '@/app/(utils)/types'

import { AddressLocationCard } from './(components)/AddressLocationCard'

async function getData() {
  const headersData = headers()
  const protocol = headersData.get('x-forwarded-proto')
  const host = headersData.get('host')
  const response = await fetch(`${protocol}://${host}/api/locations`)

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc
  if (response.status !== 200) {
    //   // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

export const AddressSection = async () => {
  const locations: Location[] = await getData()

  return (
    <section className='section'>
      <div className='container lg:p-0'>
        <h2 className='lg:mg-7 mb-5 font-exo_2 text-xl font-semibold text-dark-blue md:text-2xl md:font-bold lg:mb-8'>
          Як нас знайти
        </h2>
        <ul className='w-full lg:flex lg:gap-6'>
          {locations &&
            locations.map((item: Location) => (
              <AddressLocationCard {...item} key={item.id} />
            ))}
        </ul>
      </div>
    </section>
  )
}
