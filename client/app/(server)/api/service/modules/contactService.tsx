import fetchDataFromServer from '../helpers/fetchDataFromServer'
import type { IImage } from './imageService'

export interface IContact {
  _id: string
  isActive: boolean
  area: string
  address: string
  comment: string | null
  subways: string[]
  phones: string[]
  workingTime: string
  workingDate: string
  image: IImage
  googlePluginLink: string
  googleMapLink: string
}

export const getAllContactsData = async (): Promise<IContact[]> => {
  const endpoint = '/contacts'
  return fetchDataFromServer(endpoint)
}
