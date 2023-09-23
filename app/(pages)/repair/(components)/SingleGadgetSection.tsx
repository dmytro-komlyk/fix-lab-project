'use client'

import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import Button from '@/app/(layouts)/(components)/Button'
import CallUsCard from '@/app/(layouts)/(components)/CallUsCard'
import CostRepairModal from '@/app/(layouts)/(components)/CostRepairModal'
import InstantAdviceModal from '@/app/(layouts)/(components)/InstantAdviceModal'
// import ServicesList from '@/app/(layouts)/(components)/ServicesList'
import SuccessSubmitBanner from '@/app/(layouts)/(components)/SuccessSubmitBanner'
import type { IGadget } from '@/app/(server)/api/service/modules/gadgetService'

interface SingleGadgetProps {
  singleGadgetData: IGadget
}
const SingleGadgetSection: React.FC<SingleGadgetProps> = ({
  singleGadgetData,
}) => {
  const [submitSuccessCostRepair, setSubmitSuccessCostRepair] =
    useState<boolean>(false)
  const [submitSuccessInstantAdviceModal, setSubmitSuccessInstantAdviceModal] =
    useState<boolean>(false)
  const [showInstantAdviceModal, setShowInstantAdviceModal] =
    useState<boolean>(false)
  const [showCostRepair, setShowCostRepair] = useState<boolean>(false)

  const toggleSuccessSubmitInstantAdviceModal = useCallback(() => {
    setSubmitSuccessInstantAdviceModal(prev => !prev)
  }, [])

  const toggleSuccessCostRepair = useCallback(() => {
    setSubmitSuccessCostRepair(prev => !prev)
  }, [])

  const toggleInstantAdviceModal = useCallback(() => {
    setShowInstantAdviceModal(prev => !prev)
  }, [setShowInstantAdviceModal])

  const toggleCostRepairModal = useCallback(() => {
    setShowCostRepair(prev => !prev)
  }, [])
  const { title, icon, description } = singleGadgetData
  return (
    <section className=' overflow-hidden  bg-gradient-linear-blue  pb-[102px] pt-[163px] max-md:pb-14 max-md:pt-[138px]'>
      <div className='container relative flex flex-col '>
        <div className=' absolute left-[335px] top-[175px] max-lg:hidden'>
          <Image
            src='/background-flicker-center.svg'
            width={327}
            height={1008}
            alt='flicker'
          />
        </div>
        <div className=' absolute left-[0] top-[468px] max-lg:hidden'>
          <Image
            src='/background-flicker-left.svg'
            width={328}
            height={1008}
            alt='flicker'
          />
        </div>
        <div className='z-[1] flex items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/'
          >
            <p> Головна</p> <MdKeyboardArrowRight size={30} />
          </Link>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/repair'
          >
            <p> Ремонт</p> <MdKeyboardArrowRight size={30} />
          </Link>

          <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
            {title}
          </p>
        </div>
        <div className='z-[1] flex justify-between pt-[24px] max-xl:gap-8 max-lg:flex-col max-lg:gap-0  max-md:gap-0 '>
          <div className='max-xl:w-[350px] max-lg:w-full xl:max-w-[411px] '>
            <div className='flex flex-col items-start gap-14 pb-[68px]  max-xl:gap-4 max-xl:pb-[56px]  max-md:gap-8'>
              <div className='flex items-center justify-center gap-[18px]'>
                {icon && (
                  <Image
                    src={icon}
                    width={0}
                    height={0}
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                    alt={title}
                  />
                )}
                <h2 className='font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '>
                  {title}
                </h2>
              </div>
              <p className='font-[400] leading-6 text-white-dis'>
                {description}
              </p>
              <Button
                text='Миттєва консультація'
                toggleModal={toggleInstantAdviceModal}
                styles='group relative flex min-w-[256px] py-4 items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
                textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
              />
            </div>
            <CallUsCard />
          </div>
          <div className='flex flex-col gap-8 lg:w-[737px] lg:gap-14'>
            <div className='flex flex-col gap-14'>
              <div>
                <p className='mb-8 font-exo_2 text-xl font-semibold text-white-dis'>
                  Бренди, які ремонтуємо
                </p>
                {/* <BrandsList categoryData={categoryData} /> */}
              </div>
              <div>
                <p className='mb-8 font-exo_2 text-xl font-semibold text-white-dis'>
                  Послуги
                </p>
                {/* <ServicesList subcategoriesData={subcategoriesData} /> */}
              </div>
              <Button
                text='Розрахувати вартість ремонту'
                toggleModal={toggleCostRepairModal}
                styles='group flex justify-between w-full px-6 py-4 rounded-2xl bg-mid-blue'
                textHoverAnimation='font-exo_2 text-xl font-semibold text-dark-blue transition-transform duration-300 group-hover:translate-x-1 origin-center group-hover:scale-105 max-md:font-inter max-md:text-base max-md:font-semibold max-[380px]:text-sm'
                icon='text-dark-blue text-3xl max-md:text-xl transition-transform duration-300 origin-center group-hover:scale-125'
              />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showCostRepair && (
          <CostRepairModal
            toggleCostRepairModal={toggleCostRepairModal}
            setSubmitSuccess={setSubmitSuccessCostRepair}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showInstantAdviceModal && (
          <InstantAdviceModal
            toggleInstantAdviceModal={toggleInstantAdviceModal}
            setSubmitSuccess={setSubmitSuccessInstantAdviceModal}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {submitSuccessCostRepair && (
          <SuccessSubmitBanner
            text='Менеджер звʼжеться з вами протягом години.'
            toggleSuccessSubmitModal={toggleSuccessCostRepair}
          />
        )}
        {submitSuccessInstantAdviceModal && (
          <SuccessSubmitBanner
            toggleSuccessSubmitModal={toggleSuccessSubmitInstantAdviceModal}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default SingleGadgetSection
