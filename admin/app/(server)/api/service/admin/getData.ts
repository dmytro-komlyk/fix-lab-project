import { getServerSession } from 'next-auth'

import { authConfig } from '@/app/(utils)/authConfig'

export default async function getData(url: string) {
  const session = await getServerSession(authConfig)

  if (session?.user.token === undefined) {
    throw new Error('Headers are undefined')
  }
  const res = await fetch(`http://95.217.34.212:30000/api${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.token}`,
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error(res.status.toString() + res.statusText)
  }

  return res.json()
}
