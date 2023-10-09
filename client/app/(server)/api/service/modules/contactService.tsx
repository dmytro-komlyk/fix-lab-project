import fetchDataFromServer from '../helpers/fetchDataFromServer'

interface IContacts {
  _id: string
  isActive: boolean
  area: string
  address: string
  comment: string
  subways: string[]
  phones: string[]
  workingTime: string
  workingDate: string
  coords: {
    lang: number
    lat: number
  }
}

export const getAllContactsData = async (): Promise<IContacts[]> => {
  const endpoint = '/contacts'
  return fetchDataFromServer(endpoint)
}
