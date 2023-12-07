import fetchDataFromServer from '../helpers/fetchDataFromServer'
import type { IImage } from './imageService'

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

export const getAllBrandsData = async (): Promise<IBrand[]> => {
  const endpoint = '/brands'
  return fetchDataFromServer(endpoint)
}

export const getSingleBrandData = async (slug: string): Promise<IBrand> => {
  const endpoint = `/brands/find-by-slug/${slug}`
  return fetchDataFromServer(endpoint)
}
