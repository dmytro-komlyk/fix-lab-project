'use client'

import { signOut } from 'next-auth/react'

const AuthButtons = () => {
  return (
    <button
      type='button'
      onClick={() => signOut({ callbackUrl: '/' })}
      className='m m-4 justify-center rounded-2xl bg-mid-green p-2 text-center font-exo_2 text-2xl font-bold text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
    >
      Вийти
    </button>
  )
}

export default AuthButtons
