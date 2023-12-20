import { serverClient } from 'admin/app/(utils)/trpc/serverClient'
import Image from 'next/image'
import Link from 'next/link'

// export const runtime = 'edge'
// export const revalidate = 3600
export const dynamic = 'force-dynamic'

const BenefitsPage = async () => {
  const benefitsData = (await serverClient.benefits.getAll()) as Benefit[]

  // const url = '/benefits/all'
  // const benefitsData = await getData(url)

  return (
    <main className='flex flex-auto'>
      <section className='flex h-[100vh] w-full items-center overflow-hidden  bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container relative flex flex-col px-8'>
          <ul>
            {benefitsData.map((item: Benefit) => (
              <li key={item.id}>
                <Link
                  className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl'
                  href={`/benefits/${item.id}`}
                >
                  <div className='flex items-center gap-2 py-2'>
                    <Image
                      className='h-[40px] w-[40px] object-center opacity-100'
                      alt={item.icon.alt}
                      src={item.icon.file.path}
                      width={0}
                      height={0}
                      style={{
                        filter:
                          'brightness(0) saturate(100%) invert(95%) sepia(0%) saturate(7500%) hue-rotate(69deg) brightness(106%) contrast(98%)',
                      }}
                    />
                    <p>{item.title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default BenefitsPage
