'use client'

import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import Button from '@/app/(layouts)/(components)/Button'

import { trpc } from 'client/app/(utils)/trpc/client'
import { serverClient } from 'client/app/(utils)/trpc/serverClient'
import { GadgetsList } from './GadgetsList'
import { GadgetsSlider } from './GadgetsSlider'

const InstantAdviceModal = dynamic(
  () => import('@/app/(layouts)/(components)/InstantAdviceModal'),
)
const SuccessSubmitBanner = dynamic(
  () => import('@/app/(layouts)/(components)/SuccessSubmitBanner'),
)

const GadgetsSection = ({
  gadgetsDataInit,
}: {
  gadgetsDataInit: Awaited<
    ReturnType<(typeof serverClient)['gadgets']['getAllPublished']>
  >
}) => {
  const { data: gadgetsData } = trpc.gadgets.getAllPublished.useQuery(
    undefined,
    {
      initialData: gadgetsDataInit,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )
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
    <section className='pb-[104px] pt-[163px] max-md:pb-14 max-md:pt-[120px]'>
      <div className='container flex flex-col lg:px-0'>
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
        <div className='mt-[30px] flex justify-between gap-6 max-lg:flex-col'>
          <div className='flex  flex-col max-lg:w-full max-md:w-full'>
            <h3 className='mb-[24px] font-exo_2 text-xl font-bold leading-normal text-light-blue md:text-2xl'>
              Що зламалося?
            </h3>
            <div className='mb-8 flex flex-col gap-[24px] text-base font-normal max-lg:gap-1 xl:max-w-[280px]'>
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
          <div className='relative z-[2] '>
            <div className='flex max-md:hidden'>
              <GadgetsList gadgetsData={gadgetsData} />
            </div>
            <div className='flex md:hidden'>
              <GadgetsSlider gadgetsData={gadgetsData} />
            </div>
          </div>
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
