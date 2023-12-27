const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL as string

export default async function deleteData(url: string) {
  try {
    // const session = await getSession()

    // if (session?.user?.token === undefined) {
    //   throw new Error('Headers are undefined')
    // }

    const res = await fetch(`${apiUrl}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTg5OTBlZmFjNWRmNjcwNjU5YTA1MzgiLCJpYXQiOjE3MDM1MTQzNjV9.s1By_dgoehic_ymyoFv7830QByFXFFQsNOR8wsgvQQI`,
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
