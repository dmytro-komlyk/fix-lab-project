/* eslint-disable no-console */
import { authConfig } from '@admin/app/(utils)/authConfig'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { getServerSession } from 'next-auth'

export default async function getImageData(url: string): Promise<any> {
  try {
    const session = await getServerSession(authConfig)

    if (session?.user.token === undefined) {
      throw new Error('Headers are undefined')
    }

    const response: AxiosResponse = await axios.get(
      `http://95.217.34.212:30000/api${url}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
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
