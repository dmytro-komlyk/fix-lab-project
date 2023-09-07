'use client'

import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { useWindowSize } from '@/app/(hooks)/useWindowResize'
import Button from '@/app/(layouts)/(components)/Button'
import CallUsCard from '@/app/(layouts)/(components)/CallUsCard'
import InstantAdviceModal from '@/app/(layouts)/(components)/InstantAdviceModal'
import SuccessSubmitBanner from '@/app/(layouts)/(components)/SuccessSubmitBanner'

import type { IBenefitItem } from './BenefitsList'
import { BenefitsList } from './BenefitsList'
import type { IGadgetItem } from './GadgetsList'
import { GadgetsList } from './GadgetsList'

export interface IForBusinessSectionProps {
  sectionData: {
    path: string
    info: {
      title: string
      benefits: IBenefitItem[]
      description: string
    }
    officeGadgets: {
      title: string
      gadgets: IGadgetItem[]
    }
  }
}

const ForBusinessSection: React.FC<IForBusinessSectionProps> = ({
  sectionData,
}) => {
  const windowSize = useWindowSize()

  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const [showInstantAdviceModal, setShowInstantAdviceModal] =
    useState<boolean>(false)

  const toggleSuccessSubmitModal = useCallback(() => {
    setSubmitSuccess(prev => !prev)
  }, [])

  const toggleInstantAdviceModal = useCallback(() => {
    setShowInstantAdviceModal(prev => !prev)
  }, [setShowInstantAdviceModal])

  return (
    <section className='overflow-hidden bg-gradient-linear-blue pt-[151px]'>
      <div className='container flex flex-col lg:p-0'>
        <div className='flex items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
            href='/'
          >
            <p className='text-md'>Головна</p>{' '}
            <MdKeyboardArrowRight size={30} />
          </Link>

          <p className='text-md font-[400] text-[#0088C5] opacity-70'>
            {sectionData.path}
          </p>
        </div>
        <div className='flex flex-col justify-between gap-[50px] pb-[102px] pt-[28px] lg:flex-row'>
          <div className='flex w-full flex-col gap-8 lg:max-w-[500px] lg:gap-14'>
            <div className='flex flex-col gap-6 lg:gap-8'>
              <h3 className='font-exo_2 text-xl text-[#FFFFFF] lg:text-2xl'>
                {sectionData.info.title}
              </h3>
              <BenefitsList items={sectionData.info.benefits} />
              <p className='font-[400] text-white-dis'>
                {sectionData.info.description}
              </p>
            </div>
            <div className='w-full lg:max-w-[288px]'>
              <Button
                text='Миттєва консультація'
                toggleModal={toggleInstantAdviceModal}
                styles='group relative flex min-w-[256px] py-4 items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
                textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
              />
            </div>
            <CallUsCard />
          </div>
          <div className='flex flex-col gap-8'>
            <Image
              className='min-h-[245px] w-full max-w-[358px] md:max-h-[360px] md:max-w-[737px]'
              src={
                windowSize.width > 768
                  ? '/images/for-business-table.png'
                  : '/images/for-business-table-sm.png'
              }
              alt='Office table'
              width={737}
              height={360}
            />
            <div className='flex flex-col gap-8'>
              <h5 className='text-md font-[300] text-white-dis'>
                {sectionData.officeGadgets.title}
              </h5>
              <GadgetsList items={sectionData.officeGadgets.gadgets} />
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
      </div>
    </section>
  )
}

export default ForBusinessSection
