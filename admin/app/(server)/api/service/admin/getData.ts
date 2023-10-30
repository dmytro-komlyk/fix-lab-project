export default async function getData(url: string) {
  const res = await fetch(`http://95.217.34.212:30000/api${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTFmMTNiZDQ4ZDUxZGY2OTMxY2QxMjYiLCJsb2dpbiI6ImFkbWluMSIsImlhdCI6MTY5NzcyMDk0N30.k84ARQO5rlKDtJPLmzTJoRRsTKnVxbLiXFQjE0A6Rgo`,
    },
    cache: 'no-cache',
  })
  if (!res.ok) {
    throw new Error(res.status.toString() + res.statusText)
  }

  return res.json()
}
