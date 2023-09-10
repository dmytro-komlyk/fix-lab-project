export default async function getData(url: string) {
  const res = await fetch(`https://ropeaccess-hub.onrender.com${url}`, {
    headers: {
      Authorization: `Bearer 47174ee70e4e144d3de4212f9ce09a004315772bae5b648c067bbcd0c54ca5a6848ed744867cfddcce63ec11f02e433908ae85463a3c8f16cf03ace88ae60434e7f7bf5ff15e3aece0ec1ddda294504033c12d38176ad5fbb86655ff8e8b6f544ee05f54c93435dfdd264223d5c0733e4816bbeffca7d27d34e71f83fbf84848`,
    },
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    throw new Error(res.status.toString() + res.statusText)
  }

  return res.json()
}
