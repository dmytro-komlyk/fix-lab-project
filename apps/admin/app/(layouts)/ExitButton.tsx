'use client'

import { Button } from '@nextui-org/react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'

const ExitButton = () => {
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleLogOut = async () => {
    setLoading(true)
    try {
      await signOut({ callbackUrl: '/authentication/signin' })
    } catch (error) {
      // added show error
    }
    setLoading(false)
  }

  return (
    <Button
      type='submit'
      isLoading={isLoading}
      disabled={isLoading}
      onClick={() => handleLogOut()}
      className='group flex h-[65px] w-[320px] justify-center rounded-2xl bg-mid-green text-center font-exo_2 text-xl font-bold text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
    >
      Вийти
      <FiLogIn className='text-xl' />
    </Button>
  )
}

export default ExitButton
