'use client'

import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import type { IGadgetsProps } from '@/app/(layouts)'
import Button from '@/app/(layouts)/(components)/Button'
import InstantAdviceModal from '@/app/(layouts)/(components)/InstantAdviceModal'
import SuccessSubmitBanner from '@/app/(layouts)/(components)/SuccessSubmitBanner'

import { GadgetsSlider } from './GadgetsSlider'

const GadgetsSection: React.FC<IGadgetsProps> = ({ gadgetsData }) => {
  const [showInstantAdviceModal, setShowInstantAdviceModal] =
    useState<boolean>(false)

  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)

  const toggleSuccessSubmitModal = useCallback(() => {
    setSubmitSuccess(prev => !prev)
  }, [])

  const toggleInstantAdviceModal = useCallback(() => {
    setShowInstantAdviceModal(prev => !prev)
  }, [setShowInstantAdviceModal])

  return (
    <section className='section py-[120px] max-md:pb-[56px] max-md:pt-[120px]'>
      <div className='container flex flex-col gap-6 lg:px-0'>
        <div className='flex items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-dark-blue'
            href='/'
          >
            <p> Головна</p>
          </Link>
          <MdKeyboardArrowRight className='text-dark-blue' size={20} />
          <p className='text-base font-[400] text-dark-blue opacity-50'>
            Ремонт
          </p>
        </div>
        <div className='flex justify-between gap-8 max-md:flex-col'>
          <div className='flex w-[300px] flex-col gap-6 max-md:w-full'>
            <h3 className='font-exo_2 text-xl font-bold leading-normal text-light-blue md:text-2xl'>
              Що зламалося?
            </h3>
            <div className='flex flex-col gap-4 text-base font-normal'>
              <p>
                У нас є багато варіантів, як подарувати друге життя вашому
                гаджету.
              </p>
              <p>
                Обирайте потрібний пристрій, що зламався, та дізнавайтесь ціни
                на ремонт.
              </p>
              <p>Або ж, економте час, залишайте заявку на консультацію.</p>
            </div>
            <Button
              text='Миттєва консультація'
              toggleModal={toggleInstantAdviceModal}
              styles='group relative flex max-w-[256px] py-4 items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
              textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
            />
          </div>
          <GadgetsSlider gadgetsData={gadgetsData} />
        </div>
      </div>
      {showInstantAdviceModal && (
        <InstantAdviceModal
          toggleInstantAdviceModal={toggleInstantAdviceModal}
          setSubmitSuccess={setSubmitSuccess}
        />
      )}
      <AnimatePresence>
        {submitSuccess && (
          <SuccessSubmitBanner
            toggleSuccessSubmitModal={toggleSuccessSubmitModal}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default GadgetsSection
