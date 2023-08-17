'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useCallback, useRef } from 'react'
import { MdOutlineClose } from 'react-icons/md'

import useCustomScrollbarLock from '@/app/(hooks)/useCustomScrollbarLock'

import CustomEditor from '../../(components)/(tinymce)/CustomEditContent'

interface EditArticleModalProps {
  toggleContentModal: () => void
  contentBlog: string
  setContentBlog: (contentBlog: string) => void
  children: ReactNode
}
const EditArticleModal: React.FC<EditArticleModalProps> = ({
  toggleContentModal,
  contentBlog,
  setContentBlog,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleEscKeyPressContent = useCallback(
    (event: { code: string }) => {
      if (event.code === 'Escape') {
        toggleContentModal()
      }
    },
    [toggleContentModal],
  )

  const onBackdropCloseModal = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        toggleContentModal()
      }
    },
    [toggleContentModal],
  )

  useCustomScrollbarLock({ handleEscKeyPressContent })

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.1 } }}
        exit={{ opacity: 1, transition: { duration: 0.1 } }}
        ref={modalRef}
        className='fixed left-0 top-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden bg-modal-overlay '
      >
        <div
          onClick={onBackdropCloseModal}
          className=' flex min-h-full items-center justify-center  px-3 py-6'
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className='relative max-w-full flex-col items-center justify-center rounded-2xl bg-black-dis p-14 max-sm:px-4'
          >
            <button
              type='button'
              className=' white-dis-700 absolute right-4 top-4 text-center'
              onClick={toggleContentModal}
            >
              <MdOutlineClose
                className='h-8 w-8 fill-white-dis  transition-opacity  hover:opacity-80 focus:opacity-80'
                aria-hidden='true'
              />
            </button>
            <h3 className='mb-8 text-center text-xl font-semibold text-white-dis '>
              Редагувати статтю
            </h3>
            <CustomEditor
              contentBlog={contentBlog}
              setContentBlog={setContentBlog}
            />
            {children}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default EditArticleModal
