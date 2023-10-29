import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

interface ApiResponse {
  data(data: any): unknown
  status: number
}

export const sendPutRequest = async (
  endpoint: string,
  data: any,
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTFmMTNiZDQ4ZDUxZGY2OTMxY2QxMjYiLCJsb2dpbiI6ImFkbWluMSIsImlhdCI6MTY5NzcyMDk0N30.k84ARQO5rlKDtJPLmzTJoRRsTKnVxbLiXFQjE0A6Rgo`,
    },
  }

  if (!endpoint) {
    throw new Error('No endpoint')
  }
  const apiUrl = `http://95.217.34.212:30000/api${endpoint}`
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
