export default async function getData(url: string) {
  const res = await fetch(`https://ropeaccess-hub.onrender.com${url}`, {
    headers: {
      Authorization: `Bearer b52d3c1c4a902b67f71be90a9379894cacad7f9ec3752910b1e00d2f8a190794341fc823b1101bfb9753c13a4d004ca45d735946e61efcc75dc48cdea6a8bb6eef6e872b255773074ccc25e7697aca3dfef8ef8095c4420ab3a2294c44c5619b7d8d925a0ec75c1defbba467f7417b9df465efde28dcaf5138a627bd8e735b6e`,
    },
    next: { revalidate: 10 },
  })
  if (!res.ok) {
    throw new Error(res.status.toString() + res.statusText)
  }

  return res.json()
}
