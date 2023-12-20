'use client'

import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

import { GadgetsList } from '../(pages)/repair/(components)/GadgetsList'
import { GadgetsSlider } from '../(pages)/repair/(components)/GadgetsSlider'
import type { IGadget } from '../(server)/api/service/modules/gadgetService'
import { trpc } from '../(utils)/trpc/client'
import { serverClient } from '../(utils)/trpc/serverClient'
import Button from './(components)/Button'

const InstantAdviceModal = dynamic(
  () => import('./(components)/InstantAdviceModal'),
)
const SuccessSubmitBanner = dynamic(
  () => import('./(components)/SuccessSubmitBanner'),
)

export interface IGadgetsProps {
  gadgetsData: IGadget[]
}
// : React.FC<IGadgetsProps>
export const BrokenSection = ({
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
    <section className=' relative z-[3] pb-[39px] pt-[102px] max-md:pt-[43px] md:mb-[-50px] lg:mb-[-100px] xl:mb-[-150px]'>
      <div className='container lg:px-0 '>
        <div
          data-aos='fade-up'
          data-aos-offset='100'
          className='flex justify-between max-lg:flex-col md:gap-6'
        >
          <div className='flex  flex-col  max-lg:w-full max-md:w-full'>
            <h3 className='mb-[24px] font-exo_2 text-xl font-bold leading-normal text-light-blue md:text-2xl'>
              Що зламалося?
            </h3>
            <div className='mb-8 flex flex-col gap-[16px]  text-base font-normal max-md:w-[350px] md:gap-[23px] xl:max-w-[280px]'>
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
              styles='group relative flex max-w-[256px] mb-8 py-4 items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
              textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
            />
          </div>
          <div className='relative z-10 mr-[-16px] md:mr-0'>
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
