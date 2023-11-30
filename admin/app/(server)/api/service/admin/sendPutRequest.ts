import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { getSession } from 'next-auth/react'

interface ApiResponse {
  data(data: any): unknown
  status: number
}

export const sendPutRequest = async (
  endpoint: string,
  data: any,
): Promise<ApiResponse> => {
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
  const apiUrl = `http://localhost:30000/api${endpoint}`
  if (!data) {
    throw new Error('No data')
  }
  try {
    const response = await axios.put(apiUrl, data, config)
    return response
  } catch (error) {
    throw new Error('Failed to update data')
  }
}
