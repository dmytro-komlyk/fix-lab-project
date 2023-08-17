import type { MouseEventHandler } from 'react'
import { useState } from 'react'

interface ButtonProps {
  toggleModal: MouseEventHandler<HTMLButtonElement>
  textButton: string
}

const Button: React.FC<ButtonProps> = ({ toggleModal, textButton }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <button
      type='button'
      onClick={toggleModal}
      onMouseEnter={() => setIsHovering(false)}
      onMouseLeave={() => setIsHovering(true)}
      className=' group relative z-[1] flex h-[56px] min-w-[256px] items-center justify-center rounded-[12px] bg-mid-green transition-colors  hover:bg-mid-blue focus:bg-mid-blue  max-md:w-full'
    >
      <p
        className={`text-base  font-semibold tracking-wide text-[#04268b] ${
          isHovering ? 'animate-hoverBtnOut' : ''
        } group-hover:animate-hoverBtnIn`}
      >
        {textButton}
      </p>
    </button>
  )
}

export default Button
