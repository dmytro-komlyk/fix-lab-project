import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const deleteData = async (endpoint: string) => {
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
  try {
    return await axios.delete(url, config)
  } catch (error) {
    throw new Error('Failed to delete data')
  }
}

export default deleteData
