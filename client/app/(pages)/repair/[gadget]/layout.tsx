import fetchDataFromServer from '@/app/(server)/api/service/helpers/fetchDataFromServer'

export async function generateStaticParams() {
  const url = `/gadgets`
  const gadgets = await fetchDataFromServer(url)
  return gadgets.map((item: { slug: string }) => ({
    gadget: item.slug,
  }))
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}

// !!!!!!!!!!!!!!!!!!!!!!!!! layout.tsx протрібен для SSG перемістити в /[gadget]!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
