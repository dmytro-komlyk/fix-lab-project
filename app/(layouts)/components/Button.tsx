import { useState, MouseEventHandler } from 'react'

interface ButtonProps {
  toggleCourierModal: MouseEventHandler<HTMLButtonElement>
  textButton: string
}

const Button: React.FC<ButtonProps> = ({ toggleCourierModal, textButton }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <button
      onClick={toggleCourierModal}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className='group flex bg-mid-green justify-center items-center min-w-[256px] rounded-[12px] ease-in-out duration-200 hover:bg-mid-blue   focus:bg-mid-blue'
    >
      <p
        className={`font-semibold text-base text-[#04268b]  pt-[23px] pb-[20px] tracking-wide ${
          isHovering ? 'animate-hoverBtnOut' : ''
        } group-hover:animate-hoverBtnIn`}
      >
        {textButton}
      </p>
    </button>
  )
}

export default Button
