import React from 'react'

interface SendButtonProps {
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleSubmit?: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>
}

const SendButton: React.FC<SendButtonProps> = ({
  handleClick,
  handleSubmit,
}) => {
  const handleButtonClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    // Handle common click logic if needed
    if (handleClick) {
      handleClick(e as React.MouseEvent<HTMLButtonElement, MouseEvent>)
    }

    // Handle submit logic if needed
    if (handleSubmit) {
      await handleSubmit(e)
    }
  }

  return (
    <button
      onClick={handleButtonClick}
      className='group flex w-[320px] justify-center rounded-2xl bg-mid-blue px-6 py-4 text-white-dis transition duration-300 hover:scale-[1.03] hover:bg-black-dis focus:scale-[1.03] focus:bg-black-dis'
      type={handleClick ? 'button' : 'submit'}
    >
      <span className='text-center font-exo_2 text-xl font-bold'>Зберегти</span>
    </button>
  )
}

export default SendButton
