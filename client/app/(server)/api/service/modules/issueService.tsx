import fetchDataFromServer from '../helpers/fetchDataFromServer'
import type { IBenefit } from './benefitService'
import type { IImage } from './imageService'

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

export const getAllIssuesData = async (): Promise<IIssue[]> => {
  const endpoint = '/issues'
  return fetchDataFromServer(endpoint)
}

export const getSingleIssueData = async (slug: string): Promise<IIssue> => {
  const endpoint = `/issues/find-by-slug/${slug}`
  return fetchDataFromServer(endpoint)
}
