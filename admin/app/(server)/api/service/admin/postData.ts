import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { getSession } from 'next-auth/react'

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL as string

const postData = async (endpoint: string, data: any) => {
  const session = await getSession()

  if (session?.user.token === undefined) {
    throw new Error('Headers are undefined')
  }

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.token}`,
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
