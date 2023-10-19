'use client'

import { AnimatePresence } from 'framer-motion'
import React, { useCallback, useState } from 'react'

import GadgetsSlider from '../(pages)/repair/(components)/slider'
import type { IGadget } from '../(server)/api/service/modules/gadgetService'
import Button from './(components)/Button'
import InstantAdviceModal from './(components)/InstantAdviceModal'
import SuccessSubmitBanner from './(components)/SuccessSubmitBanner'

export interface IGadgetsProps {
  gadgetsData: IGadget[]
}
export const BrokenSection: React.FC<IGadgetsProps> = ({ gadgetsData }) => {
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
    <section className='section z-[1] md:mb-[-50px] lg:mb-[-100px] xl:mb-[-150px]'>
      <div className='container'>
        <div
          data-aos='fade-up'
          data-aos-offset='100'
          className='relative z-[1] justify-between gap-8 md:flex'
        >
          <div className='mb-8 max-w-[270px] md:mb-0'>
            <h3 className='mb-8 font-exo_2 text-xl font-bold leading-normal text-light-blue md:text-2xl'>
              Що зламалося?
            </h3>
            <p className='mb-4'>
              У нас є багато варіантів, як подарувати друге життя вашому
              гаджету.
            </p>
            <p className='mb-4'>
              Обирайте потрібний пристрій, що зламався, та дізнавайтесь ціни на
              ремонт.
            </p>
            <p className='mb-8'>
              Або ж, економте час, залишайте заявку на консультацію.
            </p>
            <Button
              text='Миттєва консультація'
              toggleModal={toggleInstantAdviceModal}
              styles='group relative flex min-w-[256px] min-h-[56px]  items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
              textHoverAnimation='py-5 text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
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
      {submitSuccess && (
        <AnimatePresence>
          <SuccessSubmitBanner
            toggleSuccessSubmitModal={toggleSuccessSubmitModal}
          />
        </AnimatePresence>
      )}
    </section>
  )
}
