'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'

import CourierModal from './(components)/CourierModal'

export const CallCourierSection: React.FC = () => {
  const pathname = usePathname()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const toggleCourierModal = useCallback(() => {
    setShowModal(prev => !prev)
  }, [])

  return (
    <section className=' w-full overflow-hidden bg-mid-green'>
      <div
        className={`container relative flex justify-end pb-[102px]    ${
          pathname !== '/' ? 'pt-[102px]' : 'pt-[213px]'
        }  max-lg:justify-center max-md:py-14`}
      >
        <div>
          <div className=' absolute bottom-[255px] left-[16px] max-xl:bottom-[235px] max-lg:bottom-[342px] max-lg:left-[0] max-md:bottom-[400px] max-md:left-[50%] max-md:translate-x-[-50%] max-sm:bottom-[400px]'>
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
            className=' absolute bottom-[91px] left-[43px] h-auto w-[420px] max-xl:w-[320px] max-lg:bottom-[191px] max-lg:left-[15px] max-md:bottom-[300px] max-md:left-[50%] max-md:w-[251px] max-md:translate-x-[-50%] max-sm:bottom-[300px]'
            src='/images/courier-section/group-bottom.svg'
            alt='FixLab logo'
            width={420}
            height={115}
            priority
          />
          <Image
            className=' absolute bottom-[150px] left-[19px] h-auto w-[467px] max-xl:bottom-[139px] max-xl:w-[367px] max-lg:bottom-[237px] max-lg:left-[0] max-md:bottom-[335px] max-md:left-[50%] max-md:w-[244px] max-md:translate-x-[-50%] max-sm:bottom-[335px]'
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
        <div className='z-[1] justify-between max-lg:flex max-lg:flex-col max-md:gap-[264px]'>
          <div className='flex flex-col gap-4  md:mb-8 '>
            <p className='text-2xl font-[400] text-dark-blue max-md:text-xl max-sm:text-lg'>
              Не треба ламати плани!
            </p>
            <p className='font-exo_2 text-2xl font-bold text-dark-blue max-sm:text-lg'>
              Можна викликати курʼєра!
            </p>
          </div>
          <div className='gap-14 max-lg:flex max-lg:flex-col max-md:gap-8'>
            <p className='max-w-[512px] text-xl font-[300] text-dark-blue max-md:w-full max-md:font-[400] max-sm:text-lg lg:mb-14'>
              Ми самі заберемо гаджет на дослідження та подаруємо йому життя
            </p>
            <button
              type='button'
              onClick={toggleCourierModal}
              onMouseEnter={() => setIsHovering(false)}
              onMouseLeave={() => setIsHovering(true)}
              className='group flex h-[56px] cursor-pointer items-center justify-center rounded-[12px] bg-dark-blue transition-colors hover:bg-black-dis focus:bg-black-dis md:min-w-[256px]'
            >
              <p
                className={`text-base font-semibold tracking-wide text-white-dis  ${
                  isHovering ? 'animate-hoverBtnOut' : ''
                } group-hover:animate-hoverBtnIn`}
              >
                Викликати курʼєра
              </p>
            </button>
          </div>
        </div>
      </div>
      {showModal && <CourierModal toggleCourierModal={toggleCourierModal} />}
    </section>
  )
}
