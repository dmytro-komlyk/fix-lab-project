// export async function generateStaticParams() {
//   const gadgetsData = (await trpc.getGadgetsQuery.query()) as IGadget[]
//   return gadgetsData.map((item: { slug: string }) => ({
//     gadget: item.slug,
//   }))
// }
export const runtime = 'edge'
export const revalidate = 3600

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
