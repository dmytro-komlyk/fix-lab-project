import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export default async function NotFound() {
  return (
    <main className='mt-[87px] flex-auto'>
      <section className='bg-phone-not-found md:bg-not-found flex min-h-screen w-full bg-cover bg-center bg-no-repeat'>
        <div className='container flex flex-col items-center justify-evenly md:justify-center'>
          <div className='flex w-[210px] flex-col items-center justify-center gap-2 md:w-full'>
            <p className='font-exo_2 text-dark-blue align-bottom text-9xl font-bold'>
              404
            </p>
            <p className='font-exo_2 text-dark-blue pb-8 text-center text-base font-semibold md:text-xl'>
              Дуже прикро, але ця сторінка не відповідає!
            </p>
          </div>
          <Link
            className='bg-mid-green hover:bg-mid-blue focus:bg-mid-blue group relative flex min-w-[256px] items-center justify-center rounded-2xl  py-4 transition-colors max-md:w-full'
            href='/'
          >
            <p className='text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn text-base font-semibold tracking-wide'>
              Повернутися на головну
            </p>
          </Link>
        </div>
      </section>
    </main>
  )
}
