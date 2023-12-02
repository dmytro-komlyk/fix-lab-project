'use client'

import { signOut } from 'next-auth/react'

const AuthButtons = () => {
  return (
    <button
      type='button'
      onClick={() => signOut({ callbackUrl: '/authentication/signin' })}
      className='m bg-mid-green font-exo_2 text-white-dis hover:bg-mid-blue focus:bg-mid-blue m-4 justify-center rounded-2xl p-2 text-center  text-2xl font-bold  transition-colors'
    >
      Вийти
    </button>
  )
}

export default AuthButtons
