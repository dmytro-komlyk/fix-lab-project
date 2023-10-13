import fetchDataFromServer from '../helpers/fetchDataFromServer'
import type { IIssue } from './gadgetService'

export const getAllIssuesData = async (): Promise<IIssue[]> => {
  const endpoint = '/issues'
  return fetchDataFromServer(endpoint)
}

export const getSingleIssueData = async (slug: string): Promise<IIssue> => {
  const endpoint = `/issues/find-by-slug/${slug}`
  return fetchDataFromServer(endpoint)
}
