import type { MouseEventHandler } from 'react'
import { useState } from 'react'

interface ButtonProps {
  toggleCourierModal: MouseEventHandler<HTMLButtonElement>
  textButton: string
}

const Button: React.FC<ButtonProps> = ({ toggleCourierModal, textButton }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <button
      type='button'
      onClick={toggleCourierModal}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className='group flex min-w-[256px] items-center justify-center rounded-[12px] bg-mid-green duration-200 ease-in-out hover:bg-mid-blue   focus:bg-mid-blue'
    >
      <p
        className={`pb-[20px] pt-[23px] text-base  font-semibold tracking-wide text-[#04268b] ${
          isHovering ? 'animate-hoverBtnOut' : ''
        } group-hover:animate-hoverBtnIn`}
      >
        {textButton}
      </p>
    </button>
  )
}

export default Button
