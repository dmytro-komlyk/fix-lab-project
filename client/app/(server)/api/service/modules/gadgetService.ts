import fetchDataFromServer from '../helpers/fetchDataFromServer'

export interface IGadget {
  _id: string
  slug: string
  isActive: boolean
  title: string
  description: string
  icon: string
  image: string
  gallery: string
  metadata: {
    title: string
    description: string
    keywords: string
  }
  brands: IBrand[]
  issues: IIssue[]
}

export interface IBrand {
  _id: string
  slug: string
  isActive: boolean
  title: string
  icon: string
  article: string
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
  description: string
  price: string
  images: string
  metadata: {
    title: string
    description: string
    keywords: string
  }
  info: {
    diagnostic: string
    gaurantee: string
    repair: string
  }
}

export const getAllGadgetsData = async (): Promise<IGadget[]> => {
  const endpoint = '/gadgets'
  return fetchDataFromServer(endpoint)
}

export const getSingleGadgetData = async (slug: string): Promise<IGadget> => {
  const endpoint = `/gadgets/find-by-slug/${slug}`
  return fetchDataFromServer(endpoint)
}
