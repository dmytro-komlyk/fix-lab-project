import { auth } from '../../../../../auth'

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL as string

export default async function getData(url: string) {
  const session = await auth()

  if (session?.user.name === undefined) {
    throw new Error('Headers are undefined')
  }
  const res = await fetch(`${apiUrl}${url}`, {
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
