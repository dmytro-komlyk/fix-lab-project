import React from 'react'

const ITEMS = [
  {
    src: '',
    alt: 'Замінити дисплей',
    title: 'Замінити дисплей',
  },
  {
    src: '',
    alt: 'Замінити розʼєм',
    title: 'Замінити розʼєм',
  },
  {
    src: '',
    alt: 'Замінити батарею',
    title: 'Замінити батарею',
  },
  {
    src: '',
    alt: 'Замінити дисплей',
    title: 'Замінити дисплей',
  },
  {
    src: '',
    alt: 'Замінити дисплей',
    title: 'Замінити дисплей',
  },
  {
    src: '',
    alt: 'Замінити дисплей',
    title: 'Замінити дисплей',
  },
]

const PROS = [
  {
    src: '',
    alt: 'Безкоштовна діагностика',
    title: 'Безкоштовна діагностика',
  },
  {
    src: '',
    alt: 'Гарантія до 6 місяців',
    title: 'Гарантія до 6 місяців',
  },
  {
    src: '',
    alt: 'Швидкий ремонт',
    title: 'Швидкий ремонт',
  },
]

export const HeroSection = () => {
  const renderList = () =>
    ITEMS.map((item, index) => (
      <li
        className='bg-white-dis p-5 rounded-2xl mr-4 w-[120px] h-[148px]'
        key={index}
      >
        <img src={item.src} alt={item.alt} />
        <h4 className='text-center text-dark-blue'>{item.title}</h4>
      </li>
    ))

  // const renderPros = () =>
  //   PROS.map((item, index) => (
  //     <li className='bg-white-dis p-5 rounded-2xl' key={index}>
  //       <img src={item.src} alt={item.alt} />
  //       <p className='text-dark-blue'>{item.title}</p>
  //     </li>
  //   ))

  return (
    <section className='section w-full bg-dark-blue pt-36'>
      <div className='container relative flex flex-col'>
        <div className='flex flex-col items-center text-white-dis font-exo_2'>
          <h2 className='text-3xl font-bold'>Бачимо гаджети</h2>
          <h3 className='text-4xl font-bold'>наскрізь</h3>

          <p className='mb-14 text-md'>Мережа студій ремонту твоєї техніки</p>
          <button className='rounded-xl bg-mid-green px-12 py-6'>
            <span className='font-inter text-dark-blue font-semibold text-base'>
              Розрахувати вартість ремонту
            </span>
          </button>
        </div>

        <div className='pt-36'>
          <h3 className='text-white-dis font-exo_2 text-xl'>
            Найчастіші звернення
          </h3>
          <ul className='flex py-8 overflow-x-scroll'>{renderList()}</ul>
          <div className='border'>progress bar</div>
        </div>

        {/* <div className='border absolute right-0 top-0 hidden md:flex'>
          <ul>{renderPros()}</ul>
        </div> */}
      </div>
    </section>
  )
}
