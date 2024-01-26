import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export default async function NotFound() {
  return (
    <main className='mt-[87px] flex-auto'>
      <section className='flex min-h-screen w-full bg-phone-not-found bg-cover bg-center bg-no-repeat md:bg-not-found'>
        <div className='container flex flex-col items-center justify-evenly md:justify-center'>
          <div className='flex w-[210px] flex-col items-center justify-center gap-2 md:w-full'>
            <p className='align-bottom font-exo_2 text-9xl font-bold text-dark-blue'>
              404
            </p>
            <p className='pb-8 text-center font-exo_2 text-base font-semibold text-dark-blue md:text-xl'>
              Дуже прикро, але ця сторінка не відповідає!
            </p>
          </div>
          <Link
            className='group relative flex min-w-[256px] items-center justify-center rounded-2xl bg-mid-green py-4 transition-colors  hover:bg-mid-blue focus:bg-mid-blue max-md:w-full'
            href='/'
          >
            <p className='animate-hoverBtnIn text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut'>
              Повернутися на головну
            </p>
          </Link>
        </div>
      </section>
    </main>
  )
}
