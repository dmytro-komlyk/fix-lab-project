'use client'

import { motion } from 'framer-motion'
import { useCallback, useRef } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

interface SuccessSubmitBannerProps {
  toggleSuccessSubmitModal: () => void
}

const SuccessSubmitBanner: React.FC<SuccessSubmitBannerProps> = ({
  toggleSuccessSubmitModal,
}) => {
  const successSubmitModalRef = useRef<HTMLDivElement>(null)

  const onBackdropCloseModal = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        toggleSuccessSubmitModal()
      }
    },
    [toggleSuccessSubmitModal],
  )
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      ref={successSubmitModalRef}
      className='fixed left-0 top-0 z-50 flex h-full w-full  items-center justify-center overflow-y-auto overflow-x-hidden bg-modal-overlay'
      onClick={onBackdropCloseModal}
    >
      <div
        onClick={onBackdropCloseModal}
        className=' flex min-h-full items-center justify-center'
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: 0.3 } }}
          exit={{ scale: 0, transition: { duration: 0.3 } }}
          className='relative flex cursor-pointer flex-col items-center justify-center gap-6 rounded-2xl bg-mid-green p-14'
          onClick={onBackdropCloseModal}
        >
          <button
            type='button'
            className=' white-dis-700 absolute right-[13px] top-[14px] text-center'
            onClick={toggleSuccessSubmitModal}
          >
            <AiOutlineCloseCircle
              className='h-[26px] w-[26px] fill-white-dis  transition-opacity  hover:opacity-80 focus:opacity-80'
              aria-hidden='true'
            />
          </button>
          <p className=' w-[296px] text-center font-exo_2 text-xl font-semibold leading-[29px] text-white-dis max-md:max-w-[196px]'>
            Ваша заявка успішно відправлена!
          </p>
          <p className=' w-[250px] text-center  font-normal text-white-dis max-md:max-w-[196px]'>
            Менеджер зв &apos яжеться з вами протягом години.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SuccessSubmitBanner
