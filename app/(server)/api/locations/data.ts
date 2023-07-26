import { Location } from '@/app/(utils)/types'
const locations: Array<Location> = [
  {
    id: '1',
    title: 'Голосіївський р-н',
    address: 'Саперно-слобітська, 10',
    phone: '+380632272728',
    mapLink: '',
    imageLink: '/images/map-screen-1.png'
  },
   {
    id: '2',
    title: 'Оболонський р-н',
    address: 'Просп. Володимира Івасюка, 27',
    phone: '+380502272728',
    mapLink: '',
   imageLink: '/images/map-screen-2.png'
  },
]

export function getAllLocations() {
  return locations
}
