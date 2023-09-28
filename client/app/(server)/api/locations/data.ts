import type { Location } from '@/app/(utils)/types'

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

export function getAllLocations() {
  return locations
}
