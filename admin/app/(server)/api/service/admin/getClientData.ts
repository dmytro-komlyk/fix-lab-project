import axios from 'axios'
import { getSession } from 'next-auth/react'

export default async function getClientData(url: string) {
  const session = await getSession()
  if (session?.user.token === undefined) {
    throw new Error('Headers are undefined')
  }
  const res = await axios.get(`http://localhost:30000/api${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user.token}`,
    },
  })
  if (res.status !== 200) {
    throw new Error(res.status.toString() + res.statusText)
  }

  return res.data
}
