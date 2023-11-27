import type { IImage } from './imageService'

export interface IBenefit {
  _id: string
  isActive: boolean
  icon: IImage
  title: string
}
