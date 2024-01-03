'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { FormEventHandler } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ThreeCircles } from 'react-loader-spinner'

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const session = useSession()
  const router = useRouter()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const res = await axios.post(`${apiUrl}/forgot-password`, {
        email: formData.get('email'),
      })

      if (res.status === 201) {
        toast.success(`Новий пароль надіснано.!`, {
          style: {
            borderRadius: '10px',
            background: 'grey',
            color: '#fff',
          },
        })
        router.push('/auth/signin')
      } else {
        toast.error(`Помилка надсилання! Перевірьте email...`, {
          style: {
            borderRadius: '10px',
            background: 'grey',
            color: '#fff',
          },
        })
      }
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
      <div className='flex flex-col items-center justify-center'>
        <h3 className='mb-8 text-center font-exo_2 text-2xl font-semibold leading-[29px] text-white-dis'>
          Відновлення пароля
        </h3>
        <form
          className='flex flex-col items-center justify-center gap-6'
          onSubmit={handleSubmit}
        >
          <input
            className='h-[58px] w-[402px] rounded-2xl px-6 py-2'
            type='text'
            name='email'
            required
            placeholder='Email'
          />

          <button
            className='m relative m-4 h-[60px] w-full justify-center rounded-2xl bg-mid-green text-center font-exo_2 text-2xl font-bold text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
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
              'Надіслати'
            )}
          </button>
        </form>
      </div>
    )
  )
}

export default ForgotPassword
