import fetchDataFromServer from '../helpers/fetchDataFromServer'
import type { IBrand } from './brandService'
import type { IImage } from './imageService'
import type { IIssue } from './issueService'

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

export const getAllGadgetsData = async (): Promise<IGadget[]> => {
  const endpoint = '/gadgets'
  return fetchDataFromServer(endpoint)
}

export const getSingleGadgetData = async (slug: string): Promise<IGadget> => {
  const endpoint = `/gadgets/find-by-slug/${slug}`
  return fetchDataFromServer(endpoint)
}
