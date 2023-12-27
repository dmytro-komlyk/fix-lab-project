// import type { AxiosResponse } from 'axios'
// import axios from 'axios'
// import { getSession } from 'next-auth/react'

// const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL as string

// export interface ErrorResponse {
//   status: number
//   statusText: string
// }

// export default async function getData(url: string): Promise<any> {
//   try {
//     const session = await getSession()
//     if (!session?.user?.token) {
//       throw new Error('User token is undefined')
//     }

//     const response: AxiosResponse = await axios.get(`${apiUrl}${url}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${session.user.token}`,
//       },
//       validateStatus: status => status < 500,
//     })

//     if (response.status !== 200) {
//       const errorResponse: ErrorResponse = {
//         status: response.status,
//         statusText: response.statusText,
//       }
//       throw new Error(JSON.stringify(errorResponse))
//     }

//     return response.data
//   } catch (error) {
//     throw new Error(`Error in getData: ${(error as Error).message}`)
//   }
// }

// import { auth } from '../../../../../auth'

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL as string

export default async function getData(url: string) {
  // const session = await auth()
  // if (session?.user.name === undefined) {
  //   throw new Error('Headers are undefined')
  // }
  const res = await fetch(`${apiUrl}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTg5ODE2YjNiNzk3OGQ1MmNhMThkNmYiLCJpYXQiOjE3MDM1MTAzODJ9.oSu2p7ehVxcORXEKkZ-oU64nDDi7u5pNB7A9AU_PvFY`,
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error(res.status.toString() + res.statusText)
  }

  return res.json()
}
