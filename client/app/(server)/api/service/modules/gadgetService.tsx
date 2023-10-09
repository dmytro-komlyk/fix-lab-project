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
  icon: {
    src: string
    alt: string
  }
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
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
  metadata: {
    title: string
    description: string
    keywords: string
  }
  richText: {
    title: string
    description: string
  }
  info: {
    id: number
    icon: string
    title: string
    alt: string
  }[]
}

export const getAllGadgetsData = async (): Promise<IGadget[]> => {
  const endpoint = '/gadgets'
  return fetchDataFromServer(endpoint)
}

export const getSingleGadgetData = async (slug: string): Promise<IGadget> => {
  const endpoint = `/gadgets/find-by-slug/${slug}`
  return fetchDataFromServer(endpoint)
}
