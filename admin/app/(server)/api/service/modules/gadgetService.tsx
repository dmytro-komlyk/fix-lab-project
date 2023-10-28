import fetchDataFromServer from '../helpers/fetchDataFromServer'

export interface IGadget {
  _id: string
  slug: string
  isActive: boolean
  title: string
  description: string
  icon: {
    alt: string
    src: string
    type: string
    _id: string
  }
  image: string
  gallery: [
    {
      _id: string
    },
  ]
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
  article: string
  icon: {
    type: string
    _id: string
    src: string
    alt: string
  }
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
  image: {
    type: string
    _id: any
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
  richText: string
  benefits: {
    _id: string
    id: number
    icon: {
      src: string
      alt: string
      width: number
      height: number
    }
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
