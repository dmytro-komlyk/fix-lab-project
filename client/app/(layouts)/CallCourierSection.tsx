'use client'

import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'

import Button from './(components)/Button'
import CourierModal from './(components)/CourierModal'
import SuccessSubmitBanner from './(components)/SuccessSubmitBanner'

export const CallCourierSection: React.FC = () => {
  const pathname = usePathname()

  const [showModal, setShowModal] = useState<boolean>(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const toggleCourierModal = useCallback(() => {
    setShowModal(prev => !prev)
  }, [])
  const toggleSuccessSubmitModal = useCallback(() => {
    setSubmitSuccess(prev => !prev)
  }, [])

  return (
    <section className={` w-full overflow-hidden bg-mid-green`}>
      <div
        className={`container relative flex justify-end pb-[124px] ${
          pathname !== '/'
            ? 'pt-[106px] '
            : 'pt-[213px] max-xl:pt-[90px] max-md:py-14'
        }  max-lg:justify-center  max-md:py-14`}
      >
        <div>
          <div className=' absolute bottom-[250px] left-[23px] max-xl:bottom-[235px] max-lg:bottom-[342px] max-lg:left-[0] max-md:bottom-[337px] max-md:left-[50%] max-md:translate-x-[-50%] '>
            <Image
              className=' h-auto w-[480px] max-xl:w-[380px] max-md:min-w-[244px]'
              src='/images/courier-section/group-car.svg'
              alt='FixLab logo'
              width={480}
              height={187}
              priority
            />
            <p className='absolute left-[373px] top-[112px] font-gugi text-xl  text-white-dis max-xl:left-[295px] max-xl:top-[89px] max-xl:text-lg max-lg:left-[295px] max-lg:top-[89px] max-md:left-[185px] max-md:top-[56px] max-md:text-sm'>
              FixLab
            </p>
          </div>
          <Image
            className=' absolute bottom-[72px] left-[51px] h-auto w-[420px] max-xl:w-[320px] max-lg:bottom-[191px] max-lg:left-[15px] max-md:bottom-[237px] max-md:left-[50%] max-md:w-[251px] max-md:translate-x-[-50%] '
            src='/images/courier-section/group-bottom.svg'
            alt='FixLab logo'
            width={420}
            height={115}
            priority
          />
          <Image
            className=' absolute bottom-[134px] left-[26px] h-auto w-[467px] max-xl:bottom-[139px] max-xl:w-[367px] max-lg:bottom-[237px] max-lg:left-[0] max-md:bottom-[277px] max-md:left-[50%] max-md:w-[244px] max-md:translate-x-[-50%] '
            src='/images/courier-section/light-center.svg'
            alt='FixLab logo'
            width={467}
            height={181}
            priority
          />
          <Image
            className='absolute left-[-247px] top-[16px] z-[0] h-[542px] w-[100%] animate-pulse max-lg:bottom-[216px] max-lg:left-[50%] max-lg:translate-x-[-50%] max-md:top-[70px] max-sm:top-[30px]'
            src='/images/courier-section/star-bg.svg'
            alt='FixLab logo'
            width={756}
            height={542}
            priority
          />
        </div>
        <div className='z-[1] justify-between max-lg:flex max-lg:flex-col max-md:gap-[281px]'>
          <div className='flex flex-col gap-3.5 md:mb-8 '>
            <p className='text-xl font-[400] leading-9 text-dark-blue max-md:text-xl max-sm:text-lg'>
              Не треба ламати плани!
            </p>
            <p className='font-exo_2 text-2xl font-bold leading-10 text-dark-blue max-sm:text-lg'>
              Можна викликати курʼєра!
            </p>
          </div>
          <div className='gap-14 max-lg:flex max-lg:flex-col max-md:gap-8'>
            <p className='w-[503px] text-xl font-[300] text-dark-blue max-md:w-full  max-md:font-[400] max-sm:text-lg md:hidden lg:mb-14 lg:tracking-[1px]'>
              Ми самі заберемо гаджет на дослідження і він буде жити!
            </p>
            <p className='w-[503px] text-xl font-[300] text-dark-blue  max-md:hidden max-md:w-full max-md:font-[400] max-sm:text-lg lg:mb-14'>
              Ми самі заберемо гаджет на дослідження та подаруємо йому життя
            </p>
            <Button
              text='Викликати курʼєра'
              toggleModal={toggleCourierModal}
              styles='group relative flex min-w-[256px] py-4 items-center justify-center rounded-2xl bg-dark-blue transition-colors  hover:bg-black-dis focus:bg-black-dis  max-md:w-full'
              textHoverAnimation='text-base font-semibold tracking-wide text-white-dis group-hover:animate-hoverBtnOut animate-hoverBtnIn'
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {submitSuccess && (
          <SuccessSubmitBanner
            toggleSuccessSubmitModal={toggleSuccessSubmitModal}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showModal && (
          <CourierModal
            toggleCourierModal={toggleCourierModal}
            setSubmitSuccess={setSubmitSuccess}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
