/* eslint-disable no-console */
import { notFound } from 'next/navigation'

export default async function fetchDataFromServer(url: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`, {
      next: { tags: ['blog-posts'], revalidate: 60 },
    })

    if (!res.ok) {
      notFound()
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
