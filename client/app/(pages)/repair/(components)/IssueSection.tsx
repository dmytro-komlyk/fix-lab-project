'use client'

/* eslint-disable no-underscore-dangle */
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import RenderMarkdownLight from '@/app/(components)/RenderMarkdownLight'
import Button from '@/app/(layouts)/(components)/Button'
import CallUsCard from '@/app/(layouts)/(components)/CallUsCard'
import CostRepairModal from '@/app/(layouts)/(components)/CostRepairModal'
import InstantAdviceModal from '@/app/(layouts)/(components)/InstantAdviceModal'
import SuccessSubmitBanner from '@/app/(layouts)/(components)/SuccessSubmitBanner'
import type { IContact } from '@/app/(server)/api/service/modules/contactService'
import type {
  IBrand,
  IGadget,
  IIssue,
} from '@/app/(server)/api/service/modules/gadgetService'

import { BenefitsList } from '../../corporate/(components)/BenefitsList'
import { GadgetBrandsSlider } from './GadgetBrandsSlider'

interface SingleIssueProps {
  contactsData: IContact[]
  singleIssueData: IIssue
  singleGadgetData: IGadget
  brandData: IBrand[]
}

const IssueSection: React.FC<SingleIssueProps> = ({
  singleIssueData,
  singleGadgetData,
  contactsData,
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

  const { title, slug } = singleGadgetData

  return (
    singleIssueData && (
      <section className='overflow-hidden bg-gradient-linear-blue'>
        <div className='container relative pb-[39px] pt-[158px] xl:px-0'>
          <div className=' absolute left-[335px] top-[175px] hidden lg:block'>
            <Image
              src='/background-flicker-center.svg'
              width={327}
              height={1008}
              alt='flicker'
            />
          </div>
          <div className='absolute left-[0] top-[468px] hidden lg:block'>
            <Image
              src='/background-flicker-left.svg'
              width={328}
              height={1008}
              alt='flicker'
            />
          </div>
          <div
            className='flex flex-wrap items-center gap-1'
            key={singleIssueData._id}
          >
            <Link
              className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
              href='/'
            >
              <p> Головна</p> <MdKeyboardArrowRight size={30} />
            </Link>
            <Link
              className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
              href='/repair'
            >
              <p> Ремонт</p> <MdKeyboardArrowRight size={30} />
            </Link>
            <Link
              className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
              href={`/repair/${slug}`}
            >
              <p> {title}</p> <MdKeyboardArrowRight size={30} />
            </Link>
            <p className='text-base font-[300] text-[#3EB9F0] opacity-70'>
              {singleIssueData.title}
            </p>
          </div>
          <div className='flex flex-col pb-[14px] pt-[28px]'>
            <div className='flex flex-col items-start justify-between gap-14 lg:flex-row lg:gap-32'>
              <div className='flex flex-col gap-8 lg:w-[411px] lg:gap-[67px]'>
                <div className='flex flex-col items-start'>
                  <h2 className='mb-8 font-exo_2 text-xl font-semibold leading-7 text-white-dis lg:text-2xl lg:font-bold lg:leading-10'>
                    {singleIssueData.title}
                  </h2>
                  {singleIssueData.benefits.length > 0 && (
                    <div className='mb-8'>
                      <BenefitsList items={singleIssueData.benefits} />
                    </div>
                  )}
                  <div className='mb-14'>
                    <RenderMarkdownLight markdown={singleIssueData.info} />
                  </div>
                  <Button
                    text='Миттєва консультація'
                    toggleModal={toggleInstantAdviceModal}
                    styles='group relative flex min-w-[288px] py-4 items-center justify-center rounded-2xl bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
                    textHoverAnimation='text-base font-semibold tracking-wide text-dark-blue group-hover:animate-hoverBtnOut animate-hoverBtnIn'
                  />
                </div>
                <CallUsCard contactsData={contactsData} />
              </div>
              <div className='mb-14 flex flex-col max-xl:w-[600px] max-lg:w-full xl:w-[737px]'>
                <div className='mb-14'>
                  <Image
                    className='min-h-[245px]  max-w-full rounded-2xl object-cover max-md:w-[360px] md:max-h-[360px]'
                    src={singleIssueData.image.src}
                    width={737}
                    height={360}
                    alt={singleIssueData?.image.alt}
                    priority
                  />
                </div>
                <div className='mb-[68px] flex flex-col max-md:w-[360px]'>
                  <RenderMarkdownLight markdown={singleIssueData.description} />
                </div>
                <div className='flex flex-col'>
                  {singleGadgetData.brands.length > 0 && (
                    <div className='max-md:w-[360px]'>
                      <p className='mb-[10px] font-exo_2 text-xl font-semibold text-white-dis'>
                        Бренди, які ремонтуємо
                      </p>
                      <div className='mb-[67px]'>
                        <GadgetBrandsSlider gadgetData={singleGadgetData} />
                      </div>
                    </div>
                  )}
                  <div>
                    <p className='mb-[24px] font-exo_2 text-xl font-semibold text-white-dis'>
                      Послуги
                    </p>

                    <ul className='mb-14'>
                      {singleGadgetData.issues?.map(item => {
                        return (
                          <li
                            className='hover:op border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 transition-opacity duration-300 first:rounded-t-xl last:rounded-b-xl hover:opacity-100 focus:opacity-100'
                            key={item._id}
                          >
                            <Link
                              className='flex items-center gap-[12px] max-md:flex-col max-md:items-start max-md:justify-center  max-md:px-[16px] max-md:py-[12px] md:h-[75px] md:justify-between md:px-6'
                              href={`/repair/${slug}/${item.slug}`}
                            >
                              <p className='font-exo_2 text-xl font-semibold text-dark-blue max-md:text-lg'>
                                {item.title}
                              </p>
                              <p className='text-md font-[400] text-black-dis'>
                                {item.price}
                              </p>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <Button
                    text='Розрахувати вартість ремонту'
                    toggleModal={toggleCostRepairModal}
                    styles='group flex justify-between w-full px-6 py-4 rounded-2xl bg-mid-green'
                    textHoverAnimation='font-exo_2 text-xl font-semibold text-dark-blue transition-transform duration-300 group-hover:translate-x-1 origin-center group-hover:scale-105 max-md:font-inter max-md:text-base max-md:font-semibold max-[380px]:text-sm'
                    icon='text-dark-blue text-3xl max-md:text-xl transition-transform duration-300 origin-center group-hover:scale-125'
                  />
                </div>
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
              text='Менеджер звʼяжеться з вами протягом години.'
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
  )
}

export default IssueSection
