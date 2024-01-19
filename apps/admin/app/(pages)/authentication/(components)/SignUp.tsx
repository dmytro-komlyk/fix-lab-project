'use client'

import { Button, Input } from '@nextui-org/react'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { object, ref, string } from 'yup'
// import { ThreeCircles } from 'react-loader-spinner'

const SignUp = () => {
  const router = useRouter()

  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const [isVisiblePasswordConfirm, setIsVisiblePasswordConfirm] =
    useState(false)

  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword)
  const toggleVisibilityPasswordConfirm = () =>
    setIsVisiblePasswordConfirm(!isVisiblePasswordConfirm)

  const handleSubmit = useCallback(
    async (values: any, { setSubmitting, resetForm }: FormikHelpers<any>) => {
      setSubmitting(true)
      console.log(values)
      // const user = serverClient({ user: null }).auth.register({ })

      //       toast.success(`Адміна успішно зареєстровано!`, {
      //         style: {
      //           borderRadius: '10px',
      //           background: 'grey',
      //           color: '#fff',
      //         },
      //       })
      //       router.push('/')
      //       toast.error(
      //         `Помилка авторизації!!! Перевірте дані логіну чи паролю...`,
      //         {
      //           style: {
      //             borderRadius: '10px',
      //             background: 'grey',
      //             color: '#fff',
      //           },
      //         },
      //       )

      setSubmitting(false)
    },
    [],
  )

  return (
    <div className='flex flex-col items-center justify-center '>
      <h3 className='mb-8 text-center font-exo_2 text-2xl font-semibold leading-[29px] text-white-dis'>
        Реєстрація
      </h3>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={object({
          name: string()
            .min(3, 'Must be 3 characters or more')
            .required('Please enter your name'),
          email: string()
            .max(30, 'Must be 30 characters or less')
            .email('Invalid email address'),
          password: string()
            .min(6, 'password must be at least 6 characters')
            .required('Please enter your password'),
          passwordConfirmation: string()
            .label('confirm password')
            .oneOf([ref('password')], 'Passwords must match')
            .required('Please enter your confirm password'),
        })}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form
            onSubmit={props.handleSubmit}
            className='flex flex-col items-center justify-center gap-6'
          >
            <Field name='name'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  classNames={{
                    input: [],
                    inputWrapper: [],
                    innerWrapper: ['flex', 'flex-row', 'rounded-md', 'border'],
                  }}
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error && meta.error}
                  placeholder="Ім'я"
                  endContent={<FaUserAlt className='text-xl text-slate-400' />}
                  {...field}
                />
              )}
            </Field>
            <Field name='email'>
              {({ meta, field }: any) => (
                <Input
                  type='email'
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error && meta.error}
                  classNames={{
                    input: [],
                    inputWrapper: [],
                    innerWrapper: ['flex', 'flex-row', 'rounded-md', 'border'],
                  }}
                  placeholder='пошта'
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
                    innerWrapper: ['flex', 'flex-row', 'rounded-md', 'border'],
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
            <Field name='passwordConfirmation'>
              {({ meta, field }: any) => (
                <Input
                  type={isVisiblePasswordConfirm ? 'text' : 'password'}
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error && meta.error}
                  classNames={{
                    input: [],
                    inputWrapper: [],
                    innerWrapper: ['flex', 'flex-row', 'rounded-md', 'border'],
                  }}
                  placeholder='підтвердьте пароль'
                  endContent={
                    <button
                      className='focus:outline-none'
                      type='button'
                      onClick={toggleVisibilityPasswordConfirm}
                    >
                      {isVisiblePasswordConfirm ? (
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
              <HiMail className='text-xl' />
              Зареєструвати
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUp
