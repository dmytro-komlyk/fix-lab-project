// export async function generateStaticParams() {
//   const gadgetsData = (await trpc.getGadgetsQuery.query()) as IGadget[]
//   return gadgetsData.map((item: { slug: string }) => ({
//     gadget: item.slug,
//   }))
// }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
