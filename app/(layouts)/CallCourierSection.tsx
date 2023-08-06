'use client'
import { useState, useCallback } from 'react'
import Image from 'next/image'
import CourierModal from './components/CourierModal'

export const CallCourierSection: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const toggleCourierModal = useCallback(() => {
    setShowModal(prev => !prev)
  }, [])

  return (
    <section className='  bg-mid-green  w-full '>
      <div className='container relative pt-[213px] max-md:pt-[102px] pb-[102px]  flex justify-end max-lg:justify-center'>
        <div>
          <div className='absolute z-2 bottom-[255px] max-xl:bottom-[235px] left-[16px] max-lg:bottom-[442px] max-lg:left-[0] max-md:bottom-[440px] max-sm:bottom-[400px] max-md:left-[50%] max-md:translate-x-[-50%]'>
            <Image
              className=' h-auto w-[480px] max-xl:w-[380px] max-md:min-w-[244px]'
              src='/images/courier-section/group-car.svg'
              alt='FixLab logo'
              width={480}
              height={187}
              priority
            />
            <p className='absolute top-[112px] left-[373px] max-xl:top-[89px] max-xl:left-[295px]  max-lg:top-[89px] max-lg:left-[295px] max-md:top-[56px] max-md:left-[185px] font-gugi text-xl   max-xl:text-lg max-md:text-sm  font-[400] text-white-dis'>
              FixLab
            </p>
          </div>
          <Image
            className=' absolute bottom-[91px] left-[43px] max-lg:bottom-[291px] max-lg:left-[15px] h-auto w-[420px] max-xl:w-[320px] max-md:w-[251px] max-md:bottom-[340px] max-sm:bottom-[300px] max-md:left-[50%] max-md:translate-x-[-50%]'
            src='/images/courier-section/group-bottom.svg'
            alt='FixLab logo'
            width={420}
            height={115}
            priority
          />
          <Image
            className=' absolute bottom-[150px] left-[19px] max-xl:bottom-[139px] max-lg:bottom-[337px] max-lg:left-[0] h-auto w-[467px] max-xl:w-[367px] max-md:w-[244px] max-md:bottom-[375px] max-sm:bottom-[335px] max-md:left-[50%] max-md:translate-x-[-50%]'
            src='/images/courier-section/light-center.svg'
            alt='FixLab logo'
            width={467}
            height={181}
            priority
          />
          <Image
            className='animate-pulse absolute top-[16px] left-[-247px] max-lg:bottom-[216px] z-[0] h-[542px] w-[100%] max-md:top-[70px] max-lg:left-[50%] max-lg:translate-x-[-50%] max-sm:top-[30px]'
            src='/images/courier-section/star-bg.svg'
            alt='FixLab logo'
            width={756}
            height={542}
            priority
          />
        </div>
        <div className=' max-lg:flex max-lg:flex-col justify-between max-md:gap-[264px] z-[1]'>
          <div className='flex flex-col gap-4  md:mb-8 '>
            <p className='text-2xl text-dark-blue font-[400] max-md:text-xl max-sm:text-lg'>
              Нетреба ламати плани!
            </p>
            <p className='text-2xl text-dark-blue font-[700] max-sm:text-lg'>
              Можна викликати курʼєра!
            </p>
          </div>
          <div className='max-lg:flex max-lg:flex-col gap-14 max-md:gap-8'>
            <p className='lg:mb-14 text-xl text-dark-blue font-[300] max-md:font-[400] max-w-[512px] max-md:w-full max-sm:text-lg'>
              Ми самі заберемо гаджет на дослідження та подаруємо йому життя
            </p>
            <button
              onClick={toggleCourierModal}
              onMouseEnter={() => setIsHovering(false)}
              onMouseLeave={() => setIsHovering(true)}
              className='group bg-dark-blue cursor-pointer flex justify-center items-center md:min-w-[256px] rounded-[12px] ease-in-out duration-200 hover:bg-black-dis focus:bg-black-dis '
            >
              <p
                className={`font-semibold text-base text-white-dis pt-[23px] pb-[20px] tracking-wide  ${
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
