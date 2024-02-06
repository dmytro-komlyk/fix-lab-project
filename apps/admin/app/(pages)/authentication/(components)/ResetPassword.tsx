'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import { Input } from '@nextui-org/react'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { object, ref, string } from 'yup'
import SendButton from '../../(components)/SendButton'
// import { ThreeCircles } from 'react-loader-spinner'

interface IResetPasswordProps {
  searchParams: {
    token: string
    id: string
  }
}

const ResetPassword = ({ searchParams }: IResetPasswordProps) => {
  const router = useRouter()

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)
  const [isVisiblePasswordConfirm, setIsVisiblePasswordConfirm] =
    useState<boolean>(false)

  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword)
  const toggleVisibilityPasswordConfirm = () =>
    setIsVisiblePasswordConfirm(!isVisiblePasswordConfirm)

  const resetPassword = trpc.auth.resetPassword.useMutation({
    onSuccess: () => {
      toast.success('Пароль успішно оновленно!', {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      router.push('/authentication/signin')
      router.refresh()
    },
    onError: () => {
      toast.error('Виникла помилка при оновленні паролю', {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },
  })

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    setSubmitting(true)

    try {
      await resetPassword.mutateAsync({
        password: values.password,
        userId: searchParams.id,
        token: searchParams.token,
      })
    } catch (error) {
      console.log(error)
    }
    setSubmitting(false)
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h3 className='mb-8 text-center font-exo_2 text-2xl font-semibold leading-[29px] text-white-dis'>
        Введіть новий пароль
      </h3>
      <Formik
        initialValues={{ password: '', passwordConfirmation: '' }}
        validationSchema={object().shape({
          password: string()
            .min(6, 'Мінімальна кількість символів 6')
            .required('Будь ласка, введіть пароль'),
          passwordConfirmation: string()
            .label('Підтвердження пароля')
            .oneOf([ref('password')], 'Пароль співпадає')
            .required('Будь ласка, підтвердіть пароль'),
        })}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form
            onSubmit={props.handleSubmit}
            className='flex flex-col items-center flex-wrap justify-center gap-6 w-full'
          >
            <Field name='password'>
              {({ meta, field }: any) => (
                <Input
                  type={isVisiblePassword ? 'text' : 'password'}
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error && meta.error}
                  classNames={{
                    label: ['text-white'],
                    input: ['text-white'],
                    inputWrapper: [
                      'group-data-[focus=true]:border-default-200',
                    ],
                  }}
                  variant='bordered'
                  label='Введіть новий пароль'
                  endContent={
                    <button
                      className='focus:outline-none'
                      type='button'
                      onClick={toggleVisibilityPassword}
                    >
                      {isVisiblePassword ? (
                        <AiFillEyeInvisible
                          size={45}
                          className='flex p-2 text-mid-blue'
                        />
                      ) : (
                        <AiFillEye
                          size={45}
                          className='flex text-mid-green p-2'
                        />
                      )}
                    </button>
                  }
                  {...field}
                />
              )}
            </Field>
            <Field name='passwordConfirmation'>
              {({ meta, field }: any) => (
                <Input
                  type={isVisiblePasswordConfirm ? 'text' : 'password'}
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error && meta.error}
                  classNames={{
                    label: ['text-white'],
                    input: ['text-white'],
                    inputWrapper: [
                      'group-data-[focus=true]:border-default-200',
                    ],
                  }}
                  variant='bordered'
                  label='Підтвердіть новий пароль'
                  endContent={
                    <button
                      className='focus:outline-none'
                      type='button'
                      onClick={toggleVisibilityPasswordConfirm}
                    >
                      {isVisiblePasswordConfirm ? (
                        <AiFillEyeInvisible
                          size={45}
                          className='flex p-2 text-mid-blue'
                        />
                      ) : (
                        <AiFillEye
                          size={45}
                          className='flex text-mid-green p-2'
                        />
                      )}
                    </button>
                  }
                  {...field}
                />
              )}
            </Field>
            <SendButton
              type={'submit'}
              disabled={!props.isValid}
              isLoading={props.isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ResetPassword
