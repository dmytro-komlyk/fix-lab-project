export default async function getData(url: string) {
  const res = await fetch(`https://ropeaccess-hub.onrender.com${url}`, {
    headers: {
      Authorization: `Bearer c210828bdbc4747aece96d0f64c52c20d33c116b217c012826f61ddb418daacff328cd2707e5c15808457678bf8bfc7c448a6ae7a3093c7116fda55e9094a887cc0d1f2f07c1701054e08f11adfd2f4de24b1e47f6cc203c11937283e8811300cb672a3d05c018f22f28b10c60b3a1d055a16ac897d51b7f13181dab5dc91d01`,
    },
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    throw new Error(res.status.toString() + res.statusText)
  }

  return res.json()
}
