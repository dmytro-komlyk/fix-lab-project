'use client'

import Image from 'next/image'

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
import { CommonButton } from '../(components)/CommonButton'
import { HeroSlider } from './(components)/HeroSlider'

const DATA = {
  items: [
    {
      link: '#',
      src: SmartphoneImage,
      alt: 'Замінити дисплей',
      title: 'Замінити дисплей',
    },
    {
      link: '#',
      src: ChargingImage,
      alt: 'Замінити розʼєм',
      title: 'Замінити розʼєм',
    },
    {
      link: '#',
      src: PowerImage,
      alt: 'Замінити батарею',
      title: 'Замінити батарею',
    },
    {
      link: '#',
      src: KeyboardImage,
      alt: 'Замінити клавіатуру',
      title: 'Замінити клавіатуру',
    },
    {
      link: '#',
      src: MatrixImage,
      alt: 'Замінити матрицю',
      title: 'Замінити матрицю',
    },
    {
      link: '#',
      src: LaptopImage,
      alt: 'Апгрейд ноутбуку',
      title: 'Апгрейд ноутбуку',
    },
    {
      link: '#',
      src: JoystickImage,
      alt: 'Ремонт джойстиків',
      title: 'Ремонт джойстиків',
    },
    {
      link: '#',
      src: BoomboxImage,
      alt: 'Ремонт колонок',
      title: 'Ремонт колонок',
    },
    {
      link: '#',
      src: EbookImage,
      alt: 'Ремонт читалок',
      title: 'Ремонт читалок',
    },
  ],
  pros: [
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
  ],
}

export const HeroSection = () => {
  const renderPros = () =>
    DATA.pros.map(item => (
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
    <section className='section xl:bg-herp-xl w-full bg-dark-blue bg-hero-sm py-0 md:bg-hero-md lg:bg-hero-lg xl:bg-hero-xl'>
      <div className='xl:bg-mscope-xlpt-[156px] h-full w-full bg-mscope-img bg-no-repeat pb-[80px] xl:container md:pt-[162px] xl:bg-mscope-xl xl:px-0'>
        <div className='relative flex flex-col '>
          <div className='mt-[-11px] flex flex-col items-center justify-start px-4 font-exo_2 text-white-dis md:w-[500px] md:items-start md:px-0'>
            <h2 className='text-3xl font-bold leading-none xl:text-title'>
              Бачимо гаджети
            </h2>
            <h3 className='text-4xl font-bold leading-none text-mid-blue drop-shadow-banner xl:text-9xl'>
              наскрізь
            </h3>

            <p className='mt-[22px] font-inter text-md leading-none tracking-title md:mt-11 md:text-xl md:tracking-normal'>
              Мережа студій ремонту твоєї техніки
            </p>

            <div className='mt-[54px] w-full md:mt-[48px] md:w-[320px] xl:w-[336px]'>
              <CommonButton onClick={() => {}}>
                Розрахувати вартість ремонту
              </CommonButton>
            </div>
          </div>

          <div className='overflow-x-hidden pt-[424px] md:max-w-[411px] md:pt-[54px]'>
            <h3 className='heading-none relative mx-3 border-b-2 border-pros-bg pb-[10px] align-top font-exo_2 text-xl tracking-middle text-white-dis md:mx-0'>
              Найчастіші звернення
              <Image
                className='absolute right-[2px] top-[calc(50%-4px)] -translate-y-1/2 text-white-dis'
                width={24}
                height={24}
                src={ArrowImage}
                alt='arrow'
              />
            </h3>

            <HeroSlider data={DATA.items} />
          </div>

          <div className='absolute right-0 top-0 hidden md:flex'>
            <ul>{renderPros()}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}
