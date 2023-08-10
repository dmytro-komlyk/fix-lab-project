import Image from 'next/image'
import React from 'react'

import ArrowImage from '../../public/icons/arrow-down-right.svg'
import IconGuard from '../../public/icons/icon-guard.svg'
import IconScredriver from '../../public/icons/icon-screwdriver.svg'
import IconZoom from '../../public/icons/icon-zoom.svg'
import BoomboxImage from '../../public/icons/pop-boombox.svg'
import ChargingImage from '../../public/icons/pop-charging.svg'
import EbookImage from '../../public/icons/pop-e-book.svg'
import JoystickImage from '../../public/icons/pop-joystick.svg'
import KeyboardImage from '../../public/icons/pop-keyboard.svg'
import LaptopImage from '../../public/icons/pop-laptop.svg'
import MatrixImage from '../../public/icons/pop-matrix.svg'
import PowerImage from '../../public/icons/pop-power.svg'
import SmartphoneImage from '../../public/icons/pop-smartphone.svg'

const ITEMS = [
  {
    src: SmartphoneImage,
    alt: 'Замінити дисплей',
    title: 'Замінити дисплей',
  },
  {
    src: ChargingImage,
    alt: 'Замінити розʼєм',
    title: 'Замінити розʼєм',
  },
  {
    src: PowerImage,
    alt: 'Замінити батарею',
    title: 'Замінити батарею',
  },
  {
    src: KeyboardImage,
    alt: 'Замінити клавіатуру',
    title: 'Замінити клавіатуру',
  },
  {
    src: MatrixImage,
    alt: 'Замінити матрицю',
    title: 'Замінити матрицю',
  },
  {
    src: LaptopImage,
    alt: 'Апгрейд ноутбуку',
    title: 'Апгрейд ноутбуку',
  },
  {
    src: JoystickImage,
    alt: 'Ремонт джойстиків',
    title: 'Ремонт джойстиків',
  },
  {
    src: BoomboxImage,
    alt: 'Ремонт колонок',
    title: 'Ремонт колонок',
  },
  {
    src: EbookImage,
    alt: 'Ремонт читалок',
    title: 'Ремонт читалок',
  },
]

const PROS = [
  {
    src: IconZoom,
    alt: 'Безкоштовна діагностика',
    title: 'Безкоштовна діагностика',
  },
  {
    src: IconGuard,
    alt: 'Гарантія до 6 місяців',
    title: 'Гарантія до 6 місяців',
  },
  {
    src: IconScredriver,
    alt: 'Швидкий ремонт',
    title: 'Швидкий ремонт',
  },
]

export const HeroSection = () => {
  const renderList = () =>
    ITEMS.map(item => (
      <li
        className='mr-4 flex h-[148px] w-[120px] min-w-[120px] flex-col items-center justify-between rounded-2xl bg-white-dis px-5 py-[18px]'
        key={item.alt}
      >
        <Image src={item.src} height={60} alt={item.alt} className='border' />
        <h4 className='text-center font-inter text-base leading-5 text-dark-blue'>
          {item.title}
        </h4>
      </li>
    ))

  const renderPros = () =>
    PROS.map(item => (
      <li
        className='mb-8 flex w-[156px] flex-col items-center rounded-2xl bg-pros-bg px-[18px] py-6 drop-shadow-pros'
        key={item.alt}
      >
        <Image src={item.src} alt={item.alt} width={68} height={68} />
        <p className='font-base mt-6 text-center leading-5 tracking-tight text-dark-blue'>
          {item.title}
        </p>
      </li>
    ))

  return (
    <section className='section w-full bg-dark-blue bg-banner-conic-blue-sm pt-36 md:bg-banner-conic-blue-md lg:bg-banner-conic-blue-lg xl:bg-banner-conic-blue-xl '>
      <div className='relative flex flex-col bg-banner-img bg-banner bg-no-repeat md:container md:bg-desktop'>
        <div className='flex flex-col items-center px-4 font-exo_2 text-white-dis md:items-start xl:w-[500px]'>
          <h2 className='text-3xl font-bold leading-none xl:text-title'>
            Бачимо гаджети
          </h2>
          <h3 className='text-4xl font-bold leading-none text-mid-blue drop-shadow-banner xl:text-9xl'>
            наскрізь
          </h3>

          <p className='mt-5 text-md leading-none tracking-wide md:text-xl'>
            Мережа студій ремонту твоєї техніки
          </p>
          <button
            type='button'
            className='mt-14 w-full rounded-xl bg-mid-green px-12 py-4 xl:w-[336px] xl:px-2'
          >
            <span className='font-inter text-base font-semibold text-dark-blue'>
              Розрахувати вартість ремонту
            </span>
          </button>
        </div>

        <div className='pt-[426px] xl:max-w-[411px] xl:pt-[58px]'>
          <h3 className='relative mx-4 font-exo_2 text-xl text-white-dis'>
            Найчастіші звернення
            <Image
              className='absolute right-0 top-1/2 -translate-y-1/2 text-white-dis'
              width={24}
              height={24}
              src={ArrowImage}
              alt='arrow'
            />
          </h3>
          <ul className='ml-4 flex overflow-x-scroll py-8'>{renderList()}</ul>
        </div>

        <div className='absolute right-0 top-0 hidden md:flex'>
          <ul>{renderPros()}</ul>
        </div>
      </div>
    </section>
  )
}
