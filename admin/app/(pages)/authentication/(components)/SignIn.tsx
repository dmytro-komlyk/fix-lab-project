'use client'

import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import type { FormEventHandler } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ThreeCircles } from 'react-loader-spinner'

const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const session = useSession()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const res = await signIn('credentials', {
        login: formData.get('login'),
        password: formData.get('password'),
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
    } finally {
      setLoading(false)
    }
  }

  return loading ? (
    <ThreeCircles
      height='150'
      width='150'
      color='#fff'
      wrapperStyle={{}}
      wrapperClass=''
      visible
      ariaLabel='three-circles-rotating'
      outerCircleColor=''
      innerCircleColor=''
      middleCircleColor=''
    />
  ) : (
    !session.data && (
      <div className='flex flex-col items-center justify-center '>
        <h3 className='font-exo_2 text-white-dis mb-8 text-center text-2xl font-semibold leading-[29px]'>
          Логін
        </h3>
        <form
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
            className='m bg-mid-green font-exo_2 text-white-dis hover:bg-mid-blue focus:bg-mid-blue relative m-4 h-[60px] w-full justify-center rounded-2xl text-center  text-2xl font-bold  transition-colors'
            type='submit'
            disabled={loading}
          >
            {loading ? (
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '>
                <ThreeCircles
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
                />
              </div>
            ) : (
              'Увійти'
            )}
          </button>
        </form>
        <Link
          className='font-exo_2 text-white-dis text-xl font-bold'
          href='/authentication/forgot-password'
        >
          Забули пароль?
        </Link>
      </div>
    )
  )
}

export default SignIn
