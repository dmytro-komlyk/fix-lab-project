/* eslint-disable no-console */
const apiUrl = `http://95.217.34.212:30000/api` // замінити на NEXT_PUBLIC_SERVER_URL

export default async function fetchDataFromServer(url: string) {
  try {
    const res = await fetch(`${apiUrl}${url}`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(res.status.toString() + res.statusText)
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
