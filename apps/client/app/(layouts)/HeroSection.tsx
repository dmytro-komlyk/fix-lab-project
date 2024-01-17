'use client'

import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCallback, useState } from 'react'

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
import HeroPhone from '../../public/images/phone-hero.png'
import { CommonButton } from '../(components)/CommonButton'

const HeroSlider = dynamic(() => import('./(components)/HeroSlider/HeroSlider'))
const SuccessSubmitBanner = dynamic(
  () => import('./(components)/SuccessSubmitBanner'),
)
const CostRepairModal = dynamic(() => import('./(components)/CostRepairModal'))

const DATA = {
  items: [
    {
      link: '/repair/telefon/zamina-ekranu',
      src: SmartphoneImage,
      alt: 'Дисплей',
      title: 'Замінити дисплей',
    },
    {
      link: '/repair/telefon/zamina-batareyi',
      src: PowerImage,
      alt: 'Батарея',
      title: 'Замінити батарею',
    },
    {
      link: '/repair/telefon/zamina-rozyemu-zaryadky',
      src: ChargingImage,
      alt: 'Розʼєм',
      title: 'Замінити розʼєм',
    },
    {
      link: '/repair/noutbuk',
      src: KeyboardImage,
      alt: 'Клавіатура',
      title: 'Замінити клавіатуру',
    },
    {
      link: '/repair/noutbuk',
      src: MatrixImage,
      alt: 'матрицю',
      title: 'Замінити матрицю',
    },
    {
      link: '/repair/noutbuk',
      src: LaptopImage,
      alt: 'Ноутбук',
      title: 'Апгрейд ноутбуку',
    },
    {
      link: '/repair/dzhojstik',
      src: JoystickImage,
      alt: 'ДжойстиК',
      title: 'Ремонт джойстиків',
    },
    {
      link: '/repair/navushniki-kolonki',
      src: BoomboxImage,
      alt: 'Колонка',
      title: 'Ремонт колонок',
    },
    {
      link: '/repair/elektronna-knizhka',
      src: EbookImage,
      alt: 'Читалка',
      title: 'Ремонт читалок',
    },
  ],
  pros: [
    {
      src: IconZoom,
      alt: 'Лупа',
      title: 'Безкоштовна діагностика',
    },
    {
      src: IconGuard,
      alt: 'Щит',
      title: 'Гарантія до 6 місяців',
    },
    {
      src: IconScredriver,
      alt: 'Викрутка',
      title: 'Швидкий ремонт',
    },
  ],
}

export const HeroSection = () => {
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const [showCostRepairModal, setShowCostRepairModal] = useState<boolean>(false)

  const toggleSuccessSubmitModal = useCallback(() => {
    setSubmitSuccess(prev => !prev)
  }, [])

  const toggleCostRepairModal = useCallback(() => {
    setShowCostRepairModal(prev => !prev)
  }, [])

  const renderPros = () =>
    DATA.pros.map(item => (
      <li
        className='mb-8 flex w-[156px] flex-col items-center rounded-2xl bg-pros-bg px-[18px] py-6 drop-shadow-pros'
        key={item.alt}
      >
        {item.src && (
          <Image src={item.src} alt={item.alt} width={68} height={68} />
        )}
        <p className='font-base mt-6 text-center leading-5 tracking-tight text-dark-blue'>
          {item.title}
        </p>
      </li>
    ))

  return (
    <section className='section xl:bg-herp-xl w-full bg-dark-blue bg-hero-xl py-0 md:bg-hero-md lg:bg-hero-lg xl:bg-hero-xl'>
      <div className='lg relative size-full bg-mscope-img bg-mscope-sm bg-no-repeat pb-[80px] pt-[156px] md:container max-md:pb-[30px] md:bg-mscope-md md:pt-[162px] lg:bg-mscope-lg xl:bg-mscope-xl xl:px-0'>
        <Image
          className='absolute left-[51%] top-[58%] max-w-[300px] -translate-x-1/2 -translate-y-1/2 text-white-dis max-xl:left-[48%] max-xl:top-[55%]  max-md:left-[44%] max-md:top-[54%] max-md:hidden  max-[430px]:left-[44%] max-[430px]:top-[54%] max-[430px]:w-[170px]'
          width={246}
          height={93}
          src={HeroPhone}
          alt='arrow'
        />
        <div
          data-aos='fade-up'
          className='relative flex flex-col md:px-4 xl:px-0'
        >
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
              <CommonButton onClick={toggleCostRepairModal}>
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

          <div className=' absolute right-0 top-0 hidden md:right-4 md:flex lg:right-4 xl:right-0'>
            <ul>{renderPros()}</ul>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showCostRepairModal && (
          <CostRepairModal
            toggleCostRepairModal={toggleCostRepairModal}
            setSubmitSuccess={setSubmitSuccess}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {submitSuccess && (
          <SuccessSubmitBanner
            text='Менеджер звʼяжеться з вами протягом години.'
            toggleSuccessSubmitModal={toggleSuccessSubmitModal}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
