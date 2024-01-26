import { auth } from '@admin/app/(utils)/authOptions'

export default async function Home() {
  const session = await auth()

  return (
    <main className=' flex h-full w-full flex-auto'>
      <section className=' flex w-full items-center justify-center overflow-hidden  bg-footer-gradient-linear-blue  pb-[102px] pt-[163px] max-md:pb-14 max-md:pt-[120px]'>
        <h1 className=' bold font-exo_2 text-4xl text-white-dis'>
          {session?.user ? `Hello, ${session?.user.name}` : 'Hello'}
        </h1>
      </section>
    </main>
  )
}
