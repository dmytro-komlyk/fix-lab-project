'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import { Button, Input } from '@nextui-org/react'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { object, ref, string } from 'yup'

const SignUp = () => {
  const router = useRouter()

  const [isLoading, setLoading] = useState<boolean>(false)
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)
  const [isVisiblePasswordConfirm, setIsVisiblePasswordConfirm] =
    useState<boolean>(false)

  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword)
  const toggleVisibilityPasswordConfirm = () =>
    setIsVisiblePasswordConfirm(!isVisiblePasswordConfirm)

  const createUser = trpc.auth.register.useMutation({
    onSuccess: () => {
      toast.success(`Адмін успішно зареєстрований!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
    },
  })
  const handleSubmit = useCallback(
    async (values: any, { setSubmitting }: FormikHelpers<any>) => {
      setLoading(true)
      setSubmitting(true)
      const { passwordConfirmation, ...regData } = values
      try {
        const createdUser = await createUser.mutateAsync(regData)
        if (createdUser) {
          router.push('/authentication/signin')
        }
      } catch (error) {
        toast.error(
          `Помилка авторизації!!! Перевірте дані логіну чи паролю...`,
          {
            style: {
              borderRadius: '10px',
              background: 'grey',
              color: '#fff',
            },
          },
        )
      }
      setLoading(false)
      setSubmitting(false)
    },
    [],
  )

  return (
    <div className='flex flex-col items-center justify-center gap-8'>
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
        validationSchema={object().shape({
          name: string()
            .min(3, 'Мінімальне імʼя складається з 3 символів')
            .required('Будь ласка, введіть ваше імʼя'),
          email: string()
            .max(30, 'Пошта неповинна перевищувати 30 символів')
            .email('Невірний email адрес')
            .required('Введіть Ваш email'),
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
            className='flex flex-col items-center justify-center gap-6'
          >
            <Field name='name'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  classNames={{
                    input: ['text-white'],
                  }}
                  variant='bordered'
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error && meta.error}
                  label="Ім'я"
                  endContent={
                    <FaUserAlt size={45} className='flex text-mid-green p-2' />
                  }
                  {...field}
                />
              )}
            </Field>
            <Field name='email'>
              {({ meta, field }: any) => (
                <Input
                  type='email'
                  variant='bordered'
                  label='Введіть пошту'
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error ? meta.error : null}
                  classNames={{
                    input: ['text-white'],
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
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error && meta.error}
                  classNames={{
                    input: ['text-white'],
                  }}
                  variant='bordered'
                  label='Введіть пароль'
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
                    input: ['text-white'],
                  }}
                  variant='bordered'
                  label='Підтвердити пароль'
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
            <Button
              type='submit'
              isLoading={isLoading}
              className='group flex h-[65px] w-[320px] justify-around rounded-2xl bg-mid-green text-center font-exo_2 text-xl font-bold text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
            >
              <HiMail size={45} className='text-xl' />
              Зареєструвати
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUp
