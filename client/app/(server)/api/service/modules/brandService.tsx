import fetchDataFromServer from '../helpers/fetchDataFromServer'
import type { IBrand } from './gadgetService'

export const getAllBrandsData = async (): Promise<IBrand[]> => {
  const endpoint = '/brands'
  return fetchDataFromServer(endpoint)
}

export const getSingleBrandData = async (slug: string): Promise<IBrand> => {
  const endpoint = `/brands/find-by-slug/${slug}`
  return fetchDataFromServer(endpoint)
}
