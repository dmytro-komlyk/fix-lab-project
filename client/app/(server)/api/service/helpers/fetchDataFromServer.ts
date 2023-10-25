/* eslint-disable no-console */
// const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL
import axios from 'axios'

// SSG //

// export default async function fetchDataFromServer(url: string) {
//   try {
//     const res = await fetch(`http://95.217.34.212:30000/api${url}`, {
//       next: { revalidate: 60 },
//     })

//     if (!res.ok) {
//       throw new Error(res.status.toString() + res.statusText)
//     }

//     return await res.json()
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     throw error
//   }
// }

// SSR //

export default async function fetchDataFromServer(url: string) {
  try {
    const response = await axios.get(`http://95.217.34.212:30000/api${url}`, {})

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`${response.status} ${response.statusText}`)
    }

    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
