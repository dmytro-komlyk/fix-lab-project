import Link from 'next/link'

const AdminPanel: React.FC = () => {
  return (
    <section className='overflow-hidden bg-gradient-linear-blue  pb-[202px] pt-[271px] max-md:pb-14 max-md:pt-[138px]'>
      <div className='container'>
        <div className='flex items-center justify-center gap-4'>
          <Link
            className='group mt-4 flex w-full items-center justify-center rounded-lg bg-mid-green transition-colors hover:bg-black-dis focus:bg-black-dis'
            href='/admin/repair'
          >
            <h2 className='whitespace-nowrap py-[20px] font-exo_2 text-xl font-semibold tracking-[0.64] text-white-dis '>
              Ремонт гаджетів
            </h2>
          </Link>
          <Link
            className='group mt-4 flex w-full items-center justify-center rounded-lg bg-mid-green transition-colors hover:bg-black-dis focus:bg-black-dis'
            href='/admin/blog'
          >
            <h2 className='whitespace-nowrap py-[20px] font-exo_2 text-xl font-semibold tracking-[0.64] text-white-dis '>
              Блог
            </h2>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AdminPanel
