'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import { Button, Input } from '@nextui-org/react'
import type { FormikHelpers, FormikProps } from 'formik'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { HiMail } from 'react-icons/hi'
import { IoMdSend } from 'react-icons/io'
import { object, string } from 'yup'

const ForgotPassword = () => {
  const router = useRouter()

  const authForgetPassord = trpc.auth.forgetPassword.useMutation({
    onSuccess: () => {
      toast.success(`Запит відправленно! Перевірте пошту`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      router.refresh()
    },
    onError: () => {
      toast.error(`Виникла помилка при запиті`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },
  })

  const handleSubmit = async (
    values: { email: string },
    { setSubmitting, resetForm }: FormikHelpers<any>,
  ) => {
    setSubmitting(true)
    try {
      await authForgetPassord.mutateAsync(values)
      resetForm()
    } catch (error) {
      toast.error(`Помилка надсилання, перевірте правильність вводу пошти`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
    }
    setSubmitting(false)
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h3 className='mb-8 text-center font-exo_2 text-2xl font-semibold leading-[29px] text-white-dis'>
        Відновлення пароля
      </h3>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={object().shape({
          email: string()
            .max(30, 'Пошта неповинна перевищувати 30 символів')
            .email('Невірний email адрес')
            .required('Введіть Ваш email'),
        })}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form
            onSubmit={props.handleSubmit}
            className='flex w-full flex-col flex-wrap items-center justify-center gap-6'
          >
            <Field name='email'>
              {({ meta, field }: any) => (
                <Input
                  type='email'
                  variant='bordered'
                  label='Введіть пошту'
                  labelPlacement='inside'
                  isInvalid={!!(meta.touched && meta.error)}
                  errorMessage={meta.touched && meta.error && meta.error}
                  classNames={{
                    label: [
                      'font-base',
                      'text-md',
                      'text-white-dis',
                      'group-data-[filled-within=true]:text-mid-blue',
                    ],
                    input: ['font-base', 'text-md', 'text-white-dis'],
                    inputWrapper: ['group-data-[focus=true]:border-mid-green'],
                  }}
                  endContent={
                    <HiMail
                      size={45}
                      className='flex items-center p-2 text-mid-green'
                    />
                  }
                  {...field}
                />
              )}
            </Field>
            <Button
              type='submit'
              disabled={!props.isValid}
              isLoading={props.isSubmitting}
              className='group flex h-[65px] w-[320px] justify-center rounded-2xl bg-mid-green text-center font-exo_2 text-xl font-bold text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
            >
              Відправити запит
              <IoMdSend className='text-xl' />
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ForgotPassword
