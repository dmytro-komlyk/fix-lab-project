import fetchDataFromServer from '../helpers/fetchDataFromServer'
import type { IImage } from './imageService'

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

export const getPosts = async ({
  currentPage,
}: {
  currentPage: number
}): Promise<IBlog> => {
  const endpoint = `/articles?page=${currentPage}&limit=9&sort=desc`
  return fetchDataFromServer(endpoint)
}

export const getSinglePost = async (slug: string): Promise<IPost> => {
  const endpoint = `/articles/find-by-slug/${slug}`
  return fetchDataFromServer(endpoint)
}
