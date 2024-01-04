'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import type { FormEventHandler } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
// import { ThreeCircles } from 'react-loader-spinner'

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const session = useSession()
  const router = useRouter()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const res = await axios.post(`${apiUrl}/users`, {
        name: formData.get('name'),
        login: formData.get('login'),
        email: formData.get('email'),
        password: formData.get('password'),
        isActive: true,
      })

      if (res.status === 201) {
        toast.success(`Адміна успішно зареєстровано!`, {
          style: {
            borderRadius: '10px',
            background: 'grey',
            color: '#fff',
          },
        })
        router.push('/auth/signin')
      } else {
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
    } finally {
      setLoading(false)
    }
  }

  // return loading ? (
  //   <ThreeCircles
  //     height='150'
  //     width='150'
  //     color='#fff'
  //     wrapperStyle={{}}
  //     wrapperClass=''
  //     visible
  //     ariaLabel='three-circles-rotating'
  //     outerCircleColor=''
  //     innerCircleColor=''
  //     middleCircleColor=''
  //   />
  // ) : (
  return (
    !session.data && (
      <div className='flex flex-col items-center justify-center '>
        <h3 className='mb-8 text-center font-exo_2 text-2xl font-semibold leading-[29px] text-white-dis'>
          Реєстрація
        </h3>
        <form
          className='flex flex-col items-center justify-center gap-6'
          onSubmit={handleSubmit}
        >
          <input
            className='h-[58px] w-[402px] rounded-2xl px-6 py-2'
            type='text'
            name='name'
            required
            placeholder="Ім'я"
          />
          <input
            className='h-[58px] w-[402px] rounded-2xl px-6 py-2'
            type='text'
            name='login'
            required
            placeholder='Логін'
          />
          <input
            className='h-[58px] w-[402px] rounded-2xl px-6 py-2'
            type='text'
            name='email'
            required
            placeholder='Email'
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
              </div>
            ) : (
              'Зареєструватися'
            )}
          </button>
        </form>
      </div>
    )
  )
}

export default SignUp
