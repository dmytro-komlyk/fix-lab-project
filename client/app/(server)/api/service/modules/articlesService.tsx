import fetchDataFromServer from '../helpers/fetchDataFromServer'

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
  image: {
    _id: string
    src: string
    alt: string
  }
}

export interface IBlog {
  items: IPost[]
  itemsCount: number
  totalItems: number
  totalPages: number
  rangeStart: number
  rangeEnd: number
}

export const getAllPosts = async (): Promise<IBlog> => {
  const endpoint = `/articles`
  return fetchDataFromServer(endpoint)
}

export const getSinglePost = async (slug: string): Promise<IBlog> => {
  const endpoint = `/articles/find-by-slug/${slug}`
  return fetchDataFromServer(endpoint)
}
