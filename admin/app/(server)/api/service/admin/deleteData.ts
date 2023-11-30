import { getSession } from 'next-auth/react'

export default async function deleteData(url: string) {
  try {
    const session = await getSession()

    if (session?.user?.token === undefined) {
      throw new Error('Headers are undefined')
    }

    const res = await fetch(`http://95.217.34.212:30000/api${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.token}`,
      },
    })

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`)
    }

    return await res.json()
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}
