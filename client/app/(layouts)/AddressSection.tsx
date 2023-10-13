import { type Location } from '@/app/(utils)/types'

import { AddressLocationCard } from './(components)/AddressLocationCard'

const locations: Array<Location> = [
  {
    id: '1',
    title: 'Голосіївський р-н',
    address: 'Саперно-слобітська, 10',
    phone: '+380632272728',
    mapLink: 'https://goo.gl/maps/Ynvi3DGyr4kHo5XP7',
    imageLink: '/images/map-screen-1.png',
  },
  {
    id: '2',
    title: 'Оболонський р-н',
    address: 'Просп. Володимира Івасюка, 27',
    phone: '+380632272730',
    mapLink: 'https://goo.gl/maps/s93niPYLLkB3HXsK8',
    imageLink: '/images/map-screen-2.png',
  },
]

export const AddressSection = async () => {
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
