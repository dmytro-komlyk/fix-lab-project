'use client'
import { useState, useCallback } from 'react'
import Image from 'next/image'
import CourierModal from './components/CourierModal'

export const CallCourierSection: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const toggleCourierModal = useCallback(() => {
    setShowModal(prev => !prev)
  }, [])

  return (
    <section className='  bg-mid-green  w-full '>
      <div className='container relative pt-[213px] pb-[102px]  flex justify-end'>
        <div>
          <Image
            className=' absolute bottom-[91px] left-[43px] h-auto w-[420px] animate-bottom'
            src='/images/courier-section/group-bottom.svg'
            alt='FixLab logo'
            width={420}
            height={115}
            priority
          />
          <Image
            className=' absolute z-2 bottom-[255px] left-[16px] h-auto w-[480px] animate-top'
            src='/images/courier-section/group-car.svg'
            alt='FixLab logo'
            width={480}
            height={187}
            priority
          />
          <Image
            className=' absolute bottom-[150px] left-[19px] h-auto w-[467px] animate-horizontal-spin '
            src='/images/courier-section/light-center.svg'
            alt='FixLab logo'
            width={467}
            height={181}
            priority
          />
          <Image
            className=' absolute top-[16px] left-[-247px] z-[0] h-[542px] w-[100%] '
            src='/images/courier-section/star-bg.svg'
            alt='FixLab logo'
            width={756}
            height={542}
            priority
          />
        </div>
        <div className=' z-[1]'>
          <p className=' mb-4 text-2xl text-dark-blue font-[400]'>
            Нетреба ламати плани!
          </p>
          <p className='mb-8 text-2xl text-dark-blue font-[700]'>
            Можна викликати курʼєра!
          </p>
          <p className='mb-14 text-xl text-dark-blue font-[300] max-w-[512px]'>
            Ми самі заберемо гаджет на дослідження та подаруємо йому життя
          </p>
          <button
            onClick={toggleCourierModal}
            className=' cursor-pointer hidden lg:flex bg-dark-blue justify-center items-center min-w-[256px] rounded-[12px] hover:bg-mid-blue focus:bg-mid-blue'
          >
            <p className='font-semibold text-base text-white-dis  pt-[23px] pb-[20px] tracking-wide'>
              Викликати курʼєра
            </p>
          </button>
        </div>
      </div>
      {showModal && <CourierModal toggleCourierModal={toggleCourierModal} />}
    </section>
  )
}
