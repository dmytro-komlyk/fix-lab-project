import React from 'react'
import Image from 'next/image'

import ArrowImage from '../../public/icons/arrow-down-right.svg'
import BoomboxImage from '../../public/icons/pop-boombox.svg'
import ChargingImage from '../../public/icons/pop-charging.svg'
import EbookImage from '../../public/icons/pop-e-book.svg'
import JoystickImage from '../../public/icons/pop-joystick.svg'
import KeyboardImage from '../../public/icons/pop-keyboard.svg'
import LaptopImage from '../../public/icons/pop-laptop.svg'
import MatrixImage from '../../public/icons/pop-matrix.svg'
import PowerImage from '../../public/icons/pop-power.svg'
import SmartphoneImage from '../../public/icons/pop-smartphone.svg'
import IconZoom from '../../public/icons/icon-zoom.svg'
import IconGuard from '../../public/icons/icon-guard.svg'
import IconScredriver from '../../public/icons/icon-screwdriver.svg'

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
    ITEMS.map((item, index) => (
      <li
        className='bg-white-dis px-5 py-[18px] rounded-2xl mr-4 min-w-[120px] w-[120px] h-[148px] flex flex-col justify-between items-center'
        key={index}
      >
        <Image src={item.src} height={60} alt={item.alt} className='border' />
        <h4 className='text-center text-dark-blue text-base font-inter leading-5'>
          {item.title}
        </h4>
      </li>
    ))

  const renderPros = () =>
    PROS.map((item, index) => (
      <li
        className='bg-pros-bg px-[18px] py-6 rounded-2xl w-[156px] mb-8 flex flex-col drop-shadow-pros items-center'
        key={index}
      >
        <Image src={item.src} alt={item.alt} width={68} height={68} />
        <p className='text-dark-blue text-center mt-6 font-base leading-5 tracking-tight'>{item.title}</p>
      </li>
    ))

  return (
    <section className='section w-full bg-dark-blue pt-36 bg-banner-img bg-banner xl:bg-desktop bg-no-repeat'>
      <div className='xl:container relative flex flex-col'>
        <div className='flex flex-col items-center xl:items-start text-white-dis font-exo_2 px-4 xl:w-[500px]'>
          <h2 className='text-3xl font-bold leading-none xl:text-title'>
            Бачимо гаджети
          </h2>
          <h3 className='text-4xl xl:text-9xl font-bold leading-none text-mid-blue drop-shadow-banner'>
            наскрізь
          </h3>

          <p className='mt-5 text-md xl:text-xl leading-none tracking-wide'>
            Мережа студій ремонту твоєї техніки
          </p>
          <button className='rounded-xl mt-14 bg-mid-green px-12 xl:px-2 py-4 w-full xl:w-[336px]'>
            <span className='font-inter text-dark-blue font-semibold text-base'>
              Розрахувати вартість ремонту
            </span>
          </button>
        </div>

        <div className='pt-[426px] xl:pt-[58px] xl:max-w-[411px]'>
          <h3 className='text-white-dis font-exo_2 text-xl relative mx-4'>
            Найчастіші звернення
            <Image
              className='text-white-dis absolute top-1/2 right-0 -translate-y-1/2'
              width={24}
              height={24}
              src={ArrowImage}
              alt='arrow'
            />
          </h3>
          <ul className='flex ml-4 py-8 overflow-x-scroll'>{renderList()}</ul>
        </div>

        <div className='absolute right-0 top-0 hidden md:flex'>
          <ul>{renderPros()}</ul>
        </div>
      </div>
    </section>
  )
}
