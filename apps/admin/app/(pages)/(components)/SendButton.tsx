import React from 'react'

import { Button } from '@nextui-org/react'

interface SendButtonProps {
  type: 'button' | 'reset' | 'submit'
  isLoading: boolean
  disabled: boolean
}

const SendButton: React.FC<SendButtonProps> = ({
  type,
  isLoading,
  disabled,
}) => {
  // const handleButtonClick = async (e: React.FormEvent<HTMLButtonElement>) => {
  //   // Handle common click logic if needed
  //   if (handleClick) {
  //     handleClick(e as React.MouseEvent<HTMLButtonElement, MouseEvent>)
  //   }

  //   // Handle submit logic if needed
  //   if (handleSubmit) {
  //     await handleSubmit(e)
  //   }
  // }

  return (
    <Button
      type={type}
      isLoading={isLoading}
      disabled={disabled}
      className='flex w-[20em] h-[4em] justify-center rounded-2xl bg-mid-blue px-6 py-4 text-white-dis transition duration-300 hover:scale-[1.03] hover:bg-black-dis focus:scale-[1.03] focus:bg-black-dis'
    >
      <span className='text-center font-exo_2 text-xl font-bold'>Зберегти</span>
    </Button>
  )
}

export default SendButton
