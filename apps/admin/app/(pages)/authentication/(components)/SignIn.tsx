'use client'

import { Button, Input } from '@nextui-org/react'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FiLogIn } from 'react-icons/fi'
import { HiMail } from 'react-icons/hi'
import { object, string } from 'yup'

const SignIn = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword)

  const handleSubmit = useCallback(
    async (values: any, { setSubmitting }: FormikHelpers<any>) => {
      setSubmitting(true)
      setLoading(true)
      try {
        const res = await signIn('credentials', {
          login: values.login,
          password: values.password,
          callbackUrl: '/',
        })
        if (res && !res.error) {
          throw toast.success(`Вітаємо в FixLab Admin Panel!`, {
            style: {
              borderRadius: '10px',
              background: 'grey',
              color: '#fff',
            },
          })
        }
      } catch (error) {
        // toast.custom(t => (
        //   <div
        //     className={`${
        //       t.visible ? 'animate-enter' : 'animate-leave'
        //     } max-w-md w-full bg-white items-center shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        //   >
        //     <div className='flex-1 w-0 p-4'>
        //       <div className='flex items-center'>
        //         <p>
        //           Помилка авторизації, перевірте правильність вводу пошти та
        //           пароля
        //         </p>
        //       </div>
        //     </div>
        //   </div>
        // ))
        toast.error(
          `Помилка авторизації, перевірте правильність вводу пошти та пароля`,
          {
            style: {
              borderRadius: '10px',
              background: 'grey',
              color: '#fff',
            },
          },
        )
      }
      setSubmitting(false)
      setLoading(false)
    },
    [],
  )

  return (
    <div className='flex flex-col items-center justify-center gap-8'>
      <h3 className='mb-8 text-center font-exo_2 text-2xl font-semibold leading-[29px] text-white-dis'>
        Вхід до кабінету
      </h3>
      <Formik
        initialValues={{ login: '', password: '' }}
        validationSchema={object().shape({
          login: string()
            .email('Невірний email адрес')
            .required('Введіть Ваш email'),
          password: string().required('Введіть Ваш пароль'),
        })}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form
            onSubmit={props.handleSubmit}
            className='flex flex-col items-center flex-wrap justify-center gap-6'
          >
            <Field name='login'>
              {({ meta, field }: any) => (
                <Input
                  type='email'
                  variant='bordered'
                  label='Введіть пошту'
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error ? meta.error : null}
                  classNames={{
                    label: ['text-white'],
                    input: ['text-white'],
                    inputWrapper: ['group-data-[focus=true]:border-mid-green'],
                  }}
                  endContent={
                    <HiMail
                      size={45}
                      className='flex items-center text-mid-green p-2'
                    />
                  }
                  {...field}
                />
              )}
            </Field>
            <Field name='password'>
              {({ meta, field }: any) => (
                <Input
                  type={isVisiblePassword ? 'text' : 'password'}
                  variant='bordered'
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error}
                  label='Введіть пароль'
                  classNames={{
                    label: ['text-white'],
                    input: ['text-white'],
                    inputWrapper: [
                      'group-data-[focus=true]:border-default-200',
                    ],
                  }}
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
            <Button
              type='submit'
              isLoading={isLoading}
              className='group flex h-[65px] w-[320px] justify-center rounded-2xl bg-mid-green text-center font-exo_2 text-xl font-bold text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
            >
              Увійти
              <FiLogIn className='text-xl' />
            </Button>
          </Form>
        )}
      </Formik>
      <Link
        className='font-exo_2 text-xl font-bold text-white-dis transition duration-300 hover:scale-[1.03] focus:scale-[1.03]'
        href='/authentication/forgot-password'
      >
        Забули пароль?
      </Link>
    </div>
  )
}

export default SignIn
