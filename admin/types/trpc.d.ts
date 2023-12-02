import type { Multer } from 'multer'

export interface IGadget {
  _id: string
  slug: string
  isActive: boolean
  title: string
  description: string
  icon: IImage
  gallery: IImage[]
  metadata: {
    title: string
    description: string
    keywords: string
  }
  brands: IBrand[]
  issues: IIssue[]
}

export interface IImage {
  _id: string
  file: Multer
  src: string
  alt: string
  type: string
}
export interface IBrand {
  _id: string
  slug: string
  isActive: boolean
  title: string
  article: string
  icon: IImage
  metadata: {
    title: string
    description: string
    keywords: string
  }
}

export interface IIssue {
  _id: string
  isActive: boolean
  slug: string
  title: string
  info: string
  description: string
  price: string
  image: IImage
  metadata: {
    title: string
    description: string
    keywords: string
  }
  benefits: IBenefit[]
}
export interface IBenefit {
  _id: string
  isActive: boolean
  icon: IImage
  title: string
}
export interface IPost {
  _id: string
  slug: string
  isActive: boolean
  title: string
  preview: string
  text: string
  metadata: {
    title: string
    description: string
    keywords: string
  }
  image: IImage
}

export interface IBlog {
  items: IPost[]
  itemsCount: number
  totalItems: number
  totalPages: number
  rangeStart: number
  rangeEnd: number
}
