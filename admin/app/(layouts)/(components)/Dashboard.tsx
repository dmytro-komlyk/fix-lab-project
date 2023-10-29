import Image from 'next/image'
import Link from 'next/link'

const Dashboard = () => {
  return (
    <div className='fixed left-0 flex h-[100vh] shrink flex-col justify-between bg-[#09338F]  pt-12 md:max-w-[400px]'>
      <div className='relative ml-8 flex flex-col'>
        <Link
          href='/'
          className='mb-8 flex transition-opacity hover:opacity-80  focus:opacity-80'
        >
          <Image
            className='mb-5 h-auto w-[88px] max-md:w-[65px]'
            src='/logo.svg'
            alt='FixLab logo'
            width='0'
            height='0'
            priority
          />
        </Link>

        <ul className='flex flex-col gap-4'>
          <li>
            <Link
              href='/gadgets'
              className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
            >
              Гаджети
            </Link>
          </li>
          <li>
            <Link
              href='/issues'
              className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
            >
              Послуги
            </Link>
          </li>
          <li>
            <Link
              href='/benefits'
              className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
            >
              Послуги сервісного обслуговування
            </Link>
          </li>
          <li>
            <Link
              href='/brands'
              className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
            >
              Бренди
            </Link>
          </li>
          <li>
            <Link
              href='/articles'
              className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
            >
              Блог
            </Link>
          </li>
          <li>
            <Link
              href='/contacts'
              className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
            >
              Контакти
            </Link>
          </li>
          <li>
            <Link
              href='/media'
              className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '
            >
              Медіа
            </Link>
          </li>
        </ul>
      </div>
      {/* <Button
          styles='group relative flex min-w-[256px] py-4 items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
          textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
          text='Викликати курʼєра'
        /> */}
    </div>
  )
}

export default Dashboard
