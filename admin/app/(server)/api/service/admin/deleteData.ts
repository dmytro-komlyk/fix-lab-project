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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTg5ODE2YjNiNzk3OGQ1MmNhMThkNmYiLCJpYXQiOjE3MDM1MTAzODJ9.oSu2p7ehVxcORXEKkZ-oU64nDDi7u5pNB7A9AU_PvFY`,
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
