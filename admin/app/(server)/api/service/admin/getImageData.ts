/* eslint-disable no-console */
import type { AxiosResponse } from 'axios'
import axios from 'axios'

export default async function getImageData(url: string): Promise<any> {
  try {
    const response: AxiosResponse = await axios.get(
      `http://95.217.34.212:30000/api${url}`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTAyZGFiNDVkZGY4ZjJiMDY1YzQwMjEiLCJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjk0Njg1OTQ0fQ.I0LLv5ihAY4OxR-h4RDfboVEO08pHrr3uUilr91poek',
        },
      },
    )

    if (!response.data) {
      throw new Error('No data received')
    }

    return response
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}
