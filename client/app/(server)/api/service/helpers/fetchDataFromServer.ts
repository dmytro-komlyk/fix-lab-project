/* eslint-disable no-console */
import axios from 'axios'

const apiUrl = `http://95.217.34.212:30000/api` // замінити на NEXT_PUBLIC_SERVER_URL

export default async function fetchDataFromServer(url: string) {
  try {
    const response = await axios.get(`${apiUrl}${url}`, {})

    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`)
    }

    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
