import React from 'react'
import { Exo_2, Inter } from 'next/font/google'

const exo2 = Exo_2({
  weight: ['700'],
  subsets: ['cyrillic'],
})

const inter = Inter({
  weight: ['400'],
  subsets: ['cyrillic'],
})

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
      <li key={index}>
        <img src={item.src} alt={item.alt} />
        <h4>{item.title}</h4>
      </li>
    ))

  const renderPros = () =>
    PROS.map((item, index) => (
      <li key={index}>
        <img src={item.src} alt={item.alt} />
        <p>{item.title}</p>
      </li>
    ))

  return (
    <section className='section w-full bg-text-dark-blue '>
      <div className='container relative flex flex-col'>
        <div className='flex flex-col items-center'>
          <h2
            className={`text-text-white text-3xl font-bold ${exo2.className}`}
          >
            Бачимо гаджети
          </h2>
          <svg viewBox='0 0 10 2'>
            <text
              x='5'
              y='1.5'
              text-anchor='middle'
              font-size='2.4'
              fill='none'
              stroke-width='.015'
              stroke='#fff'
              // font-family='sans-serif'
              className={`font-bold ${exo2.className}`}
            >
              наскрізь
            </text>
          </svg>
          <p className={`mb-14 text-text-white text-md ${inter.className}`}>
            Мережа студій ремонту твоєї техніки
          </p>
          <button className='rounded-xl bg-bg-mid-green px-12 py-6'>
            <span
              className={`text-text-dark-blue ${inter.className} text-base`}
            >
              Розрахувати вартість ремонту
            </span>
          </button>
        </div>

        {/* <div className='border'>
          <h3 className='border'>Найчастіші звернення</h3>
          <ul className='flex'>{renderList()}</ul>
          <div className='border'>progress bar</div>
        </div> */}

        <div className='border absolute right-0 top-0 hidden md:flex'>
          <ul>{renderPros()}</ul>
        </div>
      </div>
    </section>
  )
}
