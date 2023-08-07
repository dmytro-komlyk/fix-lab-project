import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useCallback, useEffect, useRef } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import * as Yup from 'yup'

import ModalButton from './ModalButton'

interface MyFormValues {
  name: string
  number: string
  address: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Не введенно імʼя').min(3),
  number: Yup.string()
    .required('Не введенно номер телефону')
    .matches(/^\+380\d{9}$/, 'Невірний номер')
    .min(13, 'Невірний номер'),
  address: Yup.string().required('Не введенна адреса').min(3),
})
interface CourierModalProps {
  toggleCourierModal: () => void
}
const CourierModal: React.FC<CourierModalProps> = ({ toggleCourierModal }) => {
  const initialValues: MyFormValues = {
    name: '',
    number: '+380',
    address: '',
  }
  const modalRef = useRef<HTMLDivElement>(null)

  const handleEscKeyPressModal = useCallback((event: { code: string }) => {
    if (event.code === 'Escape') {
      toggleCourierModal()
    }
  }, [])

  const onBackdropCloseModal = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        toggleCourierModal()
      }
    },
    [],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleEscKeyPressModal)

    return () => {
      window.removeEventListener('keydown', handleEscKeyPressModal)
    }
  }, [handleEscKeyPressModal])

  const handleSubmit = async (values: MyFormValues) => {
    try {
      const TOKEN = '5560792411:AAErGG70RTKBdZklSlOT_TdJTMUROf_8rYU'
      const CHAT_ID = '-1001952047976'
      const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

      let message = `<b>Потрібен курєр!</b>\n`

      message += `<b>Ім'я:</b>\n${values.name}\n`
      message += `<b>Номер телефону:</b>\n${values.number}\n`
      message += `<b>Адреса:</b>\n${values.address}\n`

      await axios.post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message,
      })
      toggleCourierModal()
    } catch (error) {
      /* eslint-disable no-console */
      console.log('Помилка при відправленні.')
      /* eslint-enable no-console */
    }
  }
  return (
    <div
      ref={modalRef}
      onClick={onBackdropCloseModal}
      className='fixed left-0 top-0  z-50 flex h-full w-full items-center justify-center  bg-modal-overlay'
    >
      <div className='relative max-w-[414px]  flex-col items-center justify-start rounded-2xl bg-[#00cc73] p-14 max-sm:px-4'>
        <button
          type='button'
          className=' white-dis-700 absolute right-4 top-4 text-center'
          onClick={toggleCourierModal}
        >
          <MdOutlineClose
            className='h-8 w-8 fill-white-dis  hover:opacity-80 focus:opacity-80'
            aria-hidden='true'
          />
        </button>
        <h3 className='mb-8 text-center text-xl font-semibold text-white-dis '>
          Потрібен курʼєр!
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
                  className={`h-[58px] w-[302px] rounded-xl px-6 py-2 max-md:w-[280px] ${
                    touched.name && errors.name ? 'border-[#A80000]' : ''
                  }`}
                  autoComplete='off'
                  placeholder='Імʼя'
                />
                <ErrorMessage
                  name='name'
                  component='div'
                  className=' absolute bottom-[-22px] left-[24px] text-sm font-normal tracking-wide text-[#A80000]'
                />
              </div>
              <div className='relative'>
                <Field
                  type='text'
                  id='number'
                  name='number'
                  className='h-[58px] w-[302px] rounded-xl px-6 py-2 max-md:w-[280px]'
                  autoComplete='off'
                  placeholder='Номер телефону'
                />
                <ErrorMessage
                  name='number'
                  component='div'
                  className=' absolute bottom-[-22px] left-[24px] text-sm font-normal tracking-wide text-[#A80000]'
                />
              </div>

              <div className='relative'>
                <Field
                  as='textarea'
                  id='address'
                  name='address'
                  className='h-[144px] w-[302px] rounded-xl px-6 py-2 max-md:w-[280px]'
                  autoComplete='off'
                  placeholder='Адреса'
                />
                <ErrorMessage
                  name='address'
                  component='div'
                  className=' absolute bottom-[-22px] left-[24px] text-sm font-normal tracking-wide text-[#A80000]'
                />
              </div>
              <ModalButton
                validationArr={[isSubmitting, isValid, dirty, isValidating]}
                textButton='Потрібен курʼєр'
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CourierModal
