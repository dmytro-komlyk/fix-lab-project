import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const postData = async (endpoint: string, data: any) => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTFmMTNiZDQ4ZDUxZGY2OTMxY2QxMjYiLCJsb2dpbiI6ImFkbWluMSIsImlhdCI6MTY5NzY5MzQwM30.h74Ti0AAfwalNXb1i0iswcuIw2X49SPeeEJOlKIbVLw`,
    },
  }
  if (!endpoint) {
    throw new Error('No endpoint')
  }
  const url = `http://95.217.34.212:30000/api${endpoint}`

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
