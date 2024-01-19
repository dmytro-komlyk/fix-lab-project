'use client'

import { Button, Input } from '@nextui-org/react'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FiLogIn } from 'react-icons/fi'
import { HiMail } from 'react-icons/hi'
// import { ColorRing } from 'react-loader-spinner'
import * as Yup from 'yup'

const SignIn = () => {
  const session = useSession()
  const router = useRouter()
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword)

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: FormikHelpers<any>,
  ) => {
    setSubmitting(true)
    console.log(values)
    try {
      const res = await signIn('credentials', {
        login: values.email,
        password: values.password,
        callbackUrl: '/',
      })

      if (res && !res.error) {
        toast.success(`Вітаємо в FixLab Admin Panel!`, {
          style: {
            borderRadius: '10px',
            background: 'grey',
            color: '#fff',
          },
        })
      }
    } catch {
      toast.error(`Помилка авторизації...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
    }
    setSubmitting(false)
  }

  // if (loading) {
  //   return (
  //     <ColorRing
  //       visible={true}
  //       height='100'
  //       width='100'
  //       ariaLabel='color-ring-loading'
  //       wrapperStyle={{}}
  //       wrapperClass='color-ring-wrapper'
  //       colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  //     />
  //   )
  // }
  return (
    !session.data && (
      <div className='flex flex-col items-center justify-center '>
        <h3 className='mb-8 text-center font-exo_2 text-2xl font-semibold leading-[29px] text-white-dis'>
          Логін
        </h3>
        <Formik
          initialValues={{ login: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string()
              .max(30, 'Must be 30 characters or less')
              .email('Invalid email address')
              .required('Please enter your email'),
            password: Yup.string().required('Please enter your password'),
          })}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form
              onSubmit={props.handleSubmit}
              className='flex flex-col items-center justify-center gap-6'
            >
              <Field name='login'>
                {({ meta, field }: any) => (
                  <Input
                    type='email'
                    isInvalid={meta.touched && meta.error}
                    errorMessage={meta.touched && meta.error && meta.error}
                    placeholder='email@example.com'
                    classNames={{
                      input: [],
                      inputWrapper: [],
                      innerWrapper: [
                        'flex',
                        'flex-row',
                        'rounded-md',
                        'border',
                      ],
                    }}
                    endContent={<HiMail className='text-xl text-slate-400' />}
                    {...field}
                  />
                )}
              </Field>

              <Field name='password'>
                {({ meta, field }: any) => (
                  <Input
                    type={isVisiblePassword ? 'text' : 'password'}
                    isInvalid={meta.touched && meta.error}
                    errorMessage={meta.touched && meta.error && meta.error}
                    classNames={{
                      input: [],
                      inputWrapper: [],
                      innerWrapper: [
                        'flex',
                        'flex-row',
                        'rounded-md',
                        'border',
                      ],
                    }}
                    placeholder='пароль'
                    endContent={
                      <button
                        className='focus:outline-none'
                        type='button'
                        onClick={toggleVisibilityPassword}
                      >
                        {isVisiblePassword ? (
                          <AiFillEyeInvisible className='text-xl hover:text-slate-200 text-slate-400' />
                        ) : (
                          <AiFillEye className='text-xl hover:text-slate-200 text-slate-400' />
                        )}
                      </button>
                    }
                    {...field}
                  />
                )}
              </Field>
              <Button
                type='submit'
                isLoading={props.isSubmitting}
                className='flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400'
              >
                <FiLogIn className='text-xl' />
                Увійти
              </Button>
            </Form>
          )}
        </Formik>
        {/* <form
          className='flex flex-col items-center justify-center gap-6'
          onSubmit={handleSubmit}
        >
          <input
            className='h-[58px] w-[402px] rounded-2xl px-6 py-2'
            type='text'
            name='login'
            required
            placeholder='Логін'
          />
          <input
            className='h-[58px] w-[402px] rounded-2xl px-6 py-2'
            type='password'
            name='password'
            placeholder='Пароль'
            required
          />
          <button
            className='m relative m-4 h-[60px] w-full justify-center rounded-2xl bg-mid-green text-center font-exo_2 text-2xl font-bold text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
            type='submit'
            disabled={loading}
          >
            {loading ? (
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '>
                {/* <ThreeCircles
                  height='50'
                  width='50'
                  color='#fff'
                  wrapperStyle={{}}
                  wrapperClass=''
                  visible
                  ariaLabel='three-circles-rotating'
                  outerCircleColor=''
                  innerCircleColor=''
                  middleCircleColor=''
                /> */}
        {/* </div>
            ) : (
              'Увійти'
            )}
          </button>
        </form> */}
        <Link
          className='font-exo_2 text-xl font-bold text-white-dis'
          href='/authentication/forgot-password'
        >
          Забули пароль?
        </Link>
      </div>
    )
  )
}

export default SignIn
