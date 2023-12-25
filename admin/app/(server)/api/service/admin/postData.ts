import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL as string

const postData = async (endpoint: string, data: any) => {
  // const session = await getSession()

  // if (session?.user.token === undefined) {
  //   throw new Error('Headers are undefined')
  // }

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTg5ODE2YjNiNzk3OGQ1MmNhMThkNmYiLCJpYXQiOjE3MDM1MTAzODJ9.oSu2p7ehVxcORXEKkZ-oU64nDDi7u5pNB7A9AU_PvFY`,
    },
  }
  if (!endpoint) {
    throw new Error('No endpoint')
  }
  const url = `${apiUrl}${endpoint}`

  if (!data) {
    throw new Error('No data')
  }

  try {
    const res = await axios.post(url, data, config)
    return res
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}

export default postData
