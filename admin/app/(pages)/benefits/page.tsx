import getData from '@admin/app/(server)/api/service/admin/getData'
import Image from 'next/image'
import Link from 'next/link'

export const runtime = 'edge'
export const revalidate = 3600

const BenefitsPage = async () => {
  const url = '/benefits/all'
  const benefitsData = await getData(url)

  return (
    <main className='flex flex-auto'>
      <section className='bg-footer-gradient-linear-blue flex h-[100vh] w-full items-center  overflow-hidden py-[60px]'>
        <div className='container relative flex flex-col px-8'>
          <ul>
            {benefitsData.map(
              (item: {
                _id: string
                title: string
                icon: {
                  alt: string
                  src: string
                }
              }) => (
                <li key={item._id}>
                  <Link
                    className='font-exo_2 text-white-dis mb-6  text-2xl font-bold max-lg:text-xl'
                    href={`/benefits/${item._id}`}
                  >
                    <div className='flex items-center gap-2 py-2'>
                      <Image
                        className='h-[40px] w-[40px] object-center opacity-100'
                        alt={item.icon.alt}
                        src={item.icon.src}
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
              ),
            )}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default BenefitsPage
