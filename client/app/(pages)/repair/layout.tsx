import { getAllGadgetsData } from '@/app/(server)/api/service/modules/gadgetService'

export async function generateStaticParams() {
  const gadgets = await getAllGadgetsData()
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

// !!!!!!!!!!!!!!!!!!!!!!!!! layout.tsx протрібен для SSG перемістити в /repair!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
