import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { getSession } from 'next-auth/react'

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
  const url = `http://localhost:30000/api${endpoint}`

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
