import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
// eslint-disable-next-line import/no-extraneous-dependencies
import { PersistFormikValues } from 'formik-persist-values'
import { motion } from 'framer-motion'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useRef } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import * as Yup from 'yup'

import useCustomScrollbarLock from '@/app/(hooks)/useCustomScrollbarLock'

import ModalButton from './ModalButton'

interface MyFormValues {
  name: string
  number: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Не введенно імʼя')
    .matches(/^[A-Za-zА-ЯІЇа-яіїЁё\s]+$/, 'Можливі тільки букви')
    .min(3, 'Введіть мінімум три символи')
    .max(60, 'Максимально допустимо 60 символів'),
  number: Yup.string()
    .required('Не введенно номер телефону')
    .matches(/^\+380\d{9}$/, 'Невірний номер')
    .min(13, 'Невірний номер'),
})

interface InstantAdviceModalProps {
  toggleInstantAdviceModal: () => void
  setSubmitSuccess: Dispatch<SetStateAction<boolean>>
}
const InstantAdviceModal: React.FC<InstantAdviceModalProps> = ({
  toggleInstantAdviceModal,
  setSubmitSuccess,
}) => {
  const initialValues: MyFormValues = {
    name: '',
    number: '+380',
  }
  const modalRef = useRef<HTMLDivElement>(null)

  const handleEscKeyPressContent = useCallback(
    (event: { code: string }) => {
      if (event.code === 'Escape') {
        toggleInstantAdviceModal()
      }
    },
    [toggleInstantAdviceModal],
  )

  const onBackdropCloseModal = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        toggleInstantAdviceModal()
      }
    },
    [toggleInstantAdviceModal],
  )

  useCustomScrollbarLock({ handleEscKeyPressContent })

  const handleSubmit = async (values: MyFormValues) => {
    try {
      const TOKEN = '5560792411:AAErGG70RTKBdZklSlOT_TdJTMUROf_8rYU'
      const CHAT_ID = '-1001952047976'
      const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

      let message = `<b>Миттєва консультація</b>\n`

      message += `<b>Ім'я:</b>\n${values.name}\n`
      message += `<b>Номер телефону:</b>\n${values.number}\n`

      const res = await axios.post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message,
      })
      if (res.status === 200) {
        toggleInstantAdviceModal()
        sessionStorage.removeItem('instant-advice-modal')
        setTimeout(() => {
          setSubmitSuccess(true)
        }, 500)
      }
    } catch (error) {
      /* eslint-disable no-console */
      console.log(error)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      ref={modalRef}
      className='fixed left-0 top-0 z-50  h-full w-full   overflow-y-auto overflow-x-hidden  bg-modal-overlay'
    >
      <div
        onClick={onBackdropCloseModal}
        className=' flex min-h-full items-center justify-center  px-3 py-6'
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className='relative max-w-[414px]  flex-col items-center justify-start rounded-2xl bg-[#00cc73] p-14 max-md:px-[30px] max-sm:px-4'
        >
          <button
            aria-label='Відкрити модалку миттєва консультація'
            type='button'
            className=' white-dis-700 absolute right-[13px] top-[14px] text-center'
            onClick={toggleInstantAdviceModal}
          >
            <AiOutlineCloseCircle
              className='h-[26px] w-[26px] fill-white-dis  transition-opacity  hover:opacity-80 focus:opacity-80'
              aria-hidden='true'
            />
          </button>
          <h3 className='mb-8 text-center font-exo_2 text-xl font-semibold leading-[20px] text-white-dis '>
            Миттєва консультація
          </h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting,
              touched,
              errors,
              isValidating,
              dirty,
              isValid,
            }) => (
              <Form className='flex flex-col items-center justify-center gap-6'>
                <div className='relative'>
                  <Field
                    type='text'
                    id='name'
                    name='name'
                    className={`h-[58px] w-[302px] rounded-2xl px-6 py-2 ${
                      touched.name && errors.name ? 'border-[#A80000]' : ''
                    }`}
                    autoComplete='off'
                    placeholder='Імʼя'
                  />
                  <ErrorMessage
                    name='name'
                    component='div'
                    className=' absolute bottom-[-22px] left-[18px] text-sm font-normal tracking-wide text-[#A80000]'
                  />
                </div>
                <div className='relative'>
                  <Field
                    type='text'
                    id='number'
                    name='number'
                    className='h-[58px] w-[302px] rounded-2xl px-6 py-2'
                    autoComplete='off'
                    placeholder='Номер телефону'
                  />
                  <ErrorMessage
                    name='number'
                    component='div'
                    className=' absolute bottom-[-22px] left-[18px] text-sm font-normal tracking-wide text-[#A80000]'
                  />
                </div>
                <ModalButton
                  validationArr={[isSubmitting, isValid, dirty, isValidating]}
                  textButton='Миттєва консультація'
                />
                <PersistFormikValues
                  storage='sessionStorage'
                  persistInvalid
                  name='instant-advice-modal'
                />
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default InstantAdviceModal
